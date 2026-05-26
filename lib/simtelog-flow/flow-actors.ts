import type { FlowActor, FlowActorId } from './flow-types';

/**
 * Registry semua aktor yang terlibat dalam alur SIMTELOG WINGDIK 600.
 * Warna accent dipilih distinct & contrast-friendly untuk light theme.
 */
export const FLOW_ACTORS: Record<FlowActorId, FlowActor> = {
  tb: {
    id: 'tb',
    short: 'TB',
    fullName: 'Kepala Tata Bench Stock (KaTB)',
    role: 'Pengelola bench stock & requester barang di skadron/sathar.',
    accent: '#0d9488', // teal-600
    icon: '🧰',
  },
  sikal: {
    id: 'sikal',
    short: 'SIKAL',
    fullName: 'Kasikal / Kasubsikal',
    role: 'Validator dokumen & otorisator distribusi materiel.',
    accent: '#1d4ed8', // blue-700
    icon: '🛡️',
  },
  gpl: {
    id: 'gpl',
    short: 'GPL',
    fullName: 'Kepala Gudang Pangkalan (KaGPL)',
    role: 'Pengelola stok & transaksi gudang tingkat pangkalan.',
    accent: '#b91c1c', // red-700
    icon: '🏭',
  },
  gpd: {
    id: 'gpd',
    short: 'GPD',
    fullName: 'Kepala Gudang Depo (KaGPD)',
    role: 'Pengelola stok gudang depo (skala lebih besar dari pangkalan).',
    accent: '#9333ea', // purple-600
    icon: '🏗️',
  },
  rpc: {
    id: 'rpc',
    short: 'RPC',
    fullName: 'Repair Center (Sathar / Depo)',
    role: 'Unit pelaksana perbaikan barang non-garansi.',
    accent: '#ea580c', // orange-600
    icon: '🔧',
  },
  vendor: {
    id: 'vendor',
    short: 'VENDOR',
    fullName: 'Vendor / Warranty Provider',
    role: 'Pihak ketiga yang memproses klaim garansi.',
    accent: '#c026d3', // fuchsia-600
    icon: '🏢',
  },
  sistem: {
    id: 'sistem',
    short: 'SYS',
    fullName: 'SIMTELOG (Notifikasi)',
    role: 'Notifikasi otomatis sistem untuk update status & inventory.',
    accent: '#475569', // slate-600
    icon: '🔔',
  },
};

export function getFlowActor(id: FlowActorId): FlowActor {
  return FLOW_ACTORS[id];
}
