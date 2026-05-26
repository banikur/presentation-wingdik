import type { BentukFlow } from './flow-types';

/**
 * Data 6 Bentuk proses utama SIMTELOG (sumber: PRD WINGDIK 600 + materi pembekalan).
 *
 * Catatan aktor:
 * - Peran KaGPL (gudang pangkalan) dan KaGPD (gudang depo) saling menggantikan
 *   tergantung skala/lokasi satker. Di shortPath ditulis "GPL/GPD".
 * - Di actors[] tetap pakai 'gpl' sebagai representasi (warna & ikon), namun
 *   action description menyebut "KaGPL/KaGPD" agar inklusif.
 *
 * Visual ringkas:
 *   40200  : TB → SIKAL → GPL/GPD → TB
 *   40400  : SIKAL → GPL/GPD → GPL/GPD
 *   41300  : TB → GPL/GPD                  (pemindahan barang rusak)
 *   40170  : TB → GPL/GPD → RPC → GPL/GPD → TB     (service non-garansi)
 *   40170-1: TB → GPL/GPD → VENDOR → GPL/GPD → TB  (warranty claim)
 *   40220  : GPL/GPD ↔ GPL/GPD              (mutasi antar gudang)
 */
export const BENTUK_FLOWS: BentukFlow[] = [
  // ─────────────────────────────────────────────────────────────
  // 40200 — Permintaan Barang
  // ─────────────────────────────────────────────────────────────
  {
    code: '40200',
    title: 'Permintaan Barang',
    subtitle: 'Permintaan & Pengeluaran Barang Suku Cadang Pesawat',
    actors: ['tb', 'sikal', 'gpl', 'sistem'],
    shortPath: 'TB → SIKAL → GPL/GPD → TB',
    statuses: ['Active', 'Notified'],
    nodes: [
      {
        id: 'entered',
        label: 'Entered',
        actor: 'tb',
        action: 'TB membuat dokumen permintaan barang Bentuk 40200.',
      },
      {
        id: 'satu-satker',
        label: 'Satu Satker',
        actor: 'tb',
        action: 'Dokumen diteruskan dalam lingkup satu satker.',
      },
      {
        id: 'kasatker',
        label: 'Kasatker',
        actor: 'sikal',
        action: 'Validasi & otorisasi oleh Kasikal/Kasubsikal sebagai Kasatker.',
      },
      {
        id: 'ka-gudang-pengirim',
        label: 'Ka Gudang Pengirim',
        actor: 'gpl',
        action: 'KaGPL/KaGPD menyiapkan barang yang diminta untuk dikirim.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'gpl',
        action: 'Barang dikeluarkan dari gudang dan dalam status pengiriman.',
      },
      {
        id: 'ka-gudang-penerima',
        label: 'Ka Gudang Penerima',
        actor: 'tb',
        action: 'TB sebagai penerima melakukan receipt barang di bench stock.',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mengirim notifikasi update stok & status dokumen.',
      },
    ],
    workflowImage: {
      src: "/img/simtelog-flow/workflow/bentuk-40200-workflow.png",
      caption:
        "Diagram BPMN alur Bentuk 40200 - dari START (TB ajukan) → SATU SATKER/LANUD-DEPO → MEMERINTAHKAN (Kasatker) → KA GUDANG PENGIRIM → SHIPPED → KA GUDANG PENERIMA → NOTIFIKASI.",
    },
    appScreenshots: [
      {
        src: "/img/simtelog-flow/app/bentuk-40200-form-kosong.png",
        caption:
          "Form Bentuk 40200 (kosong) di aplikasi SIMTELOG asli — Nomer Dokumen, Gudang Pengirim/Penerima (LANUD SDM), GPL/GPD, Ka TB, Status ENTERED.",
      },
      {
        src: "/img/simtelog-flow/app/bentuk-40200-form-terisi.png",
        caption:
          "Form Bentuk 40200 (terisi) — Ka GPL/D (Edang Wahyu Ramdani, Ka GPL Lanud Sdm), Ka TB (Muhammad Syahrul, Ka TB Subsikal Sihar Skadud 7), Diminta Oleh & Diteliti Oleh terisi.",
      },
      {
        src: "/img/simtelog-flow/app/dashboard-start-center.png",
        caption:
          "Start Center SIMTELOG — Quick Insert (New 40200), menu Aplikasi Pembekalan (Bentuk 40200/40510/40220/41300/40170/40400/40171), Inbox/Assignments dengan list dokumen aktif.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 40400 — Distribusi Barang
  // ─────────────────────────────────────────────────────────────
  {
    code: '40400',
    title: 'Distribusi Barang',
    subtitle: 'Pengeluaran Barang Suku Cadang Antar Satker',
    actors: ['sikal', 'gpl', 'sistem'],
    shortPath: 'SIKAL → GPL/GPD → GPL/GPD',
    statuses: ['Active', 'Notified'],
    nodes: [
      {
        id: 'validasi',
        label: 'Validasi',
        actor: 'sikal',
        action: 'Kasikal memvalidasi dokumen distribusi antar satker.',
      },
      {
        id: 'memerintahkan',
        label: 'Memerintahkan',
        actor: 'sikal',
        action: 'Kasikal menerbitkan perintah pengeluaran barang.',
      },
      {
        id: 'ka-gudang-pengirim',
        label: 'Ka Gudang Pengirim',
        actor: 'gpl',
        action: 'KaGPL/KaGPD satker pengirim menyiapkan barang.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'gpl',
        action: 'Barang keluar dari gudang asal, status dalam perjalanan.',
      },
      {
        id: 'ka-gudang-penerima',
        label: 'Ka Gudang Penerima',
        actor: 'gpl',
        action: 'KaGPL/KaGPD satker penerima melakukan receipt & verifikasi.',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mengirim notifikasi penyelesaian distribusi.',
      },
    ],
    workflowImage: {
      src: "/img/simtelog-flow/workflow/bentuk-40400-workflow.png",
      caption:
        "Diagram alur Bentuk 40400 (Distribusi Barang Antar Satker). ⚠ Gambar masih placeholder template — versi spesifik per bentuk akan menyusul.",
      placeholder: true,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 41300 — Pemindahan Barang Rusak (TB → GPL/GPD)
  // ─────────────────────────────────────────────────────────────
  {
    code: '41300',
    title: 'Pemindahan Barang Rusak',
    subtitle: 'Pemindahan barang rusak dari TB ke GPL/GPD',
    actors: ['tb', 'gpl', 'sistem'],
    shortPath: 'TB → GPL/GPD',
    statuses: ['Active', 'Stock Updated', 'Notified'],
    notes: [
      'Khusus untuk barang yang sudah teridentifikasi rusak (US — Unserviceable).',
      'TB menginisiasi pemindahan; tidak melalui jalur SIKAL.',
    ],
    nodes: [
      {
        id: 'identifikasi',
        label: 'Identifikasi Rusak',
        actor: 'tb',
        action: 'TB mengidentifikasi barang rusak di bench stock yang perlu dipindah.',
      },
      {
        id: 'dokumen-rusak',
        label: 'Buat Dokumen',
        actor: 'tb',
        action: 'TB menerbitkan dokumen Bentuk 41300 sebagai pemindahan barang rusak.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'tb',
        action: 'Barang rusak dikirim dari TB menuju gudang KaGPL/KaGPD.',
      },
      {
        id: 'gudang-penerima',
        label: 'Ka Gudang Penerima',
        actor: 'gpl',
        action: 'KaGPL/KaGPD menerima & mencatat barang rusak ke storeroom US.',
      },
      {
        id: 'stock-update',
        label: 'Stock Update',
        actor: 'sistem',
        action: 'Stok barang rusak di gudang KaGPL/KaGPD ter-update (Stock Updated).',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mengirim notifikasi penyelesaian pemindahan.',
      },
    ],
    workflowImage: {
      src: "/img/simtelog-flow/workflow/bentuk-41300-workflow.png",
      caption:
        "Diagram alur Bentuk 41300 (Pemindahan Barang Rusak dari TB ke GPL/GPD). ⚠ Gambar masih placeholder template — versi spesifik per bentuk akan menyusul.",
      placeholder: true,
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 40170 — Service Non Garansi
  // ─────────────────────────────────────────────────────────────
  {
    code: '40170',
    title: 'Service Non Garansi',
    subtitle: 'Pengeluaran Barang US Untuk Diperiksa/Diperbaiki Antar Satker',
    actors: ['tb', 'gpl', 'rpc', 'sistem'],
    shortPath: 'TB → GPL/GPD → RPC → GPL/GPD → TB',
    statuses: ['Pending Service', 'In Repair', 'Returned', 'Notified'],
    nodes: [
      {
        id: 'validasi-receipt',
        label: 'Validasi Receipt',
        actor: 'tb',
        action: 'TB memvalidasi receipt barang yang akan dikirim untuk service.',
      },
      {
        id: 'cek-barang',
        label: 'Cek Barang',
        actor: 'tb',
        action: 'Pemeriksaan kondisi barang sebelum dikirim ke gudang.',
      },
      {
        id: 'ka-gudang-pengirim',
        label: 'Ka Gudang Pengirim',
        actor: 'gpl',
        action: 'KaGPL/KaGPD menyiapkan pengeluaran barang ke repair center.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'gpl',
        action: 'Barang dikirim ke Repair Center (status Pending Service).',
      },
      {
        id: 'rpc',
        label: 'RPC (Repair)',
        actor: 'rpc',
        action: 'Repair Center memproses perbaikan (status In Repair).',
      },
      {
        id: 'returned',
        label: 'Returned',
        actor: 'gpl',
        action:
          'Barang selesai diperbaiki dikembalikan ke gudang KaGPL/KaGPD (status Returned).',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG memberi notifikasi siklus service selesai.',
      },
    ],
    workflowImage: {
      src: "/img/simtelog-flow/workflow/bentuk-40170-workflow.png",
      caption:
        "Diagram BPMN alur Bentuk 40170/40170-1 - dari START (TB ajukan) → SATU SATKER → percabangan 40170 atau 40170-1 → KA GUDANG PENGIRIM → CEK BARANG → SHIPPED → RPC (Repair Center) → NOTIFIKASI. Branch atas: Service Non Garansi. Branch bawah: Warranty Claim.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 40170-1 — Warranty Claim
  // ─────────────────────────────────────────────────────────────
  {
    code: '40170-1',
    title: 'Warranty Claim',
    subtitle: 'Pengeluaran Barang Warranty Claim Antar Satker / Bekmatpus',
    actors: ['tb', 'gpl', 'vendor', 'sistem'],
    shortPath: 'TB → GPL/GPD → VENDOR → GPL/GPD → TB',
    statuses: ['Warranty Process Active', 'In Repair', 'Returned', 'Notified'],
    notes: [
      'Perbedaan dengan 40170: ada validasi garansi & proses klaim ke vendor.',
    ],
    nodes: [
      {
        id: 'validasi-warranty',
        label: 'Validasi Warranty',
        actor: 'tb',
        action: 'TB memvalidasi kelengkapan dokumen warranty (masih berlaku?).',
      },
      {
        id: 'cek-barang',
        label: 'Cek Barang',
        actor: 'tb',
        action: 'Pemeriksaan fisik barang yang akan diklaim.',
      },
      {
        id: 'ka-gudang-pengirim',
        label: 'Ka Gudang Pengirim',
        actor: 'gpl',
        action: 'KaGPL/KaGPD menyiapkan pengeluaran barang ke vendor.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'gpl',
        action: 'Barang dalam perjalanan ke vendor (Warranty Process Active).',
      },
      {
        id: 'vendor-claim',
        label: 'Vendor Claim',
        actor: 'vendor',
        action: 'Vendor memproses klaim & melakukan perbaikan / penggantian.',
      },
      {
        id: 'returned',
        label: 'Returned',
        actor: 'gpl',
        action: 'Barang hasil klaim dikembalikan ke gudang KaGPL/KaGPD asal.',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mencatat penutupan klaim & update inventory.',
      },
    ],
    workflowImage: {
      src: "/img/simtelog-flow/workflow/bentuk-40170-workflow.png",
      caption:
        "Diagram BPMN sama dengan Bentuk 40170 — perbedaan pada percabangan \"40170 ATAU 40170-1?\": Bentuk 40170-1 melibatkan VENDOR untuk klaim warranty (bukan RPC).",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 40220 — Mutasi Antar Gudang
  // ─────────────────────────────────────────────────────────────
  {
    code: '40220',
    title: 'Mutasi Antar Gudang',
    subtitle: 'Pemindahan Barang S Dalam Satu Satker',
    actors: ['gpl', 'sistem'],
    shortPath: 'GPL/GPD ↔ GPL/GPD',
    statuses: ['Active', 'Stock Updated', 'Notified'],
    notes: [
      'Mutasi internal antar gudang (KaGPL/KaGPD ke KaGPL/KaGPD) dalam satu satker — tidak melibatkan SIKAL.',
    ],
    nodes: [
      {
        id: 'gpl-asal',
        label: 'Gudang Asal',
        actor: 'gpl',
        action: 'KaGPL/KaGPD asal menginisiasi dokumen mutasi.',
      },
      {
        id: 'validasi',
        label: 'Validasi',
        actor: 'gpl',
        action: 'Verifikasi data barang & tujuan mutasi.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'gpl',
        action: 'Barang dipindahkan ke gudang tujuan (status Active).',
      },
      {
        id: 'gpl-tujuan',
        label: 'Gudang Tujuan',
        actor: 'gpl',
        action: 'KaGPL/KaGPD tujuan menerima & memverifikasi barang.',
      },
      {
        id: 'stock-update',
        label: 'Stock Update',
        actor: 'sistem',
        action: 'Stok kedua gudang ter-update otomatis (Stock Updated).',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mengirim notifikasi penyelesaian mutasi.',
      },
    ],
    workflowImage: {
      src: "/img/simtelog-flow/workflow/bentuk-40220-workflow.png",
      caption:
        "Diagram alur Bentuk 40220 (Mutasi Antar Gudang dalam satu satker). ⚠ Gambar masih placeholder template — versi spesifik per bentuk akan menyusul.",
      placeholder: true,
    },
    appScreenshots: [
      {
        src: "/img/simtelog-flow/app/bentuk-40220-form-terisi.png",
        caption:
          "Form Bentuk 40220 (terisi) — Lanud/Depo: LANUD SDM, GPL/GPD: GPL SDM GD 01, Status: SHIPPED, Receipts: COMPLETE, dengan line item barang (SCREW MACHINE, PN A0164TK050S020X, Jumlah 10).",
      },
    ],
  },
];

export const BENTUK_DEFAULT_CODE = BENTUK_FLOWS[0].code;

export function getBentukByCode(code: string): BentukFlow | undefined {
  return BENTUK_FLOWS.find((b) => b.code === code);
}

export function getBentukIndex(code: string): number {
  return BENTUK_FLOWS.findIndex((b) => b.code === code);
}
