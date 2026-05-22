'use client';

import { useEffect, useState } from 'react';
import type { PhaseNode } from '@/lib/pengadaan/phase-assets';
import type { PhaseNumber } from '@/lib/pengadaan/phase-registry';

type AssetKind = 'images' | 'docs';

export function usePhaseFiles(
  phase: PhaseNumber,
  kind: AssetKind,
  node: PhaseNode,
) {
  const manualList = kind === 'images' ? (node.imgs ?? []) : (node.docs ?? []);
  const [files, setFiles] = useState<string[]>(manualList);
  const [loading, setLoading] = useState(manualList.length === 0);
  const [fetchError, setFetchError] = useState(false);

  const manualKey = kind === 'images' ? node.imgs : node.docs;

  useEffect(() => {
    if (manualList.length > 0) {
      setFiles(manualList);
      setLoading(false);
      setFetchError(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setFetchError(false);

    fetch(`/api/pengadaan/${phase}/${kind}/${node.imgFolder}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat daftar file');
        return res.json() as Promise<{ files: string[] }>;
      })
      .then((data) => {
        if (!cancelled) setFiles(data.files ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setFiles([]);
          setFetchError(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [phase, kind, node.id, node.imgFolder, manualKey, manualList.length]);

  return { files, loading, fetchError };
}
