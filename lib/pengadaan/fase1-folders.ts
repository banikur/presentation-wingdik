export const FASE1_SUBFASE_FOLDERS = [
  'skadik',
  'wingdik',
  'pusdik',
  'kodiklatau',
  'mabesau',
  'srena',
  'kemhan',
] as const;

export type Fase1SubfaseFolder = (typeof FASE1_SUBFASE_FOLDERS)[number];

export const FASE1_FOLDER_SET = new Set<string>(FASE1_SUBFASE_FOLDERS);

export function isFase1Folder(folder: string): folder is Fase1SubfaseFolder {
  return FASE1_FOLDER_SET.has(folder);
}
