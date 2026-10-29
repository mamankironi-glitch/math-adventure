/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Cinematic Opening Bumper & Integrated Loading Engine
 * 
 * Pengalaman pembuka 5 adegan sinematik:
 * 1. Lanskap Dunia Numeria perlahan tampak
 * 2. Gerakan lingkungan (awan, pepohonan, pendar cahaya matahari)
 * 3. Kemunculan karakter penjelajah Niko secara dinamis
 * 4. Kemunculan lambang Math Adventure & judul Dunia Numeria
 * 5. Indikator pemuatan anggun & transisi halus menuju Landing Page
 * 
 * Durasi target: 6-8 detik (kunjungan awal), dengan fitur lewati dan memori sesi.
 */

class BumperEngine {
  constructor() {
    this.hasSeenBumper = false;
    this.timer = null;
    this.progressInterval = null;
    this.currentStep = 0;
    this.totalDurationMs = 7200; // ~7.2 detik pengalaman sinematik
  }

  init() {
    this.hasSeenBumper = sessionStorage.getItem("NUMERIA_SEEN_BUMPER") === "true";
    this.dom = {
      bumper: document.getElementById("screen-loading"),
      sceneLandscape: document.getElementById("bumper-scene-landscape"),
      sceneEnvironment: document.getElementById("bumper-scene-environment"),
      sceneCharacter: document.getElementById("bumper-scene-character"),
      sceneLogo: document.getElementById("bumper-scene-logo"),
      sceneProgress: document.getElementById("bumper-scene-progress"),
      progressBar: document.getElementById("loading-progress-bar"),
      statusLabel: document.getElementById("loading-status-label"),
      btnSkip: document.getElementById("btn-skip-bumper")
    };

    if (this.dom.btnSkip) {
      this.dom.btnSkip.addEventListener("click", () => this.skipBumper());
    }
  }

  start() {
    // Jika sudah pernah melihat bumper dalam sesi yang sama, percepat pemuatan (~1.2 detik)
    if (this.hasSeenBumper) {
      this.runFastLoad();
      return;
    }

    this.runCinematicSequence();
  }

  runCinematicSequence() {
    const d = this.dom;
    if (!d.bumper) return;

    // Tahap 1 (0s): Lanskap Mulai Muncul
    if (d.statusLabel) d.statusLabel.textContent = "Menyingkap Lanskap Dunia Numeria...";
    if (d.sceneLandscape) d.sceneLandscape.classList.add("visible");
    this.animateProgress(0, 20, 1600);

    // Tahap 2 (1.6s): Elemen Lingkungan Bergerak
    setTimeout(() => {
      if (this.isFinished) return;
      if (d.statusLabel) d.statusLabel.textContent = "Angin Lembah Berhembus di Padang Numeria...";
      if (d.sceneEnvironment) d.sceneEnvironment.classList.add("visible");
      this.animateProgress(20, 45, 1600);
    }, 1600);

    // Tahap 3 (3.2s): Karakter Penjelajah Hadir
    setTimeout(() => {
      if (this.isFinished) return;
      if (d.statusLabel) d.statusLabel.textContent = "Niko si Penjelajah Mempersiapkan Perjalanan...";
      if (d.sceneCharacter) d.sceneCharacter.classList.add("visible");
      this.animateProgress(45, 70, 1600);
    }, 3200);

    // Tahap 4 (4.8s): Lambang Math Adventure Berpendar
    setTimeout(() => {
      if (this.isFinished) return;
      if (d.statusLabel) d.statusLabel.textContent = "Gerbang Petualangan Matematika Terbuka!";
      if (d.sceneLogo) d.sceneLogo.classList.add("visible");
      this.animateProgress(70, 95, 1600);
    }, 4800);

    // Tahap 5 (6.4s): Selesai & Transisi ke Landing Page
    setTimeout(() => {
      if (this.isFinished) return;
      this.animateProgress(95, 100, 700);
      if (d.statusLabel) d.statusLabel.textContent = "Selamat Datang di Dunia Numeria";
      setTimeout(() => this.finish(), 800);
    }, 6400);
  }

  runFastLoad() {
    const d = this.dom;
    if (d.statusLabel) d.statusLabel.textContent = "Memuat Petualangan Numeria...";
    if (d.sceneLandscape) d.sceneLandscape.classList.add("visible");
    if (d.sceneLogo) d.sceneLogo.classList.add("visible");
    if (d.sceneCharacter) d.sceneCharacter.classList.add("visible");

    this.animateProgress(0, 100, 1100);
    setTimeout(() => this.finish(), 1200);
  }

  animateProgress(from, to, duration) {
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.round(from + (to - from) * progress);
      if (this.dom.progressBar) {
        this.dom.progressBar.style.width = `${val}%`;
      }
      if (progress < 1 && !this.isFinished) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }

  skipBumper() {
    this.isFinished = true;
    if (this.dom.progressBar) this.dom.progressBar.style.width = "100%";
    if (this.dom.statusLabel) this.dom.statusLabel.textContent = "Memulai Permainan...";
    this.finish();
  }

  finish() {
    this.isFinished = true;
    sessionStorage.setItem("NUMERIA_SEEN_BUMPER", "true");
    this.hasSeenBumper = true;

    if (this.dom.bumper) {
      this.dom.bumper.classList.add("fade-out");
      setTimeout(() => {
        this.dom.bumper.style.display = "none";
        this.dom.bumper.classList.remove("active", "fade-out");
        if (window.appNav) {
          window.appNav.showScreen("landing");
        }
      }, 500);
    }
  }
}

const bumperEngine = new BumperEngine();
window.bumperEngine = bumperEngine;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BumperEngine;
}
