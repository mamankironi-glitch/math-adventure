/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Game Engine & Interactive Question Renderer
 * 
 * Menangani:
 * - Siklus hidup level (Materi, Soal, Evaluasi Jawaban, Hasil)
 * - Tipe interaksi: irisan pizza interaktif, pita pecahan, pengurutan, pilihan ganda
 * - Pencegahan double-click & double-scoring
 * - Umpan balik pedagogis dan penilaian transparan
 */

class GameEngine {
  constructor() {
    this.currentLevelId = 1;
    this.questions = [];
    this.currentIndex = 0;
    this.currentScore = 0;
    this.userAnswers = [];
    this.hasAnswered = false;

    // State untuk interaksi spesifik
    this.selectedPizzaSlices = new Set();
    this.selectedBarSegments = new Set();
    this.sortedItems = [];

    // Cache elemen DOM
    this.dom = {};
  }

  init(domElements) {
    this.dom = domElements;
  }

  startLevel(levelId) {
    this.currentLevelId = parseInt(levelId, 10);
    this.questions = GAME_DATA.questions.filter(q => q.level === this.currentLevelId);
    this.currentIndex = 0;
    this.currentScore = 0;
    this.userAnswers = [];
    this.hasAnswered = false;

    // Reset storage percobaan level
    gameStorage.resetCurrentLevel(this.currentLevelId);

    this.renderLevelHeader();
    this.showMateriTab();
  }

  renderLevelHeader() {
    const levelInfo = GAME_DATA.levels[this.currentLevelId];
    if (!levelInfo) return;

    if (this.dom.levelBadgeTag) this.dom.levelBadgeTag.textContent = `LEVEL ${this.currentLevelId}`;
    if (this.dom.levelTitle) this.dom.levelTitle.textContent = levelInfo.name;
    if (this.dom.levelSubtitle) this.dom.levelSubtitle.textContent = levelInfo.subtitle;

    // Set background scenery header
    if (this.dom.levelSceneryHeader) {
      let bgName = "valley-background.svg";
      if (this.currentLevelId === 2) bgName = "forest-background.svg";
      else if (this.currentLevelId === 3) bgName = "village-background.svg";
      else if (this.currentLevelId === 4) bgName = "final-gate-background.svg";
      this.dom.levelSceneryHeader.style.backgroundImage = `url('assets/images/${bgName}')`;
    }
  }

  showMateriTab() {
    if (this.dom.tabMateri) this.dom.tabMateri.classList.add("active");
    if (this.dom.tabMisi) this.dom.tabMisi.classList.remove("active");

    if (this.dom.panelMateri) this.dom.panelMateri.style.display = "block";
    if (this.dom.panelMisi) this.dom.panelMisi.style.display = "none";
    if (this.dom.panelHasil) this.dom.panelHasil.style.display = "none";

    const levelInfo = GAME_DATA.levels[this.currentLevelId];
    if (!levelInfo) return;

    // Render Cerita
    if (this.dom.storyContent) {
      this.dom.storyContent.innerHTML = `
        <div class="story-box">
          <h4>📖 ${levelInfo.story.title}</h4>
          <p style="margin-bottom: 12px; line-height: 1.6; color: var(--color-navy-muted);">${levelInfo.story.intro}</p>
          <div style="background: var(--accent-yellow-light); border-left: 4px solid var(--accent-yellow); padding: 12px 16px; border-radius: 4px;">
            <strong style="color: #92400E;">🎯 Misi Kalian:</strong>
            <p style="margin-top: 4px; color: var(--color-navy); font-size: 0.95rem;">${levelInfo.story.mission}</p>
          </div>
        </div>
      `;
    }

    // Render Ringkasan Materi Interaktif
    if (this.dom.materiSections) {
      let html = '<div class="materi-accordion">';
      levelInfo.materi.sections.forEach(sec => {
        html += `
          <div class="materi-item">
            <h5>💡 ${sec.heading}</h5>
            <p>${sec.content}</p>
          </div>
        `;
      });
      html += '</div>';
      this.dom.materiSections.innerHTML = html;
    }
  }

  startMissionChallenge() {
    if (this.dom.tabMateri) this.dom.tabMateri.classList.remove("active");
    if (this.dom.tabMisi) this.dom.tabMisi.classList.add("active");

    if (this.dom.panelMateri) this.dom.panelMateri.style.display = "none";
    if (this.dom.panelMisi) this.dom.panelMisi.style.display = "block";
    if (this.dom.panelHasil) this.dom.panelHasil.style.display = "none";

    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const q = this.questions[this.currentIndex];
    if (!q) {
      this.finishLevel();
      return;
    }

    this.hasAnswered = false;
    this.selectedPizzaSlices.clear();
    this.selectedBarSegments.clear();

    // Sembunyikan feedback sebelumnya
    if (this.dom.feedbackBox) {
      this.dom.feedbackBox.className = "feedback-box";
      this.dom.feedbackBox.style.display = "none";
    }

    // Update Progres & Skor
    if (this.dom.questionCounter) {
      this.dom.questionCounter.textContent = `Soal ${this.currentIndex + 1} dari ${this.questions.length}`;
    }
    if (this.dom.currentScoreDisplay) {
      this.dom.currentScoreDisplay.textContent = `${this.currentScore} Poin`;
    }

    // Indikator & Pertanyaan
    if (this.dom.questionIndicator) {
      this.dom.questionIndicator.textContent = `Topik: ${q.indicator}`;
    }
    if (this.dom.questionText) {
      this.dom.questionText.textContent = q.question;
    }

    // Render Area Interaktif Visual jika ada
    this.renderInteractiveVisual(q);

    // Render Opsi Jawaban
    this.renderOptions(q);

    // Navigasi Next Button disembunyikan sampai siswa menjawab
    if (this.dom.btnNextQuestion) {
      this.dom.btnNextQuestion.style.display = "none";
      const isLast = this.currentIndex === this.questions.length - 1;
      this.dom.btnNextQuestion.textContent = isLast ? "Selesaikan Level 🏆" : "Lanjut ke Soal Berikutnya ➔";
    }
  }

  renderInteractiveVisual(q) {
    if (!this.dom.interactiveVisualBox) return;

    if (q.type === "interactive-pizza") {
      this.dom.interactiveVisualBox.style.display = "flex";
      this.dom.interactiveVisualBox.innerHTML = `
        <div style="text-align: center; margin-bottom: 10px;">
          <strong style="color: var(--primary-blue);">🍕 Klik potongan pizza di bawah untuk memilih bagian:</strong>
          <div id="pizza-slice-counter" style="font-size: 0.95rem; font-weight: bold; color: var(--color-navy); margin-top: 4px;">
            Bagian terpilih: 0 dari 8
          </div>
        </div>
        <div class="pizza-svg-container" id="interactive-pizza-svg">
          ${this.generatePizzaSVG(8)}
        </div>
      `;
      this.attachPizzaEvents();
    } else if (q.type === "interactive-bar") {
      this.dom.interactiveVisualBox.style.display = "flex";
      this.dom.interactiveVisualBox.innerHTML = `
        <div style="text-align: center; margin-bottom: 12px;">
          <strong style="color: var(--primary-blue);">📏 Klik bagian pita di bawah ini:</strong>
          <div id="bar-segment-counter" style="font-size: 0.95rem; font-weight: bold; color: var(--color-navy); margin-top: 4px;">
            Bagian terpilih: 0 dari 4
          </div>
        </div>
        <div class="fraction-bar-wrapper">
          <div class="fraction-bar-segment" data-segment="1">1</div>
          <div class="fraction-bar-segment" data-segment="2">2</div>
          <div class="fraction-bar-segment" data-segment="3">3</div>
          <div class="fraction-bar-segment" data-segment="4">4</div>
        </div>
      `;
      this.attachBarEvents();
    } else if (q.visual === "fraction-box" && q.visualData) {
      this.dom.interactiveVisualBox.style.display = "flex";
      this.dom.interactiveVisualBox.innerHTML = `
        <div style="background: var(--color-white); border: 3px solid var(--primary-blue); padding: 18px 36px; border-radius: 16px; text-align: center;">
          <div style="font-size: 2.8rem; font-weight: 900; color: var(--primary-blue); line-height: 1;">5</div>
          <div style="width: 70px; height: 4px; background: var(--accent-yellow); margin: 6px auto;"></div>
          <div style="font-size: 2.8rem; font-weight: 900; color: var(--primary-blue); line-height: 1;">9</div>
        </div>
        <p style="margin-top: 8px; font-size: 0.88rem; font-weight: 700; color: var(--color-navy-muted);">${q.visualData.label}</p>
      `;
    } else if (q.visual === "comparison-bars") {
      this.dom.interactiveVisualBox.style.display = "flex";
      this.dom.interactiveVisualBox.innerHTML = `
        <div style="display: flex; gap: 24px; align-items: center; justify-content: center; width: 100%;">
          <div style="text-align: center;">
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--primary-blue); margin-bottom: 6px;">3/7</div>
            <div style="display: flex; width: 140px; height: 32px; border: 2px solid var(--color-navy); border-radius: 6px; overflow: hidden;">
              <div style="flex: 3; background: var(--accent-yellow);"></div>
              <div style="flex: 4; background: #FFFFFF;"></div>
            </div>
          </div>
          <div style="font-size: 1.6rem; font-weight: 900; color: var(--color-navy);">VS</div>
          <div style="text-align: center;">
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--primary-blue); margin-bottom: 6px;">5/7</div>
            <div style="display: flex; width: 140px; height: 32px; border: 2px solid var(--color-navy); border-radius: 6px; overflow: hidden;">
              <div style="flex: 5; background: var(--primary-blue);"></div>
              <div style="flex: 2; background: #FFFFFF;"></div>
            </div>
          </div>
        </div>
      `;
    } else {
      this.dom.interactiveVisualBox.style.display = "none";
      this.dom.interactiveVisualBox.innerHTML = "";
    }
  }

  generatePizzaSVG(slices = 8) {
    let paths = '';
    const cx = 100, cy = 100, r = 90;
    const angleStep = (2 * Math.PI) / slices;

    for (let i = 0; i < slices; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = (i + 1) * angleStep - Math.PI / 2;

      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
      paths += `
        <path class="pizza-slice" data-slice="${i}" d="${d}" fill="#FDE047" stroke="#041E42" stroke-width="2">
          <title>Irisan ${i + 1}</title>
        </path>
      `;
    }

    return `
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <circle cx="100" cy="100" r="95" fill="#B45309" stroke="#041E42" stroke-width="3"/>
        ${paths}
        <circle cx="100" cy="100" r="8" fill="#B45309"/>
      </svg>
    `;
  }

  attachPizzaEvents() {
    const slices = document.querySelectorAll(".pizza-slice");
    const counter = document.getElementById("pizza-slice-counter");

    slices.forEach(slice => {
      slice.addEventListener("click", () => {
        if (this.hasAnswered) return;
        soundCtrl.playClick();
        const id = slice.getAttribute("data-slice");
        if (this.selectedPizzaSlices.has(id)) {
          this.selectedPizzaSlices.delete(id);
          slice.classList.remove("selected");
        } else {
          this.selectedPizzaSlices.add(id);
          slice.classList.add("selected");
        }
        if (counter) {
          counter.textContent = `Bagian terpilih: ${this.selectedPizzaSlices.size} dari 8`;
        }
      });
    });
  }

  attachBarEvents() {
    const segments = document.querySelectorAll(".fraction-bar-segment");
    const counter = document.getElementById("bar-segment-counter");

    segments.forEach(seg => {
      seg.addEventListener("click", () => {
        if (this.hasAnswered) return;
        soundCtrl.playClick();
        const id = seg.getAttribute("data-segment");
        if (this.selectedBarSegments.has(id)) {
          this.selectedBarSegments.delete(id);
          seg.classList.remove("selected");
        } else {
          this.selectedBarSegments.add(id);
          seg.classList.add("selected");
        }
        if (counter) {
          counter.textContent = `Bagian terpilih: ${this.selectedBarSegments.size} dari 4`;
        }
      });
    });
  }

  renderOptions(q) {
    if (!this.dom.optionsGrid) return;
    this.dom.optionsGrid.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.setAttribute("type", "button");
      btn.setAttribute("data-opt-id", opt.id);

      btn.innerHTML = `
        <span class="option-badge-letter">${opt.id}</span>
        <span class="option-text">${opt.text}</span>
      `;

      btn.addEventListener("click", () => {
        this.handleSelectAnswer(opt, btn, q);
      });

      this.dom.optionsGrid.appendChild(btn);
    });
  }

  handleSelectAnswer(selectedOpt, clickedBtn, q) {
    // Pencegahan klik ganda & penambahan skor berkali-kali
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    // Nonaktifkan seluruh tombol opsi agar tidak bisa diklik lagi
    const allOptionBtns = this.dom.optionsGrid.querySelectorAll(".option-btn");
    allOptionBtns.forEach(btn => btn.setAttribute("disabled", "true"));

    const isCorrect = !!selectedOpt.isCorrect;

    // Catat jawaban siswa
    const answerRecord = {
      questionId: q.id,
      questionText: q.question,
      selectedOptionId: selectedOpt.id,
      selectedOptionText: selectedOpt.text,
      isCorrect: isCorrect,
      explanation: q.explanation,
      points: isCorrect ? (q.points || 10) : 0,
      topic: q.topic || "umum",
      indicator: q.indicator
    };
    this.userAnswers.push(answerRecord);

    if (isCorrect) {
      this.currentScore += (q.points || 10);
      clickedBtn.classList.add("correct");
      soundCtrl.playCorrect();
      this.showFeedback(true, q.explanation);
    } else {
      clickedBtn.classList.add("incorrect");
      soundCtrl.playWrong();
      
      // Cari dan sorot jawaban yang benar
      allOptionBtns.forEach(btn => {
        if (btn.getAttribute("data-opt-id") === q.options.find(o => o.isCorrect).id) {
          btn.classList.add("correct");
        }
      });

      this.showFeedback(false, q.explanation);
    }

    // Update tampilan skor langsung
    if (this.dom.currentScoreDisplay) {
      this.dom.currentScoreDisplay.textContent = `${this.currentScore} Poin`;
    }

    // Tampilkan tombol lanjut
    if (this.dom.btnNextQuestion) {
      this.dom.btnNextQuestion.style.display = "inline-flex";
      this.dom.btnNextQuestion.focus();
    }
  }

  showFeedback(isCorrect, explanation) {
    if (!this.dom.feedbackBox) return;

    this.dom.feedbackBox.style.display = "block";
    if (isCorrect) {
      this.dom.feedbackBox.className = "feedback-box correct animate-correct";
      this.dom.feedbackBox.innerHTML = `
        <div class="feedback-title">
          <span>🎉</span>
          <span>Luar Biasa, Jawabanmu Benar! (+10 Poin)</span>
        </div>
        <div class="feedback-explanation">
          ${explanation}
        </div>
      `;
    } else {
      this.dom.feedbackBox.className = "feedback-box incorrect animate-gentle-shake";
      this.dom.feedbackBox.innerHTML = `
        <div class="feedback-title">
          <span>💡</span>
          <span>Mari Kita Pahami Bersama (+0 Poin)</span>
        </div>
        <div class="feedback-explanation">
          ${explanation}
        </div>
      `;
    }
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.renderCurrentQuestion();
    } else {
      this.finishLevel();
    }
  }

  finishLevel() {
    if (this.dom.panelMisi) this.dom.panelMisi.style.display = "none";
    if (this.dom.panelHasil) this.dom.panelHasil.style.display = "block";

    // Simpan progres ke storage
    const result = gameStorage.updateLevelResult(this.currentLevelId, this.currentScore, this.userAnswers);

    const isPassed = result.passed;
    const maxScore = this.currentLevelId === 4 ? 50 : 100;

    if (isPassed) {
      soundCtrl.playLevelPassed();
    }

    // Jika level 4 selesai, kita bisa buka efek gerbang
    if (this.currentLevelId === 4 && isPassed) {
      soundCtrl.playGateOpen();
    }

    if (this.dom.levelResultContainer) {
      this.dom.levelResultContainer.innerHTML = `
        <div class="level-result-card animate-screen-enter">
          <img src="assets/images/character-guide.svg" alt="Niko" class="result-celebrate-img animate-float">
          <h3 class="result-status-title ${isPassed ? 'passed' : 'retry'}">
            ${isPassed ? '🎉 Misi Berhasil Dituntaskan!' : '💪 Jangan Menyerah, Ayo Coba Lagi!'}
          </h3>
          <p style="font-weight: 700; color: var(--color-navy); margin-bottom: 12px;">
            ${GAME_DATA.levels[this.currentLevelId].name}
          </p>

          <div class="result-score-circle">
            <span class="score-num">${this.currentScore}</span>
            <span class="score-max">dari ${maxScore}</span>
          </div>

          <p class="result-advice-text">
            ${isPassed 
              ? `Hebat sekali! Kamu berhasil menyelesaikan tantangan di wilayah ini dengan memuaskan (Skor minimal lulus: 70). Wilayah berikutnya kini telah TERBUKA di Peta Dunia Numeria!`
              : `Kamu memperoleh skor ${this.currentScore} dari syarat minimal kelulusan 70. Tenang, penjelajah sejati belajar dari kesalahan. Ayo pelajari kembali materinya dan ulangi tantangan ini!`
            }
          </p>

          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            ${isPassed 
              ? (this.currentLevelId === 4
                  ? `<button class="btn btn-accent btn-lg" id="btn-to-final-report">Lihat Hasil Petualangan Akhir 📜</button>`
                  : `<button class="btn btn-primary btn-lg" id="btn-return-map">Kembali ke Peta Dunia 🗺️</button>`)
              : `<button class="btn btn-accent btn-lg" id="btn-retry-level">Ulangi Level Ini 🔄</button>
                 <button class="btn btn-secondary btn-lg" id="btn-return-map">Kembali ke Peta 🗺️</button>`
            }
          </div>
        </div>
      `;

      // Event listener tombol hasil
      const btnMap = document.getElementById("btn-return-map");
      if (btnMap) {
        btnMap.addEventListener("click", () => {
          soundCtrl.playClick();
          window.appNav.showScreen("map");
        });
      }

      const btnRetry = document.getElementById("btn-retry-level");
      if (btnRetry) {
        btnRetry.addEventListener("click", () => {
          soundCtrl.playClick();
          this.startLevel(this.currentLevelId);
        });
      }

      const btnFinalReport = document.getElementById("btn-to-final-report");
      if (btnFinalReport) {
        btnFinalReport.addEventListener("click", () => {
          soundCtrl.playClick();
          window.appNav.showScreen("final-results");
        });
      }
    }
  }
}

// Instance global
const gameEngine = new GameEngine();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
