/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Level 2 Simulation: Hutan Tantangan
 * 
 * 1. Simulasi Meja Takaran Ramuan Herbal (Gelas Ukur Bergraduasi Pecahan)
 * 2. Susun Langkah Perhitungan KPK (Operasi Pecahan Penyebut Beda)
 * 3. Perbaiki Takaran yang Salah (Spot & Fix Math Error)
 */

class Level2Simulation {
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
      this.renderPotionFlaskSimulation();
    } else if (actIndex === 1) {
      this.renderStepSequencingPuzzle();
    } else if (actIndex === 2) {
      this.renderFixTheRecipePuzzle();
    }
  }

  // =========================================================================
  // AKTIVITAS 1: SIMULASI MEJA TAKARAN RAMUAN HERBAL
  // =========================================================================
  renderPotionFlaskSimulation() {
    let pouredLiquidA = 0; // 2/5 liter (40%)
    let pouredLiquidB = 0; // 1/5 liter (20%)
    const targetA = 2; // 2 per lima
    const targetB = 1; // 1 per lima
    const totalDen = 5;

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Simulasi Laboratorium: Takaran Ramuan Hutan</div>
          <h3 class="sim-instruction-title">Meracik Ramuan Penyegar Pohon Purba</h3>
          <p class="sim-instruction-text">
            Resep ramuan membutuhkan <strong>2/5 liter Ekstrak Daun Mint</strong> dan tambahan <strong>1/5 liter Madu Hutan</strong>. Tuangkan kedua bahan tersebut ke dalam tabung ukur kaca bergraduasi, lalu amati hasil penggabungannya.
          </p>
        </div>

        <div class="flask-lab-stage">
          <!-- Rak Botol Bahan -->
          <div class="potion-bottles-rack">
            <h4 class="rack-title">Persediaan Bahan Ramuan:</h4>
            
            <div class="potion-bottle-card" id="bottle-mint">
              <div class="bottle-liquid-color mint-liquid"></div>
              <div class="bottle-info">
                <strong>Ekstrak Daun Mint</strong>
                <span class="bottle-vol">Takaran: 2/5 Liter</span>
              </div>
              <button type="button" class="btn btn-primary btn-sm btn-pour" id="btn-pour-mint">
                Tuang 2/5 L
              </button>
            </div>

            <div class="potion-bottle-card" id="bottle-honey">
              <div class="bottle-liquid-color honey-liquid"></div>
              <div class="bottle-info">
                <strong>Madu Hutan</strong>
                <span class="bottle-vol">Takaran: 1/5 Liter</span>
              </div>
              <button type="button" class="btn btn-primary btn-sm btn-pour" id="btn-pour-honey">
                Tuang 1/5 L
              </button>
            </div>

            <button type="button" class="btn btn-secondary btn-sm" id="btn-empty-flask" style="margin-top: 10px;">
              Kosongkan Tabung
            </button>
          </div>

          <!-- Tabung Ukur Kaca Bergraduasi Pecahan -->
          <div class="measuring-cylinder-container">
            <div class="cylinder-glass">
              <!-- Graduasi Garis Pecahan -->
              <div class="cylinder-ticks">
                <span class="tick-mark" style="bottom: 100%;"><strong>5/5 L</strong> (1 Liter Utuh)</span>
                <span class="tick-mark" style="bottom: 80%;">4/5 L</span>
                <span class="tick-mark" style="bottom: 60%;">3/5 L</span>
                <span class="tick-mark" style="bottom: 40%;">2/5 L</span>
                <span class="tick-mark" style="bottom: 20%;">1/5 L</span>
                <span class="tick-mark" style="bottom: 0%;">0 L</span>
              </div>

              <!-- Lapisan Cairan di Dalam Tabung -->
              <div class="cylinder-liquid-fill" id="flask-fill-a" style="height: 0%; background: #10B981;"></div>
              <div class="cylinder-liquid-fill" id="flask-fill-b" style="height: 0%; bottom: 0%; background: #FFC220;"></div>
            </div>

            <div class="cylinder-base"></div>
            <div class="cylinder-total-badge" id="cylinder-total-label">Isi Tabung: 0 Liter</div>
          </div>
        </div>

        <div class="sim-feedback-inline" id="potion-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-potion">
            <span>Konfirmasi Takaran Ramuan</span>
          </button>
        </div>
      </div>
    `;

    const fillA = document.getElementById("flask-fill-a");
    const fillB = document.getElementById("flask-fill-b");
    const totalLbl = document.getElementById("cylinder-total-label");
    const feedback = document.getElementById("potion-feedback");
    const btnMint = document.getElementById("btn-pour-mint");
    const btnHoney = document.getElementById("btn-pour-honey");

    const updateFlask = () => {
      const hA = (pouredLiquidA / totalDen) * 100;
      const hB = (pouredLiquidB / totalDen) * 100;

      fillA.style.height = `${hA}%`;
      fillB.style.height = `${hB}%`;
      fillB.style.bottom = `${hA}%`;

      const sum = pouredLiquidA + pouredLiquidB;
      totalLbl.textContent = sum > 0 ? `Isi Tabung: ${sum}/5 Liter` : "Isi Tabung: 0 Liter";
    };

    btnMint.addEventListener("click", () => {
      if (pouredLiquidA > 0) return;
      soundCtrl.playClick();
      pouredLiquidA = targetA;
      btnMint.setAttribute("disabled", "true");
      btnMint.textContent = "Sudah Dituang";
      updateFlask();
    });

    btnHoney.addEventListener("click", () => {
      if (pouredLiquidB > 0) return;
      soundCtrl.playClick();
      pouredLiquidB = targetB;
      btnHoney.setAttribute("disabled", "true");
      btnHoney.textContent = "Sudah Dituang";
      updateFlask();
    });

    document.getElementById("btn-empty-flask").addEventListener("click", () => {
      soundCtrl.playClick();
      pouredLiquidA = 0;
      pouredLiquidB = 0;
      btnMint.removeAttribute("disabled");
      btnMint.textContent = "Tuang 2/5 L";
      btnHoney.removeAttribute("disabled");
      btnHoney.textContent = "Tuang 1/5 L";
      updateFlask();
    });

    document.getElementById("btn-verify-potion").addEventListener("click", () => {
      if (pouredLiquidA !== targetA || pouredLiquidB !== targetB) {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Takaran Belum Lengkap!</strong><br>
          Resep ramuan memerlukan kedua bahan dituangkan: 2/5 liter Ekstrak Daun Mint dan 1/5 liter Madu Hutan. Pastikan kedua bahan sudah masuk ke tabung ukur.
        `;
        return;
      }

      soundCtrl.playCorrect();
      feedback.className = "sim-feedback-inline correct animate-correct";
      feedback.style.display = "block";
      feedback.innerHTML = `
        <strong>Ramuan Berhasil Dibuat dengan Takaran Sempurna! (+10 Poin)</strong><br>
        Perhitungan matematis: <strong>2/5 L + 1/5 L = (2 + 1)/5 = 3/5 Liter</strong>.<br>
        Karena penyebut sudah sama (5), kita cukup menjumlahkan pembilangnya. Tabung ukur kini menunjukkan ketinggian tepat pada garis 3/5 Liter!
      `;

      this.engine.recordSimulationAnswer({
        activityId: "L2-ACT1",
        name: "Simulasi Takaran Ramuan Herbal",
        isCorrect: true,
        points: 10,
        explanation: "2/5 liter + 1/5 liter = 3/5 liter. Penyebut sama dijumlahkan pembilangnya saja."
      });

      document.getElementById("btn-verify-potion").style.display = "none";
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn btn-accent btn-lg";
      nextBtn.innerHTML = `<span>Lanjut ke Aktivitas Susun Prosedur KPK</span>`;
      nextBtn.addEventListener("click", () => {
        soundCtrl.playClick();
        this.startActivity(1);
      });
      document.querySelector(".sim-actions-footer").appendChild(nextBtn);
    });
  }

  // =========================================================================
  // AKTIVITAS 2: SUSUN LANGKAH PERHITUNGAN KPK
  // =========================================================================
  renderStepSequencingPuzzle() {
    const steps = [
      { id: "step-kpk", text: "1. Temukan KPK dari penyebut 2 dan 4 untuk menyamakan penyebut (KPK = 4).", correctOrder: 1 },
      { id: "step-convert", text: "2. Ubah pecahan 1/2 menjadi pecahan senilai berpenyebut 4, yaitu 2/4.", correctOrder: 2 },
      { id: "step-add", text: "3. Jumlahkan pembilang kedua pecahan: 2/4 + 1/4 = 3/4.", correctOrder: 3 }
    ];

    let currentOrder = [steps[1], steps[2], steps[0]]; // Diacak mula-mula

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Prosedural: Operasi Pecahan Berpenyebut Beda</div>
          <h3 class="sim-instruction-title">Susun Langkah Perhitungan: 1/2 + 1/4</h3>
          <p class="sim-instruction-text">
            Penjaga hutan ingin menjumlahkan <strong>1/2 + 1/4</strong>. Karena penyebutnya berbeda, kita tidak boleh langsung menjumlahkannya! Susun urutan langkah penyelesaian di bawah ini dengan tepat.
          </p>
        </div>

        <div class="steps-ordering-stage">
          <p style="font-size: 0.92rem; color: var(--color-navy-muted); margin-bottom: 12px; font-weight: 700;">
            Klik dua kartu langkah di bawah untuk saling menukar posisi urutan:
          </p>
          <div class="steps-list" id="steps-container"></div>
        </div>

        <div class="sim-feedback-inline" id="steps-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-steps">
            <span>Periksa Urutan Langkah</span>
          </button>
        </div>
      </div>
    `;

    const stepsContainer = document.getElementById("steps-container");
    const feedback = document.getElementById("steps-feedback");
    let selectedFirst = null;

    const renderSteps = () => {
      stepsContainer.innerHTML = currentOrder.map((s, idx) => `
        <div class="step-card" data-index="${idx}" tabindex="0">
          <div class="step-number-pill">Tahap ${idx + 1}</div>
          <div class="step-card-text">${s.text}</div>
        </div>
      `).join("");

      const cards = stepsContainer.querySelectorAll(".step-card");
      cards.forEach(card => {
        card.addEventListener("click", () => {
          soundCtrl.playClick();
          const idx = parseInt(card.getAttribute("data-index"), 10);
          if (selectedFirst === null) {
            selectedFirst = idx;
            card.classList.add("selected-step");
          } else {
            const temp = currentOrder[selectedFirst];
            currentOrder[selectedFirst] = currentOrder[idx];
            currentOrder[idx] = temp;
            selectedFirst = null;
            renderSteps();
          }
        });
      });
    };

    renderSteps();

    document.getElementById("btn-verify-steps").addEventListener("click", () => {
      const isCorrect = currentOrder[0].correctOrder === 1 &&
                        currentOrder[1].correctOrder === 2 &&
                        currentOrder[2].correctOrder === 3;

      if (isCorrect) {
        soundCtrl.playCorrect();
        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Urutan Prosedur Sangat Tepat! (+10 Poin)</strong><br>
          Pertama: Samakan penyebut dengan mencari KPK (KPK dari 2 dan 4 adalah 4).<br>
          Kedua: Ubah 1/2 menjadi 2/4.<br>
          Ketiga: Jumlahkan pembilangnya: 2/4 + 1/4 = 3/4.
        `;

        this.engine.recordSimulationAnswer({
          activityId: "L2-ACT2",
          name: "Susun Langkah Perhitungan KPK",
          isCorrect: true,
          points: 10,
          explanation: "Menyusun langkah menyamakan penyebut pecahan 1/2 + 1/4 = 2/4 + 1/4 = 3/4 secara runtut."
        });

        document.getElementById("btn-verify-steps").style.display = "none";
        const nextBtn = document.createElement("button");
        nextBtn.className = "btn btn-accent btn-lg";
        nextBtn.innerHTML = `<span>Lanjut ke Tantangan Perbaiki Takaran</span>`;
        nextBtn.addEventListener("click", () => {
          soundCtrl.playClick();
          this.startActivity(2);
        });
        document.querySelector(".sim-actions-footer").appendChild(nextBtn);
      } else {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Urutan Langkah Belum Benar!</strong><br>
          Ingat: Sebelum melakukan operasi pecahan berpenyebut beda, kamu harus menemukan KPK untuk menyamakan penyebut terlebih dahulu, lalu mengubah pecahan, baru kemudian menjumlahkan pembilangnya.
        `;
      }
    });
  }

  // =========================================================================
  // AKTIVITAS 3: PERBAIKI TAKARAN RESEP YANG SALAH
  // =========================================================================
  renderFixTheRecipePuzzle() {
    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Analisis Kritis: Temukan & Perbaiki Kesalahan</div>
          <h3 class="sim-instruction-title">Koreksi Catatan Ramuan yang Keliru</h3>
          <p class="sim-instruction-text">
            Seorang magang di pos hutan menuliskan catatan perhitungan berikut:<br>
            <span class="formula-highlight">3/4 liter − 1/2 liter = 2/2 liter = 1 Liter</span><br>
            Temukan mengapa perhitungan tersebut salah dan pilih solusi perbaikan yang benar!
          </p>
        </div>

        <div class="recipe-fix-options">
          <div class="recipe-choice-card" data-choice="A" tabindex="0">
            <div class="choice-letter">A</div>
            <div class="choice-body">
              <strong>Penyebut langsung dikurangkan:</strong> 3/4 − 1/2 = (3−1)/(4−2) = 2/2 = 1 Liter.
            </div>
          </div>

          <div class="recipe-choice-card" data-choice="B" tabindex="0">
            <div class="choice-letter">B</div>
            <div class="choice-body">
              <strong>Samakan penyebut menjadi 4 terlebih dahulu:</strong> Ubah 1/2 menjadi 2/4, lalu kurangkan pembilangnya: 3/4 − 2/4 = 1/4 Liter.
            </div>
          </div>

          <div class="recipe-choice-card" data-choice="C" tabindex="0">
            <div class="choice-letter">C</div>
            <div class="choice-body">
              <strong>Kedua pecahan dikalikan:</strong> (3 × 1) / (4 × 2) = 3/8 Liter.
            </div>
          </div>
        </div>

        <div class="sim-feedback-inline" id="fix-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-fix">
            <span>Kirim Analisis Perbaikan</span>
          </button>
        </div>
      </div>
    `;

    let selectedChoice = null;
    const cards = this.container.querySelectorAll(".recipe-choice-card");
    const feedback = document.getElementById("fix-feedback");

    cards.forEach(card => {
      card.addEventListener("click", () => {
        soundCtrl.playClick();
        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedChoice = card.getAttribute("data-choice");
      });
    });

    document.getElementById("btn-verify-fix").addEventListener("click", () => {
      if (!selectedChoice) {
        alert("Silakan pilih salah satu perbaikan yang menurutmu benar!");
        return;
      }

      if (selectedChoice === "B") {
        soundCtrl.playCorrect();
        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Analisis Benar dan Tajam! (+10 Poin)</strong><br>
          Kesalahan umum siswa adalah langsung mengurangkan penyebut (4 − 2 = 2). Langkah yang benar adalah menyamakan penyebut terlebih dahulu: 1/2 senilai dengan 2/4, sehingga 3/4 − 2/4 = 1/4 Liter.
        `;

        this.engine.recordSimulationAnswer({
          activityId: "L2-ACT3",
          name: "Perbaiki Takaran Resep yang Salah",
          isCorrect: true,
          points: 10,
          explanation: "Menyamakan penyebut menjadi 4: 3/4 - 2/4 = 1/4 liter."
        });

        document.getElementById("btn-verify-fix").style.display = "none";
        const completeLevelBtn = document.createElement("button");
        completeLevelBtn.className = "btn btn-accent btn-lg";
        completeLevelBtn.innerHTML = `<span>Lanjut ke Evaluasi Konsep Wilayah</span>`;
        completeLevelBtn.addEventListener("click", () => {
          soundCtrl.playClick();
          this.engine.finishSimulationPart(2);
        });
        document.querySelector(".sim-actions-footer").appendChild(completeLevelBtn);
      } else {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Pilihan Kurang Tepat!</strong><br>
          Ingat: Penyebut pecahan tidak boleh dikurangkan langsung secara sembarangan. Samakan penyebut terlebih dahulu menggunakan pecahan senilai.
        `;
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Level2Simulation;
}
