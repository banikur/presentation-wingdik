'use client';

import { AppLogo } from '@/components/pengadaan/shared/app-logo';

type PortalSimtelogEntryProps = {
  onSelect: () => void;
};

/**
 * Entry button modul SIMTELOG (16 peran tupoksi - LAMA).
 * Catatan: wrapper section dipindah ke portal-overview agar dapat berbagi
 * heading dengan modul flow yang baru.
 */
export function PortalSimtelogEntry({ onSelect }: PortalSimtelogEntryProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
      }}
      className="group relative z-20 mx-auto flex w-full max-w-2xl cursor-pointer flex-col items-center rounded-xl border-2 border-[#ea580c]/40 bg-gradient-to-br from-orange-50 to-white px-6 py-6 text-left shadow-sm transition-all hover:border-[#ea580c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="pointer-events-none flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white ring-2 ring-[#ea580c]/35">
        <AppLogo appId="simtelog" size="md" />
      </div>
      <div className="pointer-events-none min-w-0 flex-1">
        <h3 className="text-xl font-bold text-app-text">SIMTELOGAU — 16 Peran</h3>
        <p className="mt-1 text-base leading-relaxed text-app-text-muted">
          Pengenalan tupoksi modul Pembekalan — 16 peran, 4 bidang, contoh task per peran
          (sumber: materi pembekalan SIMTELOG).
        </p>
        <p className="mt-2 text-sm font-semibold text-[#ea580c] group-hover:text-[#c2410c]">
          Buka modul →
        </p>
      </div>
    </button>
  );
}
