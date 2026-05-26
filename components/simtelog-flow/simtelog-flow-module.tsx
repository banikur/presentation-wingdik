'use client';

import { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
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
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(19rem,22rem)_1fr]">
        <aside className="relative border-b-4 border-app-border bg-app-card-muted px-4 py-5 lg:border-b-0 lg:border-r-4 lg:px-5 lg:py-6 lg:shadow-[4px_0_14px_-6px_rgba(15,41,66,0.12)]">
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-app-border bg-white px-3 py-2.5 shadow-sm">
            <MousePointerClick
              className="mt-0.5 h-5 w-5 shrink-0 text-app-link"
              aria-hidden
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-app-link">
                Area interaktif
              </p>
              <p className="mt-0.5 text-sm font-medium text-app-text md:text-base">
                Pilih salah satu Bentuk di bawah
              </p>
            </div>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-app-accent">
            Navigasi Bentuk
          </p>
          <h3 className="mt-1 text-lg font-bold text-app-text">Menu SIMTELOG Flow</h3>
          <p className="mt-2 text-sm leading-relaxed text-app-text-muted md:text-base">
            Setiap kartu di daftar ini dapat diklik. Alur lengkap tampil di panel kanan.
          </p>
          <div className="mt-4 rounded-lg border border-app-border bg-white p-2 shadow-sm">
            <FlowSidebar activeCode={activeCode} onSelect={setActiveCode} />
          </div>
        </aside>

        <section
          className="relative min-w-0 bg-app-card px-4 py-5 md:px-6 md:py-6 lg:before:pointer-events-none lg:before:absolute lg:before:inset-y-0 lg:before:left-0 lg:before:w-px lg:before:bg-app-border-subtle"
          aria-label={`Visualisasi alur Bentuk ${bentuk.code}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-app-text-muted">
            Panel konten · baca dan eksplorasi diagram
          </p>
          <h3 className="mt-1 text-lg font-bold text-app-text md:text-xl">
            Bentuk {bentuk.code}
            <span className="font-normal text-app-text-muted"> — {bentuk.title}</span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-app-text-muted md:text-base">
            Alur berjalan otomatis. Gunakan Play/Pause di diagram; klik node bila perlu detail.
          </p>
          <div className="mt-5 border-t-2 border-app-border-subtle pt-5">
            <FlowCanvas bentuk={bentuk} />
          </div>
        </section>
      </div>
    </div>
  );
}
