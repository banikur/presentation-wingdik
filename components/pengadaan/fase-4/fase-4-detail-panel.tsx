'use client';

import { PhaseDetailPanel } from '../shared/phase-detail-panel';
import { BerkasPendukungDetail } from './berkas-pendukung-detail';
import type { Fase4Node } from './fase-4-nodes';

type Fase4DetailPanelProps = {
  node: Fase4Node;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
};

export function Fase4DetailPanel({
  node,
  imageIndex,
  onImageIndexChange,
}: Fase4DetailPanelProps) {
  if (node.id === 'berkas-dukung') {
    return (
      <BerkasPendukungDetail
        node={node}
        imageIndex={imageIndex}
        onImageIndexChange={onImageIndexChange}
      />
    );
  }

  return (
    <PhaseDetailPanel
      phase={4}
      node={node}
      imageIndex={imageIndex}
      onImageIndexChange={onImageIndexChange}
    />
  );
}
