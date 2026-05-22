import {
  Building2,
  FileSpreadsheet,
  GraduationCap,
  Landmark,
  Shield,
  Users,
} from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';

export type Fase1Node = VisualFlowNode;

export const FASE1_ROW_TOP: Fase1Node[] = [
  {
    id: 'skadik',
    label: 'Skadik',
    instansi: 'Tingkat skadron',
    outputDoc: 'Renbut dasar satuan',
    description:
      'Setiap skadron menyusun rencana kebutuhan barang/jasa tahunan berdasarkan kondisi operasional dan sarana yang ada.',
    imgFolder: 'skadik',
    imgs: [],
    Icon: Users,
    flowSummary: 'Renbut kebutuhan dari tingkat skadron.',
  },
  {
    id: 'wingdik',
    label: 'Wingdik',
    instansi: 'Tingkat wing pendidikan',
    outputDoc: 'Renbut wing (kompilasi skadik)',
    description:
      'Wingdik mengompilasi usulan dari seluruh skadik di bawahnya, menyesuaikan prioritas dan pagu indikatif wing.',
    imgFolder: 'wingdik',
    imgs: [],
    Icon: Building2,
    flowSummary: 'Kompilasi renbut seluruh skadik di wing.',
  },
  {
    id: 'pusdik',
    label: 'Pusdik',
    instansi: 'Tingkat pusat pendidikan',
    outputDoc: 'Rekap renbut pusdik',
    description:
      'Pusdik menggabungkan renbut dari wing-wing jajaran dan menyelaraskan dengan program pendidikan matra.',
    imgFolder: 'pusdik',
    imgs: [],
    Icon: GraduationCap,
    flowSummary: 'Rekap renbut wing jajaran pusdik.',
  },
  {
    id: 'kodiklatau',
    label: 'Kodiklatau',
    instansi: 'Komando utama pendidikan',
    outputDoc: 'Renbut kodik (kompilasi kotama)',
    description:
      'Kodiklatau merekapitulasi kebutuhan seluruh satuan pendidikan AU untuk diajukan ke tingkat Markas Besar.',
    imgFolder: 'kodiklatau',
    imgs: [],
    Icon: Landmark,
    flowSummary: 'Kompilasi renbut satuan pendidikan AU.',
  },
];

export const FASE1_ROW_BOTTOM: Fase1Node[] = [
  {
    id: 'mabesau',
    label: 'Mabes AU',
    instansi: 'Markas Besar TNI AU',
    outputDoc: 'Kertas kerja / usulan Mabes AU',
    description:
      'Markas Besar menyusun kertas kerja program dan anggaran (RKA) TNI AU berdasarkan kompilasi dari kotama.',
    imgFolder: 'mabesau',
    imgs: [],
    Icon: Shield,
    flowSummary: 'Kertas kerja RKA Markas Besar TNI AU.',
  },
  {
    id: 'srena',
    label: 'Srena',
    instansi: 'Asrena Kasau',
    outputDoc: 'Usulan rencana kebutuhan (Srenaa)',
    description:
      'Asisten Perencanaan dan Anggaran memfinalkan usulan kebutuhan matra untuk dibahas dengan Kementerian Keuangan.',
    imgFolder: 'srena',
    imgs: [],
    Icon: FileSpreadsheet,
    flowSummary: 'Finalisasi usulan kebutuhan matra.',
  },
  {
    id: 'kemhan',
    label: 'Kemhan',
    instansi: 'Kementerian Pertahanan',
    outputDoc: 'RKA-KL / dokumen penelaahan',
    description:
      'Kebutuhan TNI AU diakomodasi dalam RKA Kementerian/Lembaga dan menjadi dasar penetapan anggaran pertahanan.',
    imgFolder: 'kemhan',
    imgs: [],
    Icon: Landmark,
    flowSummary: 'Penelaahan RKA-KL Kementerian Pertahanan.',
  },
];

export const FASE1_NODES: Fase1Node[] = [...FASE1_ROW_TOP, ...FASE1_ROW_BOTTOM];

export const FASE1_DEFAULT_NODE_ID = FASE1_ROW_TOP[0].id;

export function getFase1NodeById(id: string): Fase1Node | undefined {
  return FASE1_NODES.find((n) => n.id === id);
}
