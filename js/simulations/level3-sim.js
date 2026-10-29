/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Level 3 Simulation: Desa Kehidupan
 * 
 * 1. Simulasi Toko Kain Desa & Pengukuran Mistar Pecahan (Pemotongan Pita)
 * 2. Kelola Persediaan Bahan Dapur Toko Roti (Timbangan Pecahan)
 * 3. Puzzle Pesanan Pelanggan Bertahap (Analisis Masalah Kontekstual)
 */

class Level3Simulation {
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
      this.renderRibbonCuttingSimulation();
    } else if (actIndex === 1) {
      this.renderBakeryInventorySimulation();
    } else if (actIndex === 2) {
      this.renderMultiStageOrderPuzzle();
    }
  }

  // =========================================================================
  // AKTIVITAS 1: SIMULASI TOKO KAIN DESA & PEMOTONGAN PITA
  // =========================================================================
  renderRibbonCuttingSimulation() {
    let cutPosition = 0; // 0, 1, 2, 3, 4 (per empat meter)
    const targetCut = 3; // 3/4 meter

    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Simulasi Toko Desa: Pengukuran & Pemotongan Bahan</div>
          <h3 class="sim-instruction-title">Pesanan Pita Festival Warga Desa</h3>
          <p class="sim-instruction-text">
            Seorang warga datang ke Toko Penjahit Maya dan memesan <strong>3/4 meter pita merah</strong> dari gulungan utuh sepanjang 1 meter. Geser penanda gunting ke posisi yang tepat pada mistar, lalu lakukan pemotongan!
          </p>
        </div>

        <div class="shop-measuring-stage">
          <div class="tape-roll-display">
            <!-- Gulungan Pita Merah di Atas Mistar -->
            <div class="ribbon-strip-track">
              <div class="ribbon-strip-cut-area" id="ribbon-fill" style="width: 0%;"></div>
            </div>

            <!-- Mistar Kayu 1 Meter dengan Tanda Skala Pecahan -->
            <div class="wooden-ruler-bar">
              <div class="ruler-segment" data-pos="1">
                <span class="ruler-label">1/4 m</span>
              </div>
              <div class="ruler-segment" data-pos="2">
                <span class="ruler-label">2/4 m (1/2 m)</span>
              </div>
              <div class="ruler-segment" data-pos="3">
                <span class="ruler-label">3/4 m</span>
              </div>
              <div class="ruler-segment" data-pos="4">
                <span class="ruler-label">4/4 m (1 m)</span>
              </div>
            </div>
          </div>

          <!-- Slider Posisi Gunting -->
          <div class="cut-controls-box">
            <span style="font-weight: 800; color: var(--color-navy);">Pilih Posisi Gunting:</span>
            <div class="cut-button-selector">
              <button type="button" class="btn-cut-pos" data-pos="1">1/4 Meter</button>
              <button type="button" class="btn-cut-pos" data-pos="2">2/4 Meter</button>
              <button type="button" class="btn-cut-pos" data-pos="3">3/4 Meter</button>
              <button type="button" class="btn-cut-pos" data-pos="4">4/4 Meter</button>
            </div>
            <div class="cut-status-readout" id="cut-status-text">Posisi Gunting: Belum Dipilih</div>
          </div>

          <!-- Etalase Inventaris Toko -->
          <div class="inventory-status-card">
            <div class="inv-item">
              <span class="inv-title">Panjang Awal Pita:</span>
              <strong>1 Meter (4/4 m)</strong>
            </div>
            <div class="inv-item">
              <span class="inv-title">Panjang Diberikan ke Pembeli:</span>
              <strong id="inv-given">-</strong>
            </div>
            <div class="inv-item">
              <span class="inv-title">Sisa Pita di Toko:</span>
              <strong id="inv-rem">-</strong>
            </div>
          </div>
        </div>

        <div class="sim-feedback-inline" id="ribbon-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-cut-ribbon">
            <span>Gunting Pita Sekarang</span>
          </button>
        </div>
      </div>
    `;

    const ribbonFill = document.getElementById("ribbon-fill");
    const statusText = document.getElementById("cut-status-text");
    const invGiven = document.getElementById("inv-given");
    const invRem = document.getElementById("inv-rem");
    const feedback = document.getElementById("ribbon-feedback");
    const posButtons = this.container.querySelectorAll(".btn-cut-pos");

    posButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        soundCtrl.playClick();
        posButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        cutPosition = parseInt(btn.getAttribute("data-pos"), 10);
        ribbonFill.style.width = `${(cutPosition / 4) * 100}%`;
        statusText.textContent = `Posisi Gunting: ${cutPosition}/4 Meter`;
      });
    });

    document.getElementById("btn-cut-ribbon").addEventListener("click", () => {
      if (cutPosition === 0) {
        alert("Pilih posisi gunting pada mistar terlebih dahulu!");
        return;
      }

      if (cutPosition === targetCut) {
        soundCtrl.playCorrect();
        invGiven.textContent = "3/4 Meter";
        invRem.textContent = "1/4 Meter (4/4 − 3/4 = 1/4 m)";

        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Pemotongan Sangat Akurat! (+10 Poin)</strong><br>
          Pita berhasil dipotong tepat pada tanda 3/4 meter.<br>
          Sisa pita di toko dihitung dengan pengurangan: <strong>4/4 meter − 3/4 meter = 1/4 meter</strong>.
        `;

        this.engine.recordSimulationAnswer({
          activityId: "L3-ACT1",
          name: "Simulasi Toko Desa: Pemotongan Pita",
          isCorrect: true,
          points: 10,
          explanation: "Memotong 3/4 m dari 1 m (4/4 m) menyisakan 1/4 m pita di toko."
        });

        document.getElementById("btn-cut-ribbon").style.display = "none";
        const nextBtn = document.createElement("button");
        nextBtn.className = "btn btn-accent btn-lg";
        nextBtn.innerHTML = `<span>Lanjut ke Simulasi Dapur Toko Roti</span>`;
        nextBtn.addEventListener("click", () => {
          soundCtrl.playClick();
          this.startActivity(1);
        });
        document.querySelector(".sim-actions-footer").appendChild(nextBtn);
      } else {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Ukuran Pemotongan Belum Sesuai!</strong><br>
          Pelanggan memesan <strong>3/4 meter</strong>, namun posisi guntingmu berada di <strong>${cutPosition}/4 meter</strong>. Periksa kembali tanda mistar dan pilih tombol 3/4 Meter.
        `;
      }
    });
  }

  // =========================================================================
  // AKTIVITAS 2: KELOLA PERSEDIAAN BAHAN DAPUR TOKO ROTI
  // =========================================================================
  renderBakeryInventorySimulation() {
    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Simulasi Toko Roti: Timbangan & Sisa Bahan</div>
          <h3 class="sim-instruction-title">Membuat Kue Bolu Madu Desa</h3>
          <p class="sim-instruction-text">
            Ibu pembuat roti memiliki toples berisi <strong>3/4 kg tepung terigu</strong>. Resep bolu madu membutuhkan <strong>1/4 kg tepung</strong>. Tentukan operasi yang tepat dan hitung sisa tepung di toples setelah bolu dibuat!
          </p>
        </div>

        <div class="bakery-scale-stage">
          <!-- Gambar Toples & Timbangan -->
          <div class="jar-display-card">
            <div class="flour-jar-graphic">
              <div class="jar-glass">
                <div class="jar-flour-level" style="height: 75%;">
                  <span class="flour-label">Awal: 3/4 kg</span>
                </div>
              </div>
              <div class="jar-cap"></div>
            </div>
            <div class="jar-caption">Toples Persediaan Tepung</div>
          </div>

          <!-- Panel Interaktif Perhitungan -->
          <div class="bakery-calc-card">
            <h4 style="color: var(--primary-blue); font-size: 1.15rem; margin-bottom: 12px;">Pilih Jawaban yang Benar:</h4>
            
            <div class="calc-choice-list">
              <label class="calc-radio-item" tabindex="0">
                <input type="radio" name="bakery-opt" value="A">
                <span><strong>Pengurangan:</strong> 3/4 kg − 1/4 kg = 2/4 kg (senilai dengan 1/2 kg)</span>
              </label>

              <label class="calc-radio-item" tabindex="0">
                <input type="radio" name="bakery-opt" value="B">
                <span><strong>Penjumlahan:</strong> 3/4 kg + 1/4 kg = 4/4 kg (1 kg tepung)</span>
              </label>

              <label class="calc-radio-item" tabindex="0">
                <input type="radio" name="bakery-opt" value="C">
                <span><strong>Pengurangan:</strong> 3/4 kg − 1/4 kg = 2/0 kg (Penyebut dikurangkan)</span>
              </label>
            </div>
          </div>
        </div>

        <div class="sim-feedback-inline" id="bakery-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-bakery">
            <span>Kirim Hasil Perhitungan</span>
          </button>
        </div>
      </div>
    `;

    const feedback = document.getElementById("bakery-feedback");
    const radioItems = this.container.querySelectorAll(".calc-radio-item");

    radioItems.forEach(item => {
      item.addEventListener("click", () => {
        soundCtrl.playClick();
        radioItems.forEach(i => i.classList.remove("selected"));
        item.classList.add("selected");
        const radio = item.querySelector("input[type='radio']");
        if (radio) radio.checked = true;
      });
    });

    document.getElementById("btn-verify-bakery").addEventListener("click", () => {
      const selected = this.container.querySelector("input[name='bakery-opt']:checked");
      if (!selected) {
        alert("Silakan pilih salah satu opsi terlebih dahulu!");
        return;
      }

      if (selected.value === "A") {
        soundCtrl.playCorrect();
        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Perhitungan Tepat Sekali! (+10 Poin)</strong><br>
          Karena bahan <em>digunakan</em>, operasi yang digunakan adalah pengurangan: 3/4 − 1/4 = 2/4 kg tepung. Pecahan 2/4 jika disederhanakan dengan membagi 2 sama dengan 1/2 kg.
        `;

        this.engine.recordSimulationAnswer({
          activityId: "L3-ACT2",
          name: "Kelola Persediaan Bahan Dapur Toko Roti",
          isCorrect: true,
          points: 10,
          explanation: "3/4 kg - 1/4 kg = 2/4 kg (atau 1/2 kg) tepung tersisa di toples."
        });

        document.getElementById("btn-verify-bakery").style.display = "none";
        const nextBtn = document.createElement("button");
        nextBtn.className = "btn btn-accent btn-lg";
        nextBtn.innerHTML = `<span>Lanjut ke Puzzle Pesanan Multitahap</span>`;
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
          <strong>Pilihan Belum Tepat!</strong><br>
          Tepung <em>digunakan</em> untuk membuat kue, sehingga jumlahnya berkurang (pengurangan, bukan penjumlahan). Dan ingat, penyebut yang sama (4) tidak boleh dikurangkan menjadi 0!
        `;
      }
    });
  }

  // =========================================================================
  // AKTIVITAS 3: PUZZLE PESANAN MULTITAHAP
  // =========================================================================
  renderMultiStageOrderPuzzle() {
    this.container.innerHTML = `
      <div class="sim-stage animate-screen-enter">
        <div class="sim-instruction-card">
          <div class="sim-instruction-badge">Tantangan Multitahap: Pembagian Hasil Panen Jeruk</div>
          <h3 class="sim-instruction-title">Misi Lumbung Buah Desa</h3>
          <p class="sim-instruction-text">
            Paman membagikan hasil panen jeruk manis desa: <strong>1/8 bagian</strong> diberikan kepada tetangga dan <strong>3/8 bagian</strong> diberikan kepada kerabat keluarga. Berapa bagian jeruk yang sudah dibagikan dan berapa bagian yang disimpan di lumbung?
          </p>
        </div>

        <div class="harvest-puzzle-grid">
          <div class="harvest-subtask">
            <h4 class="subtask-title">Tahap 1: Jeruk yang Sudah Dibagikan</h4>
            <p>1/8 bagian + 3/8 bagian = ... bagian</p>
            <div class="subtask-options" id="subtask-1-options">
              <button type="button" class="btn-subtask" data-val="4/8">4/8 bagian (1/2 bagian)</button>
              <button type="button" class="btn-subtask" data-val="4/16">4/16 bagian</button>
              <button type="button" class="btn-subtask" data-val="2/8">2/8 bagian</button>
            </div>
          </div>

          <div class="harvest-subtask">
            <h4 class="subtask-title">Tahap 2: Sisa Jeruk untuk Lumbung</h4>
            <p>Seluruh panen utuh (8/8) − Bagian dibagikan (4/8) = ...</p>
            <div class="subtask-options" id="subtask-2-options">
              <button type="button" class="btn-subtask" data-val="4/8">4/8 bagian (1/2 bagian)</button>
              <button type="button" class="btn-subtask" data-val="5/8">5/8 bagian</button>
              <button type="button" class="btn-subtask" data-val="1/8">1/8 bagian</button>
            </div>
          </div>
        </div>

        <div class="sim-feedback-inline" id="harvest-feedback" style="display: none;"></div>

        <div class="sim-actions-footer">
          <button type="button" class="btn btn-primary btn-lg" id="btn-verify-harvest">
            <span>Periksa Kedua Tahapan</span>
          </button>
        </div>
      </div>
    `;

    let answer1 = null;
    let answer2 = null;

    const opt1 = this.container.querySelectorAll("#subtask-1-options .btn-subtask");
    opt1.forEach(b => {
      b.addEventListener("click", () => {
        soundCtrl.playClick();
        opt1.forEach(btn => btn.classList.remove("active"));
        b.classList.add("active");
        answer1 = b.getAttribute("data-val");
      });
    });

    const opt2 = this.container.querySelectorAll("#subtask-2-options .btn-subtask");
    opt2.forEach(b => {
      b.addEventListener("click", () => {
        soundCtrl.playClick();
        opt2.forEach(btn => btn.classList.remove("active"));
        b.classList.add("active");
        answer2 = b.getAttribute("data-val");
      });
    });

    const feedback = document.getElementById("harvest-feedback");

    document.getElementById("btn-verify-harvest").addEventListener("click", () => {
      if (!answer1 || !answer2) {
        alert("Silakan lengkapi pilihan jawaban pada kedua tahapan!");
        return;
      }

      if (answer1 === "4/8" && answer2 === "4/8") {
        soundCtrl.playCorrect();
        feedback.className = "sim-feedback-inline correct animate-correct";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Analisis Multitahap Berhasil Sempurna! (+10 Poin)</strong><br>
          1. Jeruk yang dibagikan: 1/8 + 3/8 = 4/8 bagian (setengah dari seluruh panen).<br>
          2. Sisa jeruk untuk lumbung: 8/8 − 4/8 = 4/8 bagian (setengah lainnya).
        `;

        this.engine.recordSimulationAnswer({
          activityId: "L3-ACT3",
          name: "Puzzle Pesanan Multitahap Hasil Panen",
          isCorrect: true,
          points: 10,
          explanation: "Menyelesaikan analisis dua tahap penjumlahan dan sisa pengurangan pecahan kontekstual."
        });

        document.getElementById("btn-verify-harvest").style.display = "none";
        const completeLevelBtn = document.createElement("button");
        completeLevelBtn.className = "btn btn-accent btn-lg";
        completeLevelBtn.innerHTML = `<span>Lanjut ke Evaluasi Konsep Wilayah</span>`;
        completeLevelBtn.addEventListener("click", () => {
          soundCtrl.playClick();
          this.engine.finishSimulationPart(3);
        });
        document.querySelector(".sim-actions-footer").appendChild(completeLevelBtn);
      } else {
        soundCtrl.playWrong();
        feedback.className = "sim-feedback-inline incorrect animate-gentle-shake";
        feedback.style.display = "block";
        feedback.innerHTML = `
          <strong>Ada Tahap yang Masih Keliru!</strong><br>
          Periksa kembali: Pada tahap 1, jumlahkan pembilangnya: 1 + 3 = 4 per delapan. Pada tahap 2, kurangkan dari panen utuh (8/8) dengan hasil tahap 1.
        `;
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Level3Simulation;
}
