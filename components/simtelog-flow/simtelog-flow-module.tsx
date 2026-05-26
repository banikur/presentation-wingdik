'use client';

import { useState } from 'react';
import {
  BENTUK_DEFAULT_CODE,
  getBentukByCode,
} from '@/lib/simtelog-flow/flow-bentuk-data';
import { FlowSidebar } from './flow-sidebar';
import { FlowCanvas } from './flow-canvas';

/**
 * Orchestrator: panel navigasi (kiri) + panel konten (kanan) dengan pembatas jelas.
 */
export function SimtelogFlowModule() {
  const [activeCode, setActiveCode] = useState(BENTUK_DEFAULT_CODE);
  const bentuk = getBentukByCode(activeCode) ?? getBentukByCode(BENTUK_DEFAULT_CODE)!;

  return (
    <div className="overflow-hidden rounded-xl border-2 border-app-border bg-app-surface shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(17.5rem,20rem)_1fr]">
        <aside className="border-b-2 border-app-border bg-app-card-muted px-4 py-5 lg:border-b-0 lg:border-r-2 lg:py-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-app-accent">
            Navigasi
          </p>
          <h3 className="mt-1 text-base font-bold text-app-text">Pilih Bentuk</h3>
          <p className="mt-2 text-sm leading-relaxed text-app-text-muted">
            Area ini dapat diklik. Pilih bentuk untuk menampilkan alur lengkap di panel
            kanan.
          </p>
          <div className="mt-4">
            <FlowSidebar activeCode={activeCode} onSelect={setActiveCode} />
          </div>
        </aside>

        <section
          className="bg-app-card px-4 py-5 md:px-6 md:py-6"
          aria-label={`Visualisasi alur Bentuk ${bentuk.code}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-app-text-muted">
            Konten alur
          </p>
          <h3 className="mt-1 text-base font-bold text-app-text">
            Bentuk {bentuk.code}
            <span className="font-normal text-app-text-muted"> — {bentuk.title}</span>
          </h3>
          <p className="mt-2 text-sm text-app-text-muted">
            Panel ini menampilkan ringkasan. Node pada diagram alur dapat diklik untuk
            detail.
          </p>
          <div className="mt-5 border-t border-app-border-subtle pt-5">
            <FlowCanvas bentuk={bentuk} />
          </div>
        </section>
      </div>
    </div>
  );
}
