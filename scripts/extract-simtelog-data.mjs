/**
 * Ekstrak CATEGORIES + ROLES dari materi HTML ke JSON.
 * Jalankan: node scripts/extract-simtelog-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const html = fs.readFileSync(
  path.join(root, 'simtelog/materi-pembekalan-simtelogau.html'),
  'utf8',
);

const catStart = html.indexOf('const CATEGORIES = ');
const catEnd = html.indexOf('const ROLES = ');
const rolesEnd = html.indexOf('];\n\nconst state');

const catJs = html.slice(catStart + 'const CATEGORIES = '.length, catEnd).trim().replace(/;$/, '');
const rolesJs = html.slice(catEnd + 'const ROLES = '.length, rolesEnd + 1);

const CATEGORIES = eval(`(${catJs})`);
const ROLES = eval(`(${rolesJs})`);

const outDir = path.join(root, 'lib/simtelog');
fs.writeFileSync(path.join(outDir, 'simtelog-categories.json'), JSON.stringify(CATEGORIES, null, 2));
fs.writeFileSync(path.join(outDir, 'simtelog-roles.json'), JSON.stringify(ROLES, null, 2));
console.log(`OK: ${ROLES.length} roles, ${Object.keys(CATEGORIES).length} categories`);
