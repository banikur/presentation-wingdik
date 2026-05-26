'use client';

import { GitBranch } from 'lucide-react';

type PortalSimtelogFlowEntryProps = {
  onSelect: () => void;
};

/**
 * Entry button untuk modul "Implementasi SIMTELOG di WINGDIK 600".
 * Tampil di portal landing di bawah/sebelah entry SIMTELOG lama.
 * Accent biru (vs orange entry lama) untuk visual differentiation.
 */
export function PortalSimtelogFlowEntry({ onSelect }: PortalSimtelogFlowEntryProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
      }}
      className="group relative z-20 mx-auto flex w-full max-w-2xl cursor-pointer flex-col items-center rounded-xl border-2 border-[#1d4ed8]/40 bg-gradient-to-br from-blue-50 to-white px-6 py-6 text-left shadow-sm transition-all hover:border-[#1d4ed8] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="pointer-events-none flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white ring-2 ring-[#1d4ed8]/35">
        <GitBranch className="h-7 w-7 text-[#1d4ed8]" />
      </div>
      <div className="pointer-events-none min-w-0 flex-1">
        <h3 className="text-xl font-bold text-app-text">
          Implementasi SIMTELOG di WINGDIK 600
        </h3>
        <p className="mt-1 text-base leading-relaxed text-app-text-muted">
          Visualisasi interaktif 6 Bentuk proses utama — alur node, aktor (TB/SIKAL/GPL),
          dan posisi approval untuk onboarding user baru.
        </p>
        <p className="mt-2 text-sm font-semibold text-[#1d4ed8] group-hover:text-[#1e40af]">
          Buka modul flow →
        </p>
      </div>
    </button>
  );
}
