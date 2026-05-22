'use client';

import { useState } from 'react';
import { PhaseDetailPanel } from '../shared/phase-detail-panel';
import { PhaseVisualFlow } from '../shared/phase-visual-flow';
import { PhaseSectionHeader } from '../shared/phase-section-header';
import {
  FASE2_DEFAULT_NODE_ID,
  FASE2_NODES,
  getFase2NodeById,
} from './fase-2-nodes';

export function Fase2Section() {
  const [activeNodeId, setActiveNodeId] = useState(FASE2_DEFAULT_NODE_ID);
  const [imageIndex, setImageIndex] = useState(0);

  const activeNode =
    getFase2NodeById(activeNodeId) ?? getFase2NodeById(FASE2_DEFAULT_NODE_ID)!;

  const handleSelectNode = (id: string) => {
    setActiveNodeId(id);
    setImageIndex(0);
  };

  return (
    <div className="w-full mx-auto">
      <PhaseSectionHeader
        badge="Fase 2: Penyaluran anggaran"
        title="Digitalisasi & alokasi anggaran"
        subtitle="Klik tahapan pada alur untuk melihat penjelasan, dokumen unduh, dan pratinjau gambar."
      />

      <section aria-label="Alur penyaluran anggaran fase 2">
        <PhaseVisualFlow
          nodes={FASE2_NODES}
          activeNodeId={activeNodeId}
          onSelectNode={handleSelectNode}
          flowTitle="Alur penyaluran anggaran"
        />
      </section>

      <section aria-label="Panel detail tahapan" className="mt-8">
        <PhaseDetailPanel
          phase={2}
          node={activeNode}
          imageIndex={imageIndex}
          onImageIndexChange={setImageIndex}
        />
      </section>
    </div>
  );
}
