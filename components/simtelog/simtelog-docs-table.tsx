'use client';

import { formatDocDisplayName, simtelogDocSrc } from '@/lib/simtelog/simtelog-assets';
import type { SimtelogNode } from '@/lib/simtelog/simtelog-assets';
import { DocsFilesTable } from '@/components/pengadaan/shared/docs-files-table';
import { useSimtelogFiles } from './use-simtelog-files';

type SimtelogDocsTableProps = {
  node: SimtelogNode;
  showTitle?: boolean;
};

export function SimtelogDocsTable({ node, showTitle = true }: SimtelogDocsTableProps) {
  const { files, loading, fetchError } = useSimtelogFiles('docs', node);

  const rows = files.map((filename) => ({
    filename,
    href: simtelogDocSrc(node.imgFolder, filename),
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
          <span className="font-mono text-[10px] text-[#D4AF37]/80">
            public/docs/simtelog/{node.imgFolder}/
          </span>
        </>
      }
      className={showTitle ? '' : '!mt-0'}
    />
  );
}
