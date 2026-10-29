/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Final Gate Multi-Puzzle Simulation: Gerbang Pengetahuan
 * 
 * 4 Tahap Pembuka Gerbang Kuno:
 * 1. Pecahkan Kode Rune (Penyederhanaan Pecahan Visual 9/12 = 3/4)
 * 2. Susun Jalur Batu Kristal (Urutan Menurun Terbesar ke Terkecil)
 * 3. Alirkan Inti Energi Pengetahuan (Penjumlahan Pecahan KPK)
 * 4. Pembukaan Gerbang Epik Menuju Puncak Petualangan
 */

class FinalGateSimulation {
  constructor(engine) {
    this.engine = engine;
    this.container = null;
    this.currentStage = 1;
  }

  init(containerEl) {
    this.container = containerEl;
  }

  start() {
    this.currentStage = 1;
    this.renderStage1();
  }

  // --- TAHAP 1: PECAHKAN KODE RUNE ---
  renderStage1() {
    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Akhir: Tahap 1 dari 3</div>
          <h3 class="sim-instruction-title">Pecahkan Kode Rune Kristal Gerbang</h3>
          <p class="sim-instruction-text">
            Pilar kiri gerbang memancarkan lempengan berpetak 12. Sebanyak <strong>9 petak bersinar keemasan (9/12)</strong>. Sederhanakan pecahan tersebut untuk membuka kunci pertama gerbang!
          </p>
        </div>

        <div class="gate-puzzle-stage">
          <div class="gate-rune-grid">
            ${Array.from({ length: 12 }).map((_, i) => `
              <div class="rune-tile ${i < 9 ? 'glowing' : ''}">
                <div class="tile-number">${i + 1}</div>
              </div>
            `).join("")}
          </div>

          <div class="rune-choice-group">
            <span style="font-weight: 800; color: var(--color-navy); display: block; margin-bottom: 8px;">
              Bentuk paling sederhana dari 9/12 adalah:
            </span>
            <div class="btn-group-rune">
              <button type="button" class="btn-rune-opt" data-ans="3/4">3/4 (Bagi 3 atas & bawah)</button>
              <button type="button" class="btn-rune-opt" data-ans="6/10">6/10</button>
              <button type="button" class="btn-rune-opt" data-ans="7/8">7/8</button>
              <button type="button" class="btn-rune-opt" data-ans="1/3">1/3</button>
            </div>
          </div>
        </div>

        <div class="sim-feedback-inline" id="gate-stage1-feedback" style="display: none;"></div>
      </div>
    `;

    const feedback = document.getElementById("gate-stage1-feedback");
    const buttons = this.container.querySelectorAll(".btn-rune-opt");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        soundCtrl.playClick();
        const ans = btn.getAttribute("data-ans");
        if (ans === "3/4") {
          soundCtrl.playCorrect();
          feedback.className = "sim-feedback-inline correct animate-correct";
          feedback.style.display = "block";
          feedback.innerHTML = `
            <strong>Kunci Kristal Pertama Terbuka! (+10 Poin)</strong><br>
            Benar! Pecahan 9/12 disederhanakan dengan membagi pembilang dan penyebut dengan angka 3: (9÷3)/(12÷3) = <strong>3/4</strong>.
          `;

          this.engine.recordSimulationAnswer({
            activityId: "GATE-ACT1",
            name: "Pecahkan Kode Rune Kristal",
            isCorrect: true,
            points: 10,
            explanation: "Menyederhanakan pecahan 9/12 menjadi 3/4."
          });

          buttons.forEach(b => b.setAttribute("disabled", "true"));
          setTimeout(() => this.renderStage2(), 1400);
        } else {
          soundCtrl.playWrong();
          feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
          feedback.style.display = "block";
          feedback.innerHTML = `
            <strong>Kode Belum Sesuai!</strong><br>
            Cari FPB dari 9 dan 12, yaitu 3. Bagi angka atas dan bawah dengan 3.
          `;
        }
      });
    });
  }

  // --- TAHAP 2: SUSUN JALUR KRISTAL (MENURUN) ---
  renderStage2() {
    const crystals = [
      { id: "c1", val: "2/6", num: 2 },
      { id: "c2", val: "5/6", num: 5 },
      { id: "c3", val: "1/6", num: 1 },
      { id: "c4", val: "4/6", num: 4 }
    ];

    let currentOrder = [...crystals];

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Akhir: Tahap 2 dari 3</div>
          <h3 class="sim-instruction-title">Susun Kristal Energi Gerbang (Urutan Menurun)</h3>
          <p class="sim-instruction-text">
            Pilar kedua membutuhkan aliran daya terarah. Susun 4 kristal energi berikut dari <strong>nilai TERBESAR hingga TERKECIL</strong>!
          </p>
        </div>

        <div class="gate-puzzle-stage">
          <p style="font-size: 0.9rem; color: var(--color-navy-muted); margin-bottom: 12px; font-weight: 700;">
            Klik dua kristal untuk saling menukar posisi urutan:
          </p>
          <div class="crystals-track" id="crystals-container"></div>
        </div>

        <div class="sim-feedback-inline" id="gate-stage2-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-crystals">
            <span>Uji Susunan Aliran Kristal</span>
          </button>
        </div>
      </div>
    `;

    const container = document.getElementById("crystals-container");
    const feedback = document.getElementById("gate-stage2-feedback");
    let selectedFirst = null;

    const render = () => {
      container.innerHTML = currentOrder.map((c, idx) => `
        <div class="crystal-card" data-index="${idx}" tabindex="0">
          <div class="crystal-order">${idx + 1}</div>
          <div class="crystal-symbol">${c.val}</div>
        </div>
      `).join("");

      const cards = container.querySelectorAll(".crystal-card");
      cards.forEach(card => {
        card.addEventListener("click", () => {
          soundCtrl.playClick();
          const idx = parseInt(card.getAttribute("data-index"), 10);
          if (selectedFirst === null) {
            selectedFirst = idx;
            card.classList.add("selected-crystal");
          } else {
            const temp = currentOrder[selectedFirst];
            currentOrder[selectedFirst] = currentOrder[idx];
            currentOrder[idx] = temp;
            selectedFirst = null;
            render();
          }
        });
      });
    };

    render();

    document.getElementById("btn-verify-crystals").addEventListener("click", () => {
      // Cek apakah urutan menurun: 5, 4, 2, 1
      const isDescending = currentOrder[0].num === 5 &&
                           currentOrder[1].num === 4 &&
                           currentOrder[2].num === 2 &&
                           currentOrder[3].num === 1;

      if (isDescending) {
        soundCtrl.playCorrect();
        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Aliran Kristal Kedua Menyala! (+10 Poin)</strong><br>
          Urutan pecahan dari terbesar ke terkecil: <strong>5/6 > 4/6 > 2/6 > 1/6</strong>. Pilar kanan gerbang kini aktif sempurna!
        `;

        this.engine.recordSimulationAnswer({
          activityId: "GATE-ACT2",
          name: "Susun Jalur Kristal Pengetahuan",
          isCorrect: true,
          points: 10,
          explanation: "Mengurutkan pecahan berpenyebut sama 5/6, 4/6, 2/6, 1/6 dari nilai terbesar ke terkecil."
        });

        document.getElementById("btn-verify-crystals").style.display = "none";
        setTimeout(() => this.renderStage3(), 1400);
      } else {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Urutan Aliran Masih Terbalik!</strong><br>
          Ingat: Petunjuk meminta urutan dari nilai <strong>TERBESAR</strong> ke terkecil (5/6 harus di posisi paling awal).
        `;
      }
    });
  }

  // --- TAHAP 3: ALIRKAN INTI ENERGI (KPK & PENJUMLAHAN) ---
  renderStage3() {
    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Akhir: Tahap 3 dari 3</div>
          <h3 class="sim-instruction-title">Penyatuan Inti Daya Pengetahuan: 1/3 + 3/6</h3>
          <p class="sim-instruction-text">
            Kekuatan pamungkas membutuhkan penggabungan dua aliran sihir: <strong>1/3 daya safir</strong> dan <strong>3/6 daya topas</strong>. Samakan penyebutnya dan hitung total daya untuk membuka pintu gerbang!
          </p>
        </div>

        <div class="gate-puzzle-stage">
          <div class="gate-core-animation">
            <div class="core-crystal-orb animate-pulse-glow">
              <span id="core-power-label">Daya Inti: Siap Diaktifkan</span>
            </div>
          </div>

          <div class="core-calculation-choices">
            <button type="button" class="btn-core-choice" data-ans="5/6">
              <strong>Ubah 1/3 menjadi 2/6:</strong> 2/6 + 3/6 = 5/6 Daya Gerbang
            </button>
            <button type="button" class="btn-core-choice" data-ans="4/9">
              <strong>Langsung jumlahkan atas dan bawah:</strong> (1+3)/(3+6) = 4/9
            </button>
            <button type="button" class="btn-core-choice" data-ans="4/6">
              <strong>Hasil perkiraan:</strong> 4/6 Daya Gerbang
            </button>
          </div>
        </div>

        <div class="sim-feedback-inline" id="gate-stage3-feedback" style="display: none;"></div>
      </div>
    `;

    const feedback = document.getElementById("gate-stage3-feedback");
    const buttons = this.container.querySelectorAll(".btn-core-choice");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        soundCtrl.playClick();
        const ans = btn.getAttribute("data-ans");
        if (ans === "5/6") {
          soundCtrl.playCorrect();
          feedback.className = "sim-feedback-inline correct animate-correct";
          feedback.style.display = "block";
          feedback.innerHTML = `
            <strong>Inti Pengetahuan Terisi Penuh! (+10 Poin)</strong><br>
            Perhitungan akurat: 1/3 senilai dengan 2/6. Maka 2/6 + 3/6 = <strong>5/6 Daya Gerbang</strong>. Seluruh gembok kuno telah terbuka!
          `;

          this.engine.recordSimulationAnswer({
            activityId: "GATE-ACT3",
            name: "Penyatuan Inti Daya Pengetahuan",
            isCorrect: true,
            points: 10,
            explanation: "1/3 + 3/6 = 2/6 + 3/6 = 5/6 daya."
          });

          buttons.forEach(b => b.setAttribute("disabled", "true"));
          setTimeout(() => this.triggerGrandGateOpening(), 1500);
        } else {
          soundCtrl.playWrong();
          feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
          feedback.style.display = "block";
          feedback.innerHTML = `
            <strong>Aliran Daya Belum Stabil!</strong><br>
            Ingat: Samakan penyebut 3 menjadi 6 terlebih dahulu sebelum menjumlahkannya.
          `;
        }
      });
    });
  }

  // --- TAHAP 4: PEMBUKAAN GERBANG EPIK ---
  triggerGrandGateOpening() {
    soundCtrl.playGateOpen();

    this.container.innerHTML = `
      <div class="sim-stage gate-open-spectacle animate-screen-enter">
        <div class="grand-gate-aura">
          <div class="light-ray-pillar"></div>
          <img src="assets/images/character-guide.svg" alt="Niko" class="hero-victory-img animate-float">
          <div class="gate-portal-burst"></div>
        </div>

        <h2 class="victory-gate-title">Gerbang Pengetahuan Terbuka Lebar!</h2>
        <p class="victory-gate-desc">
          Luar biasa! Berkat ketelitian dan pemahamanmu terhadap seluruh konsep pecahan, misteri kuno Dunia Numeria telah terpecahkan. Penduduk dari Lembah, Hutan, hingga Desa merayakan keberhasilanmu!
        </p>

        <div style="margin-top: 24px;">
          <button type="button" class="btn btn-accent btn-lg" id="btn-see-final-results">
            <span>Buka Laporan Hasil Petualangan</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById("btn-see-final-results").addEventListener("click", () => {
      soundCtrl.playClick();
      if (window.transitionMgr) {
        window.transitionMgr.triggerTransition("results", () => {
          if (window.appNav) {
            window.appNav.showScreen("final-results");
          }
        });
      } else {
        if (window.appNav) window.appNav.showScreen("final-results");
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FinalGateSimulation;
}
