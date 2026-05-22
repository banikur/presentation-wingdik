'use client';

import type { ReactNode } from 'react';

export const WINGDIK_LOGO_PATH = '/images/wingdik/wingdik-logo.png';

export type AppView =
  | 'portal'
  | 'fase-1'
  | 'fase-2'
  | 'fase-3'
  | 'fase-4'
  | 'fase-5'
  | 'simtelog'
  | 'summary';

type AppShellProps = {
  view: AppView;
  onBackToPortal?: () => void;
  children: ReactNode;
};

const WIDE_DETAIL_VIEWS: AppView[] = [
  'fase-1',
  'fase-2',
  'fase-3',
  'fase-4',
  'fase-5',
  'simtelog',
];

export function AppShell({ view, onBackToPortal, children }: AppShellProps) {
  const isPortal = view === 'portal';
  const isWideDetail = WIDE_DETAIL_VIEWS.includes(view);

  return (
    <div
      className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-3 md:p-8 lg:p-10 font-sans text-[#F8FAFC]"
      style={{ backgroundColor: '#0F172A', color: '#F8FAFC' }}
    >
      <div
        className={`w-full rounded-xl shadow-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden flex flex-col border border-white/10 relative ${
          isPortal || isWideDetail
            ? 'max-w-[min(100%,96rem)] min-h-[min(600px)]'
            : 'max-w-5xl min-h-[600px]'
        }`}
      >
        <header className="bg-[#1E293B] text-[#F8FAFC] p-4 md:p-5 flex items-center justify-between shrink-0 border-b-[3px] border-[#D4AF37]">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-lg overflow-hidden bg-[#334155] ring-1 ring-white/10 flex items-center justify-center p-1.5">
              <img
                src={WINGDIK_LOGO_PATH}
                alt="Logo Wing Pendidikan 600"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold leading-tight tracking-wide truncate">
                WING PENDIDIKAN 600 / PEMBEKALAN
              </h1>
              <p className="text-xs text-white/70">
                Materi Pengenalan Alur Pengadaan Barang & Jasa Satker TNI AU
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!isPortal && onBackToPortal && (
              <button
                type="button"
                onClick={onBackToPortal}
                className="text-[10px] sm:text-xs font-medium px-3 py-1 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
              >
                ← Portal
              </button>
            )}
            {isPortal && (
              <span className="text-[10px] sm:text-xs font-bold px-3 py-1 bg-[#D4AF37] text-black rounded-full uppercase tracking-wider">
                Alur Pengadaan 
              </span>
            )}
          </div>
        </header>

        <main
          className={`flex-1 overflow-y-auto relative ${
            isPortal ? 'p-6 md:p-10 lg:p-12' : 'p-4 md:p-8'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
