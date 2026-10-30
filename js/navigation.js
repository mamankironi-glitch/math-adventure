/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Screen Navigator & Modal Controller (Upgraded Version)
 * 
 * - 100% Bebas Emoji (Menggunakan AppIcons SVG)
 * - Terintegrasi dengan TransitionManager untuk perpindahan atmosferik
 * - Pengaturan layout desktop responsif
 */

class AppNavigator {
  constructor() {
    this.currentScreenId = "loading";
    this.screens = {};
    this.tutorialCurrentStep = 0;
    this.tutorialTotalSteps = 4;
  }

  init() {
    document.querySelectorAll(".screen").forEach(el => {
      const id = el.id.replace("screen-", "");
      this.screens[id] = el;
    });

    this.initHeaderButtons();
    this.initTutorialEvents();
    this.initMapEvents();
  }

  showScreen(screenId, theme = null) {
    soundCtrl.playClick();

    const doSwitch = () => {
      if (this.screens[this.currentScreenId]) {
        this.screens[this.currentScreenId].classList.remove("active");
      }

      const target = this.screens[screenId];
      if (target) {
        this.currentScreenId = screenId;
        target.classList.add("active");
        target.classList.add("animate-screen-enter");
        setTimeout(() => target.classList.remove("animate-screen-enter"), 500);

        this.onScreenEnter(screenId);
      }

      // Pastikan posisi scroll langsung berada di bagian paling atas
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const appRoot = document.getElementById("app-root");
      if (appRoot) appRoot.scrollTop = 0;
      if (target) target.scrollTop = 0;
    };

    if (theme && window.transitionMgr) {
      window.transitionMgr.triggerTransition(theme, doSwitch);
    } else {
      doSwitch();
    }
  }

  onScreenEnter(screenId) {
    this.updateHeaderUI();

    if (screenId === "player") {
      const input = document.getElementById("player-name-input");
      if (input) {
        const player = gameStorage.getPlayer();
        input.value = (player.name && player.name !== "Penjelajah Cilik") ? player.name : "";
      }
    } else if (screenId === "map") {
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

    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.innerHTML = soundCtrl.soundEnabled 
        ? `${AppIcons.soundOn} <span>Suara: Nyala</span>` 
        : `${AppIcons.soundOff} <span>Suara: Senyap</span>`;
    }

    const helpBtn = document.getElementById("btn-header-help");
    if (helpBtn) {
      helpBtn.innerHTML = `${AppIcons.help} <span>Bantuan</span>`;
    }

    const resetBtn = document.getElementById("btn-header-reset");
    if (resetBtn) {
      resetBtn.innerHTML = `${AppIcons.reset} <span>Sesi Baru</span>`;
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
          ? `${AppIcons.soundOn} <span>Suara: Nyala</span>` 
          : `${AppIcons.soundOff} <span>Suara: Senyap</span>`;
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
          "Mulai sesi pemain baru?\nSkor dan jawaban saat ini akan diatur ulang untuk siswa berikutnya."
        );
        if (confirmReset) {
          this.resetSession();
        }
      });
    }
  }

  resetSession() {
    gameStorage.resetEntireSession();
    const nameInput = document.getElementById("player-name-input");
    if (nameInput) nameInput.value = "";
    this.showScreen("player");
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

        const themeMap = { "1": "valley", "2": "forest", "3": "village", "4": "gate" };
        this.showScreen("level", themeMap[levelId] || "default");
        gameEngine.startLevel(levelId);
      });
    }
  }

  updateWorldMap() {
    const summary = gameStorage.getOverallSummary();

    const totalScoreEl = document.getElementById("map-stat-score");
    if (totalScoreEl) totalScoreEl.textContent = `${summary.totalScore} Poin`;

    const completedLvlEl = document.getElementById("map-stat-levels");
    let completedCount = 0;
    for (let i = 1; i <= 4; i++) {
      if (gameStorage.state.levels[i] && gameStorage.state.levels[i].passed) {
        completedCount++;
      }
    }
    if (completedLvlEl) completedLvlEl.textContent = `${completedCount} dari 4 Wilayah Tuntas`;

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
          scoreTag.textContent = `Skor: ${score}`;
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
          <div style="background: var(--primary-blue-surface); border-left: 4px solid var(--primary-blue); padding: 12px 16px; border-radius: 6px;">
            <div style="font-weight: 800; color: var(--color-navy); margin-bottom: 4px;">Misi Penjelajah:</div>
            <div style="color: var(--color-navy-muted); font-size: 0.95rem;">${levelInfo.story.mission}</div>
          </div>
        `;
      }
      if (modalStatus) {
        const lvlData = gameStorage.state.levels[levelId];
        if (lvlData && lvlData.passed) {
          modalStatus.innerHTML = `<span style="color: var(--success-green); font-weight: 800; display: flex; align-items: center; gap: 6px;">${AppIcons.checkCircle} Wilayah Telah Selesai (Skor Terbaik: ${lvlData.score}/100)</span>`;
        } else {
          modalStatus.innerHTML = `<span style="color: var(--primary-blue); font-weight: 800; display: flex; align-items: center; gap: 6px;">${AppIcons.unlock} Wilayah Terbuka & Siap Dijelajahi</span>`;
        }
      }
      if (startBtn) {
        startBtn.style.display = "inline-flex";
        startBtn.setAttribute("data-level-id", levelId);
        startBtn.innerHTML = `<span>Masuk ke Wilayah</span> ${AppIcons.arrowRight}`;
      }
    } else {
      if (modalDesc) {
        modalDesc.innerHTML = `
          <div style="background: #FFFBEB; border: 2px solid var(--accent-yellow); padding: 20px; border-radius: 12px; text-align: center;">
            <div style="width: 48px; height: 48px; margin: 0 auto 10px; color: #92400E;">${AppIcons.lock}</div>
            <h4 style="color: #92400E; margin-bottom: 6px; font-size: 1.15rem;">Wilayah Masih Terkunci</h4>
            <p style="color: var(--color-navy); line-height: 1.5; font-size: 0.95rem;">
              Untuk membuka jalan menuju <strong>${levelInfo.name}</strong>, kamu harus menyelesaikan tantangan di wilayah sebelumnya dengan skor minimal <strong>70 poin</strong>.
            </p>
          </div>
        `;
      }
      if (modalStatus) {
        modalStatus.innerHTML = `<span style="color: var(--danger-red); font-weight: 700;">Syarat: Skor Minimal 70 di Wilayah ${levelId - 1}</span>`;
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

  // --- LOGIKA TUTORIAL STEPPER (Zero Emoji) ---
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
        title: "1. Eksplorasi Peta Dunia Numeria",
        desc: "Klik wilayah yang sudah terbuka pada peta untuk memulai petualangan. Ada 4 wilayah berjenjang: Lembah Penemuan, Hutan Tantangan, Desa Kehidupan, dan Gerbang Pengetahuan.",
        icon: AppIcons.map,
        label: "Peta Petualangan 2D Interaktif"
      },
      {
        title: "2. Cerita & Rangkuman Materi Pembelajaran",
        desc: "Setiap wilayah memiliki narasi penduduk yang membutuhkan bantuan Matematika. Baca rangkuman konsep dan pelajari contoh visual sebelum mulai mengerjakan tantangan.",
        icon: AppIcons.book,
        label: "Konsep Dasar & Contoh Visual Pecahan"
      },
      {
        title: "3. Variasi Simulasi, Puzzle, & Manipulatif",
        desc: "Aktivitas bukan sekadar kuis pilihan ganda. Kamu dapat memotong kue secara manipulatif, mengukur cairan ramuan herbal di gelas ukur, dan menggunting pita toko sesuai pesanan warga.",
        icon: AppIcons.target,
        label: "Pembelajaran Berbasis Simulasi Nyata"
      },
      {
        title: "4. Sistem Skor & Standar KKM 70 Poin",
        desc: "Setiap keberhasilan aksi bernilai 10 poin. Kamu harus meraih minimal skor 70 dari 100 untuk membuka wilayah berikutnya. Kamu dapat mengulang misi kapan saja untuk memperbaiki pemahaman.",
        icon: AppIcons.trophy,
        label: "Evaluasi Terbimbing & Ramah Anak"
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
    if (visualEl) {
      visualEl.innerHTML = `
        <div class="tutorial-icon-frame">${cur.icon}</div>
        <p style="font-weight: 800; color: var(--primary-blue); margin-top: 10px;">${cur.label}</p>
      `;
    }

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
      btnNext.innerHTML = this.tutorialCurrentStep === this.tutorialTotalSteps - 1 
        ? `<span>Mulai Menjelajah</span> ${AppIcons.arrowRight}` 
        : `<span>Lanjut</span> ${AppIcons.arrowRight}`;
    }
  }

  // --- RENDER HASIL PETUALANGAN AKHIR (Zero Emoji) ---
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
          <td>${totalQ > 0 ? `${correctCount} dari ${totalQ} Aktivitas Berhasil` : 'Belum Dikerjakan'}</td>
          <td><strong>${score}</strong> / ${maxLvlScore}</td>
          <td>
            <span style="font-weight: 800; color: ${passed ? 'var(--success-green)' : 'var(--warning-orange)'};">
              ${passed ? 'Memenuhi Standar' : (totalQ > 0 ? 'Perlu Penguatan' : '-')}
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
            <div style="font-weight: 800; color: #14532D; display: flex; align-items: center; gap: 6px;">
              ${AppIcons.checkCircle} ${m.topic}
            </div>
            <div style="color: var(--color-navy-muted); font-size: 0.88rem; margin-left: 26px;">${m.scoreText}</div>
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
            <div style="font-weight: 800; color: #78350F; display: flex; align-items: center; gap: 6px;">
              ${AppIcons.help} ${r.topic}
            </div>
            <div style="color: var(--color-navy-muted); font-size: 0.88rem; margin-left: 26px;">${r.scoreText}</div>
          </div>
        `;
      });
    } else {
      reviewHtml = `<p style="font-size: 0.9rem; color: #14532D; font-weight: 700;">Selamat! Seluruh kompetensi pecahan telah kamu kuasai dengan sangat baik.</p>`;
    }

    container.innerHTML = `
      <div class="report-header-banner">
        <div>
          <span class="report-badge">LAPORAN EVALUASI PEMBELAJARAN MATEMATIKA</span>
          <h2 class="report-title">Hasil Akhir Petualangan Numeria</h2>
          <p class="report-subtitle">Media Pembelajaran Pecahan Kelas V SD Muhammadiyah (Program KKN Teknologi Pendidikan)</p>
        </div>
        <div class="report-student-card">
          <img src="assets/images/character-${summary.avatar || 'guide'}.svg" alt="Avatar" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--primary-blue);">
          <div>
            <div style="font-size: 1.15rem; font-weight: 900; color: var(--color-navy);">${summary.playerName}</div>
            <div style="font-size: 0.85rem; color: var(--primary-blue); font-weight: 700;">Penjelajah Matematika Kelas V</div>
          </div>
        </div>
      </div>

      <div class="report-stats-grid">
        <div class="stat-box">
          <div class="stat-box-val">${summary.totalScore}</div>
          <div class="stat-box-lbl">Total Skor Petualangan</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-val" style="color: var(--success-green);">${summary.totalCorrect}</div>
          <div class="stat-box-lbl">Tindakan / Jawaban Tepat</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-val" style="color: var(--danger-red);">${summary.totalWrong}</div>
          <div class="stat-box-lbl">Perlu Pembahasan</div>
        </div>
        <div class="stat-box">
          <div class="stat-box-val" style="color: #92400E;">${summary.accuracyPercentage}%</div>
          <div class="stat-box-lbl">Persentase Ketepatan</div>
        </div>
      </div>

      <h3 class="report-section-title">
        ${AppIcons.target}
        <span>Rincian Hasil Setiap Wilayah Petualangan</span>
      </h3>
      <table class="level-breakdown-table">
        <thead>
          <tr>
            <th>Wilayah Petualangan</th>
            <th>Hasil Pengerjaan</th>
            <th>Skor Diperoleh</th>
            <th>Status Kelulusan</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <h3 class="report-section-title">
        ${AppIcons.academicCap}
        <span>Diagnosis Penguasaan Materi</span>
      </h3>
      <div class="topics-summary-grid">
        <div class="topic-list-card mastered">
          <h4>Materi yang Telah Dikuasai:</h4>
          ${masteredHtml}
        </div>
        <div class="topic-list-card review">
          <h4>Saran & Rekomendasi Belajar:</h4>
          ${reviewHtml}
        </div>
      </div>

      <div class="report-actions-row">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btn-show-detailed-review">
            ${AppIcons.search} <span>Lihat Pembahasan Lengkap</span>
          </button>
          <button class="btn btn-secondary" id="btn-print-report">
            ${AppIcons.print} <span>Cetak Laporan Penilaian (PDF)</span>
          </button>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-secondary" id="btn-back-to-map">
            ${AppIcons.map} <span>Kembali ke Peta</span>
          </button>
          <button class="btn btn-accent" id="btn-new-session">
            ${AppIcons.reset} <span>Mulai Sesi Siswa Baru</span>
          </button>
        </div>
      </div>
    `;

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

  openReviewModal(answers) {
    const modal = document.getElementById("review-modal");
    const container = document.getElementById("review-modal-content");
    if (!modal || !container) return;

    if (!answers || answers.length === 0) {
      container.innerHTML = `<p style="padding: 20px; text-align: center;">Belum ada aktivitas yang diselesaikan.</p>`;
    } else {
      let html = `<div style="display: flex; flex-direction: column; gap: 16px;">`;
      answers.forEach((ans, idx) => {
        html += `
          <div style="border: 2px solid ${ans.isCorrect ? 'var(--success-green)' : 'var(--accent-yellow)'}; border-radius: 12px; padding: 16px; background: ${ans.isCorrect ? 'var(--success-light)' : '#FFFBEB'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: var(--color-navy);">Aktivitas #${idx + 1} (${ans.indicator || 'Pecahan'})</strong>
              <span style="font-weight: 800; color: ${ans.isCorrect ? 'var(--success-green)' : '#92400E'}; display: flex; align-items: center; gap: 4px;">
                ${ans.isCorrect ? `${AppIcons.checkCircle} Tepat (+10 Poin)` : `${AppIcons.crossCircle} Perlu Penguatan (0 Poin)`}
              </span>
            </div>
            <p style="font-size: 0.95rem; margin-bottom: 8px; color: var(--color-navy);">${ans.questionText}</p>
            <div style="font-size: 0.9rem; margin-bottom: 6px;">
              <strong>Respons:</strong> ${ans.selectedOptionId}. ${ans.selectedOptionText}
            </div>
            <div style="font-size: 0.88rem; background: rgba(255,255,255,0.75); padding: 10px 14px; border-radius: 6px; line-height: 1.5; color: var(--color-navy-muted);">
              <strong>Pembahasan Matematis:</strong> ${ans.explanation}
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

const appNav = new AppNavigator();
window.appNav = appNav;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppNavigator;
}
