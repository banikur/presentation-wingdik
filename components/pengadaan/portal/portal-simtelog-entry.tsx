'use client';

import { AppLogo } from '@/components/pengadaan/shared/app-logo';

type PortalSimtelogEntryProps = {
  onSelect: () => void;
};

export function PortalSimtelogEntry({ onSelect }: PortalSimtelogEntryProps) {
  return (
    <section
      className="relative z-20 mt-10 border-t border-white/10 pt-8 md:mt-12 md:pt-10"
      aria-label="Modul SIMTELOG"
    >
      <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
        Modul terpisah — Pembekalan SIMTELOGAU
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelect();
        }}
        className="group relative z-20 mx-auto flex w-full max-w-2xl cursor-pointer flex-col items-center rounded-xl border border-[#c2410c]/35 bg-gradient-to-br from-[#c2410c]/10 to-white/[0.03] px-6 py-6 text-left transition-all hover:border-[#c2410c]/60 hover:bg-[#c2410c]/[0.08] hover:shadow-[0_0_0_1px_rgba(194,65,12,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 sm:flex-row sm:items-center sm:gap-6"
      >
        <div className="pointer-events-none flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white ring-2 ring-[#c2410c]/30">
          <AppLogo appId="simtelog" size="md" />
        </div>
        <div className="pointer-events-none min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#F8FAFC]">SIMTELOGAU</h3>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">
            Pengenalan tupoksi modul Pembekalan — 16 peran, 4 bidang, contoh task per peran
            (sumber: materi pembekalan SIMTELOG).
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#D4AF37] group-hover:text-[#f0d060]">
            Buka modul →
          </p>
        </div>
      </button>
    </section>
  );
}
