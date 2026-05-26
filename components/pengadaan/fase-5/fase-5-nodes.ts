import { Landmark } from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';
import { getPhaseNodeById } from '@/lib/pengadaan/phase-assets';

export type Fase5Node = VisualFlowNode;

/** Pencatatan pasca-SP2D: SAKTI (Kemenkeu) lalu SIMAN (aset tidak bergerak) */
export const FASE5_NODES: Fase5Node[] = [
  {
    id: 'sakti-aset',
    label: 'SAKTI',
    instansi: 'Kemenkeu — persediaan & aset tetap',
    outputDoc: 'Barang tercatat di SAKTI',
    description:
      'Sistem Aplikasi Keuangan Tingkat Instansi (SAKTI) milik Kemenkeu untuk mencatat persediaan (barang habis pakai) dan aset tetap yang dapat bergerak/dipindah-lokasikan setelah SP2D—misalnya peralatan, kendaraan, dan inventaris operasional.',
    imgFolder: 'sakti-aset',
    apps: ['sakti'],
    flowSummary: 'Persediaan & aset tetap bergerak (SAKTI/Kemenkeu).',
  },
  {
    id: 'simak-bmn',
    label: 'SIMAN',
    instansi: 'Aset tetap tidak bergerak',
    outputDoc: 'Aset tidak bergerak tercatat',
    description:
      'Sistem Informasi Manajemen Aset Negara (SIMAN) untuk pencatatan aset tetap tidak bergerak—tanah, bangunan, jalan, jembatan, instalasi, dan BMN sejenis yang tidak dipindahkan. Bukan modul persediaan; melengkapi pencatatan SAKTI untuk objek yang bersifat menetap di lokasi.',
    imgFolder: 'simak-bmn',
    apps: ['simak-bmn'],
    Icon: Landmark,
    flowSummary: 'Aset tetap tidak bergerak (SIMAN).',
  },
];

export const FASE5_DEFAULT_NODE_ID = FASE5_NODES[0].id;

export function getFase5NodeById(id: string): Fase5Node | undefined {
  return getPhaseNodeById(FASE5_NODES, id) as Fase5Node | undefined;
}
