'use client';

import React from 'react';
import { PortalFlowArrow } from './portal-flow-arrow';
import { AppLogoStrip } from '@/components/pengadaan/shared/app-logo';
import { PORTAL_PHASES } from './portal-phases';
import { PortalSimtelogEntry } from './portal-simtelog-entry';

type PortalOverviewProps = {
  onSelectPhase: (phase: 1 | 2 | 3 | 4 | 5) => void;
  onSelectSimtelog: () => void;
};

export function PortalOverview({ onSelectPhase, onSelectSimtelog }: PortalOverviewProps) {
  return (
  <div className="isolate flex w-full flex-col">
    <div className="mb-6 md:mb-8 mt-1 text-center px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-2 tracking-tight">Alur Pengadaan </h2>
      <p className="text-white/70 max-w-3xl text-sm md:text-base mx-auto leading-relaxed mb-8">
        Terdapat 5 fase dalam proses pengadaan barang dan jasa pada tingkat satuan.
      </p>
    </div>

    <div className="relative z-0 mt-8 w-full max-w-full overflow-x-auto overscroll-x-contain pb-6 md:overflow-visible md:pb-4">
      <div className="flex w-max max-w-none flex-row items-stretch justify-center gap-0 md:w-full md:max-w-full">
        {PORTAL_PHASES.map((phase, index) => (
          <React.Fragment key={phase.num}>
            {index > 0 && <PortalFlowArrow />}
            <button
              type="button"
              onClick={() => onSelectPhase((index + 1) as 1 | 2 | 3 | 4 | 5)}
              className="flex w-[10.5rem] sm:w-auto sm:flex-1 sm:basis-0 sm:min-w-0 flex-col rounded-lg border border-white/10 bg-white/5 px-3 py-3.5 md:px-4 md:py-4 text-center shadow-sm transition-all duration-200 cursor-pointer hover:border-[#D4AF37]/55 hover:bg-white/[0.09] hover:shadow-[0_0_0_1px_rgba(212,175,55,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
              <span className="text-2xl md:text-3xl font-bold text-white/20 leading-none tabular-nums">
                {phase.num}
              </span>
              <h3 className="mt-2 text-sm md:text-[0.9375rem] font-semibold text-[#D4AF37] leading-snug">
                {phase.title}
              </h3>
              <p className="mt-1.5 text-xs text-white/70 leading-snug">{phase.desc}</p>
              {phase.apps?.length ? (
                <div className="mt-2.5 flex justify-center border-t border-white/10 pt-2.5">
                  <AppLogoStrip apps={phase.apps} size="sm" />
                </div>
              ) : null}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>

    <PortalSimtelogEntry onSelect={onSelectSimtelog} />
  </div>
  );
}
