/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Game Engine & Simulation Orchestrator (Upgraded Version)
 * 
 * - Mengintegrasikan Simulasi Manipulatif (Level 1, 2, 3, dan Gerbang Akhir)
 * - Mengelola bank soal konseptual terstruktur
 * - Proteksi 100% anti-double-click & anti-double-scoring
 * - Kebijakan 100% Bebas Emoji (Digantikan Ikon SVG Murni)
 */

class GameEngine {
  constructor() {
    this.currentLevelId = 1;
    this.questions = [];
    this.currentIndex = 0;
    this.currentScore = 0;
    this.userAnswers = [];
    this.hasAnswered = false;

    // Simulation instances
    this.simLevel1 = new Level1Simulation(this);
    this.simLevel2 = new Level2Simulation(this);
    this.simLevel3 = new Level3Simulation(this);
    this.simFinalGate = new FinalGateSimulation(this);

    this.dom = {};
  }

  init(domElements) {
    this.dom = domElements;
    const simBox = document.getElementById("simulation-interactive-stage");
    if (simBox) {
      this.simLevel1.init(simBox);
      this.simLevel2.init(simBox);
      this.simLevel3.init(simBox);
      this.simFinalGate.init(simBox);
    }
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

    if (this.dom.levelBadgeTag) this.dom.levelBadgeTag.textContent = `WILAYAH ${this.currentLevelId}`;
    if (this.dom.levelTitle) this.dom.levelTitle.textContent = levelInfo.name;
    if (this.dom.levelSubtitle) this.dom.levelSubtitle.textContent = levelInfo.subtitle;

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

    // Render Cerita (Tanpa Emoji)
    if (this.dom.storyContent) {
      this.dom.storyContent.innerHTML = `
        <div class="story-box">
          <div class="story-header-row">
            <span class="icon-inline">${AppIcons.book}</span>
            <h4>${levelInfo.story.title}</h4>
          </div>
          <p style="margin-bottom: 12px; line-height: 1.6; color: var(--color-navy-muted);">${levelInfo.story.intro}</p>
          <div class="story-mission-callout">
            <div class="callout-header">
              <span class="icon-inline">${AppIcons.target}</span>
              <strong>Tujuan Misi:</strong>
            </div>
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
            <div class="materi-item-header">
              <span class="icon-inline">${AppIcons.academicCap}</span>
              <h5>${sec.heading}</h5>
            </div>
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

    // Mulai dengan simulasi interaktif manipulatif terlebih dahulu
    this.launchSimulationForLevel(this.currentLevelId);
  }

  launchSimulationForLevel(lvl) {
    const simBox = document.getElementById("simulation-interactive-stage");
    const questionStage = document.getElementById("standard-question-stage");

    if (simBox) simBox.style.display = "block";
    if (questionStage) questionStage.style.display = "none";

    if (lvl === 1) {
      this.simLevel1.startActivity(0);
    } else if (lvl === 2) {
      this.simLevel2.startActivity(0);
    } else if (lvl === 3) {
      this.simLevel3.startActivity(0);
    } else if (lvl === 4) {
      this.simFinalGate.start();
    }
  }

  recordSimulationAnswer(record) {
    this.currentScore += record.points || 10;
    this.userAnswers.push({
      questionId: record.activityId,
      questionText: record.name,
      selectedOptionId: "OK",
      selectedOptionText: "Tindakan Simulasi Tepat",
      isCorrect: true,
      explanation: record.explanation,
      points: record.points || 10,
      topic: this.getTopicForLevel(this.currentLevelId),
      indicator: record.name
    });

    if (this.dom.currentScoreDisplay) {
      this.dom.currentScoreDisplay.textContent = `${this.currentScore} Poin`;
    }
  }

  getTopicForLevel(lvl) {
    if (lvl === 1) return "identifikasi";
    if (lvl === 2) return "operasi";
    if (lvl === 3) return "cerita";
    return "senilai";
  }

  finishSimulationPart(lvl) {
    // Setelah simulasi selesai, beralih ke soal evaluasi pemahaman konseptual
    const simBox = document.getElementById("simulation-interactive-stage");
    const questionStage = document.getElementById("standard-question-stage");

    if (simBox) simBox.style.display = "none";
    if (questionStage) questionStage.style.display = "block";

    this.currentIndex = 0;
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const q = this.questions[this.currentIndex];
    if (!q) {
      this.finishLevel();
      return;
    }

    this.hasAnswered = false;

    if (this.dom.feedbackBox) {
      this.dom.feedbackBox.className = "feedback-box";
      this.dom.feedbackBox.style.display = "none";
    }

    if (this.dom.questionCounter) {
      this.dom.questionCounter.textContent = `Tantangan Konsep: ${this.currentIndex + 1} dari ${this.questions.length}`;
    }
    if (this.dom.currentScoreDisplay) {
      this.dom.currentScoreDisplay.textContent = `${this.currentScore} Poin`;
    }

    if (this.dom.questionIndicator) {
      this.dom.questionIndicator.textContent = `Indikator: ${q.indicator}`;
    }
    if (this.dom.questionText) {
      this.dom.questionText.textContent = q.question;
    }

    this.renderOptions(q);

    if (this.dom.btnNextQuestion) {
      this.dom.btnNextQuestion.style.display = "none";
      const isLast = this.currentIndex === this.questions.length - 1;
      this.dom.btnNextQuestion.innerHTML = isLast 
        ? `<span>Tuntaskan Wilayah Ini</span>` 
        : `<span>Lanjut ke Tantangan Berikutnya</span> ${AppIcons.arrowRight}`;
    }
  }

  renderOptions(q) {
    if (!this.dom.optionsGrid) return;
    this.dom.optionsGrid.innerHTML = "";

    q.options.forEach((opt) => {
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
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    const allOptionBtns = this.dom.optionsGrid.querySelectorAll(".option-btn");
    allOptionBtns.forEach(btn => btn.setAttribute("disabled", "true"));

    const isCorrect = !!selectedOpt.isCorrect;

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
      
      allOptionBtns.forEach(btn => {
        if (btn.getAttribute("data-opt-id") === q.options.find(o => o.isCorrect).id) {
          btn.classList.add("correct");
        }
      });

      this.showFeedback(false, q.explanation);
    }

    if (this.dom.currentScoreDisplay) {
      this.dom.currentScoreDisplay.textContent = `${this.currentScore} Poin`;
    }

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
          <span class="icon-inline">${AppIcons.checkCircle}</span>
          <span>Jawaban Tepat (+10 Poin)</span>
        </div>
        <div class="feedback-explanation">${explanation}</div>
      `;
    } else {
      this.dom.feedbackBox.className = "feedback-box incorrect animate-gentle-shake";
      this.dom.feedbackBox.innerHTML = `
        <div class="feedback-title">
          <span class="icon-inline">${AppIcons.help}</span>
          <span>Mari Kita Pahami Langkah Penyelesaiannya (+0 Poin)</span>
        </div>
        <div class="feedback-explanation">${explanation}</div>
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

    const result = gameStorage.updateLevelResult(this.currentLevelId, this.currentScore, this.userAnswers);
    const isPassed = result.passed;

    if (isPassed) {
      soundCtrl.playLevelPassed();
    }

    if (this.dom.levelResultContainer) {
      this.dom.levelResultContainer.innerHTML = `
        <div class="level-result-card animate-screen-enter">
          <img src="assets/images/character-guide.svg" alt="Niko" class="result-celebrate-img animate-float">
          <h3 class="result-status-title ${isPassed ? 'passed' : 'retry'}">
            ${isPassed ? 'Misi Wilayah Berhasil Dituntaskan' : 'Terus Berlatih, Ayo Coba Lagi'}
          </h3>
          <p style="font-weight: 800; color: var(--color-navy); margin-bottom: 12px; font-size: 1.15rem;">
            ${GAME_DATA.levels[this.currentLevelId].name}
          </p>

          <div class="result-score-circle">
            <span class="score-num">${this.currentScore}</span>
            <span class="score-max">Poin Diperoleh</span>
          </div>

          <p class="result-advice-text">
            ${isPassed 
              ? `Luar biasa! Skor yang kamu capai telah memenuhi syarat batas kelulusan minimal (70 poin). Jalur menuju wilayah berikutnya di Peta Dunia Numeria kini telah terbuka!`
              : `Kamu memperoleh skor ${this.currentScore} poin. Untuk membuka wilayah selanjutnya, dibutuhkan skor minimal 70 poin. Jangan berkecil hati, ayo pelajari kembali materinya dan ulangi tantangan ini!`
            }
          </p>

          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            ${isPassed 
              ? (this.currentLevelId === 4
                  ? `<button class="btn btn-accent btn-lg" id="btn-to-final-report">
                       <span>Buka Laporan Hasil Petualangan</span> ${AppIcons.arrowRight}
                     </button>`
                  : `<button class="btn btn-primary btn-lg" id="btn-return-map">
                       <span>Kembali ke Peta Dunia</span> ${AppIcons.map}
                     </button>`)
              : `<button class="btn btn-accent btn-lg" id="btn-retry-level">
                   <span>Ulangi Misi Wilayah Ini</span> ${AppIcons.reset}
                 </button>
                 <button class="btn btn-secondary btn-lg" id="btn-return-map">
                   <span>Kembali ke Peta</span> ${AppIcons.map}
                 </button>`
            }
          </div>
        </div>
      `;

      document.getElementById("btn-return-map")?.addEventListener("click", () => {
        soundCtrl.playClick();
        if (window.transitionMgr) {
          window.transitionMgr.triggerTransition("default", () => {
            window.appNav.showScreen("map");
          });
        } else {
          window.appNav.showScreen("map");
        }
      });

      document.getElementById("btn-retry-level")?.addEventListener("click", () => {
        soundCtrl.playClick();
        this.startLevel(this.currentLevelId);
      });

      document.getElementById("btn-to-final-report")?.addEventListener("click", () => {
        soundCtrl.playClick();
        if (window.transitionMgr) {
          window.transitionMgr.triggerTransition("results", () => {
            window.appNav.showScreen("final-results");
          });
        } else {
          window.appNav.showScreen("final-results");
        }
      });
    }
  }
}

const gameEngine = new GameEngine();
window.gameEngine = gameEngine;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
