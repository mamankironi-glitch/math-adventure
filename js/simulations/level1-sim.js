/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Level 1 Simulation: Lembah Penemuan
 * 
 * 1. Puzzle Pemotong & Pembagi Kue/Pizza (Manipulatif Benda Konkret)
 * 2. Pasangkan Pecahan Visual & Simbolik (Interactive Card Matching)
 * 3. Jembatan Pecahan (Fraction Stepping Stones Sorting)
 */

class Level1Simulation {
  constructor(engine) {
    this.engine = engine;
    this.container = null;
    this.currentActivityIndex = 0;
  }

  init(containerEl) {
    this.container = containerEl;
  }

  startActivity(actIndex = 0) {
    this.currentActivityIndex = actIndex;
    if (actIndex === 0) {
      this.renderPizzaCutterPuzzle();
    } else if (actIndex === 1) {
      this.renderMatchingPuzzle();
    } else if (actIndex === 2) {
      this.renderBridgeSortingPuzzle();
    }
  }

  // =========================================================================
  // AKTIVITAS 1: PUZZLE PEMOTONG & PEMBAGI KUE/PIZZA
  // =========================================================================
  renderPizzaCutterPuzzle() {
    let currentCuts = 4;
    let selectedSlices = new Set();
    const targetCuts = 8;
    const targetSelected = 3;

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Manipulatif: Pembagian Benda Konkret</div>
          <h3 class="sim-instruction-title">Pesta Panen Gandum Lembah</h3>
          <p class="sim-instruction-text">
            Penduduk Lembah ingin membagi kue gandum bundar ini menjadi <strong>8 bagian sama besar</strong>, lalu mengambil <strong>3 bagian</strong> untuk diberikan kepada tamu pesta desa.
          </p>
        </div>

        <div class="sim-interactive-workspace">
          <!-- Kontrol Pemotong Slices -->
          <div class="sim-tools-row">
            <span class="sim-tools-label">Pilih Pembagian Potongan:</span>
            <div class="btn-group-segments">
              <button type="button" class="btn-segment" data-cuts="2">2 Bagian</button>
              <button type="button" class="btn-segment active" data-cuts="4">4 Bagian</button>
              <button type="button" class="btn-segment" data-cuts="6">6 Bagian</button>
              <button type="button" class="btn-segment" data-cuts="8">8 Bagian</button>
            </div>
          </div>

          <!-- Piring Kue & Kotak Pecahan Dinamis -->
          <div class="sim-manipulative-display">
            <div class="pizza-board" id="sim-pizza-board">
              <!-- Render SVG Pizza Dinamis -->
            </div>

            <!-- Kartu Pecahan Dinamis (Live Readout) -->
            <div class="fraction-readout-card">
              <div class="readout-title">Nilai Pecahan Bagian Terpilih:</div>
              <div class="dynamic-fraction-box">
                <span class="frac-num" id="live-numerator">0</span>
                <div class="frac-bar"></div>
                <span class="frac-den" id="live-denominator">4</span>
              </div>
              <div class="readout-caption">
                <div id="readout-num-label">Pembilang: 0 bagian diambil</div>
                <div id="readout-den-label">Penyebut: 4 total potongan sama besar</div>
              </div>
            </div>
          </div>

          <!-- Umpan Balik Tindakan -->
          <div class="sim-feedback-inline" id="pizza-feedback" style="display: none;"></div>

          <!-- Tombol Periksa -->
          <div class="sim-actions-footer">
            <button type="button" class="btn btn-primary btn-lg" id="btn-submit-pizza-cut">
              <span>Periksa Hasil Pembagian</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const pizzaBoard = document.getElementById("sim-pizza-board");
    const numEl = document.getElementById("live-numerator");
    const denEl = document.getElementById("live-denominator");
    const numLbl = document.getElementById("readout-num-label");
    const denLbl = document.getElementById("readout-den-label");
    const feedbackEl = document.getElementById("pizza-feedback");

    const updatePizzaSVG = () => {
      selectedSlices.clear();
      pizzaBoard.innerHTML = this.buildPizzaSVG(currentCuts, selectedSlices);
      updateReadout();
      attachSliceClickEvents();
    };

    const updateReadout = () => {
      numEl.textContent = selectedSlices.size;
      denEl.textContent = currentCuts;
      numLbl.textContent = `Pembilang (bagian diambil): ${selectedSlices.size}`;
      denLbl.textContent = `Penyebut (total potongan sama): ${currentCuts}`;
    };

    const attachSliceClickEvents = () => {
      const slices = pizzaBoard.querySelectorAll(".pizza-slice");
      slices.forEach(slice => {
        slice.addEventListener("click", () => {
          soundCtrl.playClick();
          const id = slice.getAttribute("data-slice-id");
          if (selectedSlices.has(id)) {
            selectedSlices.delete(id);
            slice.classList.remove("selected");
          } else {
            selectedSlices.add(id);
            slice.classList.add("selected");
          }
          updateReadout();
        });
      });
    };

    // Event listener pemilihan potongan
    const cutButtons = this.container.querySelectorAll(".btn-segment");
    cutButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        soundCtrl.playClick();
        cutButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCuts = parseInt(btn.getAttribute("data-cuts"), 10);
        updatePizzaSVG();
      });
    });

    updatePizzaSVG();

    // Verifikasi Jawaban
    document.getElementById("btn-submit-pizza-cut").addEventListener("click", () => {
      if (currentCuts !== targetCuts) {
        soundCtrl.playWrong();
        feedbackEl.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedbackEl.style.display = "block";
        feedbackEl.innerHTML = `
          <strong>Perhatikan Jumlah Potongan!</strong><br>
          Penduduk meminta kue dibagi menjadi <strong>8 bagian sama besar</strong>, tetapi saat ini kue baru dipotong menjadi <strong>${currentCuts} bagian</strong>. Silakan ubah tombol pembagian menjadi 8 bagian terlebih dahulu.
        `;
        return;
      }

      if (selectedSlices.size !== targetSelected) {
        soundCtrl.playWrong();
        feedbackEl.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedbackEl.style.display = "block";
        feedbackEl.innerHTML = `
          <strong>Jumlah Bagian Belum Sesuai!</strong><br>
          Kamu sudah membagi kue menjadi 8 bagian sama besar (Penyebut = 8). Sekarang klik <strong>3 potongan</strong> untuk dibagikan (Pembilang = 3). Saat ini kamu baru memilih <strong>${selectedSlices.size} bagian</strong>.
        `;
        return;
      }

      // Jawaban Tepat!
      soundCtrl.playCorrect();
      feedbackEl.className = "sim-feedback-inline correct animate-correct";
      feedbackEl.style.display = "block";
      feedbackEl.innerHTML = `
        <strong>Tindakan Sangat Tepat! (+10 Poin)</strong><br>
        Kue berhasil dipotong menjadi 8 bagian sama besar (Penyebut = 8) dan 3 bagian telah diambil untuk tamu (Pembilang = 3). Bentuk pecahannya adalah <strong>3/8</strong>.
      `;

      this.engine.recordSimulationAnswer({
        activityId: "L1-ACT1",
        name: "Puzzle Pembagian Benda Konkret",
        isCorrect: true,
        points: 10,
        explanation: "Membagi objek menjadi 8 potongan sama besar (penyebut = 8) dan memilih 3 potongan (pembilang = 3) menghasilkan pecahan 3/8."
      });

      document.getElementById("btn-submit-pizza-cut").style.display = "none";
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn btn-accent btn-lg";
      nextBtn.innerHTML = `<span>Lanjut ke Aktivitas Berikutnya</span>`;
      nextBtn.addEventListener("click", () => {
        soundCtrl.playClick();
        this.startActivity(1);
      });
      document.querySelector(".sim-actions-footer").appendChild(nextBtn);
    });
  }

  buildPizzaSVG(slices, selectedSet) {
    let paths = "";
    const cx = 140, cy = 140, r = 120;
    const angleStep = (2 * Math.PI) / slices;

    for (let i = 0; i < slices; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = (i + 1) * angleStep - Math.PI / 2;

      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
      const isSel = selectedSet.has(String(i));

      paths += `
        <path class="pizza-slice ${isSel ? 'selected' : ''}" data-slice-id="${i}" d="${d}" fill="${isSel ? '#FFC220' : '#FDE047'}" stroke="#041E42" stroke-width="2.5">
          <title>Potongan ${i + 1}</title>
        </path>
      `;
    }

    return `
      <svg viewBox="0 0 280 280" class="svg-manipulative">
        <!-- Crust Rim -->
        <circle cx="140" cy="140" r="128" fill="#B45309" stroke="#041E42" stroke-width="3"/>
        ${paths}
        <!-- Center Knob -->
        <circle cx="140" cy="140" r="10" fill="#92400E"/>
      </svg>
    `;
  }

  // =========================================================================
  // AKTIVITAS 2: PASANGKAN PECAHAN VISUAL & SIMBOLIK
  // =========================================================================
  renderMatchingPuzzle() {
    const pairs = [
      { id: "p1", symbol: "1/2", label: "Setengah Bagian", shaded: 2, total: 4 },
      { id: "p2", symbol: "3/4", label: "Tiga Perempat Bagian", shaded: 3, total: 4 },
      { id: "p3", symbol: "2/5", label: "Dua Perlima Bagian", shaded: 2, total: 5 }
    ];

    let selectedDiagram = null;
    let selectedSymbol = null;
    let matchedPairs = new Set();

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Menjodohkan: Representasi Visual & Simbolik</div>
          <h3 class="sim-instruction-title">Pasangkan Gambar Daerah Berarsir dengan Lambang Pecahan</h3>
          <p class="sim-instruction-text">
            Klik salah satu <strong>kartu gambar berarsir</strong> di kolom kiri, lalu klik <strong>lambang pecahan</strong> yang sesuai di kolom kanan untuk memasangkannya.
          </p>
        </div>

        <div class="matching-grid-wrapper">
          <!-- Kolom Kiri: Visual Diagrams -->
          <div class="matching-column" id="diagram-column">
            <h4 class="matching-col-title">Representasi Gambar Daerah</h4>
            ${pairs.map(p => `
              <div class="match-card match-diagram" data-pair-id="${p.id}" tabindex="0">
                <div class="match-diagram-svg">
                  ${this.buildBarDiagramSVG(p.shaded, p.total)}
                </div>
                <div class="match-card-label">${p.label}</div>
              </div>
            `).join("")}
          </div>

          <!-- Kolom Kanan: Symbolic Cards (Acak) -->
          <div class="matching-column" id="symbol-column">
            <h4 class="matching-col-title">Lambang Pecahan</h4>
            ${[pairs[1], pairs[0], pairs[2]].map(p => `
              <div class="match-card match-symbol" data-pair-id="${p.id}" tabindex="0">
                <div class="match-symbol-text">${p.symbol}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="sim-feedback-inline" id="match-feedback" style="display: none;"></div>

        <div class="sim-actions-footer" id="match-actions" style="display: none;">
          <button type="button" class="btn btn-accent btn-lg" id="btn-next-to-bridge">
            <span>Lanjut ke Tantangan Jembatan Pecahan</span>
          </button>
        </div>
      </div>
    `;

    const diagramCards = this.container.querySelectorAll(".match-diagram");
    const symbolCards = this.container.querySelectorAll(".match-symbol");
    const feedback = document.getElementById("match-feedback");
    const actions = document.getElementById("match-actions");

    const checkMatch = () => {
      if (!selectedDiagram || !selectedSymbol) return;

      const dId = selectedDiagram.getAttribute("data-pair-id");
      const sId = selectedSymbol.getAttribute("data-pair-id");

      if (dId === sId) {
        soundCtrl.playCorrect();
        matchedPairs.add(dId);

        selectedDiagram.classList.add("matched");
        selectedSymbol.classList.add("matched");
        selectedDiagram.classList.remove("selected");
        selectedSymbol.classList.remove("selected");

        selectedDiagram = null;
        selectedSymbol = null;

        if (matchedPairs.size === pairs.length) {
          feedback.className = "sim-feedback-inline correct animate-correct";
          feedback.style.display = "block";
          feedback.innerHTML = `
            <strong>Semua Pasangan Tepat! (+10 Poin)</strong><br>
            Kamu berhasil memasangkan seluruh representasi visual dengan simbol pecahannya secara akurat.
          `;

          this.engine.recordSimulationAnswer({
            activityId: "L1-ACT2",
            name: "Pasangkan Pecahan Visual & Simbolik",
            isCorrect: true,
            points: 10,
            explanation: "Memasangkan daerah berarsir dengan nilai pecahan simbolik 1/2, 3/4, dan 2/5."
          });

          actions.style.display = "flex";
          document.getElementById("btn-next-to-bridge").addEventListener("click", () => {
            soundCtrl.playClick();
            this.startActivity(2);
          });
        }
      } else {
        soundCtrl.playWrong();
        selectedDiagram.classList.add("mismatch");
        selectedSymbol.classList.add("mismatch");

        setTimeout(() => {
          selectedDiagram.classList.remove("selected", "mismatch");
          selectedSymbol.classList.remove("selected", "mismatch");
          selectedDiagram = null;
          selectedSymbol = null;
        }, 600);
      }
    };

    diagramCards.forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("matched")) return;
        soundCtrl.playClick();
        diagramCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedDiagram = card;
        checkMatch();
      });
    });

    symbolCards.forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("matched")) return;
        soundCtrl.playClick();
        symbolCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedSymbol = card;
        checkMatch();
      });
    });
  }

  buildBarDiagramSVG(shaded, total) {
    let rects = "";
    const w = 180 / total;
    for (let i = 0; i < total; i++) {
      const isShaded = i < shaded;
      rects += `
        <rect x="${i * w}" y="0" width="${w}" height="36" fill="${isShaded ? '#0071CE' : '#FFFFFF'}" stroke="#041E42" stroke-width="2"/>
      `;
    }
    return `
      <svg viewBox="0 0 180 36" width="180" height="36">
        ${rects}
      </svg>
    `;
  }

  // =========================================================================
  // AKTIVITAS 3: JEMBATAN PECAHAN (FRACTION BRIDGE BUILDER)
  // =========================================================================
  renderBridgeSortingPuzzle() {
    const originalStones = [
      { id: "s1", val: "7/9", num: 7 },
      { id: "s2", val: "1/9", num: 1 },
      { id: "s3", val: "4/9", num: 4 },
      { id: "s4", val: "2/9", num: 2 }
    ];

    let currentOrder = [...originalStones];

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Pemecahan Masalah: Jembatan Pecahan</div>
          <h3 class="sim-instruction-title">Susun Batu Pijakan Sungai Menyeberang</h3>
          <p class="sim-instruction-text">
            Niko harus menyeberangi Sungai Kristal Lembah. Susun batu pijakan pecahan di bawah ini mulai dari <strong>nilai terkecil hingga terbesar</strong> agar jembatan kokoh dan dapat dilalui.
          </p>
        </div>

        <div class="river-bridge-scene">
          <div class="bridge-instruction-tag">Klik dua kartu batu untuk saling menukar posisi:</div>

          <div class="stones-track" id="stones-container">
            <!-- Kartu Batu Pijakan -->
          </div>
        </div>

        <div class="sim-feedback-inline" id="bridge-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-bridge">
            <span>Uji Susunan Jembatan</span>
          </button>
        </div>
      </div>
    `;

    const stonesContainer = document.getElementById("stones-container");
    const feedback = document.getElementById("bridge-feedback");
    let selectedFirst = null;

    const renderStones = () => {
      stonesContainer.innerHTML = currentOrder.map((s, idx) => `
        <div class="stepping-stone-card" data-index="${idx}" tabindex="0">
          <div class="stone-order-badge">${idx + 1}</div>
          <div class="stone-fraction-val">${s.val}</div>
        </div>
      `).join("");

      const cards = stonesContainer.querySelectorAll(".stepping-stone-card");
      cards.forEach(card => {
        card.addEventListener("click", () => {
          soundCtrl.playClick();
          const idx = parseInt(card.getAttribute("data-index"), 10);
          if (selectedFirst === null) {
            selectedFirst = idx;
            card.classList.add("selected-stone");
          } else {
            // Tukar posisi
            const temp = currentOrder[selectedFirst];
            currentOrder[selectedFirst] = currentOrder[idx];
            currentOrder[idx] = temp;
            selectedFirst = null;
            renderStones();
          }
        });
      });
    };

    renderStones();

    document.getElementById("btn-verify-bridge").addEventListener("click", () => {
      const isCorrectOrder = currentOrder.every((s, i) => {
        if (i === 0) return true;
        return s.num >= currentOrder[i - 1].num;
      });

      if (isCorrectOrder) {
        soundCtrl.playCorrect();
        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Jembatan Berhasil Tersusun Sempurna! (+10 Poin)</strong><br>
          Urutan pecahan dari terkecil ke terbesar adalah <strong>1/9 < 2/9 < 4/9 < 7/9</strong>. Jembatan kokoh dan Niko berhasil menyeberangi sungai!
        `;

        this.engine.recordSimulationAnswer({
          activityId: "L1-ACT3",
          name: "Jembatan Pecahan Lembah",
          isCorrect: true,
          points: 10,
          explanation: "Mengurutkan pecahan berpenyebut sama 1/9, 2/9, 4/9, 7/9 dari nilai terkecil ke terbesar."
        });

        document.getElementById("btn-verify-bridge").style.display = "none";
        const completeLevelBtn = document.createElement("button");
        completeLevelBtn.className = "btn btn-accent btn-lg";
        completeLevelBtn.innerHTML = `<span>Lanjut ke Evaluasi Konsep Wilayah</span>`;
        completeLevelBtn.addEventListener("click", () => {
          soundCtrl.playClick();
          this.engine.finishSimulationPart(1);
        });
        document.querySelector(".sim-actions-footer").appendChild(completeLevelBtn);
      } else {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Susunan Batu Belum Tepat!</strong><br>
          Jembatan masih goyah. Ingat: karena seluruh penyebutnya sama (9), bandingkan nilai pembilangnya dari angka terkecil ke terbesar. Klik dua batu untuk menukar posisinya kembali.
        `;
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Level1Simulation;
}
