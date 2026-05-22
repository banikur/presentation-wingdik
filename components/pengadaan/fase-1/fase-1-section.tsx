'use client';

import { useState } from 'react';
import { PhaseDetailPanel } from '../shared/phase-detail-panel';
import { PhaseVisualFlow } from '../shared/phase-visual-flow';
import { PhaseSectionHeader } from '../shared/phase-section-header';
import {
  FASE1_DEFAULT_NODE_ID,
  FASE1_NODES,
  getFase1NodeById,
} from './fase-1-nodes';

export function Fase1Section() {
  const [activeNodeId, setActiveNodeId] = useState(FASE1_DEFAULT_NODE_ID);
  const [imageIndex, setImageIndex] = useState(0);

  const activeNode =
    getFase1NodeById(activeNodeId) ?? getFase1NodeById(FASE1_DEFAULT_NODE_ID)!;

  const handleSelectNode = (id: string) => {
    setActiveNodeId(id);
    setImageIndex(0);
  };

  return (
    <div className="w-full mx-auto">
      <PhaseSectionHeader
        badge="Fase 1: Perencanaan kebutuhan (Renbut)"
        title="Dari satuan ke Kementerian Keuangan"
        subtitle="Klik tahapan pada alur untuk mengganti penjelasan, dokumen unduh, dan pratinjau gambar."
      />

      <section aria-label="Alur perencanaan fase 1">
        <PhaseVisualFlow
          nodes={FASE1_NODES}
          activeNodeId={activeNodeId}
          onSelectNode={handleSelectNode}
          flowTitle="Alur perencanaan renbut"
          cardClassName="w-[14rem] sm:w-auto"
        />
      </section>

      <section aria-label="Panel detail tahapan" className="mt-8">
        <PhaseDetailPanel
          phase={1}
          node={activeNode}
          imageIndex={imageIndex}
          onImageIndexChange={setImageIndex}
        />
      </section>
    </div>
  );
}
