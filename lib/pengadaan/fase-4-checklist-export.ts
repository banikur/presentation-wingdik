import * as XLSX from 'xlsx';
import type { PaketTier } from './fase-4-berkas-tiers';

/** Menghasilkan buffer file .xlsx checklist untuk satu kategori paket */
export function buildChecklistExcelBuffer(tier: PaketTier): Buffer {
  const header = ['Konfigurasi Persyaratan Dokumen Pengadaan'];
  const category = [tier.categoryTitle];
  const blank: string[] = [''];
  const tableHeader = ['No', 'Dokumen'];
  const rows: (string | number)[][] = [];
  let lastGroup: string | undefined;
  for (const item of tier.checklist) {
    if (item.processGroup && item.processGroup !== lastGroup) {
      rows.push(['', item.processGroup]);
      lastGroup = item.processGroup;
    }
    rows.push([item.no, item.name]);
  }

  const sheetData: (string | number)[][] = [
    header,
    category,
    blank,
    tableHeader,
    ...rows,
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  worksheet['!cols'] = [{ wch: 6 }, { wch: 48 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Checklist');

  const arrayBuffer = XLSX.write(workbook, {
    type: 'array',
    bookType: 'xlsx',
  }) as ArrayBuffer;

  return Buffer.from(arrayBuffer);
}
