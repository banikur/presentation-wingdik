'use client';

import { phaseDocSrc, type PhaseNode } from '@/lib/pengadaan/phase-assets';
import type { PhaseNumber } from '@/lib/pengadaan/phase-registry';
import { DocsFilesTable } from './docs-files-table';
import { usePhaseFiles } from './use-phase-files';

type PhaseDocsTableProps = {
  phase: PhaseNumber;
  node: PhaseNode;
  /** Sembunyikan judul bila parent sudah punya label */
  showTitle?: boolean;
};

export function PhaseDocsTable({ phase, node, showTitle = true }: PhaseDocsTableProps) {
  const { files, loading, fetchError } = usePhaseFiles(phase, 'docs', node);

  const rows = files.map((filename) => ({
    filename,
    href: phaseDocSrc(phase, node.imgFolder, filename),
  }));

  return (
    <DocsFilesTable
      files={rows}
      loading={loading}
      fetchError={fetchError}
      title={showTitle ? 'File dokumen' : undefined}
      emptyHint={
        <>
          Belum ada file di{' '}
          <span className="font-mono text-sm text-app-accent/80">
            public/docs/fase{phase}/{node.imgFolder}/
          </span>
        </>
      }
      className={showTitle ? '' : '!mt-0'}
    />
  );
}
