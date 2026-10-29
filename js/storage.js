/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Storage & Game State Manager
 * 
 * Mengelola data sesi pemain, progres level, dan riwayat jawaban:
 * - Penyimpanan aman di memori & localStorage
 * - Reset sesi bersih untuk pergantian siswa di laptop sekolah
 * - Perhitungan skor akurat berdasarkan jawaban aktual
 */

const STORAGE_KEY = "MATH_ADVENTURE_STATE_V1";

class StorageManager {
  constructor() {
    this.defaultState = {
      playerName: "Penjelajah Cilik",
      isAnonymous: false,
      avatar: "niko",
      activeLevelId: 1,
      unlockedLevels: [1],
      levels: {
        1: { id: 1, score: 0, passed: false, completed: false, bestScore: 0, answers: [] },
        2: { id: 2, score: 0, passed: false, completed: false, bestScore: 0, answers: [] },
        3: { id: 3, score: 0, passed: false, completed: false, bestScore: 0, answers: [] },
        4: { id: 4, score: 0, passed: false, completed: false, bestScore: 0, answers: [] }
      },
      hasSeenTutorial: false,
      lastPlayedDate: new Date().toISOString()
    };

    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validasi struktur state minimal
        if (parsed && parsed.levels && parsed.unlockedLevels) {
          return Object.assign({}, this.defaultState, parsed);
        }
      }
    } catch (e) {
      console.warn("Gagal membaca localStorage, menggunakan state memori:", e);
    }
    return JSON.parse(JSON.stringify(this.defaultState));
  }

  saveState() {
    try {
      this.state.lastPlayedDate = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Gagal menyimpan ke localStorage:", e);
    }
  }

  setPlayer(name, isAnonymous = false, avatar = "niko") {
    let cleanName = (name || "").trim();
    if (!cleanName || isAnonymous) {
      cleanName = "Penjelajah Cilik";
      this.state.isAnonymous = true;
    } else {
      this.state.isAnonymous = false;
    }
    this.state.playerName = cleanName;
    this.state.avatar = avatar;
    this.saveState();
  }

  getPlayer() {
    return {
      name: this.state.playerName,
      isAnonymous: this.state.isAnonymous,
      avatar: this.state.avatar
    };
  }

  isLevelUnlocked(levelId) {
    const id = parseInt(levelId, 10);
    if (id === 1) return true;
    const prevLevel = this.state.levels[id - 1];
    return !!(prevLevel && prevLevel.passed);
  }

  updateLevelResult(levelId, score, answers) {
    const id = parseInt(levelId, 10);
    if (!this.state.levels[id]) {
      this.state.levels[id] = { id, score: 0, passed: false, completed: false, bestScore: 0, answers: [] };
    }

    const levelData = this.state.levels[id];
    levelData.score = score;
    levelData.completed = true;
    levelData.answers = answers || [];

    const passingScore = 70; // Standar minimal 70
    const passed = score >= passingScore;
    levelData.passed = passed;

    if (score > (levelData.bestScore || 0)) {
      levelData.bestScore = score;
    }

    // Jika lolos dan ada level berikutnya, buka level berikutnya
    if (passed && id < 4) {
      const nextLevelId = id + 1;
      if (!this.state.unlockedLevels.includes(nextLevelId)) {
        this.state.unlockedLevels.push(nextLevelId);
      }
    }

    this.saveState();
    return {
      score,
      passed,
      isUnlockedNext: id < 4 ? this.isLevelUnlocked(id + 1) : false
    };
  }

  resetCurrentLevel(levelId) {
    const id = parseInt(levelId, 10);
    if (this.state.levels[id]) {
      this.state.levels[id].answers = [];
      this.state.levels[id].score = 0;
      this.state.levels[id].completed = false;
      this.saveState();
    }
  }

  resetEntireSession() {
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  // --- Analisis Hasil Petualangan & Rekomendasi Belajar ---
  getOverallSummary() {
    let totalScore = 0;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    const topicStats = {
      identifikasi: { name: "Pengenalan & Representasi Visual Pecahan", total: 0, correct: 0 },
      perbandingan: { name: "Membandingkan & Mengurutkan Pecahan", total: 0, correct: 0 },
      senilai: { name: "Pecahan Senilai", total: 0, correct: 0 },
      operasi: { name: "Operasi Penjumlahan & Pengurangan Pecahan", total: 0, correct: 0 },
      cerita: { name: "Pemecahan Masalah & Soal Cerita Sehari-hari", total: 0, correct: 0 }
    };

    const allAnswerDetails = [];

    // Iterasi level 1 s.d. 4
    for (let l = 1; l <= 4; l++) {
      const lvl = this.state.levels[l];
      if (lvl && lvl.answers && lvl.answers.length > 0) {
        lvl.answers.forEach(ans => {
          totalQuestions++;
          if (ans.isCorrect) {
            totalCorrect++;
            totalScore += ans.points || 10;
          } else {
            totalWrong++;
          }

          if (ans.topic && topicStats[ans.topic]) {
            topicStats[ans.topic].total++;
            if (ans.isCorrect) topicStats[ans.topic].correct++;
          }

          allAnswerDetails.push(ans);
        });
      }
    }

    const accuracyPercentage = totalQuestions > 0 
      ? Math.round((totalCorrect / totalQuestions) * 100) 
      : 0;

    // Kategorikan materi yang sudah dikuasai vs perlu dilatih kembali
    const masteredTopics = [];
    const reviewTopics = [];

    Object.keys(topicStats).forEach(key => {
      const t = topicStats[key];
      if (t.total > 0) {
        const rate = (t.correct / t.total) * 100;
        if (rate >= 70) {
          masteredTopics.push({
            topic: t.name,
            scoreText: `${t.correct} dari ${t.total} soal benar (${Math.round(rate)}%)`
          });
        } else {
          reviewTopics.push({
            topic: t.name,
            scoreText: `${t.correct} dari ${t.total} soal benar (${Math.round(rate)}%)`
          });
        }
      }
    });

    const isAllCompleted = this.state.levels[1].passed && 
                           this.state.levels[2].passed && 
                           this.state.levels[3].passed && 
                           this.state.levels[4].completed;

    return {
      playerName: this.state.playerName,
      avatar: this.state.avatar,
      levels: this.state.levels,
      totalScore,
      totalQuestions,
      totalCorrect,
      totalWrong,
      accuracyPercentage,
      masteredTopics,
      reviewTopics,
      isAllCompleted,
      allAnswerDetails
    };
  }
}

// Instance global
const gameStorage = new StorageManager();
window.gameStorage = gameStorage;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
