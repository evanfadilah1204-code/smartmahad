// Centralized Master Data & Empty Initial State for SmartMahad

// Santri starts EMPTY as requested by user
export const INITIAL_SANTRI = [];

// Master Parameter Karakter (Ring Time 5 Binatang)
export const CHARACTER_PARAMETERS = [
  {
    kode: "LRT1",
    hewan: "Singa",
    aspek: "Kesehatan & Fisik",
    indikator: "Olahraga teratur, menjaga pola makan sehat, dan menjaga kebersihan diri.",
    caraUkur: "Pemeriksaan fisik mingguan dan kehadiran kegiatan olahraga.",
    skala: "0 - 4"
  },
  {
    kode: "LRT2",
    hewan: "Elang",
    aspek: "Fokus & Belajar",
    indikator: "Konsentrasi saat kegiatan belajar mengajar (KBM) dan cepat tanggap.",
    caraUkur: "Observasi ustadz di kelas dan ketepatan waktu bangun tidur.",
    skala: "0 - 4"
  },
  {
    kode: "LRT3",
    hewan: "Sapi",
    aspek: "Tanggung Jawab & Barang",
    indikator: "Merawat barang pribadi, kerapian kamar, dan bijak mengelola saku.",
    caraUkur: "Pemeriksaan kerapian lemari/ranjang dan buku catatan keuangan.",
    skala: "0 - 4"
  },
  {
    kode: "LRT4",
    hewan: "Ayam",
    aspek: "Kedisiplinan Waktu",
    indikator: "Tepat waktu saat shalat berjamaah, halaqah, KBM, dan kegiatan asrama.",
    caraUkur: "Presensi kehadiran di masjid dan ruang kelas.",
    skala: "0 - 4"
  },
  {
    kode: "LRT5",
    hewan: "Bunglon",
    aspek: "Emosi & Adab",
    indikator: "Pengendalian emosi, kesabaran, serta sopan santun kepada ustadz dan teman.",
    caraUkur: "Penilaian musyrif asrama dan catatan sikap harian.",
    skala: "0 - 4"
  }
];

export const INITIAL_PBQ_HISTORY = [];

export const INITIAL_PRESTASI = [];

export const INITIAL_KASUS = [];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG-001",
    timestamp: "2026-09-30 08:00:00",
    tabel: "sistem",
    aksi: "INITIALIZE",
    keyId: "SYSTEM-READY",
    nilaiLama: "OFFLINE",
    nilaiBaru: "ONLINE",
    operator: "Sistem Pesantren"
  }
];

export const INITIAL_TRACKING_HAFALAN = [
  { id: 1, ayat: "QS. Al-An'am: 38", hafal: false, paham: false, tadabbur: false, praktik: false },
  { id: 2, ayat: "QS. Al-Mu'minun: 1-5", hafal: false, paham: false, tadabbur: false, praktik: false },
  { id: 3, ayat: "QS. Al-Baqarah: 45-46", hafal: false, paham: false, tadabbur: false, praktik: false },
  { id: 4, ayat: "QS. Ali 'Imran: 134", hafal: false, paham: false, tadabbur: false, praktik: false },
  { id: 5, ayat: "QS. Al-Hujurat: 10-12", hafal: false, paham: false, tadabbur: false, praktik: false }
];

// Sample template to load 10 sample students with 1 click if user wants to test!
export const SAMPLE_10_SANTRI = [
  {
    id: 1,
    nis: "2025001",
    nama: "Ahmad Faryya Ghazi",
    kelas: "Kelas 12",
    kamar: "Asrama 5",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Ghazi Subagja",
    telepon: "0812-3456-7891",
    scores: { LRT1: 3.0, LRT2: 3.0, LRT3: 2.8, LRT4: 3.2, LRT5: 3.0 },
    scoresPre: { LRT1: 2.0, LRT2: 2.0, LRT3: 1.8, LRT4: 2.2, LRT5: 2.0 },
    scoresPost: { LRT1: 3.2, LRT2: 3.4, LRT3: 3.0, LRT4: 3.6, LRT5: 3.2 },
    nGain: 0.42,
    tahsin: "Mumtaz",
    mutqinJuz: "Juz 30, 29, 28",
    totalJuz: 5,
    takhasus: "Tahfiz Intensity",
    tasmiStatus: "Lulus Test 5 Juz",
    catatanMusyrif: "Aktif dalam ibadah harian."
  },
  {
    id: 2,
    nis: "2025002",
    nama: "Averous Muh Zhaffran M",
    kelas: "Kelas 12",
    kamar: "Asrama 6",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Zhaffran Muttaqin",
    telepon: "0812-3456-7892",
    scores: { LRT1: 2.9, LRT2: 2.8, LRT3: 3.0, LRT4: 2.8, LRT5: 3.1 },
    scoresPre: { LRT1: 2.0, LRT2: 1.8, LRT3: 2.0, LRT4: 2.0, LRT5: 2.2 },
    scoresPost: { LRT1: 3.3, LRT2: 3.1, LRT3: 3.5, LRT4: 3.2, LRT5: 3.6 },
    nGain: 0.40,
    tahsin: "Jayyid Jiddan",
    mutqinJuz: "Juz 30, 29",
    totalJuz: 4,
    takhasus: "Bahasa Arab",
    tasmiStatus: "Lulus Test 3 Juz",
    catatanMusyrif: "Cepat tanggap dalam belajar."
  },
  {
    id: 3,
    nis: "2025003",
    nama: "Darfianti Jepri Ananda",
    kelas: "Kelas 12",
    kamar: "Asrama 5",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Jepri Ananda",
    telepon: "0812-3456-7893",
    scores: { LRT1: 3.0, LRT2: 3.0, LRT3: 2.8, LRT4: 3.1, LRT5: 3.0 },
    scoresPre: { LRT1: 2.1, LRT2: 2.0, LRT3: 2.0, LRT4: 2.2, LRT5: 2.1 },
    scoresPost: { LRT1: 3.4, LRT2: 3.3, LRT3: 3.2, LRT4: 3.5, LRT5: 3.4 },
    nGain: 0.43,
    tahsin: "Mumtaz",
    mutqinJuz: "Juz 30, 29, 28, 27",
    totalJuz: 6,
    takhasus: "Leadership",
    tasmiStatus: "Lulus Test 5 Juz",
    catatanMusyrif: "Disiplin dan bertanggung jawab."
  },
  {
    id: 4,
    nis: "2025004",
    nama: "Dhargham Nafi Arhab A",
    kelas: "Kelas 12",
    kamar: "Asrama 6",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Arhab Amirullah",
    telepon: "0812-3456-7894",
    scores: { LRT1: 2.8, LRT2: 3.1, LRT3: 2.7, LRT4: 2.9, LRT5: 2.8 },
    scoresPre: { LRT1: 1.9, LRT2: 2.2, LRT3: 1.8, LRT4: 2.0, LRT5: 2.0 },
    scoresPost: { LRT1: 3.1, LRT2: 3.5, LRT3: 3.1, LRT4: 3.3, LRT5: 3.2 },
    nGain: 0.39,
    tahsin: "Jayyid Jiddan",
    mutqinJuz: "Juz 30, 29",
    totalJuz: 4,
    takhasus: "Tahfiz Intensity",
    tasmiStatus: "Lulus Test 3 Juz",
    catatanMusyrif: "Fisik sehat dan rajin."
  },
  {
    id: 5,
    nis: "2025005",
    nama: "Fathir Athallah",
    kelas: "Kelas 12",
    kamar: "Asrama 5",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Athallah Suwandi",
    telepon: "0812-3456-7895",
    scores: { LRT1: 3.1, LRT2: 2.9, LRT3: 3.0, LRT4: 3.0, LRT5: 3.2 },
    scoresPre: { LRT1: 2.2, LRT2: 2.0, LRT3: 2.1, LRT4: 2.2, LRT5: 2.3 },
    scoresPost: { LRT1: 3.5, LRT2: 3.2, LRT3: 3.4, LRT4: 3.4, LRT5: 3.6 },
    nGain: 0.44,
    tahsin: "Mumtaz",
    mutqinJuz: "Juz 30, 29, 28",
    totalJuz: 5,
    takhasus: "Project Based Quran",
    tasmiStatus: "Lulus Test 5 Juz",
    catatanMusyrif: "Sopan dan santun."
  },
  {
    id: 6,
    nis: "2025006",
    nama: "Muh Rifat Ramadhan P.W",
    kelas: "Kelas 12",
    kamar: "Asrama 6",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Ramadhan Purwanto",
    telepon: "0812-3456-7896",
    scores: { LRT1: 2.8, LRT2: 3.0, LRT3: 2.7, LRT4: 2.9, LRT5: 2.9 },
    scoresPre: { LRT1: 2.0, LRT2: 2.1, LRT3: 1.9, LRT4: 2.1, LRT5: 2.1 },
    scoresPost: { LRT1: 3.2, LRT2: 3.4, LRT3: 3.1, LRT4: 3.3, LRT5: 3.3 },
    nGain: 0.41,
    tahsin: "Jayyid",
    mutqinJuz: "Juz 30",
    totalJuz: 3,
    takhasus: "Islamic Hard Skill",
    tasmiStatus: "Proses Test",
    catatanMusyrif: "Tekun dan sopan."
  },
  {
    id: 7,
    nis: "2025007",
    nama: "Muhammad Adlan Dinata",
    kelas: "Kelas 12",
    kamar: "Asrama 5",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Dinata Kusuma",
    telepon: "0812-3456-7897",
    scores: { LRT1: 3.0, LRT2: 2.9, LRT3: 2.9, LRT4: 3.1, LRT5: 3.0 },
    scoresPre: { LRT1: 2.1, LRT2: 2.0, LRT3: 2.0, LRT4: 2.2, LRT5: 2.2 },
    scoresPost: { LRT1: 3.4, LRT2: 3.3, LRT3: 3.3, LRT4: 3.5, LRT5: 3.4 },
    nGain: 0.42,
    tahsin: "Mumtaz",
    mutqinJuz: "Juz 30, 29, 28, 27",
    totalJuz: 7,
    takhasus: "Tahfiz Intensity",
    tasmiStatus: "Lulus Test 5 Juz",
    catatanMusyrif: "Suara merdu dan fasih."
  },
  {
    id: 8,
    nis: "2025008",
    nama: "Muhammad Fadil Pratama",
    kelas: "Kelas 12",
    kamar: "Asrama 6",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Pratama Subekti",
    telepon: "0812-3456-7898",
    scores: { LRT1: 2.9, LRT2: 2.8, LRT3: 2.8, LRT4: 3.0, LRT5: 3.0 },
    scoresPre: { LRT1: 2.0, LRT2: 2.0, LRT3: 1.9, LRT4: 2.1, LRT5: 2.1 },
    scoresPost: { LRT1: 3.3, LRT2: 3.2, LRT3: 3.2, LRT4: 3.4, LRT5: 3.4 },
    nGain: 0.40,
    tahsin: "Jayyid Jiddan",
    mutqinJuz: "Juz 30, 29",
    totalJuz: 4,
    takhasus: "Bahasa Arab",
    tasmiStatus: "Lulus Test 3 Juz",
    catatanMusyrif: "Rajin mengikuti piket."
  },
  {
    id: 9,
    nis: "2025009",
    nama: "Razan Al Ghany",
    kelas: "Kelas 12",
    kamar: "Asrama 6",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Al Ghany Rahman",
    telepon: "0812-3456-7899",
    scores: { LRT1: 2.7, LRT2: 2.9, LRT3: 2.7, LRT4: 2.8, LRT5: 2.9 },
    scoresPre: { LRT1: 1.8, LRT2: 2.0, LRT3: 1.8, LRT4: 1.9, LRT5: 2.0 },
    scoresPost: { LRT1: 3.1, LRT2: 3.3, LRT3: 3.1, LRT4: 3.2, LRT5: 3.3 },
    nGain: 0.38,
    tahsin: "Jayyid Jiddan",
    mutqinJuz: "Juz 30",
    totalJuz: 3,
    takhasus: "Project Based Quran",
    tasmiStatus: "Proses Test",
    catatanMusyrif: "Perkembangan baik."
  },
  {
    id: 10,
    nis: "2025010",
    nama: "Rizki Jazilah",
    kelas: "Kelas 12",
    kamar: "Asrama 5",
    klaster: "Kuning",
    statusText: "Pasif / Cukup",
    wali: "Bpk. Jazilah Ahmad",
    telepon: "0812-3456-7890",
    scores: { LRT1: 3.0, LRT2: 3.1, LRT3: 2.9, LRT4: 3.2, LRT5: 3.1 },
    scoresPre: { LRT1: 2.1, LRT2: 2.2, LRT3: 2.0, LRT4: 2.3, LRT5: 2.2 },
    scoresPost: { LRT1: 3.4, LRT2: 3.5, LRT3: 3.3, LRT4: 3.6, LRT5: 3.5 },
    nGain: 0.44,
    tahsin: "Mumtaz",
    mutqinJuz: "Juz 30, 29, 28",
    totalJuz: 5,
    takhasus: "Leadership",
    tasmiStatus: "Lulus Test 5 Juz",
    catatanMusyrif: "Mandiri dan solutif."
  }
];
