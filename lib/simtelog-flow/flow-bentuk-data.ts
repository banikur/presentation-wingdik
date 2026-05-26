import type { BentukFlow } from './flow-types';

/**
 * Data 6 Bentuk proses utama SIMTELOG (sumber: PRD WINGDIK 600 + materi pembekalan).
 * Visual ringkas:
 *   40200  : TB → SIKAL → GPL → TB
 *   40400  : SIKAL → GPL → GPL
 *   41300  : SIKAL → GPL → GPL  (varian khusus 40400)
 *   40170  : TB → GPL → RPC → GPL → TB     (service non-garansi)
 *   40170-1: TB → GPL → VENDOR → GPL → TB  (warranty claim)
 *   40220  : GPL ↔ GPL                     (mutasi antar gudang)
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
    shortPath: 'TB → SIKAL → GPL → TB',
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
        action: 'KaGPL menyiapkan barang yang diminta untuk dikirim.',
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
  },

  // ─────────────────────────────────────────────────────────────
  // 40400 — Distribusi Barang
  // ─────────────────────────────────────────────────────────────
  {
    code: '40400',
    title: 'Distribusi Barang',
    subtitle: 'Pengeluaran Barang Suku Cadang Antar Satker',
    actors: ['sikal', 'gpl', 'sistem'],
    shortPath: 'SIKAL → GPL → GPL',
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
        action: 'KaGPL satker pengirim menyiapkan barang.',
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
        action: 'KaGPL satker penerima melakukan receipt & verifikasi.',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mengirim notifikasi penyelesaian distribusi.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 41300 — Distribusi Khusus (varian 40400)
  // ─────────────────────────────────────────────────────────────
  {
    code: '41300',
    title: 'Distribusi Khusus',
    subtitle: 'Pengembalian Barang US Dalam Satu Satker (1 item)',
    actors: ['sikal', 'gpl', 'sistem'],
    shortPath: 'SIKAL → GPL → GPL',
    statuses: ['Active', 'Notified'],
    notes: [
      'Alur mirip 40400 tetapi diperuntukkan kebutuhan tertentu (pengembalian / 1 item barang).',
    ],
    nodes: [
      {
        id: 'validasi',
        label: 'Validasi',
        actor: 'sikal',
        action: 'Kasikal memvalidasi dokumen distribusi khusus.',
      },
      {
        id: 'memerintahkan',
        label: 'Memerintahkan',
        actor: 'sikal',
        action: 'Kasikal menerbitkan perintah pengeluaran untuk kasus khusus.',
      },
      {
        id: 'ka-gudang-pengirim',
        label: 'Ka Gudang Pengirim',
        actor: 'gpl',
        action: 'KaGPL pengirim menyiapkan barang sesuai kategori khusus.',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        actor: 'gpl',
        action: 'Barang dalam perjalanan ke tujuan khusus.',
      },
      {
        id: 'ka-gudang-penerima',
        label: 'Ka Gudang Penerima',
        actor: 'gpl',
        action: 'KaGPL penerima melakukan receipt barang.',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG menutup transaksi & update stok.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 40170 — Service Non Garansi
  // ─────────────────────────────────────────────────────────────
  {
    code: '40170',
    title: 'Service Non Garansi',
    subtitle: 'Pengeluaran Barang US Untuk Diperiksa/Diperbaiki Antar Satker',
    actors: ['tb', 'gpl', 'rpc', 'sistem'],
    shortPath: 'TB → GPL → RPC → GPL → TB',
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
        action: 'KaGPL menyiapkan pengeluaran barang ke repair center.',
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
        action: 'Barang selesai diperbaiki dikembalikan ke gudang (status Returned).',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG memberi notifikasi siklus service selesai.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 40170-1 — Warranty Claim
  // ─────────────────────────────────────────────────────────────
  {
    code: '40170-1',
    title: 'Warranty Claim',
    subtitle: 'Pengeluaran Barang Warranty Claim Antar Satker / Bekmatpus',
    actors: ['tb', 'gpl', 'vendor', 'sistem'],
    shortPath: 'TB → GPL → VENDOR → GPL → TB',
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
        action: 'KaGPL menyiapkan pengeluaran barang ke vendor.',
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
        action: 'Barang hasil klaim dikembalikan ke gudang asal.',
      },
      {
        id: 'notifikasi',
        label: 'Notifikasi',
        actor: 'sistem',
        action: 'SIMTELOG mencatat penutupan klaim & update inventory.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 40220 — Mutasi Antar Gudang
  // ─────────────────────────────────────────────────────────────
  {
    code: '40220',
    title: 'Mutasi Antar Gudang',
    subtitle: 'Pemindahan Barang S Dalam Satu Satker',
    actors: ['gpl', 'sistem'],
    shortPath: 'GPL ↔ GPL',
    statuses: ['Active', 'Stock Updated', 'Notified'],
    notes: [
      'Mutasi internal antar gudang (GPL ke GPL) dalam satu satker — tidak melibatkan SIKAL.',
    ],
    nodes: [
      {
        id: 'gpl-asal',
        label: 'GPL Asal',
        actor: 'gpl',
        action: 'KaGPL asal menginisiasi dokumen mutasi.',
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
        label: 'GPL Tujuan',
        actor: 'gpl',
        action: 'KaGPL tujuan menerima & memverifikasi barang.',
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
  },
];

export const BENTUK_DEFAULT_CODE = BENTUK_FLOWS[0].code;

export function getBentukByCode(code: string): BentukFlow | undefined {
  return BENTUK_FLOWS.find((b) => b.code === code);
}

export function getBentukIndex(code: string): number {
  return BENTUK_FLOWS.findIndex((b) => b.code === code);
}
