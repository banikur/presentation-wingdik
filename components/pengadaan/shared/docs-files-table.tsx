'use client';

import type { ReactNode } from 'react';
import { Download, ExternalLink, Loader2 } from 'lucide-react';
import { formatDocDisplayName } from '@/lib/pengadaan/phase-assets';

export type DocsFileRow = {
  filename: string;
  href: string;
};

type DocsFilesTableProps = {
  files: DocsFileRow[];
  loading: boolean;
  fetchError: boolean;
  emptyHint: ReactNode;
  title?: string;
  className?: string;
};

function DocActions({ filename, href }: DocsFileRow) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-semibold text-white/75 transition-colors hover:bg-white/10"
        title="Buka di tab baru"
      >
        <ExternalLink className="h-3 w-3" />
        Buka
      </a>
      <a
        href={href}
        download={filename}
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-2 py-1 text-[10px] font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/25"
        title={`Unduh ${filename}`}
      >
        <Download className="h-3 w-3" />
        Unduh
      </a>
    </div>
  );
}

export function DocsFilesTable({
  files,
  loading,
  fetchError,
  emptyHint,
  title = 'File dokumen',
  className = '',
}: DocsFilesTableProps) {
  return (
    <div className={`mt-4 ${className}`}>
      {title ? (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          {title}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[16rem] table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.06]">
              <th className="w-[58%] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/45">
                Nama dokumen
              </th>
              <th className="w-[42%] px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-white/45">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={2} className="px-3 py-6 text-center text-xs text-white/50">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]/60" />
                    Memuat daftar dokumen…
                  </span>
                </td>
              </tr>
            )}

            {!loading && fetchError && (
              <tr>
                <td colSpan={2} className="px-3 py-4 text-center text-xs text-red-300/90">
                  Gagal memuat daftar dokumen.
                </td>
              </tr>
            )}

            {!loading && !fetchError && files.length === 0 && (
              <tr>
                <td colSpan={2} className="px-3 py-4 text-center text-xs text-white/45">
                  {emptyHint}
                </td>
              </tr>
            )}

            {!loading &&
              !fetchError &&
              files.map(({ filename, href }) => (
                <tr
                  key={filename}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.04]"
                >
                  <td className="min-w-0 px-3 py-2.5 text-white/85" title={filename}>
                    <span className="block truncate">{formatDocDisplayName(filename)}</span>
                  </td>
                  <td className="px-2 py-2">
                    <DocActions filename={filename} href={href} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
