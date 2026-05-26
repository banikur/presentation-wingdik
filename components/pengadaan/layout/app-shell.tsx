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
  | 'simtelog-flow'
  | 'summary';

type AppShellProps = {
  view: AppView;
  onBackToPortal?: () => void;
  children: ReactNode;
};

export function AppShell({ view, onBackToPortal, children }: AppShellProps) {
  const isPortal = view === 'portal';

  return (
    <div className="flex min-h-screen w-full flex-col bg-app-page font-sans text-app-text">
      <header className="flex w-full shrink-0 items-center justify-between border-b-[3px] border-[var(--app-header-accent)] bg-app-header px-4 py-4 text-[var(--app-text-on-header)] md:px-6 md:py-5">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/95 p-1.5 ring-1 ring-white/30 md:h-14 md:w-14">
            <img
              src={WINGDIK_LOGO_PATH}
              alt="Logo Wing Pendidikan 600"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold leading-tight tracking-normal md:text-xl">
              WING PENDIDIKAN 600 / PEMBEKALAN
            </h1>
            <p className="text-xs text-[var(--app-header-muted)] md:text-sm">
              Materi Pengenalan Alur Pengadaan Barang & Jasa Satker TNI AU
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!isPortal && onBackToPortal && (
            <button
              type="button"
              onClick={onBackToPortal}
              className="rounded-full border border-white/35 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              ← Portal
            </button>
          )}
          {isPortal && (
            <span className="rounded-full bg-[var(--app-accent)] px-3.5 py-1.5 text-sm font-bold text-[var(--app-text)]">
              Alur Pengadaan
            </span>
          )}
        </div>
      </header>

      <main
        className={`relative w-full flex-1 overflow-y-auto bg-app-page ${
          isPortal ? 'px-4 py-6 md:px-8 md:py-10 lg:px-10' : 'px-4 py-4 md:px-6 md:py-6'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
