import { SIMTELOG_ROLE_IMAGE_FOLDER } from './simtelog-data';

/** Semua folder valid di public/img|docs/simtelog (satu tingkat - per nama peran) */
export const SIMTELOG_FOLDERS = [
  ...new Set(Object.values(SIMTELOG_ROLE_IMAGE_FOLDER)),
  'gudang-stok',
  'permintaan-barang',
  'distribusi',
] as const;

export type SimtelogFolder = (typeof SIMTELOG_FOLDERS)[number];

export function isSimtelogFolder(folder: string): folder is SimtelogFolder {
  return (SIMTELOG_FOLDERS as readonly string[]).includes(folder);
}

export function isSafeSimtelogPath(segments: string[]): boolean {
  if (segments.length !== 1) return false;
  const [segment] = segments;
  return segment.length > 0 && !segment.includes('..') && !/[\\/]/.test(segment);
}
