'use client';

import { PORTAL_PHASES } from './portal-phases';
import { PortalFlowArrow } from './portal-flow-arrow';
type PortalFlowViewProps = {
  onSelectPhase: (phase: 1 | 2 | 3 | 4 | 5) => void;
};

export function PortalFlowView({
  onSelectPhase,
}: PortalFlowViewProps) {
  return (
    <div className="mx-auto w-full max-w-[90rem] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-app-text md:text-3xl">Alur Modul Pembekalan</h2>
        <p className="mt-2 text-sm text-app-text-muted md:text-base">
          Pilih tahapan alur pengadaan satuan kerja atau modul SIMTELOG untuk memulai.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full mx-auto">
        {/* Render Phases */}
        <div className="flex flex-row overflow-x-auto pb-6 gap-2 md:justify-center items-center w-full px-4 sm:px-0">
          {PORTAL_PHASES.map((phase, index) => {
            const phaseNumber = (index + 1) as 1 | 2 | 3 | 4 | 5;
            return (
              <div key={phase.num} className="flex flex-row items-center shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPhase(phaseNumber)}
                  className="group relative z-20 flex w-56 shrink-0 cursor-pointer flex-col items-center rounded-xl border border-app-border bg-white p-6 text-center shadow-sm transition-all hover:border-app-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link h-full min-h-[220px]"
                >
                  <div className="pointer-events-none mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-app-bg text-lg font-bold text-app-accent ring-1 ring-app-border group-hover:bg-app-accent/10 transition-colors">
                    {phase.num}
                  </div>
                  <div className="pointer-events-none min-w-0 flex-1 flex flex-col items-center">
                    <h3 className="text-base font-bold text-app-text leading-tight mb-2">{phase.title}</h3>
                    <p className="text-xs text-app-text-muted">{phase.desc}</p>
                  </div>
                </button>
                
                {/* Add arrow after every phase except the last one */}
                {index < PORTAL_PHASES.length - 1 && <PortalFlowArrow />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
