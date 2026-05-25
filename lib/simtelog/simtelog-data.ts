import categoriesJson from './simtelog-categories.json';
import rolesJson from './simtelog-roles.json';
import type { SimtelogCategory, SimtelogCategoryId, SimtelogRole } from './simtelog-types';

export const SIMTELOG_CATEGORIES = categoriesJson as Record<
  SimtelogCategoryId,
  SimtelogCategory
>;

export const SIMTELOG_ROLES = rolesJson as SimtelogRole[];

/**
 * Nama folder di public/img|docs/simtelog/ (sesuai upload per peran).
 * Jika menambah peran baru, sesuaikan nama folder di sini.
 */
export const SIMTELOG_ROLE_IMAGE_FOLDER: Record<string, string> = {
  kagpl: 'KAGPL',
  kagpd: 'KaGPD',
  kasikal: 'Kasikal',
  kasubsikal: 'Kasubsikal',
  katb: 'KaTB',
  kabinakatstand: 'Kabinakatstand',
  kasibinitem: 'Kasibinitem',
  kasimatkomoditi: 'Kasimatkomoditi',
  kasihar: 'Kasihar',
  kasiminmat: 'Kasiminmat',
  kasubdisbinitem: 'Kasubdisbinitem',
  sesdisbinitem: 'Sesdisbinitem',
  kadisbinitem: 'Kadisbinitem',
  kasubdismatkomoditi: 'Kasubdismatkomoditi',
  sesdismatau: 'Sesdismatau',
  kadismatau: 'Kadismatau',
};

export function getSimtelogRole(id: string): SimtelogRole | undefined {
  return SIMTELOG_ROLES.find((r) => r.id === id);
}

export function getRolesByCategory(categoryId: SimtelogCategoryId): SimtelogRole[] {
  return SIMTELOG_ROLES.filter((r) => r.category === categoryId);
}

export const SIMTELOG_CATEGORY_ORDER: SimtelogCategoryId[] = [
  'gudang',
  'admin',
  'har',
  'approval',
];

/** Slug folder dari judul tupoksi (untuk referensi / subfolder opsional) */
export function simtelogTupoksiSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'dan')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Folder aset per peran: public/{img|docs}/simtelog/{namaPeran}/ */
export function simtelogRoleImageFolder(roleId: string): string {
  const mapped = SIMTELOG_ROLE_IMAGE_FOLDER[roleId];
  if (mapped) return mapped;
  const role = getSimtelogRole(roleId);
  return role?.name ?? `demo-${roleId}`;
}

/** @deprecated Gunakan simtelogRoleImageFolder */
export function simtelogTupoksiFolder(roleId: string, _tupoksiTitle: string): string {
  return simtelogRoleImageFolder(roleId);
}

/** @deprecated Gunakan simtelogRoleImageFolder */
export function simtelogDemoFolder(roleId: string): string {
  return simtelogRoleImageFolder(roleId);
}

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'dan')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Cocokkan file di folder peran ke kartu tupoksi aktif (berdasarkan nama file) */
export function filterSimtelogImagesForTupoksi(
  files: string[],
  tupoksiTitle: string,
): string[] {
  if (files.length === 0) return files;

  const titleNorm = normalizeForMatch(tupoksiTitle);
  const titleParts = titleNorm.split(/\s+/).filter((p) => p.length > 2);
  const slugParts = simtelogTupoksiSlug(tupoksiTitle).split('-').filter((p) => p.length > 2);

  const matched = files.filter((filename) => {
    const fileNorm = normalizeForMatch(filename.replace(/\.[^.]+$/, ''));
    const partHits = titleParts.filter((p) => fileNorm.includes(p)).length;
    const slugHits = slugParts.filter((p) => fileNorm.includes(p)).length;
    if (partHits >= 2 || (titleParts.length === 1 && partHits === 1)) return true;
    if (slugHits >= Math.min(2, slugParts.length)) return true;
    if (fileNorm.includes(titleNorm) || titleNorm.includes(fileNorm)) return true;
    return false;
  });

  return matched.length > 0 ? matched.sort((a, b) => a.localeCompare(b, 'id')) : files;
}

export function getSimtelogRoleFolderIds(): string[] {
  return Object.keys(SIMTELOG_ROLE_IMAGE_FOLDER);
}

/**
 * Ambil caption untuk satu file gambar pada peran tertentu.
 * Lookup case-sensitive dulu, fallback ke case-insensitive bila tidak ketemu.
 * Return undefined bila peran belum punya caption sama sekali atau file tidak terdaftar.
 */
export function getSimtelogImageCaption(
  roleOrId: SimtelogRole | string,
  filename: string | undefined | null,
): string | undefined {
  if (!filename) return undefined;
  const role =
    typeof roleOrId === 'string' ? getSimtelogRole(roleOrId) : roleOrId;
  const captions = role?.imageCaptions;
  if (!captions) return undefined;
  if (filename in captions) return captions[filename];
  // fallback: case-insensitive
  const lower = filename.toLowerCase();
  for (const key of Object.keys(captions)) {
    if (key.toLowerCase() === lower) return captions[key];
  }
  return undefined;
}

/**
 * Daftar id peran yang BELUM punya gambar di public/img/simtelog/<folder>/.
 * Berdasarkan audit (per 2026-05-25) - sumber tunggal kebenaran untuk badge UI.
 * Catatan: bila gambar ditambahkan, hapus entri terkait di sini.
 */
export const SIMTELOG_ROLES_WITHOUT_IMAGES: ReadonlySet<string> = new Set([
  'kasiminmat',
  'kasubdisbinitem',
  'sesdisbinitem',
  'kadisbinitem',
  'kasubdismatkomoditi',
  'sesdismatau',
  'kadismatau',
]);

export function isSimtelogRoleWithoutImages(roleId: string): boolean {
  return SIMTELOG_ROLES_WITHOUT_IMAGES.has(roleId);
}
