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
        badge="Fase 5: Pendataan aset & persediaan"
        title="Pencatatan BMN (SAKTI & SIMAK)"
        subtitle="Klik tahapan pada alur: input SAKTI (persediaan/aset) dan pemutakhiran SIMAK BMN setelah SP2D."
      />

      <section aria-label="Alur pendataan aset fase 5">
        <PhaseVisualFlow
          nodes={FASE5_NODES}
          activeNodeId={activeNodeId}
          onSelectNode={handleSelectNode}
          flowTitle="Alur pelaporan BMN"
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
