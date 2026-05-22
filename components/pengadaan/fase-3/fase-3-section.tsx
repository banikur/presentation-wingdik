'use client';

import { useState } from 'react';
import { PhaseDetailPanel } from '../shared/phase-detail-panel';
import { PhaseVisualFlow } from '../shared/phase-visual-flow';
import { PhaseSectionHeader } from '../shared/phase-section-header';
import {
  FASE3_DEFAULT_NODE_ID,
  FASE3_NODES,
  getFase3NodeById,
} from './fase-3-nodes';

export function Fase3Section() {
  const [activeNodeId, setActiveNodeId] = useState(FASE3_DEFAULT_NODE_ID);
  const [imageIndex, setImageIndex] = useState(0);

  const activeNode =
    getFase3NodeById(activeNodeId) ?? getFase3NodeById(FASE3_DEFAULT_NODE_ID)!;

  const handleSelectNode = (id: string) => {
    setActiveNodeId(id);
    setImageIndex(0);
  };

  return (
    <div className="w-full mx-auto">
      <PhaseSectionHeader
        badge="Fase 3: Pengajuan / usul pesanan"
        title="Persiapan pengadaan oleh satker"
        subtitle="Klik tahapan pada alur untuk melihat penjelasan, dokumen unduh, dan pratinjau gambar."
      />

      <section aria-label="Alur usul pesanan fase 3">
        <PhaseVisualFlow
          nodes={FASE3_NODES}
          activeNodeId={activeNodeId}
          onSelectNode={handleSelectNode}
          flowTitle="Alur usul pesanan"
        />
      </section>

      <section aria-label="Panel detail tahapan" className="mt-8">
        <PhaseDetailPanel
          phase={3}
          node={activeNode}
          imageIndex={imageIndex}
          onImageIndexChange={setImageIndex}
        />
      </section>
    </div>
  );
}
