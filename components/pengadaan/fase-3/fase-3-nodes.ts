import { FilePlus, Inbox, Upload } from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';
import { getPhaseNodeById } from '@/lib/pengadaan/phase-assets';

export type Fase3Node = VisualFlowNode;

export const FASE3_NODES: Fase3Node[] = [
  {
    id: 'terima-har',
    label: 'Terima HAR',
    instansi: 'Satker internal',
    outputDoc: 'Nota dinas HAR',
    description: 'Satker menerima distribusi Harkat Anggaran dari Progar wing.',
    imgFolder: 'terima-har',
    Icon: Inbox,
    flowSummary: 'Satker menerima distribusi HAR dari Progar.',
  },
  {
    id: 'buat-up',
    label: 'Membuat Usul Pesanan (UP)',
    instansi: 'Satker pengusul',
    outputDoc: 'Usul pesanan (UP)',
    description: 'Satker menyusun Usul Pesanan sesuai kebutuhan dan pagu HAR yang diterima.',
    imgFolder: 'buat-up',
    Icon: FilePlus,
    flowSummary: 'Penyusunan Usul Pesanan (UP) satker.',
  },
  {
    id: 'input-sistem',
    label: 'Input sistem',
    instansi: 'Sistem pengadaan terintegrasi',
    outputDoc: 'UP terinput',
    description: 'UP diajukan dan tercatat pada sistem pengadaan terintegrasi (SIKAL).',
    imgFolder: 'input-sistem',
    Icon: Upload,
    flowSummary: 'UP diinput pada sistem SIKAL.',
  },
];

export const FASE3_DEFAULT_NODE_ID = FASE3_NODES[0].id;

export function getFase3NodeById(id: string): Fase3Node | undefined {
  return getPhaseNodeById(FASE3_NODES, id) as Fase3Node | undefined;
}
