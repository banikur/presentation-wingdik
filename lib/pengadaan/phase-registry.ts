export const PHASE_NUMBERS = [1, 2, 3, 4, 5] as const;
export type PhaseNumber = (typeof PHASE_NUMBERS)[number];

export function isPhaseNumber(value: string): value is `${PhaseNumber}` {
  return PHASE_NUMBERS.includes(Number(value) as PhaseNumber);
}

/** Folder asset per tahap (public/img/faseN/… dan public/docs/faseN/…) */
export const PHASE_FOLDERS: Record<PhaseNumber, readonly string[]> = {
  1: ['skadik', 'wingdik', 'pusdik', 'kodiklatau', 'mabesau', 'srena', 'kemhan'],
  2: ['penerbitan-dipa', 'otorisasi', 'penyaluran', 'publikasi', 'progar'],
  3: ['terima-har', 'buat-up', 'input-sistem'],
  4: [
    'penunjukan',
    'buat-rab',
    'penetapan-hps',
    'pemanggilan',
    'evaluasi-nego',
    'penetapan-penyedia',
    'spk-kontrak',
    'pelaksanaan',
    'berkas-under-10jt',
    'berkas-10-50jt',
    'berkas-50-200jt',
    'bast-diterima',
    'verifikasi-tagihan',
    'penerbitan-spm',
    'sp2d-kppn',
  ],
  5: ['sakti-aset', 'simak-bmn'],
};

export function isPhaseFolder(phase: PhaseNumber, folder: string): boolean {
  return (PHASE_FOLDERS[phase] as readonly string[]).includes(folder);
}
