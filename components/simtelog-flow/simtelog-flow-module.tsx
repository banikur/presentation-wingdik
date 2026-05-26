'use client';

import { useState } from 'react';
import {
  BENTUK_DEFAULT_CODE,
  getBentukByCode,
} from '@/lib/simtelog-flow/flow-bentuk-data';
import { FlowSidebar } from './flow-sidebar';
import { FlowCanvas } from './flow-canvas';

/**
 * Orchestrator: sidebar horizontal (atas) + panel konten (bawah).
 */
export function SimtelogFlowModule() {
  const [activeCode, setActiveCode] = useState(BENTUK_DEFAULT_CODE);
  const bentuk = getBentukByCode(activeCode) ?? getBentukByCode(BENTUK_DEFAULT_CODE)!;

  return (
    <div className="overflow-hidden rounded-xl border-2 border-app-border bg-app-surface shadow-sm">
      <div className="bg-app-card-muted px-3 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-app-accent">
          Pilih Bentuk
        </p>
        <FlowSidebar activeCode={activeCode} onSelect={setActiveCode} />
      </div>

      <section
        className="min-w-0 bg-app-card px-3 py-4 md:px-5 md:py-4"
        aria-label={`Visualisasi alur Bentuk ${bentuk.code}`}
      >
        <FlowCanvas bentuk={bentuk} />
      </section>
    </div>
  );
}
