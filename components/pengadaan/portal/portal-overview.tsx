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
      <div className="mb-6 mt-1 px-2 text-center md:mb-8">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-app-text md:text-3xl">
          Alur Pengadaan
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-app-text-muted md:text-lg">
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
                className="app-card-interactive flex w-[11rem] cursor-pointer flex-col rounded-lg px-3 py-4 text-center shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link focus-visible:ring-offset-2 focus-visible:ring-offset-app-page sm:w-auto sm:min-w-0 sm:flex-1 sm:basis-0 md:px-4 md:py-5"
              >
                <span className="text-3xl font-bold leading-none text-app-border tabular-nums md:text-4xl">
                  {phase.num}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-app-link md:text-lg">
                  {phase.title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-app-text-muted">{phase.desc}</p>
                {phase.apps?.length ? (
                  <div className="mt-2.5 flex justify-center border-t border-app-border pt-2.5">
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
