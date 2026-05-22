'use client';

import { useEffect, useState } from 'react';
import type { SimtelogNode } from '@/lib/simtelog/simtelog-assets';

type AssetKind = 'images' | 'docs';

function simtelogApiUrl(kind: AssetKind, folder: string): string {
  const encoded = folder.split('/').map((s) => encodeURIComponent(s)).join('/');
  return `/api/simtelog/${kind}/${encoded}`;
}

export function useSimtelogFiles(kind: AssetKind, node: SimtelogNode) {
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

    fetch(simtelogApiUrl(kind, node.imgFolder))
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
  }, [kind, node.id, node.imgFolder, manualKey, manualList.length]);

  return { files, loading, fetchError };
}
