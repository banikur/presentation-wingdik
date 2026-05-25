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
  compact?: boolean;
  activeFilename?: string | null;
  onSelectFilename?: (filename: string) => void;
};

function DocActions({ filename, href }: DocsFileRow) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-app-border bg-white px-2 py-1 text-xs font-semibold text-app-text transition-colors hover:bg-app-card-muted sm:text-sm"
        title="Buka di tab baru"
      >
        <ExternalLink className="h-3 w-3" />
        Buka
      </a>
      <a
        href={href}
        download={filename}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-app-accent/50 bg-amber-50 px-2 py-1 text-xs font-semibold text-app-accent transition-colors hover:bg-amber-100 sm:text-sm"
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
  compact = false,
  activeFilename = null,
  onSelectFilename,
}: DocsFilesTableProps) {
  const thPad = compact ? 'px-2 py-1.5' : 'px-3 py-2';
  const tdPad = compact ? 'px-2 py-2' : 'px-3 py-2.5';

  return (
    <div className={`${compact ? 'mt-0' : 'mt-4'} ${className}`}>
      {title ? (
        <p
          className={`mb-2 font-semibold text-app-text-muted ${compact ? 'text-sm' : 'text-sm uppercase tracking-wider'}`}
        >
          {title}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-app-border">
        <table className={`w-full min-w-[14rem] table-fixed text-left ${compact ? 'text-xs sm:text-sm' : 'text-sm'}`}>
          <thead>
            <tr className="border-b border-app-border bg-app-card-muted">
              <th
                className={`${compact ? 'w-[52%]' : 'w-[58%]'} ${thPad} font-semibold text-app-text-muted`}
              >
                Nama dokumen
              </th>
              <th className={`${compact ? 'w-[48%]' : 'w-[42%]'} ${thPad} text-center font-semibold text-app-text-muted`}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={2} className={`${tdPad} text-center text-app-text-muted`}>
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-app-accent" />
                    Memuat…
                  </span>
                </td>
              </tr>
            )}

            {!loading && fetchError && (
              <tr>
                <td colSpan={2} className={`${tdPad} text-center text-sm text-red-600`}>
                  Gagal memuat daftar dokumen.
                </td>
              </tr>
            )}

            {!loading && !fetchError && files.length === 0 && (
              <tr>
                <td colSpan={2} className={`${tdPad} text-center text-sm text-app-text-muted`}>
                  {emptyHint}
                </td>
              </tr>
            )}

            {!loading &&
              !fetchError &&
              files.map(({ filename, href }) => {
                const isActive = activeFilename === filename;
                const rowClass = onSelectFilename
                  ? `cursor-pointer ${isActive ? 'bg-amber-50' : 'hover:bg-app-card-muted'}`
                  : 'hover:bg-app-card-muted';

                return (
                  <tr
                    key={filename}
                    className={`border-b border-app-border-subtle last:border-0 ${rowClass}`}
                    onClick={
                      onSelectFilename
                        ? () => onSelectFilename(filename)
                        : undefined
                    }
                    onKeyDown={
                      onSelectFilename
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onSelectFilename(filename);
                            }
                          }
                        : undefined
                    }
                    tabIndex={onSelectFilename ? 0 : undefined}
                    role={onSelectFilename ? 'button' : undefined}
                  >
                    <td
                      className={`min-w-0 ${tdPad} ${isActive ? 'font-semibold text-app-accent' : 'text-app-text'}`}
                      title={filename}
                    >
                      <span className="block truncate">{formatDocDisplayName(filename)}</span>
                    </td>
                    <td className={tdPad}>
                      <DocActions filename={filename} href={href} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {onSelectFilename && files.length > 0 ? (
        <p className="mt-1.5 text-xs text-app-text-muted">Klik nama file untuk pratinjau di kanan.</p>
      ) : null}
    </div>
  );
}
