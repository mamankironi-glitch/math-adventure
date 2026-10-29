/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Main Application Orchestrator
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Navigator Layar
  appNav.init();

  // 2. Inisialisasi Game Engine dengan mapping elemen DOM
  gameEngine.init({
    levelBadgeTag: document.getElementById("level-badge-tag"),
    levelTitle: document.getElementById("level-title"),
    levelSubtitle: document.getElementById("level-subtitle"),
    levelSceneryHeader: document.getElementById("level-scenery-header"),

    tabMateri: document.getElementById("tab-materi"),
    tabMisi: document.getElementById("tab-misi"),
    panelMateri: document.getElementById("panel-materi-content"),
    panelMisi: document.getElementById("panel-misi-content"),
    panelHasil: document.getElementById("panel-level-results"),

    storyContent: document.getElementById("story-container"),
    materiSections: document.getElementById("materi-sections-container"),

    questionCounter: document.getElementById("question-counter"),
    currentScoreDisplay: document.getElementById("current-score-display"),
    questionIndicator: document.getElementById("question-indicator"),
    questionText: document.getElementById("question-text"),
    interactiveVisualBox: document.getElementById("interactive-visual-box"),
    optionsGrid: document.getElementById("options-grid"),
    feedbackBox: document.getElementById("feedback-box"),
    btnNextQuestion: document.getElementById("btn-next-question"),
    levelResultContainer: document.getElementById("level-result-content")
  });

  // 3. Setup Alur Loading Screen Otomatis
  initLoadingSequence();

  // 4. Setup Landing Page Buttons
  initLandingEvents();

  // 5. Setup Player Identification Form
  initPlayerEvents();

  // 6. Setup Level Page Controls (Tabs, Tombol Misi, Next Question, dsb)
  initLevelControls();

  // 7. Setup Review Modal Close
  const closeReviewBtn = document.getElementById("btn-close-review-modal");
  if (closeReviewBtn) {
    closeReviewBtn.addEventListener("click", () => {
      appNav.closeReviewModal();
    });
  }
});

/**
 * Loading Screen Simpatik & Cepat
 */
function initLoadingSequence() {
  const loadingBar = document.getElementById("loading-progress-bar");
  const loadingStatus = document.getElementById("loading-status-label");
  const screenLoading = document.getElementById("screen-loading");

  let progress = 0;
  const stages = [
    { p: 25, label: "Membuka Gerbang Dunia Numeria..." },
    { p: 55, label: "Memuat Peta Petualangan 2D..." },
    { p: 85, label: "Mempersiapkan Bank Soal Pecahan Kelas V..." },
    { p: 100, label: "Selamat Datang di Math Adventure!" }
  ];

  let currentStage = 0;
  const interval = setInterval(() => {
    if (currentStage < stages.length) {
      const target = stages[currentStage];
      progress = target.p;
      if (loadingBar) loadingBar.style.width = `${progress}%`;
      if (loadingStatus) loadingStatus.textContent = target.label;
      currentStage++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        if (screenLoading) {
          screenLoading.style.opacity = "0";
          screenLoading.style.transition = "opacity 0.4s ease-out";
          setTimeout(() => {
            screenLoading.style.display = "none";
            appNav.showScreen("landing");
          }, 400);
        }
      }, 300);
    }
  }, 250);
}

/**
 * Event Handler Landing Page
 */
function initLandingEvents() {
  const btnStart = document.getElementById("btn-landing-start");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      const player = gameStorage.getPlayer();
      // Jika belum memasukkan nama atau masih default anonymous, tawarkan ke layar profil
      if (!player.name || player.name === "Penjelajah Cilik") {
        appNav.showScreen("player");
      } else {
        appNav.showScreen("map");
      }
    });
  }

  const btnHowToPlay = document.getElementById("btn-landing-how-to-play");
  if (btnHowToPlay) {
    btnHowToPlay.addEventListener("click", () => {
      appNav.tutorialCurrentStep = 0;
      appNav.renderTutorialStep();
      appNav.showScreen("tutorial");
    });
  }
}

/**
 * Event Handler Identitas Pemain
 */
function initPlayerEvents() {
  let selectedAvatar = "niko";

  // Avatar Options
  const avatarCards = document.querySelectorAll(".avatar-option");
  avatarCards.forEach(card => {
    card.addEventListener("click", () => {
      soundCtrl.playClick();
      avatarCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedAvatar = card.getAttribute("data-avatar");
    });
  });

  // Form Submit
  const playerForm = document.getElementById("player-form");
  if (playerForm) {
    playerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("player-name-input");
      const name = input ? input.value.trim() : "";

      if (!name) {
        alert("Silakan masukkan nama kamu atau pilih 'Lanjut Tanpa Nama'!");
        if (input) input.focus();
        return;
      }

      gameStorage.setPlayer(name, false, selectedAvatar);
      appNav.tutorialCurrentStep = 0;
      appNav.renderTutorialStep();
      appNav.showScreen("tutorial");
    });
  }

  // Tombol Lanjut Tanpa Nama (Anonim)
  const btnAnon = document.getElementById("btn-anon-continue");
  if (btnAnon) {
    btnAnon.addEventListener("click", () => {
      gameStorage.setPlayer("Penjelajah Cilik", true, selectedAvatar);
      appNav.tutorialCurrentStep = 0;
      appNav.renderTutorialStep();
      appNav.showScreen("tutorial");
    });
  }

  // Tombol Kembali ke Landing
  const btnBackLanding = document.getElementById("btn-player-back");
  if (btnBackLanding) {
    btnBackLanding.addEventListener("click", () => {
      appNav.showScreen("landing");
    });
  }
}

/**
 * Kontrol Layar Level (Tabs, Navigasi Soal)
 */
function initLevelControls() {
  const tabMateri = document.getElementById("tab-materi");
  if (tabMateri) {
    tabMateri.addEventListener("click", () => {
      soundCtrl.playClick();
      gameEngine.showMateriTab();
    });
  }

  const tabMisi = document.getElementById("tab-misi");
  if (tabMisi) {
    tabMisi.addEventListener("click", () => {
      soundCtrl.playClick();
      gameEngine.startMissionChallenge();
    });
  }

  const btnStartMisiFromMateri = document.getElementById("btn-start-mission-from-materi");
  if (btnStartMisiFromMateri) {
    btnStartMisiFromMateri.addEventListener("click", () => {
      soundCtrl.playClick();
      gameEngine.startMissionChallenge();
    });
  }

  const btnNext = document.getElementById("btn-next-question");
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      soundCtrl.playClick();
      gameEngine.nextQuestion();
    });
  }

  const btnBackMapFromLevel = document.getElementById("btn-back-to-map-from-level");
  if (btnBackMapFromLevel) {
    btnBackMapFromLevel.addEventListener("click", () => {
      soundCtrl.playClick();
      appNav.showScreen("map");
    });
  }
}
