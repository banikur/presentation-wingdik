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
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-app-border bg-white px-2 py-1 text-sm font-semibold text-app-text transition-colors hover:bg-white/10"
        title="Buka di tab baru"
      >
        <ExternalLink className="h-3 w-3" />
        Buka
      </a>
      <a
        href={href}
        download={filename}
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-app-accent/50 bg-app-accent/15 px-2 py-1 text-sm font-semibold text-app-accent transition-colors hover:bg-app-accent/25"
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
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-app-text-muted">
          {title}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-app-border">
        <table className="w-full min-w-[16rem] table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-app-border bg-app-card-muted">
              <th className="w-[58%] px-3 py-2 text-sm font-semibold uppercase tracking-wider text-app-text-muted">
                Nama dokumen
              </th>
              <th className="w-[42%] px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-app-text-muted">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={2} className="px-3 py-6 text-center text-xs text-app-text-muted">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-app-accent/60" />
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
                <td colSpan={2} className="px-3 py-4 text-center text-xs text-app-text-muted">
                  {emptyHint}
                </td>
              </tr>
            )}

            {!loading &&
              !fetchError &&
              files.map(({ filename, href }) => (
                <tr
                  key={filename}
                  className="border-b border-app-border-subtle last:border-0 hover:bg-app-card-muted"
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
