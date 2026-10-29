/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Navigation & Screen Controller
 */

class AppNavigator {
  constructor() {
    this.currentScreenId = "loading";
    this.screens = {};
    this.tutorialCurrentStep = 0;
    this.tutorialTotalSteps = 4;
  }

  init() {
    // Kumpulkan semua elemen layar
    document.querySelectorAll(".screen").forEach(el => {
      const id = el.id.replace("screen-", "");
      this.screens[id] = el;
    });

    this.initHeaderButtons();
    this.initTutorialEvents();
    this.initMapEvents();
  }

  showScreen(screenId) {
    soundCtrl.playClick();

    // Sembunyikan layar aktif saat ini
    if (this.screens[this.currentScreenId]) {
      this.screens[this.currentScreenId].classList.remove("active");
    }

    // Tampilkan layar target
    const target = this.screens[screenId];
    if (target) {
      this.currentScreenId = screenId;
      target.classList.add("active");
      target.classList.add("animate-screen-enter");
      setTimeout(() => target.classList.remove("animate-screen-enter"), 500);

      // Jalankan hook per layar
      this.onScreenEnter(screenId);
    }

    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onScreenEnter(screenId) {
    this.updateHeaderUI();

    if (screenId === "map") {
      this.updateWorldMap();
    } else if (screenId === "final-results") {
      this.renderFinalResultsScreen();
    }
  }

  updateHeaderUI() {
    const player = gameStorage.getPlayer();
    const playerNameDisplay = document.getElementById("header-player-name");
    const playerAvatarImg = document.getElementById("header-avatar-img");

    if (playerNameDisplay) {
      playerNameDisplay.textContent = player.name || "Penjelajah Cilik";
    }

    if (playerAvatarImg) {
      let avatarFile = "character-guide.svg";
      if (player.avatar === "maya") avatarFile = "character-maya.svg";
      else if (player.avatar === "bima") avatarFile = "character-bima.svg";
      playerAvatarImg.src = `assets/images/${avatarFile}`;
    }

    // Audio status icon
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.innerHTML = soundCtrl.soundEnabled 
        ? `<span>🔊</span> Suara: Nyala` 
        : `<span>🔇</span> Suara: Mati`;
    }
  }

  initHeaderButtons() {
    const brandBtn = document.getElementById("header-brand");
    if (brandBtn) {
      brandBtn.addEventListener("click", () => {
        this.showScreen("landing");
      });
    }

    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const isEnabled = soundCtrl.toggleSound();
        soundBtn.innerHTML = isEnabled 
          ? `<span>🔊</span> Suara: Nyala` 
          : `<span>🔇</span> Suara: Mati`;
      });
    }

    const helpBtn = document.getElementById("btn-header-help");
    if (helpBtn) {
      helpBtn.addEventListener("click", () => {
        this.tutorialCurrentStep = 0;
        this.showScreen("tutorial");
      });
    }

    const resetBtn = document.getElementById("btn-header-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const confirmReset = window.confirm(
          "Apakah kamu ingin memulai sesi pemain baru?\n(Skor dan jawaban saat ini akan diatur ulang untuk siswa berikutnya)"
        );
        if (confirmReset) {
          gameStorage.resetEntireSession();
          this.showScreen("player");
        }
      });
    }
  }

  // --- LOGIKA PETA DUNIA NUMERIA ---
  initMapEvents() {
    const pins = [1, 2, 3, 4];
    pins.forEach(lvl => {
      const pinEl = document.getElementById(`pin-level-${lvl}`);
      if (pinEl) {
        pinEl.addEventListener("click", () => {
          this.handlePinClick(lvl);
        });
      }
    });

    const modalCloseBtn = document.getElementById("btn-close-briefing-modal");
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => {
        this.closeBriefingModal();
      });
    }

    const startLevelBtn = document.getElementById("btn-modal-start-level");
    if (startLevelBtn) {
      startLevelBtn.addEventListener("click", () => {
        const levelId = startLevelBtn.getAttribute("data-level-id");
        this.closeBriefingModal();
        this.showScreen("level");
        gameEngine.startLevel(levelId);
      });
    }
  }

  updateWorldMap() {
    const summary = gameStorage.getOverallSummary();

    // Update bar status atas di peta
    const totalScoreEl = document.getElementById("map-stat-score");
    if (totalScoreEl) totalScoreEl.textContent = `${summary.totalScore} Poin`;

    const completedLvlEl = document.getElementById("map-stat-levels");
    let completedCount = 0;
    for (let i = 1; i <= 4; i++) {
      if (gameStorage.state.levels[i] && gameStorage.state.levels[i].passed) {
        completedCount++;
      }
    }
    if (completedLvlEl) completedLvlEl.textContent = `${completedCount} dari 4 Selesai`;

    // Perbarui status 4 Pin Lokasi
    for (let id = 1; id <= 4; id++) {
      const pinEl = document.getElementById(`pin-level-${id}`);
      if (!pinEl) continue;

      const isUnlocked = gameStorage.isLevelUnlocked(id);
      const isPassed = gameStorage.state.levels[id] && gameStorage.state.levels[id].passed;
      const score = gameStorage.state.levels[id] ? gameStorage.state.levels[id].score : 0;

      pinEl.className = "map-location-pin";
      if (isPassed) {
        pinEl.classList.add("completed");
      } else if (isUnlocked) {
        pinEl.classList.add("unlocked");
      } else {
        pinEl.classList.add("locked");
      }

      const scoreTag = pinEl.querySelector(".pin-score-tag");
      if (scoreTag) {
        if (isPassed) {
          scoreTag.style.display = "block";
          scoreTag.textContent = `★ ${score}`;
        } else {
          scoreTag.style.display = "none";
        }
      }
    }
  }

  handlePinClick(levelId) {
    soundCtrl.playClick();
    const isUnlocked = gameStorage.isLevelUnlocked(levelId);
    const levelInfo = GAME_DATA.levels[levelId];
    if (!levelInfo) return;

    const modal = document.getElementById("briefing-modal");
    const modalTitle = document.getElementById("modal-briefing-title");
    const modalSubtitle = document.getElementById("modal-briefing-subtitle");
    const modalDesc = document.getElementById("modal-briefing-desc");
    const modalStatus = document.getElementById("modal-briefing-status");
    const startBtn = document.getElementById("btn-modal-start-level");

    if (modalTitle) modalTitle.textContent = levelInfo.name;
    if (modalSubtitle) modalSubtitle.textContent = levelInfo.subtitle;

    if (isUnlocked) {
      if (modalDesc) {
        modalDesc.innerHTML = `
          <p style="margin-bottom: 12px; line-height: 1.6;">${levelInfo.story.intro}</p>
          <div style="background: var(--primary-blue-surface); border-left: 4px solid var(--primary-blue); padding: 10px 14px; border-radius: 4px;">
            <strong>Misi:</strong> ${levelInfo.story.mission}
          </div>
        `;
      }
      if (modalStatus) {
        const lvlData = gameStorage.state.levels[levelId];
        if (lvlData && lvlData.passed) {
          modalStatus.innerHTML = `<span style="color: var(--success-green); font-weight: 800;">✓ Wilayah Selesai (Skor Terbaik: ${lvlData.score}/100)</span>`;
        } else {
          modalStatus.innerHTML = `<span style="color: var(--primary-blue); font-weight: 800;">🔓 Wilayah Terbuka & Siap Dijelajahi!</span>`;
        }
      }
      if (startBtn) {
        startBtn.style.display = "inline-flex";
        startBtn.setAttribute("data-level-id", levelId);
        startBtn.textContent = `Masuk ke Wilayah 🚀`;
      }
    } else {
      if (modalDesc) {
        modalDesc.innerHTML = `
          <div style="background: #FFFBEB; border: 2px solid var(--accent-yellow); padding: 18px; border-radius: 12px; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">🔒</div>
            <h4 style="color: #92400E; margin-bottom: 6px;">Wilayah Ini Masih Terkunci!</h4>
            <p style="color: var(--color-navy); line-height: 1.5;">
              Untuk membuka jalan menuju <strong>${levelInfo.name}</strong>, kamu harus menyelesaikan tantangan di wilayah sebelumnya dengan skor minimal <strong>70 poin</strong>.
            </p>
          </div>
        `;
      }
      if (modalStatus) {
        modalStatus.innerHTML = `<span style="color: var(--danger-red); font-weight: 700;">Syarat: Skor ≥ 70 di Level ${levelId - 1}</span>`;
      }
      if (startBtn) {
        startBtn.style.display = "none";
      }
    }

    if (modal) modal.classList.add("open");
  }

  closeBriefingModal() {
    const modal = document.getElementById("briefing-modal");
    if (modal) modal.classList.remove("open");
  }

  // --- LOGIKA TUTORIAL STEPPER ---
  initTutorialEvents() {
    const btnNext = document.getElementById("btn-tutorial-next");
    const btnPrev = document.getElementById("btn-tutorial-prev");
    const btnSkip = document.getElementById("btn-tutorial-skip");

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (this.tutorialCurrentStep < this.tutorialTotalSteps - 1) {
          this.tutorialCurrentStep++;
          this.renderTutorialStep();
        } else {
          // Selesai tutorial -> masuk ke Peta
          this.showScreen("map");
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (this.tutorialCurrentStep > 0) {
          this.tutorialCurrentStep--;
          this.renderTutorialStep();
        }
      });
    }

    if (btnSkip) {
      btnSkip.addEventListener("click", () => {
        this.showScreen("map");
      });
    }
  }

  renderTutorialStep() {
    const stepsData = [
      {
        title: "1. Menjelajahi Peta Dunia Numeria",
        desc: "Klik wilayah yang sudah terbuka pada peta untuk memulai petualangan. Ada 4 wilayah seru: Lembah Penemuan, Hutan Tantangan, Desa Kehidupan, dan Gerbang Pengetahuan.",
        visual: `
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🗺️</div>
          <p style="font-weight: 800; color: var(--primary-blue);">Peta Petualangan 2D</p>
          <p style="font-size: 0.85rem; color: var(--color-navy-muted);">Jalur perjalanan akan terbuka satu per satu!</p>
        `
      },
      {
        title: "2. Cerita & Materi Pembelajaran",
        desc: "Setiap wilayah memiliki cerita penduduk yang membutuhkan bantuan Matematika. Jangan terburu-buru mengerjakan soal! Pelajari terlebih dahulu rangkuman materi dan contoh konkretnya.",
        visual: `
          <div style="font-size: 2.8rem; margin-bottom: 8px;">📖</div>
          <p style="font-weight: 800; color: var(--primary-blue);">Materi Ringkas & Terarah</p>
          <p style="font-size: 0.85rem; color: var(--color-navy-muted);">Dilengkapi ilustrasi visual pecahan</p>
        `
      },
      {
        title: "3. Variasi Tantangan Interaktif",
        desc: "Aktivitas di game ini sangat variatif! Kamu dapat mengklik irisan pizza, memilih bagian pita pecahan, menyusun urutan kartu, dan memecahkan soal cerita dunia nyata.",
        visual: `
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🍕 📏 🎴</div>
          <p style="font-weight: 800; color: var(--primary-blue);">Bukan Sekadar Kuis Biasa</p>
          <p style="font-size: 0.85rem; color: var(--color-navy-muted);">Interaksi point-and-click langsung</p>
        `
      },
      {
        title: "4. Sistem Skor & Syarat Membuka Wilayah",
        desc: "Setiap soal bernilai 10 poin. Kamu harus meraih minimal skor 70 dari 100 untuk membuka wilayah berikutnya. Jika belum mencapai 70, kamu bisa membaca kembali materi dan mengulanginya!",
        visual: `
          <div style="font-size: 2.8rem; margin-bottom: 8px;">⭐ 70 / 100</div>
          <p style="font-weight: 800; color: var(--primary-blue);">Standar Kelulusan Level</p>
          <p style="font-size: 0.85rem; color: var(--color-navy-muted);">Bisa diulang kapan saja tanpa rasa takut salah</p>
        `
      }
    ];

    const cur = stepsData[this.tutorialCurrentStep];
    const titleEl = document.getElementById("tutorial-step-title");
    const descEl = document.getElementById("tutorial-step-desc");
    const visualEl = document.getElementById("tutorial-step-visual");
    const btnNext = document.getElementById("btn-tutorial-next");
    const btnPrev = document.getElementById("btn-tutorial-prev");

    if (titleEl) titleEl.textContent = cur.title;
    if (descEl) descEl.textContent = cur.desc;
    if (visualEl) visualEl.innerHTML = cur.visual;

    // Update dots
    for (let i = 0; i < this.tutorialTotalSteps; i++) {
      const dot = document.getElementById(`tut-dot-${i}`);
      if (dot) {
        if (i === this.tutorialCurrentStep) dot.classList.add("active");
        else dot.classList.remove("active");
      }
    }

    if (btnPrev) {
      btnPrev.style.visibility = this.tutorialCurrentStep === 0 ? "hidden" : "visible";
    }

    if (btnNext) {
      btnNext.textContent = this.tutorialCurrentStep === this.tutorialTotalSteps - 1 
        ? "Mulai Bermain! 🚀" 
        : "Selanjutnya ➔";
    }
  }

  // --- RENDER HASIL PETUALANGAN AKHIR ---
  renderFinalResultsScreen() {
    const summary = gameStorage.getOverallSummary();
    const container = document.getElementById("final-results-container");
    if (!container) return;

    let tableRows = "";
    for (let l = 1; l <= 4; l++) {
      const lvlData = summary.levels[l];
      const lvlInfo = GAME_DATA.levels[l];
      const maxLvlScore = l === 4 ? 50 : 100;
      const score = lvlData ? lvlData.score : 0;
      const passed = lvlData ? lvlData.passed : false;
      const correctCount = lvlData && lvlData.answers 
        ? lvlData.answers.filter(a => a.isCorrect).length 
        : 0;
      const totalQ = lvlData && lvlData.answers ? lvlData.answers.length : 0;

      tableRows += `
        <tr>
          <td><strong>${lvlInfo.name}</strong></td>
          <td>${totalQ > 0 ? `${correctCount} / ${totalQ} Soal` : 'Belum Dikerjakan'}</td>
          <td><strong>${score}</strong> / ${maxLvlScore}</td>
          <td>
            <span style="font-weight: 800; color: ${passed ? 'var(--success-green)' : 'var(--warning-orange)'};">
              ${passed ? '✓ Lulus' : (totalQ > 0 ? 'Perlu Latihan' : '-')}
            </span>
          </td>
        </tr>
      `;
    }

    let masteredHtml = "";
    if (summary.masteredTopics.length > 0) {
      summary.masteredTopics.forEach(m => {
        masteredHtml += `
          <div class="topic-item-row">
            <strong>✓ ${m.topic}</strong><br>
            <span style="color: var(--color-navy-muted); font-size: 0.85rem;">${m.scoreText}</span>
          </div>
        `;
      });
    } else {
      masteredHtml = `<p style="font-size: 0.9rem; color: var(--color-navy-muted);">Belum ada topik yang mencapai 70%. Teruslah mencoba!</p>`;
    }

    let reviewHtml = "";
    if (summary.reviewTopics.length > 0) {
      summary.reviewTopics.forEach(r => {
        reviewHtml += `
          <div class="topic-item-row">
            <strong>• ${r.topic}</strong><br>
            <span style="color: var(--color-navy-muted); font-size: 0.85rem;">${r.scoreText}</span>
          </div>
        `;
      });
    } else {
      reviewHtml = `<p style="font-size: 0.9rem; color: #14532D; font-weight: 700;">Hebat sekali! Semua materi yang diuji telah kamu kuasai dengan sangat baik.</p>`;
    }

    container.innerHTML = `
      <div class="report-header-banner">
        <div>
          <span class="report-badge">LAPORAN HASIL EVALUASI PEMBELAJARAN</span>
          <h2 class="report-title">Hasil Petualangan Numeria</h2>
          <p class="report-subtitle">Media Pembelajaran Pecahan Kelas V SD Muhammadiyah (Program KKN Mahasiswa TP)</p>
        </div>
        <div class="report-student-card">
          <img src="assets/images/character-${summary.avatar || 'guide'}.svg" alt="Avatar" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--primary-blue);">
          <div>
            <div style="font-size: 1.15rem; font-weight: 900; color: var(--color-navy);">${summary.playerName}</div>
            <div style="font-size: 0.85rem; color: var(--primary-blue); font-weight: 700;">Penjelajah Matematika Kelas V</div>
          </div>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="report-stats-grid">
        <div class="stat-box">
          <div class="stat-box-val">${summary.totalScore}</div>
          <div class="stat-box-lbl">Total Skor Petualangan</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-val" style="color: var(--success-green);">${summary.totalCorrect}</div>
          <div class="stat-box-lbl">Jawaban Benar</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-val" style="color: var(--danger-red);">${summary.totalWrong}</div>
          <div class="stat-box-lbl">Jawaban Kurang Tepat</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-val" style="color: var(--accent-yellow);">${summary.accuracyPercentage}%</div>
          <div class="stat-box-lbl">Persentase Ketepatan</div>
        </div>
      </div>

      <!-- Rincian Tiap Wilayah -->
      <h3 class="report-section-title">📊 Rincian Skor Setiap Wilayah</h3>
      <table class="level-breakdown-table">
        <thead>
          <tr>
            <th>Nama Wilayah</th>
            <th>Hasil Jawaban</th>
            <th>Skor Diperoleh</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <!-- Diagnosis Pedagogis -->
      <h3 class="report-section-title">🧠 Analisis Penguasaan Materi</h3>
      <div class="topics-summary-grid">
        <div class="topic-list-card mastered">
          <h4>🌟 Materi yang Telah Dikuasai:</h4>
          ${masteredHtml}
        </div>
        <div class="topic-list-card review">
          <h4>🌱 Saran & Rekomendasi Belajar:</h4>
          ${reviewHtml}
        </div>
      </div>

      <!-- Tombol Aksi -->
      <div class="report-actions-row">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btn-show-detailed-review">Lihat Pembahasan Lengkap 🔍</button>
          <button class="btn btn-secondary" id="btn-print-report">Cetak / Simpan Laporan (PDF) 🖨️</button>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-secondary" id="btn-back-to-map">Kembali ke Peta 🗺️</button>
          <button class="btn btn-accent" id="btn-new-session">Mainkan Sesi Baru 🔄</button>
        </div>
      </div>
    `;

    // Attach Event Handlers
    document.getElementById("btn-show-detailed-review")?.addEventListener("click", () => {
      soundCtrl.playClick();
      this.openReviewModal(summary.allAnswerDetails);
    });

    document.getElementById("btn-print-report")?.addEventListener("click", () => {
      soundCtrl.playClick();
      window.print();
    });

    document.getElementById("btn-back-to-map")?.addEventListener("click", () => {
      this.showScreen("map");
    });

    document.getElementById("btn-new-session")?.addEventListener("click", () => {
      const confirmNew = window.confirm("Mulai sesi baru untuk siswa selanjutnya?");
      if (confirmNew) {
        gameStorage.resetEntireSession();
        this.showScreen("player");
      }
    });
  }

  // --- MODAL PEMBAHASAN LENGKAP SOAL-DEMI-SOAL ---
  openReviewModal(answers) {
    const modal = document.getElementById("review-modal");
    const container = document.getElementById("review-modal-content");
    if (!modal || !container) return;

    if (!answers || answers.length === 0) {
      container.innerHTML = `<p style="padding: 20px; text-align: center;">Belum ada soal yang diselesaikan.</p>`;
    } else {
      let html = `<div style="display: flex; flex-direction: column; gap: 16px;">`;
      answers.forEach((ans, idx) => {
        html += `
          <div style="border: 2px solid ${ans.isCorrect ? 'var(--success-green)' : 'var(--accent-yellow)'}; border-radius: 12px; padding: 16px; background: ${ans.isCorrect ? 'var(--success-light)' : '#FFFBEB'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: var(--color-navy);">Soal #${idx + 1} (${ans.indicator || 'Pecahan'})</strong>
              <span style="font-weight: 800; color: ${ans.isCorrect ? 'var(--success-green)' : '#92400E'};">
                ${ans.isCorrect ? '✓ Benar (+10 Poin)' : '✗ Kurang Tepat (0 Poin)'}
              </span>
            </div>
            <p style="font-size: 0.95rem; margin-bottom: 8px; color: var(--color-navy);">${ans.questionText}</p>
            <div style="font-size: 0.9rem; margin-bottom: 6px;">
              <strong>Jawabanmu:</strong> ${ans.selectedOptionId}. ${ans.selectedOptionText}
            </div>
            <div style="font-size: 0.88rem; background: rgba(255,255,255,0.7); padding: 8px 12px; border-radius: 6px; line-height: 1.5; color: var(--color-navy-muted);">
              <strong>💡 Pembahasan:</strong> ${ans.explanation}
            </div>
          </div>
        `;
      });
      html += `</div>`;
      container.innerHTML = html;
    }

    modal.classList.add("open");
  }

  closeReviewModal() {
    const modal = document.getElementById("review-modal");
    if (modal) modal.classList.remove("open");
  }
}

// Instance global
const appNav = new AppNavigator();
window.appNav = appNav;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppNavigator;
}
