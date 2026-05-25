'use client';

import { useState } from 'react';
import { Fase4DetailPanel } from './fase-4-detail-panel';
import { PhaseVisualFlow } from '../shared/phase-visual-flow';
import { PhaseSectionHeader } from '../shared/phase-section-header';
import {
  FASE4_DEFAULT_NODE_ID,
  FASE4_FLOW_ROWS,
  FASE4_NODES,
  getFase4NodeById,
} from './fase-4-nodes';

export function Fase4Section() {
  const [activeNodeId, setActiveNodeId] = useState(FASE4_DEFAULT_NODE_ID);
  const [imageIndex, setImageIndex] = useState(0);

  const activeNode =
    getFase4NodeById(activeNodeId) ?? getFase4NodeById(FASE4_DEFAULT_NODE_ID)!;

  const handleSelectNode = (id: string) => {
    setActiveNodeId(id);
    setImageIndex(0);
  };

  return (
    <div className="w-full mx-auto">
      <PhaseSectionHeader
        badge="Fase 4: Pelaksanaan / pengadaan"
        title="Administrasi pengadaan & eksekusi"
        subtitle="Klik tahapan pada alur untuk melihat penjelasan, dokumen unduh, dan pratinjau gambar."
      />

      <section aria-label="Alur pelaksanaan pengadaan fase 4">
        <PhaseVisualFlow
          nodes={FASE4_NODES}
          rows={FASE4_FLOW_ROWS}
          activeNodeId={activeNodeId}
          onSelectNode={handleSelectNode}
          flowTitle="Alur pelaksanaan pengadaan"
        />
      </section>

      <div className="mt-6 rounded-lg border border-app-accent/30 bg-app-accent/10 p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-app-accent">
          Penting
        </p>
        <p className="mt-1 text-sm text-app-text">
          PPK (Pejabat Pembuat Komitmen) harus sudah ditunjuk sebelum proses berjalan.
        </p>
      </div>

      <section aria-label="Panel detail tahapan" className="mt-8">
        <Fase4DetailPanel
          node={activeNode}
          imageIndex={imageIndex}
          onImageIndexChange={setImageIndex}
        />
      </section>
    </div>
  );
}
