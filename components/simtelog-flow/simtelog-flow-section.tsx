'use client';

import { SimtelogFlowModule } from './simtelog-flow-module';

/**
 * Section "Implementasi SIMTELOG di WINGDIK 600".
 * Entry point dari app/page.tsx untuk view 'simtelog-flow'.
 */
export function SimtelogFlowSection() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-app-accent">
          Modul SIMTELOG
        </p>
        <h2 className="mt-1 text-2xl font-bold text-app-text md:text-3xl">
          Implementasi SIMTELOG di WINGDIK 600
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-app-text-muted md:text-base">
          Pengenalan interaktif 6 Bentuk proses utama SIMTELOG —{' '}
          <strong className="text-app-text">visualisasi alur</strong>, aktor yang
          terlibat, urutan proses, dan posisi approval. Pilih bentuk pada menu sebelah
          untuk melihat flow lengkapnya.
        </p>
      </div>

      <SimtelogFlowModule />
    </div>
  );
}
