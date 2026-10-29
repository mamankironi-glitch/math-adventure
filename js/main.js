/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Main Application Orchestrator (Upgraded Version)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Transisi & Navigasi
  if (window.transitionMgr) {
    window.transitionMgr.init();
  }
  appNav.init();

  // 2. Inisialisasi Game Engine & Simulasi Manipulatif
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

  // 3. Jalankan Bumper Pembuka Sinematik yang Menyatu dengan Loading Screen
  if (window.bumperEngine) {
    window.bumperEngine.init();
    window.bumperEngine.start();
  }

  // 4. Setup Event Listeners Halaman Utama
  initLandingEvents();
  initPlayerEvents();
  initLevelControls();

  // 5. Setup Modal Pembahasan Lengkap
  const closeReviewBtn = document.getElementById("btn-close-review-modal");
  if (closeReviewBtn) {
    closeReviewBtn.addEventListener("click", () => {
      appNav.closeReviewModal();
    });
  }
});

function initLandingEvents() {
  const btnStart = document.getElementById("btn-landing-start");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      const player = gameStorage.getPlayer();
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

function initPlayerEvents() {
  let selectedAvatar = "niko";

  const avatarCards = document.querySelectorAll(".avatar-option");
  avatarCards.forEach(card => {
    card.addEventListener("click", () => {
      soundCtrl.playClick();
      avatarCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedAvatar = card.getAttribute("data-avatar");
    });
  });

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

  const btnAnon = document.getElementById("btn-anon-continue");
  if (btnAnon) {
    btnAnon.addEventListener("click", () => {
      gameStorage.setPlayer("Penjelajah Cilik", true, selectedAvatar);
      appNav.tutorialCurrentStep = 0;
      appNav.renderTutorialStep();
      appNav.showScreen("tutorial");
    });
  }

  const btnBackLanding = document.getElementById("btn-player-back");
  if (btnBackLanding) {
    btnBackLanding.addEventListener("click", () => {
      appNav.showScreen("landing");
    });
  }
}

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
      if (window.transitionMgr) {
        window.transitionMgr.triggerTransition("default", () => {
          appNav.showScreen("map");
        });
      } else {
        appNav.showScreen("map");
      }
    });
  }
}
