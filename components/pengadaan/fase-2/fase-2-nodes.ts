import { Banknote, FileText, Send } from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';
import { getPhaseNodeById } from '@/lib/pengadaan/phase-assets';

export type Fase2Node = VisualFlowNode;

export const FASE2_NODES: Fase2Node[] = [
  {
    id: 'penerbitan-dipa',
    label: 'Penerbitan DIPA',
    instansi: 'Kementerian / satker',
    outputDoc: 'DIPA petikan',
    description:
      'Daftar Isian Pelaksanaan Anggaran diterbitkan per satker/wing setelah RKA disahkan.',
    imgFolder: 'penerbitan-dipa',
    Icon: FileText,
    flowSummary: 'DIPA petikan diterbitkan per satker/wing.',
  },
  {
    id: 'otorisasi',
    label: 'Otorisasi pusat',
    instansi: 'Sistem keuangan',
    outputDoc: 'Otorisasi SAKTI',
    description: 'DIPA dan pagu dimasukkan serta diotorisasi pada aplikasi SAKTI.',
    imgFolder: 'otorisasi',
    apps: ['sakti'],
    flowSummary: 'Otorisasi pagu pada aplikasi SAKTI.',
  },
  {
    id: 'penyaluran',
    label: 'Penyaluran',
    instansi: 'KPPN / bendahara',
    outputDoc: 'Bukti penyaluran dana',
    description: 'Dana mengalir melalui Kas Negara ke rekening bendahara satker.',
    imgFolder: 'penyaluran',
    Icon: Banknote,
    flowSummary: 'Penyaluran dana ke bendahara satker.',
  },
  {
    id: 'publikasi',
    label: 'Publikasi',
    instansi: 'SIRUP INAPROC',
    outputDoc: 'Paket RUP',
    description:
      'RUP dipublikasikan ke aplikasi SIRUP oleh Progar Publikasi dapat dilakukan paralel dengan pengolahan HAR, karena Progar adalah pemegang data anggaran sebelum HAR didistribusikan ke satker.',
    imgFolder: 'publikasi',
    apps: ['sirup'],
    flowSummary: 'Publikasi paket pada SIRUP INAPROC.',
  },
  {
    id: 'progar',
    label: 'PROGAR',
    instansi: 'Progar',
    outputDoc: 'Nota dinas (HAR)',
    description:
      'Progar mendistribusikan Nota Dinas Harkat Anggaran ke satker jajaran dan melaporkan ke SIRUP.',
    imgFolder: 'progar',
    Icon: Send,
    flowSummary: 'Distribusi HAR ke satker jajaran.',
  },
];

export const FASE2_DEFAULT_NODE_ID = FASE2_NODES[0].id;

export function getFase2NodeById(id: string): Fase2Node | undefined {
  return getPhaseNodeById(FASE2_NODES, id) as Fase2Node | undefined;
}
