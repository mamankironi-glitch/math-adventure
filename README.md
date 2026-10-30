# Math Adventure: Petualangan di Dunia Numeria
### Media Pembelajaran Matematika Interaktif (Materi Pecahan) untuk Siswa Kelas V SD Muhammadiyah
**Program Kerja Individu KKN Mahasiswa Teknologi Pendidikan Semester 7**

---

## 1. Profil & Identitas Proyek

* **Nama Media**: Math Adventure: Petualangan di Dunia Numeria
* **Dunia Petualangan**: Dunia Numeria
* **Target Pengguna**: Siswa Kelas V Sekolah Dasar (Usia 10–11 tahun)
* **Mata Pelajaran**: Matematika (Materi Pokok: Pecahan / *Fractions*)
* **Live Website (Vercel)**: [https://math-adventure-numeria.vercel.app](https://math-adventure-numeria.vercel.app)
* **Repositori GitHub**: [https://github.com/mamankironi-glitch/math-adventure](https://github.com/mamankironi-glitch/math-adventure)
* **Pendekatan Desain & Pembelajaran**:
  * *Game-Based Learning (2D Point-and-Click Adventure)*
  * Manipulatif Benda Konkret Interaktif (Simulasi Pemotongan Kue Gandum/Pizza, Tabung Gelas Ukur Graduasi, Mistar Toko Pita Desa, Teka-Teki Rune Kristal)
  * Panduan Karakter Ramah Anak (Niko si Cermat, Maya si Teliti, Bima si Tangguh)
  * Pembelajaran Bermakna Berbasis Masalah Nyata
  * Standar Kelulusan KKM (Skor minimal 70 untuk membuka wilayah berikutnya)
* **Sistem Desain Visual**:
  * Biru Utama: `#0071CE` (Navigasi, Brand, & Fokus Interaksi)
  * Kuning Emas: `#FFC220` (Aksen, Sorotan Nilai Pecahan, & Tombol Panggilan Aksi)
  * Putih Bersih: `#FFFFFF` (Latar Belakang Bersih & Ruang Negatif Ramah Anak)
  * Biru Navy: `#041E42` (Tipografi Judul, Kontras Tinggi & Skala Kartu)

---

## 2. Laporan Audit Menyeluruh Website (Pra & Pasca Revisi)

Sesuai instruksi audit komprehensif, berikut adalah hasil evaluasi terstruktur dalam tiga kategori utama:

### Kategori 1: Fitur yang Berfungsi Baik & Dipertahankan
1. **Arsitektur Tanpa Dependensi Berat**: Struktur HTML5, CSS3, dan Vanilla JavaScript murni tanpa runtime framework berat dipertahankan demi portabilitas dan kecepatan di laptop sekolah berspesifikasi standar.
2. **Sintesis Audio Web Audio API**: Efek suara sintetis (nada benar bernuansa riang, nada salah lembut edukatif tanpa penghakiman, dan fanfare kemenangan) tidak membutuhkan file audio eksternal sehingga bebas latensi dan anti error CORS.
3. **Penyimpanan State & Sesi Lokal**: Sistem `localStorage` dan memori cadangan untuk menyimpan profil siswa, riwayat jawaban, dan status kelulusan level tetap berfungsi andal.
4. **Peta Petualangan 2D Dunia Numeria**: Alur eksplorasi bertingkat 4 wilayah (Lembah Penemuan, Hutan Tantangan, Desa Kehidupan, dan Gerbang Pengetahuan) dengan sistem gembok level berdasar KKM (70) dipertahankan.

### Kategori 2: Fitur yang Diperbaiki
1. **Perbaikan Layout Layar Bumper & Loading Screen (Bebas Tabrakan Elemen)**:
   * *Sebelum*: Elemen karakter Niko, logo Math Adventure, badge subjudul, dan loading bar bertumpuk di titik tengah yang sama akibat penggunaan `position: absolute; inset: 0` pada `.bumper-scene-layer`.
   * *Perbaikan*: Struktur DOM dan styling bumper didesain ulang menjadi `.bumper-card` dengan aliran flexbox vertikal berurutan: Logo brand di atas, karakter Niko di dalam lingkaran proporsional di tengah, dan loading bar serta teks status di bawah. Tombol "Lewati Pembukaan" diposisikan di pojok kanan atas dengan kontras tajam.
2. **Optimalisasi Tata Letak Layar Desktop 1920 × 1080 (Zero-Scroll Viewport)**:
   * *Sebelum*: Pada layar desktop Full HD 1080p dan laptop, header dan banner wilayah memakan tinggi berlebih (>250px), memaksa siswa melakukan scroll vertikal untuk melihat tombol aksi atau manipulatif.
   * *Perbaikan*: Tinggi `.site-header` distandarkan ke 60px dan `.level-scenery-header` menjadi 52–68px inline bar. Layar Landing, Identitas Pemain, Tutorial, dan Peta Dunia Numeria kini pas 100% dalam satu viewport desktop 1080p tanpa scroll vertikal. Transisi layar juga memicu reset scroll otomatis (`window.scrollTo(0, 0)`).
3. **Perbaikan Panggung Soal Evaluasi & Penghapusan Placeholder**:
   * *Sebelum*: Area tantangan konsep menampilkan teks placeholder (*"Teks pertanyaan..."*) dan belum memiliki styling CSS untuk `.challenge-stage`, `.options-grid`, `.option-btn`, serta umpan balik.
   * *Perbaikan*: Pertanyaan diekspor secara global (`window.GAME_DATA`) dan dirender seketika saat level dibuka. Seluruh komponen soal, opsi pilihan ganda berhuruf A–D, feedback box bernuansa hijau/kuning, serta proteksi *anti double-click* (tombol dinonaktifkan setelah memilih) telah diimplementasikan lengkap.
4. **Penghapusan Seluruh Emoji (Kebijakan Zero Emoji)**: 
   * *Sebelum*: Banyak tombol dan teks antarmuka menggunakan emoji sistem (seperti 🍕, 🌲, 🎒, 🏆, dsb.) yang tampil tidak konsisten antar sistem operasi siswa.
   * *Perbaikan*: 100% emoji telah diganti dengan pustaka ikon vektor SVG terpadu (`AppIcons`) dengan goresan tajam, ukuran proporsional, dan warna tema konsisten.
5. **Pergantian Sesi Siswa Baru (Multi-User Reset)**:
   * *Sebelum*: Pergantian siswa di komputer sekolah berpotensi menyisakan input nama atau skor sesi sebelumnya.
   * *Perbaikan*: Fitur `resetSession()` mengosongkan kolom input nama, menyetel ulang skor ke 0 poin, membersihkan riwayat jawaban, dan mengarahkan tampilan kembali ke Layar Identitas Pemain secara higienis.

### Kategori 3: Fitur Baru yang Dikembangkan
1. **Bumper Pembuka Sinematik 5 Adegan Terintegrasi Loading Screen**:
   * Adegan 1: Kemunculan lanskap perbukitan hijau Dunia Numeria secara perlahan.
   * Adegan 2: Gerakan atmosferik lingkungan (awan bergeser, cahaya fajar berpendar).
   * Adegan 3: Karakter penjelajah Niko hadir menyapa siswa.
   * Adegan 4: Logo Math Adventure berpendar keemasan disertai identitas SD Muhammadiyah.
   * Adegan 5: Indikator loading bar anggun bertransisi mulus ke Halaman Beranda (*Landing Page*).
   * *Fitur Aksesibilitas*: Tersedia tombol "Lewati Pembukaan" (*Skip*) dan memori sesi `sessionStorage` agar loading instan pada navigasi berikutnya.
2. **Transisi Tematik Antar-Wilayah**:
   * Layar transisi dinamis dengan kartu tematik khusus wilayah (Nuansa Hijau Terbuka untuk Lembah, Nuansa Zamrud Segar untuk Hutan, Nuansa Hangat Komunitas untuk Desa, dan Nuansa Indigo Kristal untuk Gerbang).
3. **Simulasi & Manipulatif Konkret Interaktif (Bukan Sekadar Pilihan Ganda)**:
   * **Level 1 (Lembah Penemuan)**: Manipulatif Pemotong & Pembagi Kue/Pizza (siswa dapat mengubah jumlah irisan 2, 4, 6, 8 bagian, mengeklik potongan untuk melihat live readout pecahan pembilang/penyebut), Pasangkan Kartu Visual Daerah Berarsir, dan Jembatan Batu Pecahan.
   * **Level 2 (Hutan Tantangan)**: Simulasi Laboratorium Gelas Ukur Bergraduasi (menuang ekstrak mint 2/5 L dan madu 1/5 L ke dalam tabung ukur kaca cair), Susun Urutan Prosedural Penjumlahan KPK, dan Analisis Kesalahan Resep Ramuan.
   * **Level 3 (Desa Kehidupan)**: Simulasi Mistar Toko Kain Desa (menggeser gunting pada penggaris 1 meter untuk memotong 3/4 meter pita dan menghitung sisa bahan di toko), Pengaturan Timbangan Tepung Toko Roti, dan Puzzle Urutan Pesanan Pelanggan.
   * **Gerbang Pengetahuan (Tantangan Akhir Multi-Tahap)**: Puzzle 4 Tahap Pembuka Gerbang Kuno (Pecahkan Kode Rune Kristal Penyederhanaan 9/12 menjadi 3/4, Urutan Penurunan Energi Kristal, Aliran Inti Pengetahuan KPK, dan Pembukaan Gerbang Epik).

---

## 3. Cakupan Materi Pembelajaran Matematika Kelas V SD

Materi disusun sesuai kurikulum Matematika Kelas V SD, dirancang dengan bahasa komunikatif, ilustrasi kontekstual, dan langkah pemecahan yang terukur:

1. **Konsep Dasar Pecahan**:
   $$\text{Pecahan} = \frac{\text{Pembilang (bagian yang diambil/diarsir)}}{\text{Penyebut (total bagian utuh sama besar)}}$$
2. **Pecahan Senilai**:
   Representasi visual bahwa luas daerah $\frac{1}{2}$ setara dengan $\frac{2}{4}$ dan $\frac{3}{6}$ melalui perkalian atau pembagian pembilang dan penyebut dengan angka yang sama:
   $$\frac{a \times n}{b \times n} = \frac{a}{b}$$
3. **Penyederhanaan Pecahan**:
   Membagi pembilang dan penyebut dengan Faktor Persekutuan Terbesar (FPB), misalnya $\frac{9 \div 3}{12 \div 3} = \frac{3}{4}$.
4. **Penjumlahan & Pengurangan Pecahan**:
   * Penyebut Sama: $\frac{2}{5} + \frac{1}{5} = \frac{2+1}{5} = \frac{3}{5}$
   * Penyebut Berbeda: Menentukan KPK penyebut terlebih dahulu sebelum mengoperasikan pembilang.
5. **Soal Cerita Sehari-hari**:
   Analisis masalah kontekstual: mengukur pita jahit, menakar tepung adonan kue bolu, menghitung sisa stok beras desa, dan membagi hasil panen semangka secara adil.

---

## 4. Struktur File & Modul Kode

```text
math-adventure/
│
├── index.html                       # Struktur antarmuka semantik, layar aplikasi & modal dialog
├── README.md                        # Dokumentasi teknis komprehensif & laporan evaluasi KKN
├── check_emojis.js                  # Skrip verifikasi statis 100% Bebas Emoji
├── test_upgraded_game.js            # Skrip otomatis E2E Browser Testing via Chrome DevTools Protocol
│
├── css/
│   ├── style.css                    # Sistem desain terpadu, layout desktop FHD/4K, kartu simulasi
│   └── animations.css               # Keyframes bumper pembuka, cairan tabung ukur, floating avatar
│
├── js/
│   ├── icons.js                     # Pustaka vektor SVG terpadu (Pengganti seluruh emoji)
│   ├── bumper.js                    # Engine Bumper Sinematik 5 adegan terintegrasi loading screen
│   ├── transitions.js               # Manajer transisi tematik atmosferik antar-wilayah
│   ├── audio.js                     # Sintesis audio bebas dependensi (Web Audio API)
│   ├── storage.js                   # Manajemen sesi siswa, penilaian KKM, dan diagnosis materi
│   ├── navigation.js                # Pengontrol alur layar, reset session, dan modal pembahasan
│   ├── game.js                      # Pengendali alur permainan, orkestrator materi & simulasi
│   │
│   ├── data/
│   │   └── questions.js             # Bank 35 soal terstruktur, kunci jawaban & pembahasan konseptual
│   │
│   └── simulations/
│       ├── level1-sim.js            # Simulasi Pemotong Kue/Pizza, Matching Card, Stepping Stones
│       ├── level2-sim.js            # Simulasi Gelas Ukur Cairan Bertingkat, Sequencing KPK
│       ├── level3-sim.js            # Simulasi Mistar Pengukuran Toko Kain, Timbangan Roti Desa
│       └── final-gate-sim.js        # Puzzle 4 Tahap Pembukaan Gerbang Pengetahuan
│
└── assets/
    └── images/
        ├── logo.svg                 # Logo Math Adventure Dunia Numeria (Vektor Tajam)
        ├── world-map.svg            # Peta 2D Dunia Numeria dengan 4 pin interaktif
        ├── character-guide.svg      # Niko si Cermat (Pemandu Utama)
        ├── character-maya.svg       # Maya si Teliti (Karakter Pilihan)
        ├── character-bima.svg       # Bima si Tangguh (Karakter Pilihan)
        ├── valley-background.svg    # Panorama Lembah Penemuan
        ├── forest-background.svg    # Panorama Hutan Tantangan
        ├── village-background.svg   # Panorama Desa Kehidupan
        └── final-gate-background.svg# Panorama Gerbang Pengetahuan
```

---

## 5. Hasil Pengujian Otomatis (*End-to-End Automated Browser Testing*)

Seluruh fungsi diverifikasi melalui pengujian peramban langsung (Microsoft Edge headless berbasis Chrome DevTools Protocol / CDP) pada resolusi desktop 1920 × 1080:

```text
================================================================
  PENGUJIAN KOMPREHENSIF E2E: MATH ADVENTURE (REVISI & UPGRADE) 
  Target: Siswa Kelas V SD Muhammadiyah | Materi: Pecahan
================================================================

Navigasi ke: index.html

--- UJI 1: BUMPER PEMBUKA & LOADING SCREEN (NON-COLLISION) ---
  [PASS] Layar Bumper/Loading aktif otomatis saat game pertama dibuka
  [PASS] Kontainer .bumper-card terstruktur rapi
  [PASS] Elemen Bumper (Logo, Karakter, Loading Bar) tersusun berurutan tanpa saling menabrak/bertumpuk
  [PASS] Tombol "Lewati Pembukaan" (#btn-skip-bumper) tersedia dan dapat diakses
  [PASS] Landing Screen (#screen-landing) aktif setelah bumper selesai

--- UJI 2: ZERO-SCROLL VIEWPORT PADA DESKTOP 1920x1080 ---
  [PASS] Landing Screen pas 1 layar desktop tanpa scroll vertikal yang tidak perlu

--- UJI 3: ZERO EMOJI POLICY (100% SVG ICONS) ---
  [PASS] Zero Emoji di seluruh DOM teks (Ditemukan: 0)
  [PASS] Pustaka vektor SVG AppIcons dimuat dengan lengkap

--- UJI 4: IDENTITAS SISWA & INPUT PROFIL ---
  [PASS] Layar Identitas Pemain (#screen-player) aktif
  [PASS] Layar Identitas Pemain muat dalam 1 layar desktop (Zero-scroll)
  [PASS] Identitas siswa tersimpan & lanjut ke alur petualangan
  [PASS] Layar Tutorial muat dalam 1 layar desktop (Zero-scroll)
  [PASS] Peta Petualangan 2D Dunia Numeria (#screen-map) aktif
  [PASS] Peta Petualangan 2D muat dalam 1 layar desktop (Zero-scroll)

--- UJI 5: LEVEL 1 (MANIPULATIF PEMOTONG KUE & SOAL EVALUASI) ---
  [PASS] Layar Level 1 (#screen-level) terbuka
  [PASS] Papan Manipulatif Kue Gandum (#sim-pizza-board) berhasil dirender
  [PASS] Pembacaan live fraction akurat: 3/8
  [PASS] Umpan balik manipulatif pembagian kue 3/8 tervalidasi benar
  [PASS] Soal konsep matematika dimuat dari GAME_DATA ("Sebuah pizza lezat dipotong menjadi 8 bagian ...")
  [PASS] Opsi jawaban ganda (A, B, C, D) dirender lengkap (4 opsi)
  [PASS] Anti double-click aktif (tombol dinonaktifkan) & feedback evaluasi muncul

--- UJI 6: LEVEL 2 (SIMULASI GELAS UKUR BERGRADUASI PECAHAN) ---
  [PASS] Tombol Tuang Daun Mint (#btn-pour-mint) tersedia di Lab Ramuan
  [PASS] Penjumlahan pecahan penyebut sama 2/5 + 1/5 = 3/5 liter tervalidasi benar

--- UJI 7: LEVEL 3 (SIMULASI PENGUKURAN MISTAR & TOKO DESA) ---
  [PASS] Penanda mistar pecahan 3/4 meter tersedia di Toko Desa
  [PASS] Pemotongan 3/4 meter pita dan kalkulasi sisa kain tervalidasi sukses

--- UJI 8: GERBANG PENGETAHUAN (FINAL GATE PUZZLE) ---
  [PASS] Pilihan penyederhanaan rune kristal (9/12 = 3/4) tersedia
  [PASS] Kunci Rune Kristal 1 terbuka dengan penyederhanaan pecahan yang tepat

--- UJI 9: HALAMAN HASIL AKHIR & MODAL PEMBAHASAN LENGKAP ---
  [PASS] Layar Hasil Akhir Petualangan (#screen-final-results) aktif
  [PASS] Akumulasi skor petualangan tercatat: 10 Poin
  [PASS] Modal Pembahasan Soal & Langkah Perhitungan (#review-modal) aktif

--- UJI 10: MULTI-USER / PERGANTIAN SESI SISWA BARU ---
  [PASS] Nama pemain dikosongkan untuk siswa baru
  [PASS] Skor disetel ulang ke 0 poin
  [PASS] Sistem kembali ke Layar Identitas Pemain (#screen-player)

--- UJI 11: STABILITAS TEKNIS (ZERO JAVASCRIPT ERRORS) ---
  [PASS] Nol unhandled JavaScript exceptions (Daftar Error: [])

================================================================
HASIL AKHIR PENGUJIAN: 34 / 34 PENGUJIAN BERHASIL (100%)
================================================================
```

---

## 6. Petunjuk Penggunaan untuk Guru & Siswa

1. **Membuka Media**:
   * Akses URL produksi di browser: [https://math-adventure-numeria.vercel.app](https://math-adventure-numeria.vercel.app) atau buka berkas `index.html` secara lokal.
2. **Memulai Petualangan**:
   * Saksikan bumper sinematik Dunia Numeria atau klik **"Lewati Pembukaan"**.
   * Klik tombol **"Mulai Petualangan"** pada halaman utama.
   * Masukkan nama siswa atau nama kelompok belajar, lalu pilih karakter avatar penjelajah.
   * Baca panduan singkat pada layar petunjuk, lalu masuk ke Peta Dunia Numeria.
3. **Mengerjakan Level**:
   * Mulai dari **Lembah Penemuan** (Level 1). Baca rangkuman materi dan tujuan misi.
   * Selesaikan tantangan manipulatif konkret (potong kue gandum, tuang takaran ramuan, potong pita mistar toko, dsb.).
   * Dapatkan skor $\ge 70$ untuk membuka wilayah berikutnya pada peta.
4. **Melihat Hasil & Pembahasan**:
   * Di akhir petualangan, buka **"Lihat Pembahasan Lengkap"** untuk meninjau langkah matematis setiap aktivitas.
   * Guru dapat mencetak laporan evaluasi pembelajaran siswa menggunakan tombol **"Cetak Laporan Penilaian (PDF)"**.
   * Gunakan tombol **"Mulai Sesi Siswa Baru"** untuk mereset data saat berganti giliran siswa di lab komputer sekolah.
