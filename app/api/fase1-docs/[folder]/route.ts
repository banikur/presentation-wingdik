import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isPhaseFolder } from '@/lib/pengadaan/phase-registry';

const DOC_EXT = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.csv',
  '.zip',
  '.rar',
  '.7z',
]);

export async function GET(
  _request: Request,
  context: { params: Promise<{ folder: string }> },
) {
  const { folder } = await context.params;

  if (!isPhaseFolder(1, folder)) {
    return NextResponse.json({ error: 'Folder tidak valid' }, { status: 400 });
  }

  const dir = path.join(process.cwd(), 'public', 'docs', 'fase1', folder);

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => DOC_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'id'));

  return NextResponse.json({ files });
}
