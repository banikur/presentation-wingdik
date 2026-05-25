import {
  Banknote,
  ClipboardCheck,
  ClipboardList,
  FileCheck,
  FileSignature,
  FileText,
  Mail,
  Package,
  Scale,
  Trophy,
  Users,
} from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';
import { getPhaseNodeById } from '@/lib/pengadaan/phase-assets';

export type Fase4Node = VisualFlowNode;

export const FASE4_NODES: Fase4Node[] = [
  {
    id: 'penunjukan',
    label: 'Penunjukan',
    instansi: 'Pejabat berwenang satker',
    outputDoc: 'SK PPK',
    description:
      'Pejabat Pembuat Komitmen (PPK) wajib ditunjuk melalui SK sebelum proses pengadaan dimulai.',
    imgFolder: 'penunjukan',
    Icon: Users,
    flowSummary: 'PPK wajib ditunjuk sebelum proses pengadaan dimulai.',
  },
  {
    id: 'buat-rab',
    label: 'Buat RAB',
    instansi: 'PPK satker',
    outputDoc: 'Draf RAB / HPS',
    description:
      'PPK menyusun Rencana Anggaran Biaya (RAB) berdasarkan kebutuhan pemeliharaan dan paket pengadaan.',
    imgFolder: 'buat-rab',
    Icon: ClipboardList,
    flowSummary:
      'Menyusun Rencana Anggaran Biaya berdasarkan kebutuhan pemeliharaan.',
  },
  {
    id: 'penetapan-hps',
    label: 'Penetapan HPS',
    instansi: 'PPK satker',
    outputDoc: 'HPS / lampiran HPS',
    description:
      'PPK menetapkan Harga Perkiraan Sendiri berdasarkan RAB dan survei harga pasar. HPS wajib ada sebelum SPPH dikirim.',
    imgFolder: 'penetapan-hps',
    Icon: Scale,
    flowSummary: 'Penetapan HPS sebelum pemanggilan penyedia.',
  },
  {
    id: 'pemanggilan',
    label: 'Pemanggilan Mitra',
    instansi: 'PPK → rekanan / vendor',
    outputDoc: 'Surat SPPH',
    description:
      'PPK mengirim Surat Permintaan Penawaran Harga (SPPH) kepada calon mitra atau vendor.',
    imgFolder: 'pemanggilan',
    Icon: Mail,
    flowSummary:
      'Mengirim Surat Permintaan Penawaran Harga (SPPH) kepada mitra/vendor.',
  },
  {
    id: 'evaluasi-nego',
    label: 'Evaluasi & Negosiasi',
    instansi: 'Pejabat Pengadaan',
    outputDoc: 'BA Negosiasi / evaluasi',
    description:
      'Pejabat Pengadaan mengevaluasi penawaran masuk, melakukan negosiasi harga, dan menetapkan penyedia.',
    imgFolder: 'evaluasi-nego',
    Icon: Scale,
    flowSummary: 'Evaluasi penawaran dan negosiasi harga.',
  },
  {
    id: 'penetapan-penyedia',
    label: 'Penetapan Penyedia',
    instansi: 'PPK satker',
    outputDoc: 'Surat Penetapan Pemenang',
    description:
      'PPK menetapkan penyedia terpilih. Untuk paket >50jt: terbitkan Surat Penetapan Pemenang.',
    imgFolder: 'penetapan-penyedia',
    Icon: Trophy,
    flowSummary: 'Penetapan penyedia / pemenang pengadaan.',
  },
  {
    id: 'spk-kontrak',
    label: 'SPK / Kontrak',
    instansi: 'PPK & penyedia',
    outputDoc: 'SPK / kontrak',
    description:
      'PPK menandatangani Surat Perintah Kerja (SPK) atau kontrak dengan penyedia sebagai dasar hukum pelaksanaan.',
    imgFolder: 'spk-kontrak',
    Icon: FileSignature,
    flowSummary: 'Penerbitan SPK atau kontrak pelaksanaan.',
  },
  {
    id: 'pelaksanaan',
    label: 'Pelaksanaan',
    instansi: 'Penyedia / satker',
    outputDoc: 'Faktur / SPB / BA pekerjaan',
    description:
      'Penyedia melaksanakan pekerjaan atau mengirimkan barang sesuai SPK/kontrak.',
    imgFolder: 'pelaksanaan',
    Icon: Package,
    flowSummary: 'Pelaksanaan pekerjaan atau pengiriman barang.',
  },
  {
    id: 'berkas-dukung',
    label: 'Berkas Pendukung',
    instansi: 'Tim pengadaan / PPK',
    outputDoc: 'Ceklis per kategori nilai paket',
    description:
      'Kelengkapan berkas disesuaikan nilai paket: di bawah 10 juta (18 dokumen), di bawah 50 juta (26 dokumen), atau di atas 50 juta (32 dokumen). Checklist dapat diunduh dalam format Excel.',
    imgFolder: 'berkas-under-10jt',
    Icon: FileCheck,
    flowSummary: 'Melengkapi dokumen administrasi - ceklis berbeda per nilai paket.',
  },
  {
    id: 'bast-diterima',
    label: 'BAST',
    instansi: 'Satker / PPK',
    outputDoc: 'Berita acara serah terima',
    description:
      'Bukti Serah Terima (BAST) diterima setelah barang/jasa sesuai kontrak. Dasar verifikasi tagihan dan pembayaran.',
    imgFolder: 'bast-diterima',
    Icon: ClipboardCheck,
    flowSummary: 'BAST - serah terima hasil pengadaan.',
  },
  {
    id: 'verifikasi-tagihan',
    label: 'Verifikasi Tagihan',
    instansi: 'PPK / PPSPM',
    outputDoc: 'Berkas tagihan lengkap',
    description:
      'PPK/PPSPM memverifikasi kelengkapan dokumen tagihan: BAST, kwitansi, faktur, dan dokumen pendukung lain.',
    imgFolder: 'verifikasi-tagihan',
    Icon: FileText,
    flowSummary: 'Verifikasi kelengkapan dokumen tagihan.',
  },
  {
    id: 'penerbitan-spm',
    label: 'Penerbitan SPM',
    instansi: 'PPSPM satker',
    outputDoc: 'Surat Perintah Membayar',
    description:
      'PPSPM menerbitkan Surat Perintah Membayar dan mengajukan ke KPPN.',
    imgFolder: 'penerbitan-spm',
    Icon: FileText,
    flowSummary: 'Penerbitan SPM untuk pengajuan ke KPPN.',
  },
  {
    id: 'sp2d-kppn',
    label: 'SP2D - KPPN',
    instansi: 'KPPN',
    outputDoc: 'SP2D',
    description:
      'KPPN menerbitkan Surat Perintah Pencairan Dana. Dana ditransfer ke rekening penyedia. Fase pengadaan selesai.',
    imgFolder: 'sp2d-kppn',
    Icon: Banknote,
    flowSummary: 'SP2D - pencairan dana; pengadaan selesai.',
  },
];

/** Baris 1: persiapan & pemilihan (01–07) · Baris 2: pelaksanaan, berkas & pembayaran (08–13) */
export const FASE4_FLOW_ROWS: Fase4Node[][] = [
  FASE4_NODES.slice(0, 7),
  FASE4_NODES.slice(7),
];

export const FASE4_DEFAULT_NODE_ID = FASE4_NODES[0].id;

export function getFase4NodeById(id: string): Fase4Node | undefined {
  return getPhaseNodeById(FASE4_NODES, id) as Fase4Node | undefined;
}
