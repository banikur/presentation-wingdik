import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DOC_EXTENSIONS, IMAGE_EXTENSIONS } from '@/lib/pengadaan/phase-assets';
import { isSafeSimtelogPath, isSimtelogFolder } from '@/lib/simtelog/simtelog-registry';

type AssetKind = 'images' | 'docs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ kind: string; path: string[] }> },
) {
  const { kind, path: segments } = await context.params;

  if (kind !== 'images' && kind !== 'docs') {
    return NextResponse.json({ error: 'Jenis file tidak valid' }, { status: 400 });
  }

  if (!isSafeSimtelogPath(segments)) {
    return NextResponse.json({ error: 'Path tidak valid' }, { status: 400 });
  }

  const folder = segments.join('/');
  if (!isSimtelogFolder(folder)) {
    return NextResponse.json({ error: 'Folder tidak valid' }, { status: 400 });
  }

  const subdir = kind === 'images' ? 'img' : 'docs';
  const extSet = kind === 'images' ? IMAGE_EXTENSIONS : DOC_EXTENSIONS;
  const dir = path.join(process.cwd(), 'public', subdir, 'simtelog', ...segments);

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => extSet.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'id'));

  return NextResponse.json({ files });
}
