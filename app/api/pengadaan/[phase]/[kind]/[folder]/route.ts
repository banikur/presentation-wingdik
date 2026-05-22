import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  DOC_EXTENSIONS,
  IMAGE_EXTENSIONS,
} from '@/lib/pengadaan/phase-assets';
import { isPhaseFolder, isPhaseNumber, type PhaseNumber } from '@/lib/pengadaan/phase-registry';

type AssetKind = 'images' | 'docs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ phase: string; kind: string; folder: string }> },
) {
  const { phase: phaseParam, kind, folder } = await context.params;

  if (!isPhaseNumber(phaseParam)) {
    return NextResponse.json({ error: 'Fase tidak valid' }, { status: 400 });
  }

  const phase = Number(phaseParam) as PhaseNumber;

  if (kind !== 'images' && kind !== 'docs') {
    return NextResponse.json({ error: 'Jenis file tidak valid' }, { status: 400 });
  }

  if (!isPhaseFolder(phase, folder)) {
    return NextResponse.json({ error: 'Folder tidak valid' }, { status: 400 });
  }

  const subdir = kind === 'images' ? 'img' : 'docs';
  const extSet = kind === 'images' ? IMAGE_EXTENSIONS : DOC_EXTENSIONS;
  const dir = path.join(process.cwd(), 'public', subdir, `fase${phase}`, folder);

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
