/** Konfigurasi persyaratan dokumen pengadaan - berkas pendukung fase 4 */

export type PaketTierId = 'under-10' | '10-50' | '50-200';

/** Label kelompok waktu proses (urutan administrasi, bukan urutan pengumpulan fisik) */
export const BERKAS_GROUP = {
  A: 'Dokumen Persiapan (sebelum SPPH)',
  B: 'Pemilihan Penyedia (setelah SPPH)',
  C: 'Pelaksanaan & Serah Terima',
  D: 'Pembayaran / Administrasi Akhir',
} as const;

/** Varian Group A untuk paket <10 jt (tanpa SPPH) */
export const BERKAS_GROUP_A_UNDER_10 = 'Dokumen Persiapan (sebelum pemesanan)';

export type BerkasChecklistItem = {
  no: number;
  name: string;
  /** Kelompok waktu proses - untuk tampilan & Excel */
  processGroup?: string;
};

export type PaketTier = {
  id: PaketTierId;
  /** Judul kategori (sesuai konfigurasi resmi) */
  categoryTitle: string;
  rangeLabel: string;
  shortLabel: string;
  docFolder: string;
  /** Nama file Excel unduhan */
  excelFilename: string;
  checklist: BerkasChecklistItem[];
};

export const BERKAS_PAKET_TIERS: PaketTier[] = [
  {
    id: 'under-10',
    categoryTitle: 'Nilai di Bawah 10 Juta',
    rangeLabel: 'Nilai di bawah 10 juta',
    shortLabel: '< 10 jt',
    docFolder: 'berkas-under-10jt',
    excelFilename: 'checklist-berkas-di-bawah-10-juta.xlsx',
    checklist: [
      // --- Group A: Dokumen Persiapan (sebelum pemesanan) ---
      { no: 1, name: 'Renbut Barang', processGroup: BERKAS_GROUP_A_UNDER_10 },
      { no: 2, name: 'Usul Pesanan', processGroup: BERKAS_GROUP_A_UNDER_10 },
      { no: 3, name: 'Kep Pejabat Pembuat Komitmen', processGroup: BERKAS_GROUP_A_UNDER_10 },
      { no: 4, name: 'Pakta Integritas', processGroup: BERKAS_GROUP_A_UNDER_10 },
      { no: 5, name: 'Kep Pejabat Pengadaan', processGroup: BERKAS_GROUP_A_UNDER_10 },
      { no: 6, name: 'Pakta Integritas', processGroup: BERKAS_GROUP_A_UNDER_10 },
      // --- Group B: Pemesanan ---
      { no: 7, name: 'Nota Pesanan / NP', processGroup: BERKAS_GROUP.B },
      { no: 8, name: 'Pakta Integritas Rekanan', processGroup: BERKAS_GROUP.B },
      // --- Group C: Pelaksanaan & Serah Terima ---
      { no: 9, name: 'Faktur Barang', processGroup: BERKAS_GROUP.C },
      { no: 10, name: 'Surat Pengantar Barang / SPB', processGroup: BERKAS_GROUP.C },
      { no: 11, name: 'Kep Komisi Pemeriksa', processGroup: BERKAS_GROUP.C },
      { no: 12, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.C },
      { no: 13, name: 'BA Rikasa/Terima Hasil Pekerjaan', processGroup: BERKAS_GROUP.C },
      { no: 14, name: 'BA Serah Terima Barang', processGroup: BERKAS_GROUP.C },
      { no: 15, name: 'Lampiran BASTB', processGroup: BERKAS_GROUP.C },
      { no: 16, name: 'Laporan Pelaksanaan Pengadaan', processGroup: BERKAS_GROUP.C },
      { no: 17, name: 'BA Penyerahan Barang', processGroup: BERKAS_GROUP.C },
      // --- Group D: Pembayaran ---
      { no: 18, name: 'Kwitansi Umum', processGroup: BERKAS_GROUP.D },
    ],
  },
  {
    id: '10-50',
    categoryTitle: 'Nilai di Bawah 50 Juta',
    rangeLabel: 'Nilai di bawah 50 juta',
    shortLabel: '< 50 jt',
    docFolder: 'berkas-10-50jt',
    excelFilename: 'checklist-berkas-di-bawah-50-juta.xlsx',
    checklist: [
      // --- Group A: Dokumen Persiapan (sebelum SPPH) ---
      { no: 1, name: 'Renbut Barang', processGroup: BERKAS_GROUP.A },
      { no: 2, name: 'Usul Pesanan', processGroup: BERKAS_GROUP.A },
      { no: 3, name: 'Kep Pejabat Pembuat Komitmen', processGroup: BERKAS_GROUP.A },
      { no: 4, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.A },
      { no: 5, name: 'Kep Pejabat Pengadaan', processGroup: BERKAS_GROUP.A },
      { no: 6, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.A },
      { no: 7, name: 'HPS "OE"', processGroup: BERKAS_GROUP.A },
      { no: 8, name: 'Lampiran HPS "OE"', processGroup: BERKAS_GROUP.A },
      // --- Group B: Pemilihan Penyedia (setelah SPPH) ---
      { no: 9, name: 'Surat Permintaan Penawaran Harga', processGroup: BERKAS_GROUP.B },
      { no: 10, name: 'Lampiran SPPH', processGroup: BERKAS_GROUP.B },
      { no: 11, name: 'Surat Penawaran Harga', processGroup: BERKAS_GROUP.B },
      { no: 12, name: 'Lampiran SPH', processGroup: BERKAS_GROUP.B },
      { no: 13, name: 'BA Negosiasi Harga', processGroup: BERKAS_GROUP.B },
      { no: 14, name: 'Lampiran BA Nego', processGroup: BERKAS_GROUP.B },
      { no: 15, name: 'Nota Pesanan / NP', processGroup: BERKAS_GROUP.B },
      { no: 16, name: 'Pakta Integritas Rekanan', processGroup: BERKAS_GROUP.B },
      // --- Group C: Pelaksanaan & Serah Terima ---
      { no: 17, name: 'Faktur Barang', processGroup: BERKAS_GROUP.C },
      { no: 18, name: 'Surat Pengantar Barang / SPB', processGroup: BERKAS_GROUP.C },
      { no: 19, name: 'Kep Komisi Pemeriksa', processGroup: BERKAS_GROUP.C },
      { no: 20, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.C },
      { no: 21, name: 'BA Rikasa/Terima Hasil Pekerjaan', processGroup: BERKAS_GROUP.C },
      { no: 22, name: 'BA Serah Terima Barang', processGroup: BERKAS_GROUP.C },
      { no: 23, name: 'Lampiran BASTB', processGroup: BERKAS_GROUP.C },
      { no: 24, name: 'Laporan Pelaksanaan Pengadaan', processGroup: BERKAS_GROUP.C },
      { no: 25, name: 'BA Penyerahan Barang', processGroup: BERKAS_GROUP.C },
      // --- Group D: Pembayaran ---
      { no: 26, name: 'Kwitansi Umum', processGroup: BERKAS_GROUP.D },
    ],
  },
  {
    id: '50-200',
    categoryTitle: 'Nilai di Atas 50 Juta',
    rangeLabel: 'Nilai di atas 50 juta',
    shortLabel: '> 50 jt',
    docFolder: 'berkas-50-200jt',
    excelFilename: 'checklist-berkas-di-atas-50-juta.xlsx',
    checklist: [
      // --- Group A: Dokumen Persiapan (sebelum SPPH) ---
      { no: 1, name: 'Renbut Barang', processGroup: BERKAS_GROUP.A },
      { no: 2, name: 'Usul Pesanan', processGroup: BERKAS_GROUP.A },
      { no: 3, name: 'Kep Pejabat Pembuat Komitmen', processGroup: BERKAS_GROUP.A },
      { no: 4, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.A },
      { no: 5, name: 'Kep Pejabat Pengadaan', processGroup: BERKAS_GROUP.A },
      { no: 6, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.A },
      { no: 7, name: 'HPS "OE"', processGroup: BERKAS_GROUP.A },
      { no: 8, name: 'Lampiran HPS "OE"', processGroup: BERKAS_GROUP.A },
      // --- Group B: Pemilihan Penyedia (setelah SPPH) ---
      { no: 9, name: 'Surat Permintaan Penawaran Harga', processGroup: BERKAS_GROUP.B },
      { no: 10, name: 'Lampiran SPPH', processGroup: BERKAS_GROUP.B },
      { no: 11, name: 'Surat Penawaran Harga A', processGroup: BERKAS_GROUP.B },
      { no: 12, name: 'Pakta Integritas Rekanan A', processGroup: BERKAS_GROUP.B },
      { no: 13, name: 'Surat Penawaran Harga B', processGroup: BERKAS_GROUP.B },
      { no: 14, name: 'Pakta Integritas Rekanan B', processGroup: BERKAS_GROUP.B },
      { no: 15, name: 'BA Negosiasi Harga', processGroup: BERKAS_GROUP.B },
      { no: 16, name: 'Lampiran BA Nego', processGroup: BERKAS_GROUP.B },
      { no: 17, name: 'BA HPL', processGroup: BERKAS_GROUP.B },
      { no: 18, name: 'Lampiran BA HPL', processGroup: BERKAS_GROUP.B },
      { no: 19, name: 'Surat Penetapan Pemenang', processGroup: BERKAS_GROUP.B },
      // --- Group C: Pelaksanaan & Serah Terima (termasuk SPK) ---
      { no: 20, name: 'Surat Perintah Kerja (SPK)', processGroup: BERKAS_GROUP.C },
      { no: 21, name: 'Lampiran SPK', processGroup: BERKAS_GROUP.C },
      { no: 22, name: 'Pakta Integritas Rekanan', processGroup: BERKAS_GROUP.C },
      { no: 23, name: 'Faktur Barang', processGroup: BERKAS_GROUP.C },
      { no: 24, name: 'Surat Pengantar Barang / SPB', processGroup: BERKAS_GROUP.C },
      { no: 25, name: 'Kep Komisi Pemeriksa', processGroup: BERKAS_GROUP.C },
      { no: 26, name: 'Pakta Integritas', processGroup: BERKAS_GROUP.C },
      { no: 27, name: 'BA Rikasa/Terima Hasil Pekerjaan', processGroup: BERKAS_GROUP.C },
      { no: 28, name: 'BA Serah Terima Barang', processGroup: BERKAS_GROUP.C },
      { no: 29, name: 'Lampiran BASTB', processGroup: BERKAS_GROUP.C },
      { no: 30, name: 'Laporan Pelaksanaan Pengadaan', processGroup: BERKAS_GROUP.C },
      { no: 31, name: 'BA Penyerahan Barang', processGroup: BERKAS_GROUP.C },
      // --- Group D: Pembayaran ---
      { no: 32, name: 'Kwitansi Umum', processGroup: BERKAS_GROUP.D },
    ],
  },
];

export const BERKAS_DEFAULT_TIER_ID: PaketTierId = 'under-10';

const TIER_IDS = new Set<PaketTierId>(BERKAS_PAKET_TIERS.map((t) => t.id));

export function isPaketTierId(value: string): value is PaketTierId {
  return TIER_IDS.has(value as PaketTierId);
}

export function getPaketTier(id: PaketTierId): PaketTier {
  return BERKAS_PAKET_TIERS.find((t) => t.id === id)!;
}

export function checklistDownloadUrl(tierId: PaketTierId): string {
  return `/api/pengadaan/fase4/checklist/${tierId}`;
}
