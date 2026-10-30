/**
 * MATH ADVENTURE - DUNIA NUMERIA
 * Bank Soal & Materi Pembelajaran Kelas V SD Muhammadiyah
 * 
 * Standar Kompetensi: Pecahan (Fractions)
 * Indikator:
 * 1. Mengidentifikasi pembilang dan penyebut.
 * 2. Representasi visual pecahan (benda konkret: pizza, kue, pita).
 * 3. Membandingkan dan mengurutkan pecahan.
 * 4. Pecahan senilai melalui representasi visual & matematis.
 * 5. Operasi penjumlahan dan pengurangan pecahan (penyebut sama & beda).
 * 6. Pemecahan masalah sehari-hari dengan pecahan.
 */

const GAME_DATA = {
  levels: {
    1: {
      id: 1,
      name: "Lembah Penemuan",
      subtitle: "Pengenalan Pecahan & Representasi Visual",
      theme: "valley",
      badge: "Lencana Penemu Numeria",
      passingScore: 70,
      totalQuestions: 10,
      story: {
        title: "Kabar dari Penduduk Lembah Penemuan",
        intro: "Selamat datang di Lembah Penemuan! Musim panen telah tiba di padang rumput hijau Numeria. Para penduduk sedang membagi hasil panen kue gandum, buah, dan pita warna-warni untuk pesta desa. Namun, mereka bingung membaginya secara adil!",
        mission: "Bantulah Niko si Penjelajah untuk membagikan benda secara adil, mengenali bagian pembilang dan penyebut, serta memahami pecahan senilai agar pesta panen dapat terlaksana dengan gembira."
      },
      materi: {
        title: "Materi Singkat: Mengenal Pecahan",
        sections: [
          {
            heading: "Apa Itu Pecahan?",
            content: "Pecahan adalah bagian dari suatu keseluruhan yang dibagi menjadi bagian-bagian yang <strong>sama besar</strong>.",
            visualType: "fraction-concept",
            fraction: { num: 3, den: 8 }
          },
          {
            heading: "Pembilang dan Penyebut",
            content: "Pecahan dituliskan dalam bentuk <strong>a/b</strong>:<br>• <strong>Pembilang (angka atas)</strong>: menunjukkan berapa banyak bagian yang diambil atau diperhatikan.<br>• <strong>Penyebut (angka bawah)</strong>: menunjukkan jumlah seluruh potongan yang sama besar.",
            visualType: "numerator-denominator"
          },
          {
            heading: "Membandingkan & Mengurutkan",
            content: "• Jika <em>penyebut sama</em>, pecahan dengan pembilang lebih besar memiliki nilai lebih besar (contoh: 5/7 > 3/7).<br>• Jika <em>pembilang sama</em>, pecahan dengan penyebut lebih kecil justru memiliki potongan yang lebih besar (contoh: 1/3 > 1/6).",
            visualType: "compare-preview"
          },
          {
            heading: "Pecahan Senilai",
            content: "Dua pecahan disebut senilai jika keduanya mewakili luas atau nilai yang sama, meskipun angka pembilang dan penyebutnya berbeda. Contoh: <strong>1/2 senilai dengan 2/4</strong>.",
            visualType: "equivalent-preview"
          }
        ]
      }
    },
    2: {
      id: 2,
      name: "Hutan Tantangan",
      subtitle: "Operasi Penjumlahan & Pengurangan Pecahan",
      theme: "forest",
      badge: "Lencana Penjelajah Hutan",
      passingScore: 70,
      totalQuestions: 10,
      story: {
        title: "Misi Ramuan di Hutan Tantangan",
        intro: "Kalian telah memasuki Hutan Tantangan yang rimbun! Penjaga hutan membutuhkan bantuan untuk menakar cairan ramuan obat herbal dan persediaan air bersih dari mata air kristal.",
        mission: "Selesaikan operasi penjumlahan dan pengurangan pecahan. Hati-hati, jika penyebutnya berbeda, kalian harus menyamakan penyebutnya terlebih dahulu sebelum menghitung!"
      },
      materi: {
        title: "Materi Singkat: Operasi Pecahan",
        sections: [
          {
            heading: "Penjumlahan & Pengurangan Penyebut Sama",
            content: "Jika penyebut kedua pecahan sudah sama, cukup jumlahkan atau kurangkan <strong>pembilangnya saja</strong>. Penyebutnya <em>tetap sama</em> (tidak dijumlahkan!).<br>Contoh: <strong>2/5 + 1/5 = 3/5</strong>.",
            visualType: "same-den-calc"
          },
          {
            heading: "Menyamakan Penyebut Berbeda",
            content: "Jika penyebutnya berbeda, cari KPK (Kelipatan Persekutuan Terkecil) untuk mengubah pecahan menjadi pecahan senilai.<br>Contoh: <strong>1/2 + 1/4</strong><br>Ubah 1/2 menjadi <strong>2/4</strong>, lalu hitung: <strong>2/4 + 1/4 = 3/4</strong>.",
            visualType: "diff-den-calc"
          },
          {
            heading: "Pengurangan Pecahan",
            content: "Aturannya sama seperti penjumlahan:<br>1. Samakan penyebut terlebih dahulu.<br>2. Kurangkan pembilangnya.<br>3. Tuliskan hasil akhir (sederhanakan jika memungkinkan).",
            visualType: "subtraction-calc"
          }
        ]
      }
    },
    3: {
      id: 3,
      name: "Desa Kehidupan",
      subtitle: "Penerapan Pecahan dalam Kehidupan Sehari-hari",
      theme: "village",
      badge: "Lencana Sahabat Warga",
      passingScore: 70,
      totalQuestions: 10,
      story: {
        title: "Keriuhan di Pasar Desa Kehidupan",
        intro: "Desa Kehidupan adalah pusat kegiatan penduduk Numeria! Di sini ada toko roti, penjahit baju, kios bahan pangan, dan perkebunan buah yang ramai.",
        mission: "Terapkan kemampuan Matematikamu untuk memecahkan soal cerita nyata: menimbang bahan kue, mengukur pita kain, menghitung sisa beras, dan membagi buah segar bersama warga."
      },
      materi: {
        title: "Materi Singkat: Langkah Menyelesaikan Soal Cerita",
        sections: [
          {
            heading: "1. Temukan Informasi yang Diketahui",
            content: "Baca soal secara cermat dan catat pecahan-pecahan yang disebutkan beserta keterangannya (misal: panjang awal pita, tepung yang digunakan).",
            visualType: "step-known"
          },
          {
            heading: "2. Tentukan Operasi yang Tepat",
            content: "• Kata kunci <em>'membeli lagi', 'digabung', 'seluruhnya'</em> biasanya menandakan <strong>penjumlahan (+)</strong>.<br>• Kata kunci <em>'digunakan', 'sisa', 'diberikan', 'selisih'</em> menandakan <strong>pengurangan (-)</strong>.",
            visualType: "step-operation"
          },
          {
            heading: "3. Hitung dan Periksa Kembali",
            content: "Selesaikan perhitungan langkah demi langkah. Pastikan satuannya sesuai (misal: meter, kg, liter) dan periksa apakah hasil akhir masuk akal.",
            visualType: "step-check"
          }
        ]
      }
    },
    4: {
      id: 4,
      name: "Gerbang Pengetahuan",
      subtitle: "Tantangan Akhir Evaluasi Menyeluruh",
      theme: "gate",
      badge: "Kunci Kristal Kebijaksanaan",
      passingScore: 70, // 35 out of 50 (70%)
      totalQuestions: 5,
      story: {
        title: "Pintu Masuk Puncak Pengetahuan",
        intro: "Selamat! Kalian telah mencapai Gerbang Pengetahuan di puncak Dunia Numeria. Gerbang kuno ini terkunci oleh kekuatan teka-teki pecahan mistis.",
        mission: "Pecahkan 5 teka-teki pamungkas yang menggabungkan seluruh konsep yang telah kalian pelajari dari Lembah, Hutan, hingga Desa untuk membuka gerbang keabadian ilmu pengetahuan!"
      },
      materi: {
        title: "Persiapan Tantangan Akhir",
        sections: [
          {
            heading: "Kombinasi Seluruh Keahlian",
            content: "Tantangan akhir ini menguji pemahaman konsep, pecahan senilai, perbandingan urutan, operasi hitung, hingga penalaran soal cerita. Berpikirlah tenang dan teliti!",
            visualType: "final-ready"
          }
        ]
      }
    }
  },

  questions: [
    // ==========================================
    // LEVEL 1: LEMBAH PENEMUAN (10 Soal)
    // ==========================================
    {
      id: "L1-Q1",
      level: 1,
      indicator: "Mengidentifikasi pecahan dari representasi benda konkret (pizza)",
      topic: "identifikasi",
      type: "interactive-pizza",
      totalSlices: 8,
      targetSlices: 3,
      question: "Sebuah pizza lezat dipotong menjadi 8 bagian sama besar. Niko memakan 3 bagian potongannya. Klik 3 potong pizza pada gambar interaktif di bawah, lalu pilih pecahan yang tepat untuk bagian pizza yang dimakan!",
      options: [
        { id: "A", text: "3/8", isCorrect: true },
        { id: "B", text: "5/8", isCorrect: false },
        { id: "C", text: "3/5", isCorrect: false },
        { id: "D", text: "8/3", isCorrect: false }
      ],
      explanation: "Pizza tersebut dibagi menjadi 8 bagian sama besar (penyebut = 8). Bagian yang dimakan adalah 3 bagian (pembilang = 3). Oleh karena itu, pecahan yang mewakili bagian yang dimakan adalah 3/8.",
      points: 10
    },
    {
      id: "L1-Q2",
      level: 1,
      indicator: "Menentukan letak pembilang dan penyebut pada pecahan",
      topic: "identifikasi",
      type: "choice",
      visual: "fraction-box",
      visualData: { fraction: "5/9", label: "Perhatikan letak angka atas dan bawah" },
      question: "Pada pecahan 5/9, angka 5 disebut sebagai ... dan angka 9 disebut sebagai ...",
      options: [
        { id: "A", text: "Pembilang dan Penyebut", isCorrect: true },
        { id: "B", text: "Penyebut dan Pembilang", isCorrect: false },
        { id: "C", text: "Pembagi dan Pengali", isCorrect: false },
        { id: "D", text: "Sisa dan Hasil Bagi", isCorrect: false }
      ],
      explanation: "Dalam pecahan a/b, angka di bagian atas (5) adalah 'pembilang' (menunjukkan jumlah bagian yang diperhatikan), sedangkan angka di bagian bawah (9) adalah 'penyebut' (menunjukkan total seluruh potongan yang sama besar).",
      points: 10
    },
    {
      id: "L1-Q3",
      level: 1,
      indicator: "Representasi pecahan pada pita pembagian",
      topic: "identifikasi",
      type: "interactive-bar",
      totalBars: 4,
      targetBars: 3,
      question: "Sebuah pita pembatas sepanjang 1 meter dipotong menjadi 4 bagian sama panjang. Tiga bagian pita diwarnai kuning untuk menghias tenda. Pecahan yang menyatakan bagian pita berwarna kuning adalah ...",
      options: [
        { id: "A", text: "3/4 meter", isCorrect: true },
        { id: "B", text: "1/4 meter", isCorrect: false },
        { id: "C", text: "4/3 meter", isCorrect: false },
        { id: "D", text: "3/1 meter", isCorrect: false }
      ],
      explanation: "Pita dibagi menjadi 4 bagian sama panjang, sehingga penyebutnya adalah 4. Sebanyak 3 bagian diberi warna, sehingga pembilangnya adalah 3. Pecahannya adalah 3/4 meter.",
      points: 10
    },
    {
      id: "L1-Q4",
      level: 1,
      indicator: "Membandingkan dua pecahan dengan penyebut sama",
      topic: "perbandingan",
      type: "choice",
      visual: "comparison-bars",
      visualData: { frac1: "3/7", frac2: "5/7", den: 7 },
      question: "Bandingkan kedua pecahan berikut: 3/7 ... 5/7. Manakah tanda pertidaksamaan yang tepat untuk mengisi titik-titik tersebut?",
      options: [
        { id: "A", text: "< (lebih kecil)", isCorrect: true },
        { id: "B", text: "> (lebih besar)", isCorrect: false },
        { id: "C", text: "= (sama dengan)", isCorrect: false },
        { id: "D", text: "≥ (lebih besar sama dengan)", isCorrect: false }
      ],
      explanation: "Karena kedua pecahan memiliki penyebut yang sama (7), kita cukup membandingkan pembilangnya: 3 lebih kecil dari 5 (3 < 5). Jadi, 3/7 < 5/7.",
      points: 10
    },
    {
      id: "L1-Q5",
      level: 1,
      indicator: "Membandingkan dua pecahan dengan pembilang sama (1/3 vs 1/6)",
      topic: "perbandingan",
      type: "choice",
      visual: "comparison-circles",
      visualData: { frac1: "1/3", frac2: "1/6" },
      question: "Bima memiliki 1/3 loyang martabak, sedangkan Maya memiliki 1/6 loyang martabak yang berukuran sama. Pernyataan perbandingan berikut yang BENAR adalah ...",
      options: [
        { id: "A", text: "1/3 > 1/6 (Martabak Bima lebih besar)", isCorrect: true },
        { id: "B", text: "1/3 < 1/6 (Martabak Maya lebih besar)", isCorrect: false },
        { id: "C", text: "1/3 = 1/6 (Martabak keduanya sama besar)", isCorrect: false },
        { id: "D", text: "Tidak dapat dibandingkan karena angka penyebut beda", isCorrect: false }
      ],
      explanation: "Ketika pembilang sama (keduanya 1), pecahan dengan penyebut lebih kecil memiliki potongan yang lebih besar karena benda hanya dibagi menjadi 3 bagian, bukan 6 bagian. Jadi 1/3 > 1/6.",
      points: 10
    },
    {
      id: "L1-Q6",
      level: 1,
      indicator: "Mengurutkan pecahan dari nilai terkecil ke terbesar",
      topic: "perbandingan",
      type: "sort",
      items: ["4/9", "1/9", "7/9", "2/9"],
      correctOrder: ["1/9", "2/9", "4/9", "7/9"],
      question: "Susunlah kartu-kartu pecahan berikut mulai dari nilai TERKECIL hingga TERBESAR!",
      options: [
        { id: "A", text: "1/9, 2/9, 4/9, 7/9", isCorrect: true },
        { id: "B", text: "7/9, 4/9, 2/9, 1/9", isCorrect: false },
        { id: "C", text: "1/9, 4/9, 2/9, 7/9", isCorrect: false },
        { id: "D", text: "2/9, 1/9, 4/9, 7/9", isCorrect: false }
      ],
      explanation: "Semua pecahan berpenyebut 9. Untuk mengurutkannya dari yang terkecil, urutkan pembilangnya: 1 < 2 < 4 < 7. Urutan yang benar adalah 1/9, 2/9, 4/9, 7/9.",
      points: 10
    },
    {
      id: "L1-Q7",
      level: 1,
      indicator: "Memahami pecahan senilai melalui representasi visual",
      topic: "senilai",
      type: "choice",
      visual: "equivalent-bars",
      visualData: { base: "1/2", match: "2/4" },
      question: "Perhatikan visual balok pecahan. Pecahan 1/2 memiliki luas daerah yang setara dengan pecahan ...",
      options: [
        { id: "A", text: "2/4", isCorrect: true },
        { id: "B", text: "1/4", isCorrect: false },
        { id: "C", text: "2/3", isCorrect: false },
        { id: "D", text: "3/8", isCorrect: false }
      ],
      explanation: "Jika 1 balok dibagi menjadi 2 dan diambil 1 bagian (1/2), luasnya persis sama dengan balok yang dibagi menjadi 4 dan diambil 2 bagian (2/4). Jadi, 1/2 = 2/4.",
      points: 10
    },
    {
      id: "L1-Q8",
      level: 1,
      indicator: "Menentukan pecahan senilai dengan mengalikan pembilang dan penyebut",
      topic: "senilai",
      type: "choice",
      visual: "math-step",
      visualData: { expr: "(2 × 3) / (3 × 3)" },
      question: "Pecahan yang senilai dengan 2/3 jika pembilang dan penyebutnya sama-sama dikalikan 3 adalah ...",
      options: [
        { id: "A", text: "6/9", isCorrect: true },
        { id: "B", text: "5/6", isCorrect: false },
        { id: "C", text: "6/6", isCorrect: false },
        { id: "D", text: "4/9", isCorrect: false }
      ],
      explanation: "Untuk mencari pecahan senilai, kalikan pembilang dan penyebut dengan bilangan yang sama: Pembilang: 2 × 3 = 6. Penyebut: 3 × 3 = 9. Hasilnya adalah 6/9.",
      points: 10
    },
    {
      id: "L1-Q9",
      level: 1,
      indicator: "Menyederhanakan pecahan dari gambar kotak arsir",
      topic: "senilai",
      type: "choice",
      visual: "grid-ten",
      visualData: { shaded: 6, total: 10 },
      question: "Sebuah ubin lantai di lumbung lembah dibagi menjadi 10 kotak sama besar. Sebanyak 6 kotak telah diarsir biru (6/10). Bentuk pecahan paling sederhana dari bagian berarsir tersebut adalah ...",
      options: [
        { id: "A", text: "3/5", isCorrect: true },
        { id: "B", text: "2/5", isCorrect: false },
        { id: "C", text: "1/5", isCorrect: false },
        { id: "D", text: "6/5", isCorrect: false }
      ],
      explanation: "Pecahan 6/10 dapat disederhanakan dengan membagi pembilang dan penyebutnya dengan angka 2: (6 ÷ 2) / (10 ÷ 2) = 3/5.",
      points: 10
    },
    {
      id: "L1-Q10",
      level: 1,
      indicator: "Menjelaskan alasan mendasar konsep pecahan senilai",
      topic: "senilai",
      type: "choice",
      question: "Mengapa pecahan 2/4 dan 4/8 disebut sebagai pecahan yang senilai?",
      options: [
        { id: "A", text: "Karena jika digambar pada benda utuh berukuran sama, luas bagiannya setara", isCorrect: true },
        { id: "B", text: "Karena kedua pecahan memiliki pembilang yang sama", isCorrect: false },
        { id: "C", text: "Karena angka penyebutnya selalu bernilai ganjil", isCorrect: false },
        { id: "D", text: "Karena nilainya berubah saat dibagi", isCorrect: false }
      ],
      explanation: "Dua pecahan disebut senilai karena walaupun pembagian potongannya berbeda, nilai atau luas daerah keseluruhan yang diwakilinya adalah sama persis.",
      points: 10
    },

    // ==========================================
    // LEVEL 2: HUTAN TANTANGAN (10 Soal)
    // ==========================================
    {
      id: "L2-Q1",
      level: 2,
      indicator: "Penjumlahan dua pecahan dengan penyebut sama",
      topic: "operasi",
      type: "choice",
      visual: "addition-bars",
      visualData: { frac1: "2/5", frac2: "1/5", result: "3/5" },
      question: "Rani memiliki 2/5 meter pita hias. Di tengah perjalanan hutan, ia menemukan lagi 1/5 meter pita sejenis. Berapakah panjang total pita Rani sekarang?",
      options: [
        { id: "A", text: "3/5 meter", isCorrect: true },
        { id: "B", text: "2/10 meter", isCorrect: false },
        { id: "C", text: "3/10 meter", isCorrect: false },
        { id: "D", text: "1/5 meter", isCorrect: false }
      ],
      explanation: "Karena penyebutnya sudah sama (5), kita cukup menjumlahkan pembilangnya: 2/5 + 1/5 = (2 + 1)/5 = 3/5 meter. Penyebut tidak boleh dijumlahkan!",
      points: 10
    },
    {
      id: "L2-Q2",
      level: 2,
      indicator: "Pengurangan dua pecahan dengan penyebut sama",
      topic: "operasi",
      type: "choice",
      visual: "subtraction-bars",
      visualData: { start: "7/8", take: "4/8", rem: "3/8" },
      question: "Sebuah gentong kayu persediaan di pos hutan mula-mula berisi 7/8 bagian air. Niko menggunakan 4/8 bagian untuk menyiram bibit tanaman obat. Berapa bagian air yang tersisa di gentong?",
      options: [
        { id: "A", text: "3/8 bagian", isCorrect: true },
        { id: "B", text: "11/8 bagian", isCorrect: false },
        { id: "C", text: "3/0 bagian", isCorrect: false },
        { id: "D", text: "3/16 bagian", isCorrect: false }
      ],
      explanation: "Karena penyebutnya sama (8), kurangkan pembilangnya: 7/8 - 4/8 = (7 - 4)/8 = 3/8 bagian air.",
      points: 10
    },
    {
      id: "L2-Q3",
      level: 2,
      indicator: "Menentukan langkah awal menyamakan penyebut yang berbeda",
      topic: "operasi",
      type: "choice",
      question: "Niko ingin menjumlahkan 1/2 + 1/4. Langkah pertama yang paling tepat adalah ...",
      options: [
        { id: "A", text: "Menyamakan penyebut menjadi 4, sehingga 1/2 diubah menjadi 2/4", isCorrect: true },
        { id: "B", text: "Langsung menjumlahkan atas dan bawah: (1+1)/(2+4) = 2/6", isCorrect: false },
        { id: "C", text: "Mengalikan angka penyebut dengan pembilang", isCorrect: false },
        { id: "D", text: "Mengurangkan penyebut 4 dengan penyebut 2", isCorrect: false }
      ],
      explanation: "Sebelum menjumlahkan pecahan dengan penyebut berbeda, penyebut harus disamakan terlebih dahulu menggunakan KPK dari 2 dan 4, yaitu 4. Pecahan 1/2 senilai dengan (1×2)/(2×2) = 2/4.",
      points: 10
    },
    {
      id: "L2-Q4",
      level: 2,
      indicator: "Menyelesaikan penjumlahan pecahan berpenyebut beda (1/2 + 1/4)",
      topic: "operasi",
      type: "choice",
      visual: "math-step",
      visualData: { step1: "1/2 = 2/4", step2: "2/4 + 1/4 = 3/4" },
      question: "Berapakah hasil dari penjumlahan 1/2 + 1/4 ?",
      options: [
        { id: "A", text: "3/4", isCorrect: true },
        { id: "B", text: "2/6", isCorrect: false },
        { id: "C", text: "2/4", isCorrect: false },
        { id: "D", text: "1/8", isCorrect: false }
      ],
      explanation: "Samakan penyebutnya: 1/2 = 2/4. Lalu jumlahkan dengan 1/4: 2/4 + 1/4 = 3/4.",
      points: 10
    },
    {
      id: "L2-Q5",
      level: 2,
      indicator: "Menyelesaikan pengurangan pecahan berpenyebut beda (3/4 - 1/2)",
      topic: "operasi",
      type: "choice",
      visual: "math-step",
      visualData: { step1: "1/2 = 2/4", step2: "3/4 - 2/4 = 1/4" },
      question: "Berapakah hasil dari pengurangan pecahan: 3/4 - 1/2 ?",
      options: [
        { id: "A", text: "1/4", isCorrect: true },
        { id: "B", text: "2/2", isCorrect: false },
        { id: "C", text: "2/4", isCorrect: false },
        { id: "D", text: "1/2", isCorrect: false }
      ],
      explanation: "Ubah 1/2 menjadi pecahan berpenyebut 4, yaitu 2/4. Kemudian kurangkan: 3/4 - 2/4 = 1/4.",
      points: 10
    },
    {
      id: "L2-Q6",
      level: 2,
      indicator: "Penjumlahan pecahan berpenyebut beda (1/3 + 1/6)",
      topic: "operasi",
      type: "choice",
      visual: "math-step",
      visualData: { step1: "1/3 = 2/6", step2: "2/6 + 1/6 = 3/6 = 1/2" },
      question: "Hasil penjumlahan dari 1/3 + 1/6 adalah ... (Petunjuk: Ubah 1/3 menjadi per enam)",
      options: [
        { id: "A", text: "3/6 (senilai dengan 1/2)", isCorrect: true },
        { id: "B", text: "2/9", isCorrect: false },
        { id: "C", text: "1/9", isCorrect: false },
        { id: "D", text: "2/6", isCorrect: false }
      ],
      explanation: "Penyebut disamakan menjadi 6. Karena 1/3 = 2/6, maka 2/6 + 1/6 = 3/6. Jika disederhanakan, 3/6 sama dengan 1/2.",
      points: 10
    },
    {
      id: "L2-Q7",
      level: 2,
      indicator: "Pengurangan pecahan berpenyebut beda (5/6 - 1/3)",
      topic: "operasi",
      type: "choice",
      visual: "math-step",
      visualData: { step1: "1/3 = 2/6", step2: "5/6 - 2/6 = 3/6 = 1/2" },
      question: "Berapakah hasil dari 5/6 - 1/3 ?",
      options: [
        { id: "A", text: "3/6 (senilai dengan 1/2)", isCorrect: true },
        { id: "B", text: "4/3", isCorrect: false },
        { id: "C", text: "4/6", isCorrect: false },
        { id: "D", text: "1/3", isCorrect: false }
      ],
      explanation: "Ubah 1/3 menjadi pecahan berpenyebut 6, yaitu 2/6. Lalu lakukan pengurangan: 5/6 - 2/6 = 3/6 = 1/2.",
      points: 10
    },
    {
      id: "L2-Q8",
      level: 2,
      indicator: "Operasi penjumlahan pecahan dalam konteks penjelajahan hutan",
      topic: "operasi",
      type: "choice",
      question: "Bima mengumpulkan 2/7 kg biji kenari di pagi hari dan 3/7 kg biji kenari di sore hari. Berat total biji kenari yang dikumpulkan Bima adalah ...",
      options: [
        { id: "A", text: "5/7 kg", isCorrect: true },
        { id: "B", text: "5/14 kg", isCorrect: false },
        { id: "C", text: "6/7 kg", isCorrect: false },
        { id: "D", text: "1/7 kg", isCorrect: false }
      ],
      explanation: "Penyebut kedua pecahan sama (7): 2/7 kg + 3/7 kg = (2 + 3)/7 kg = 5/7 kg.",
      points: 10
    },
    {
      id: "L2-Q9",
      level: 2,
      indicator: "Pengurangan dari bilangan bulat 1 utuh (1 - 2/5)",
      topic: "operasi",
      type: "choice",
      visual: "whole-fraction",
      visualData: { whole: "1 = 5/5", minus: "2/5", result: "3/5" },
      question: "Sebuah buah melon hutan yang masih utuh bernilai 1 (dapat ditulis 5/5). Jika hewan kancil memakan 2/5 bagian, berapakah sisa buah melon tersebut?",
      options: [
        { id: "A", text: "3/5 bagian", isCorrect: true },
        { id: "B", text: "2/5 bagian", isCorrect: false },
        { id: "C", text: "1/5 bagian", isCorrect: false },
        { id: "D", text: "4/5 bagian", isCorrect: false }
      ],
      explanation: "Satu buah utuh diubah menjadi pecahan dengan penyebut 5, yaitu 5/5. Maka: 5/5 - 2/5 = 3/5 bagian.",
      points: 10
    },
    {
      id: "L2-Q10",
      level: 2,
      indicator: "Penjumlahan tiga pecahan sederhana berpenyebut sama",
      topic: "operasi",
      type: "choice",
      question: "Berapakah hasil penjumlahan dari 1/8 + 2/8 + 3/8 ?",
      options: [
        { id: "A", text: "6/8 (senilai dengan 3/4)", isCorrect: true },
        { id: "B", text: "6/24", isCorrect: false },
        { id: "C", text: "5/8", isCorrect: false },
        { id: "D", text: "7/8", isCorrect: false }
      ],
      explanation: "Karena ketiga pecahan memiliki penyebut yang sama (8), jumlahkan semua pembilangnya: (1 + 2 + 3)/8 = 6/8. Pecahan 6/8 jika disederhanakan dengan membagi 2 adalah 3/4.",
      points: 10
    },

    // ==========================================
    // LEVEL 3: DESA KEHIDUPAN (10 Soal)
    // ==========================================
    {
      id: "L3-Q1",
      level: 3,
      indicator: "Pemecahan masalah: sisa bahan tepung terigu",
      topic: "cerita",
      type: "choice",
      visual: "recipe-card",
      visualData: { item: "Tepung Terigu", awal: "3/4 kg", dipakai: "1/4 kg" },
      question: "Ibu pembuat roti di Desa Kehidupan mempunyai 3/4 kg tepung terigu. Sebanyak 1/4 kg tepung digunakan untuk membuat kue bolu madu. Berapa kilogram tepung terigu yang tersisa di toples?",
      options: [
        { id: "A", text: "2/4 kg (atau 1/2 kg)", isCorrect: true },
        { id: "B", text: "1/4 kg", isCorrect: false },
        { id: "C", text: "3/8 kg", isCorrect: false },
        { id: "D", text: "4/4 kg", isCorrect: false }
      ],
      explanation: "Tepung awal = 3/4 kg. Digunakan = 1/4 kg. Sisa tepung dihitung dengan pengurangan: 3/4 - 1/4 = 2/4 kg. Dalam bentuk paling sederhana, 2/4 kg sama dengan 1/2 kg.",
      points: 10
    },
    {
      id: "L3-Q2",
      level: 3,
      indicator: "Pemecahan masalah: menggabungkan panjang dua jenis pita",
      topic: "cerita",
      type: "choice",
      visual: "ribbon-combine",
      visualData: { ribbon1: "2/3 meter (merah)", ribbon2: "1/6 meter (putih)" },
      question: "Penjahit Maya membeli pita merah sepanjang 2/3 meter dan pita putih sepanjang 1/6 meter untuk menghias umbul-umbul desa. Berapakah panjang seluruh pita yang dibeli Maya?",
      options: [
        { id: "A", text: "5/6 meter", isCorrect: true },
        { id: "B", text: "3/9 meter", isCorrect: false },
        { id: "C", text: "3/6 meter", isCorrect: false },
        { id: "D", text: "1 meter", isCorrect: false }
      ],
      explanation: "Hitung total pita: 2/3 + 1/6. Samakan penyebut menjadi 6: 2/3 = 4/6. Jadi 4/6 + 1/6 = 5/6 meter pita.",
      points: 10
    },
    {
      id: "L3-Q3",
      level: 3,
      indicator: "Pemecahan masalah: sisa persediaan beras/gula di warung",
      topic: "cerita",
      type: "choice",
      question: "Warung Bu Siti memiliki persediaan gula pasir sebanyak 4/5 karung. Pada pagi hari, pembeli telah membeli 2/5 karung gula tersebut. Berapakah sisa persediaan gula di warung Bu Siti?",
      options: [
        { id: "A", text: "2/5 karung", isCorrect: true },
        { id: "B", text: "6/5 karung", isCorrect: false },
        { id: "C", text: "2/10 karung", isCorrect: false },
        { id: "D", text: "1/5 karung", isCorrect: false }
      ],
      explanation: "Persediaan awal dikurangi yang terjual: 4/5 - 2/5 = (4 - 2)/5 = 2/5 karung gula.",
      points: 10
    },
    {
      id: "L3-Q4",
      level: 3,
      indicator: "Pemecahan masalah: pembagian hasil panen buah",
      topic: "cerita",
      type: "choice",
      question: "Pak Darto membagikan hasil panen jeruk manis dari kebunnya: 1/8 bagian diberikan kepada tetangga dan 3/8 bagian diberikan kepada kerabat keluarga. Berapa bagian jeruk yang sudah dibagikan seluruhnya?",
      options: [
        { id: "A", text: "4/8 bagian (atau 1/2 bagian)", isCorrect: true },
        { id: "B", text: "2/8 bagian", isCorrect: false },
        { id: "C", text: "4/16 bagian", isCorrect: false },
        { id: "D", text: "5/8 bagian", isCorrect: false }
      ],
      explanation: "Jeruk yang sudah dibagikan = 1/8 + 3/8 = 4/8 bagian. Pecahan 4/8 senilai dengan 1/2 (setengah dari seluruh panen).",
      points: 10
    },
    {
      id: "L3-Q5",
      level: 3,
      indicator: "Pemecahan masalah: pengurangan volume air penampungan",
      topic: "cerita",
      type: "choice",
      question: "Bak penampungan air bersih desa terisi sebanyak 7/10 bagian. Setelah warga mencuci sayur dan memasak, air di dalam bak berkurang sebanyak 4/10 bagian. Berapa bagian air yang masih tersisa?",
      options: [
        { id: "A", text: "3/10 bagian", isCorrect: true },
        { id: "B", text: "11/10 bagian", isCorrect: false },
        { id: "C", text: "3/0 bagian", isCorrect: false },
        { id: "D", text: "2/10 bagian", isCorrect: false }
      ],
      explanation: "Sisa air di bak = 7/10 - 4/10 = (7 - 4)/10 = 3/10 bagian air.",
      points: 10
    },
    {
      id: "L3-Q6",
      level: 3,
      indicator: "Pemecahan masalah: menggabungkan takaran liter minyak",
      topic: "cerita",
      type: "choice",
      visual: "beaker-measure",
      visualData: { vol1: "1/2 L = 2/4 L", vol2: "1/4 L" },
      question: "Bibi sedang mengukur minyak kelapa di dapur. Di botol pertama ada 1/2 liter minyak dan di botol kedua ada 1/4 liter minyak. Jika dituangkan ke dalam satu mangkuk besar, berapa liter jumlah minyak Bibi sekarang?",
      options: [
        { id: "A", text: "3/4 liter", isCorrect: true },
        { id: "B", text: "2/6 liter", isCorrect: false },
        { id: "C", text: "1/4 liter", isCorrect: false },
        { id: "D", text: "2/4 liter", isCorrect: false }
      ],
      explanation: "Jumlah minyak = 1/2 + 1/4. Ubah 1/2 menjadi 2/4. Maka 2/4 + 1/4 = 3/4 liter.",
      points: 10
    },
    {
      id: "L3-Q7",
      level: 3,
      indicator: "Pemecahan masalah: mencari sisa dari pekerjaan utuh (pagar bambu)",
      topic: "cerita",
      type: "choice",
      question: "Pak Darto mengecat pagar bambu balai desa. Pada hari Senin ia mengecat 2/9 bagian, dan hari Selasa 4/9 bagian. Berapa bagian pagar bambu yang BELUM dicat? (Petunjuk: seluruh pagar bernilai 9/9)",
      options: [
        { id: "A", text: "3/9 bagian (senilai dengan 1/3 bagian)", isCorrect: true },
        { id: "B", text: "6/9 bagian", isCorrect: false },
        { id: "C", text: "2/9 bagian", isCorrect: false },
        { id: "D", text: "5/9 bagian", isCorrect: false }
      ],
      explanation: "Pagar yang sudah dicat = 2/9 + 4/9 = 6/9 bagian. Seluruh pagar utuh = 9/9. Maka bagian yang belum dicat adalah 9/9 - 6/9 = 3/9 bagian (dapat disederhanakan menjadi 1/3).",
      points: 10
    },
    {
      id: "L3-Q8",
      level: 3,
      indicator: "Pemecahan masalah: sisa minuman susu kedelai",
      topic: "cerita",
      type: "choice",
      question: "Dalam teko kaca terdapat 5/6 liter susu kedelai hangat. Doni dan adiknya meminum 2/6 liter susu tersebut saat sarapan. Berapa liter sisa susu kedelai di dalam teko?",
      options: [
        { id: "A", text: "3/6 liter (atau 1/2 liter)", isCorrect: true },
        { id: "B", text: "2/6 liter", isCorrect: false },
        { id: "C", text: "7/6 liter", isCorrect: false },
        { id: "D", text: "3/12 liter", isCorrect: false }
      ],
      explanation: "Sisa susu = 5/6 - 2/6 = (5 - 2)/6 = 3/6 liter. Jika disederhanakan dengan membagi 3, nilainya adalah 1/2 liter.",
      points: 10
    },
    {
      id: "L3-Q9",
      level: 3,
      indicator: "Pemecahan masalah: mencari selisih panjang dua bahan kain",
      topic: "cerita",
      type: "choice",
      question: "Untuk membuat taplak meja dibutuhkan 3/5 meter kain batik, sedangkan untuk sarung bantal dibutuhkan 1/5 meter kain batik. Berapa selisih panjang kain yang dibutuhkan antara keduanya?",
      options: [
        { id: "A", text: "2/5 meter", isCorrect: true },
        { id: "B", text: "4/5 meter", isCorrect: false },
        { id: "C", text: "2/10 meter", isCorrect: false },
        { id: "D", text: "1/5 meter", isCorrect: false }
      ],
      explanation: "Kata 'selisih' menunjukkan operasi pengurangan: 3/5 - 1/5 = (3 - 1)/5 = 2/5 meter kain.",
      points: 10
    },
    {
      id: "L3-Q10",
      level: 3,
      indicator: "Pemecahan masalah: membagi cokelat batangan utuh kepada dua teman",
      topic: "cerita",
      type: "choice",
      question: "Andi memiliki sebatang cokelat utuh yang terbagi menjadi 12 kotak sama besar (12/12). Ia memberikan 3 kotak (3/12) kepada Riko dan 4 kotak (4/12) kepada Sinta. Berapa bagian sisa cokelat yang masih dipegang Andi?",
      options: [
        { id: "A", text: "5/12 bagian", isCorrect: true },
        { id: "B", text: "7/12 bagian", isCorrect: false },
        { id: "C", text: "4/12 bagian", isCorrect: false },
        { id: "D", text: "6/12 bagian", isCorrect: false }
      ],
      explanation: "Total cokelat yang dibagikan = 3/12 + 4/12 = 7/12 bagian. Sisa cokelat Andi = 12/12 - 7/12 = 5/12 bagian.",
      points: 10
    },

    // ==========================================
    // TANTANGAN AKHIR: GERBANG PENGETAHUAN (5 Soal)
    // ==========================================
    {
      id: "FINAL-Q1",
      level: 4,
      indicator: "Tantangan Komprehensif: Pengurangan pecahan pita berpenyebut sama",
      topic: "operasi",
      type: "choice",
      question: "Sebuah pita ajaib panjangnya 5/6 meter. Sebanyak 2/6 meter digunakan untuk mengikat buku catatan mantra. Berapa panjang pita yang tersisa?",
      options: [
        { id: "A", text: "3/6 meter (senilai dengan 1/2 meter)", isCorrect: true },
        { id: "B", text: "2/6 meter", isCorrect: false },
        { id: "C", text: "5/12 meter", isCorrect: false },
        { id: "D", text: "7/6 meter", isCorrect: false }
      ],
      explanation: "5/6 meter - 2/6 meter = (5 - 2)/6 meter = 3/6 meter. Pecahan 3/6 senilai dengan 1/2 meter.",
      points: 10
    },
    {
      id: "FINAL-Q2",
      level: 4,
      indicator: "Tantangan Komprehensif: Menemukan pecahan senilai dari 3/4",
      topic: "senilai",
      type: "choice",
      question: "Di antara pilihan pecahan berikut, manakah pecahan yang senilai dengan 3/4?",
      options: [
        { id: "A", text: "9/12", isCorrect: true },
        { id: "B", text: "6/10", isCorrect: false },
        { id: "C", text: "7/8", isCorrect: false },
        { id: "D", text: "5/6", isCorrect: false }
      ],
      explanation: "Jika pembilang dan penyebut 3/4 sama-sama dikalikan 3: (3 × 3) / (4 × 3) = 9/12. Jadi, 3/4 senilai dengan 9/12.",
      points: 10
    },
    {
      id: "FINAL-Q3",
      level: 4,
      indicator: "Tantangan Komprehensif: Mengurutkan pecahan dari terbesar ke terkecil",
      topic: "perbandingan",
      type: "choice",
      question: "Urutan pecahan berikut yang benar mulai dari nilai TERBESAR hingga TERKECIL adalah ...",
      options: [
        { id: "A", text: "5/6, 4/6, 2/6, 1/6", isCorrect: true },
        { id: "B", text: "1/6, 2/6, 4/6, 5/6", isCorrect: false },
        { id: "C", text: "4/6, 5/6, 1/6, 2/6", isCorrect: false },
        { id: "D", text: "2/6, 4/6, 1/6, 5/6", isCorrect: false }
      ],
      explanation: "Penyebut semua pecahan sama yaitu 6. Untuk mengurutkan dari yang terbesar, urutkan pembilangnya menurun: 5 > 4 > 2 > 1. Maka urutannya: 5/6, 4/6, 2/6, 1/6.",
      points: 10
    },
    {
      id: "FINAL-Q4",
      level: 4,
      indicator: "Tantangan Komprehensif: Penjumlahan pecahan penyebut berbeda",
      topic: "operasi",
      type: "choice",
      question: "Hasil perhitungan dari 1/3 + 3/6 adalah ... (Petunjuk: Samakan penyebut terlebih dahulu)",
      options: [
        { id: "A", text: "5/6", isCorrect: true },
        { id: "B", text: "4/9", isCorrect: false },
        { id: "C", text: "4/6", isCorrect: false },
        { id: "D", text: "1/2", isCorrect: false }
      ],
      explanation: "Ubah 1/3 menjadi berpenyebut 6: 1/3 = 2/6. Lalu jumlahkan dengan 3/6: 2/6 + 3/6 = 5/6.",
      points: 10
    },
    {
      id: "FINAL-Q5",
      level: 4,
      indicator: "Tantangan Komprehensif: Masalah kontekstual tanah kebun utuh",
      topic: "cerita",
      type: "choice",
      question: "Pak Jaya memiliki sebidang tanah kebun utuh (8/8). Sebanyak 2/8 bagian ditanami jagung dan 3/8 bagian ditanami singkong. Berapa bagian tanah kebun yang belum ditanami tanaman apa pun?",
      options: [
        { id: "A", text: "3/8 bagian", isCorrect: true },
        { id: "B", text: "5/8 bagian", isCorrect: false },
        { id: "C", text: "1/8 bagian", isCorrect: false },
        { id: "D", text: "2/8 bagian", isCorrect: false }
      ],
      explanation: "Tanah yang sudah ditanami = 2/8 + 3/8 = 5/8 bagian. Seluruh tanah = 8/8. Sisa tanah yang belum ditanami = 8/8 - 5/8 = 3/8 bagian.",
      points: 10
    }
  ]
};

// Pastikan data dapat diakses baik di browser global maupun di module/test
if (typeof window !== 'undefined') {
  window.GAME_DATA = GAME_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_DATA;
}
