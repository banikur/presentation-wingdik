'use client';

import { useState } from 'react';
import {
  BENTUK_DEFAULT_CODE,
  getBentukByCode,
} from '@/lib/simtelog-flow/flow-bentuk-data';
import { FlowSidebar } from './flow-sidebar';
import { FlowCanvas } from './flow-canvas';

/**
 * Orchestrator: sidebar (pilih bentuk) + canvas (visualisasi).
 * Layout responsif: sidebar di atas (mobile) atau di kiri (desktop).
 */
export function SimtelogFlowModule() {
  const [activeCode, setActiveCode] = useState(BENTUK_DEFAULT_CODE);
  const bentuk = getBentukByCode(activeCode) ?? getBentukByCode(BENTUK_DEFAULT_CODE)!;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[16rem_1fr] lg:gap-6">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <FlowSidebar activeCode={activeCode} onSelect={setActiveCode} />
      </aside>
      <section aria-label={`Visualisasi alur Bentuk ${bentuk.code}`}>
        <FlowCanvas bentuk={bentuk} />
      </section>
    </div>
  );
}
