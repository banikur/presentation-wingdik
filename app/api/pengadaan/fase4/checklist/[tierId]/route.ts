import { NextResponse } from 'next/server';
import { buildChecklistExcelBuffer } from '@/lib/pengadaan/fase-4-checklist-export';
import { getPaketTier, isPaketTierId } from '@/lib/pengadaan/fase-4-berkas-tiers';

export async function GET(
  _request: Request,
  context: { params: Promise<{ tierId: string }> },
) {
  const { tierId } = await context.params;

  if (!isPaketTierId(tierId)) {
    return NextResponse.json({ error: 'Kategori paket tidak valid' }, { status: 400 });
  }

  const tier = getPaketTier(tierId);
  const buffer = buildChecklistExcelBuffer(tier);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${tier.excelFilename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
