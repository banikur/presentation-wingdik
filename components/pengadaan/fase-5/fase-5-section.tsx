'use client';

import { useState } from 'react';
import { PhaseDetailPanel } from '../shared/phase-detail-panel';
import { PhaseSectionHeader } from '../shared/phase-section-header';
import { PhaseVisualFlow } from '../shared/phase-visual-flow';
import {
  FASE5_DEFAULT_NODE_ID,
  FASE5_NODES,
  getFase5NodeById,
} from './fase-5-nodes';

export function Fase5Section() {
  const [activeNodeId, setActiveNodeId] = useState(FASE5_DEFAULT_NODE_ID);
  const [imageIndex, setImageIndex] = useState(0);

  const activeNode =
    getFase5NodeById(activeNodeId) ?? getFase5NodeById(FASE5_DEFAULT_NODE_ID)!;

  const handleSelectNode = (id: string) => {
    setActiveNodeId(id);
    setImageIndex(0);
  };

  return (
    <div className="w-full mx-auto">
      <PhaseSectionHeader
        badge="Fase 5: Pendataan pasca-SP2D"
        title="SAKTI (Kemenkeu) & SIMAN"
        subtitle="SAKTI: persediaan dan aset tetap yang dapat bergerak. SIMAN: aset tetap tidak bergerak (tanah, bangunan, dan sejenisnya). Klik tiap tahap pada alur."
      />

      <section aria-label="Alur pendataan aset fase 5">
        <PhaseVisualFlow
          nodes={FASE5_NODES}
          activeNodeId={activeNodeId}
          onSelectNode={handleSelectNode}
          flowTitle="Alur pendataan SAKTI → SIMAN"
        />
      </section>

      <section aria-label="Panel detail tahapan" className="mt-8">
        <PhaseDetailPanel
          phase={5}
          node={activeNode}
          imageIndex={imageIndex}
          onImageIndexChange={setImageIndex}
        />
      </section>
    </div>
  );
}
