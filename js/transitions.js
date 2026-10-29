/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Thematic Scene Transition Controller
 * 
 * Mengelola transisi atmosferik antar wilayah:
 * - Lembah Penemuan: Pergeseran lanskap hijau & siluet bukit
 * - Hutan Tantangan: Bayangan kanopi rimbun & pendar dedaunan
 * - Desa Kehidupan: Sapuan jalan batu & fasad toko desa
 * - Gerbang Pengetahuan: Pendar kosmik biru laut & kristal keemasan
 * - Hasil Petualangan: Tirai keemasan penutup misi
 */

class TransitionManager {
  constructor() {
    this.isTransitioning = false;
    this.overlay = null;
  }

  init() {
    this.overlay = document.getElementById("thematic-transition-overlay");
  }

  triggerTransition(themeName, callback) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    if (!this.overlay) {
      if (callback) callback();
      this.isTransitioning = false;
      return;
    }

    // Set tema visual transisi
    this.overlay.className = "transition-overlay active theme-" + (themeName || "default");
    
    // Tampilkan grafis tematik
    const titleEl = document.getElementById("transition-theme-title");
    const subEl = document.getElementById("transition-theme-sub");

    const themes = {
      valley: { title: "Menuju Lembah Penemuan", sub: "Padang Rumput & Musim Panen Pecahan" },
      forest: { title: "Memasuki Hutan Tantangan", sub: "Laboratorium Herbal & Mata Air Kristal" },
      village: { title: "Tiba di Desa Kehidupan", sub: "Pasar Warga & Toko Pengukuran" },
      gate: { title: "Mendekati Gerbang Pengetahuan", sub: "Puncak Portal Kristal Kebijaksanaan" },
      results: { title: "Merangkum Hasil Petualangan", sub: "Laporan Evaluasi Pembelajaran" },
      default: { title: "Dunia Numeria", sub: "Melanjutkan Perjalanan..." }
    };

    const cur = themes[themeName] || themes.default;
    if (titleEl) titleEl.textContent = cur.title;
    if (subEl) subEl.textContent = cur.sub;

    // Transisi masuk (fase gelap/tertutup)
    setTimeout(() => {
      if (callback) callback();

      // Transisi keluar (membuka layar baru)
      setTimeout(() => {
        this.overlay.classList.add("fade-out");
        setTimeout(() => {
          this.overlay.className = "transition-overlay";
          this.isTransitioning = false;
        }, 400);
      }, 450);
    }, 450);
  }
}

const transitionMgr = new TransitionManager();
window.transitionMgr = transitionMgr;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TransitionManager;
}
