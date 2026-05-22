import type { AppId } from '@/lib/pengadaan/app-logos';

export type PortalPhase = {
  num: string;
  title: string;
  desc: string;
  apps?: AppId[];
};

export const PORTAL_PHASES: PortalPhase[] = [
  { num: '01', title: 'Perencanaan', desc: 'Dari usulan Skadik hingga disetujui Mabes AU.' },
  {
    num: '02',
    title: 'Penyaluran anggaran',
    desc: 'Penerbitan DIPA, disalurkan ke Wingdik via SAKTI.',
    apps: ['sakti'],
  },
  { num: '03', title: 'Pengajuan / usul pesanan', desc: 'Proses internal satker dalam mengajukan kebutuhan UP.' },
  {
    num: '04',
    title: 'Pelaksanaan / pengadaan',
    desc:
      'Proses eksekusi pengadaan di level satker. Untuk nilai < 50 juta: pengadaan langsung dengan SPPH sederhana. Untuk nilai 50–200 juta: pemilihan penyedia dengan evaluasi penawaran, negosiasi, dan penetapan pemenang sebelum SPK diterbitkan.',
  },
  {
    num: '05',
    title: 'Pendataan aset & persediaan',
    desc:
      'Pencatatan aset dan persediaan pasca-pengadaan. Input dilakukan di SAKTI (modul persediaan/aset tetap) dan SIMAK BMN setelah SP2D terbit.',
    apps: ['sakti', 'simak-bmn'],
  },
];
