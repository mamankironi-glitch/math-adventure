# 🌟 Math Adventure: Petualangan di Dunia Numeria
### Media Pembelajaran Matematika Interaktif (Pecahan) untuk Siswa Kelas V SD Muhammadiyah
**Program Kerja Individu KKN Mahasiswa Teknologi Pendidikan Semester 7**

---

## 📌 1. Profil & Latar Belakang Proyek

* **Nama Media**: Math Adventure: Petualangan di Dunia Numeria
* **Live Website (Vercel)**: [https://math-adventure-numeria.vercel.app](https://math-adventure-numeria.vercel.app)
* **Repositori GitHub**: [https://github.com/mamankironi-glitch/math-adventure](https://github.com/mamankironi-glitch/math-adventure)
* **Sasaran Pengguna**: Siswa Kelas V Sekolah Dasar (Rentang Usia: 10–11 tahun)
* **Mata Pelajaran**: Matematika (Materi Pokok: Pecahan / *Fractions*)
* **Pendekatan Pembelajaran**: *Game-Based Learning*, *Point-and-Click Adventure 2D*, Representasi Benda Konkret, Eksplorasi Terbimbing (*Guided Exploration*), dan Pemecahan Masalah Kontekstual.
* **Palet Warna Desain (Sesuai Referensi)**:
  * Biru Utama: `#0071CE` (Identitas & Navigasi Utama)
  * Kuning Emas: `#FFC220` (Aksen & Tombol Aksi Penting)
  * Putih: `#FFFFFF` (Ruang Bersih / *Negative Space* & Kontras)
  * Biru Navy: `#041E42` (Tipografi Judul & Elemen Kontras Tinggi)

---

## 🎯 2. Capaian & Tujuan Pembelajaran

Website edukasi ini dikembangkan untuk mendukung kompetensi Matematika kelas V SD dengan indikator capaian:
1. **Identifikasi Pembilang & Penyebut**: Siswa memahami posisi serta arti matematis dari pembilang (bagian yang diperhatikan) dan penyebut (total bagian utuh).
2. **Representasi Visual & Benda Konkret**: Siswa mampu memvisualisasikan pecahan melalui irisan pizza, pita pembagian, dan balok warna.
3. **Membandingkan & Mengurutkan Pecahan**: Siswa dapat menentukan tanda pertidaksamaan ($<$, $>$, $=$) serta mengurutkan pecahan dari terkecil ke terbesar.
4. **Konsep Pecahan Senilai**: Siswa menyadari bahwa pecahan berpenyebut beda dapat memiliki kuantitas setara (misal: $\frac{1}{2} = \frac{2}{4} = \frac{3}{6}$).
5. **Operasi Penjumlahan & Pengurangan**:
   * Pecahan berpenyebut sama: Menjumlahkan/mengurangkan pembilang tanpa mengubah penyebut.
   * Pecahan berpenyebut beda: Menyamakan penyebut melalui kelipatan persekutuan terkecil (KPK) terlebih dahulu.
6. **Pemecahan Masalah Nyata (Soal Cerita)**: Siswa menganalisis situasi kontekstual (menakar bahan kue, sisa pita, stok warung, dan pembagian hasil panen) secara sistematis.

---

## 🗺️ 3. Struktur Dunia Numeria & Wilayah Petualangan

Petualangan dibagi menjadi 4 wilayah berjenjang pada Peta Dunia 2D:

| Wilayah | Tema Lingkungan | Fokus Pembelajaran | Syarat Kelulusan |
| :--- | :--- | :--- | :--- |
| **1. Lembah Penemuan** | Padang rumput, kincir angin, panen kue gandum | Pengenalan pecahan, pembilang/penyebut, pizza interaktif, pita pembagian, dan pecahan senilai dasar (10 Soal). | Terbuka dari awal (Lulus jika skor $\ge 70$). |
| **2. Hutan Tantangan** | Hutan purba rimbun, tanaman obat herbal, mata air | Penjumlahan & pengurangan pecahan berpenyebut sama & beda, penyamaan penyebut, dan perhitungan sisa (10 Soal). | Terbuka setelah Lulus Level 1 (Skor $\ge 70$). |
| **3. Desa Kehidupan** | Pemukiman warga, toko roti, penjahit, kios pasar | Penerapan pecahan dalam soal cerita kontekstual kehidupan sehari-hari (10 Soal). | Terbuka setelah Lulus Level 2 (Skor $\ge 70$). |
| **4. Gerbang Pengetahuan** | Kuil kuno puncak gunung, portal kristal kebijaksanaan | Evaluasi komprehensif gabungan seluruh materi pecahan kelas V SD (5 Soal Pamungkas). | Terbuka setelah Lulus Level 3 (Skor $\ge 70$). |

---

## 📂 4. Struktur File Proyek

```text
math-adventure/
│
├── index.html                  # Dokumen utama antarmuka (Semua layar & modal)
├── README.md                   # Dokumentasi teknis & panduan guru / KKN
│
├── css/
│   ├── style.css               # Desain sistem warna, tipografi, grid responsif, cetak laporan
│   └── animations.css          # Animasi gerakan awan, karakter melayang, kristal, transisi
│
├── js/
│   ├── main.js                 # Orkestrator utama & event listener
│   ├── navigation.js           # Pengatur alur layar (Screen navigation & modal)
│   ├── game.js                 # Engine permainan, renderer soal, kalkulator skor anti-spam
│   ├── storage.js              # State manager, penyimpanan lokal & analisis diagnosis materi
│   ├── audio.js                # Sintesis Web Audio API (Chime, nada lembut salah, fanfare)
│   └── data/
│       └── questions.js        # Bank 35 soal terstruktur, kunci jawaban, dan pembahasan
│
└── assets/
    └── images/
        ├── logo.svg            # Lambang resmi Math Adventure (Emblem perisai kompas)
        ├── world-map.svg       # Peta Dunia Numeria 2D beresolusi tajam
        ├── character-guide.svg # Karakter Niko si Cermat
        ├── character-maya.svg  # Karakter Maya si Teliti
        ├── character-bima.svg  # Karakter Bima si Tangguh
        ├── valley-background.svg # Panorama latar Lembah Penemuan
        ├── forest-background.svg # Panorama latar Hutan Tantangan
        ├── village-background.svg# Panorama latar Desa Kehidupan
        └── final-gate-background.svg # Panorama latar Gerbang Pengetahuan
```

---

## 🚀 5. Cara Menjalankan Website

### A. Membuka Secara Langsung (Offline / Tanpa Server)
Website ini dirancang secara mandiri (*standalone*) tanpa dependensi eksternal:
1. Buka berkas direktori `math-adventure`.
2. Klik dua kali (*double click*) pada file `index.html`.
3. Website akan langsung terbuka di browser Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dsb.).
4. Semua aset gambar (SVG murni) dan efek audio (Web Audio API) akan berjalan lancar 100% tanpa kendala CORS atau file 404!

### B. Menjalankan via Local Web Server (Opsional)
Jika ingin menggunakan server lokal:
* **Menggunakan Node.js**:
  ```bash
  npx serve .
  # atau
  npx http-server .
  ```
* Buka peramban di alamat `http://localhost:3000` atau `http://localhost:8080`.

### C. Publikasi Daring Gratis (Hosting)
Website statis ini dapat langsung diunggah ke:
* **GitHub Pages**: Buat repositori baru, unggah file, aktifkan *Settings > Pages > Deploy from branch*.
* **Vercel / Netlify**: Seret (*drag-and-drop*) folder `math-adventure` ke dasbor Netlify Drop atau Vercel.

---

## 🎮 6. Alur & Panduan Memainkan Game

1. **Layar Loading**: Sistem memuat modul secara otomatis dalam ~1,5 detik.
2. **Halaman Beranda**: Klik **"Mulai Petualangan"** atau **"Cara Bermain"**.
3. **Identitas Siswa**:
   * Pilih karakter penjelajah: Niko (Si Cermat), Maya (Si Teliti), atau Bima (Si Tangguh).
   * Ketikkan nama siswa atau nama kelompok (misal: "Ahmad / Kelompok Melati").
   * Tersedia opsi *"Lanjut Tanpa Nama"* untuk siswa anonim.
4. **Tutorial Interaktif**: Panduan 4 langkah mengenai navigasi peta, membaca materi, menyelesaikan teka-teki, dan syarat KKM 70 poin.
5. **Peta Dunia**: Klik pin **Lembah Penemuan** (Level 1) untuk membuka jendela *briefing*.
6. **Mempelajari Materi**: Siswa membaca konsep singkat dan mengamati contoh pecahan sebelum memulai misi.
7. **Menyelesaikan Soal**:
   * **Irisan Pizza Interaktif**: Siswa dapat mengklik potongan pizza untuk memvisualisasikan pembagian pecahan.
   * **Pita Pecahan**: Mengklik segmen meteran pita.
   * **Pilihan Ganda Bernalar**: Memilih opsi jawaban yang tepat.
   * **Umpan Balik Seketika**: Jawaban benar mendapatkan konfirmasi gembira (+10 poin). Jawaban salah disertai bimbingan langkah demi langkah yang ramah dan memotivasi tanpa pesan merendahkan.
8. **Kelulusan Level**:
   * Jika skor $\ge 70$, siswa dinyatakan LULUS dan wilayah berikutnya di peta akan terbuka otomatis.
   * Jika skor $< 70$, siswa disarankan membaca kembali materi dan mengklik tombol *"Ulangi Level Ini"*.
9. **Tantangan Akhir & Gerbang Pengetahuan**: Menyelesaikan 5 soal evaluasi gabungan untuk membuka portal kebijaksanaan.
10. **Laporan Akhir Petualangan**:
    * Menampilkan total skor, persentase akurasi, dan status petualangan.
    * Mendiagnosis **Materi yang Telah Dikuasai** vs **Materi yang Perlu Dipelajari Kembali**.
    * Tombol **"Lihat Pembahasan Lengkap"**: Menampilkan seluruh 35 soal beserta jawaban siswa dan pembahasannya.
    * Tombol **"Cetak / Simpan Laporan (PDF)"**: Menghasilkan lembar evaluasi resmi yang rapi untuk arsip guru dan laporan KKN.
    * Tombol **"Sesi Baru"**: Mengosongkan data agar laptop dapat langsung digunakan bergantian oleh siswa lain.

---

## ✏️ 7. Panduan Menambah atau Mengubah Soal

Seluruh bank soal tersimpan rapi dan terpisah dari kode tampilan di dalam file [`js/data/questions.js`](file:///C:/Users/USERR/.gemini/antigravity/scratch/math-adventure/js/data/questions.js).

Untuk menambahkan atau memperbarui soal:
1. Buka berkas `js/data/questions.js` menggunakan teks editor (VS Code, Notepad, dsb.).
2. Ikuti struktur objek pertanyaan standar berikut:
   ```javascript
   {
     id: "L1-Q11", // ID unik soal
     level: 1,      // 1: Lembah, 2: Hutan, 3: Desa, 4: Gerbang Akhir
     indicator: "Menyelesaikan perbandingan pecahan sederhana",
     topic: "perbandingan", // Kategori: 'identifikasi' | 'senilai' | 'perbandingan' | 'operasi' | 'cerita'
     type: "choice",        // 'choice' | 'interactive-pizza' | 'interactive-bar' | 'sort'
     question: "Teks pertanyaan dalam bahasa Indonesia yang ramah anak...",
     options: [
       { id: "A", text: "Pilihan A", isCorrect: true },
       { id: "B", text: "Pilihan B", isCorrect: false },
       { id: "C", text: "Pilihan C", isCorrect: false },
       { id: "D", text: "Pilihan D", isCorrect: false }
     ],
     explanation: "Penjelasan matematis langkah demi langkah mengapa A benar...",
     points: 10
   }
   ```
3. Simpan berkas, dan soal baru akan langsung terintegrasi secara otomatis ke dalam game!

---

## 🔬 8. Laporan Hasil Pengujian Fungsional & Pedagogis

Seluruh alur aplikasi telah diuji secara menyeluruh (*End-to-End Automated Browser Testing*) pada peramban Microsoft Edge Engine via DevTools Protocol:

| Parameter Pengujian | Prosedur Uji | Hasil Aktual | Status |
| :--- | :--- | :--- | :---: |
| **Pemuatan Awal** | Uji transisi otomatis loading screen ke landing page | Transisi mulus dalam 1,5 detik tanpa macet | **PASS** |
| **Formulir Siswa** | Input nama pemain & pemilihan avatar (Niko, Maya, Bima) | Nama tersimpan di state sesi dan header terbarui | **PASS** |
| **Navigasi Tutorial** | Melangkah maju-mundur dan melewati (*skip*) tutorial | Berpindah ke peta tanpa error | **PASS** |
| **Mekanisme Peta** | Memeriksa keterbukaan Level 1 dan penguncian Level 2–4 | Level 1 terbuka, Level 2–4 terkunci dengan modal syarat | **PASS** |
| **Anti-Double Click** | Melakukan 5x klik cepat pada opsi jawaban | Skor hanya bertambah 1x (10 poin) dan tombol ter-disable | **PASS** |
| **Skenario Gagal KKM** | Siswa hanya menjawab benar 4 dari 10 soal (Skor 40) | Level 2 tetap terkunci, tombol "Ulangi Level" muncul | **PASS** |
| **Skenario Mengulang** | Siswa mengulang level dan meraih skor 80 ($\ge 70$) | Skor ter-update, Level 2 terbuka secara dinamis | **PASS** |
| **Alur Penuh (35 Soal)**| Menyelesaikan Level 1, 2, 3, dan Tantangan Akhir | Semua soal terjawab, skor 350/350, akurasi 100% | **PASS** |
| **Laporan Akhir** | Validasi ringkasan diagnosis materi & modal pembahasan | 35 soal tampil lengkap dengan pembahasan mendalam | **PASS** |
| **Stabilitas Teknis** | Pemindaian pesan konsol runtime JavaScript | **0 JavaScript Errors**, 0 broken assets | **PASS** |

---

## 💡 9. Rekomendasi Pengembangan Lebih Lanjut (Untuk KKN)

1. **Uji Validasi Ahli**: Menyerahkan instrumen validasi media dan materi kepada Dosen Pembimbing Lapangan (DPL) serta Guru Kelas V SD Muhammadiyah untuk lembar pengesahan KKN.
2. **Pre-test & Post-test**: Memanfaatkan bank soal ini sebagai instrumen tes awal (*pre-test*) sebelum bermain dan tes akhir (*post-test*) setelah bermain guna mengukur signifikansi peningkatan hasil belajar (*N-Gain score*).
3. **Papan Peringkat Kelas (Opsional)**: Jika pihak sekolah menyediakan koneksi internet stabil, sistem dapat dikembangkan dengan Firebase / Google Sheets API untuk menampilkan papan skor kelas.
