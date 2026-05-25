import { Landmark } from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';
import { getPhaseNodeById } from '@/lib/pengadaan/phase-assets';

export type Fase5Node = VisualFlowNode;

/** Pencatatan aset & persediaan pasca-SP2D (Fase 4) */
export const FASE5_NODES: Fase5Node[] = [
  {
    id: 'sakti-aset',
    label: 'Input SAKTI',
    instansi: 'Modul persediaan / aset tetap - SAKTI',
    outputDoc: 'Barang tercatat SAKTI',
    description:
      'Pencatatan barang masuk di modul Persediaan atau Aset Tetap SAKTI, triggered setelah SP2D terbit dari Fase 4.',
    imgFolder: 'sakti-aset',
    apps: ['sakti'],
    flowSummary: 'Input persediaan atau aset tetap di SAKTI.',
  },
  {
    id: 'simak-bmn',
    label: 'SIMAK BMN',
    instansi: 'Pelaporan BMN',
    outputDoc: 'Laporan BMN',
    description:
      'Pemutakhiran data Barang Milik Negara pada aplikasi SIMAK BMN.',
    imgFolder: 'simak-bmn',
    apps: ['simak-bmn'],
    Icon: Landmark,
    flowSummary: 'Pemutakhiran data BMN pada SIMAK.',
  },
];

export const FASE5_DEFAULT_NODE_ID = FASE5_NODES[0].id;

export function getFase5NodeById(id: string): Fase5Node | undefined {
  return getPhaseNodeById(FASE5_NODES, id) as Fase5Node | undefined;
}
