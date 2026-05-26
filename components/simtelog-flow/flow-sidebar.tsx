'use client';

import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { BENTUK_FLOWS } from '@/lib/simtelog-flow/flow-bentuk-data';
import { FlowActorBadge } from './flow-actor-badge';

type FlowSidebarProps = {
  activeCode: string;
  onSelect: (code: string) => void;
};

export function FlowSidebar({ activeCode, onSelect }: FlowSidebarProps) {
  return (
    <nav aria-label="Menu Bentuk SIMTELOG" className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {BENTUK_FLOWS.map((b) => {
          const active = b.code === activeCode;
          return (
            <button
              key={b.code}
              type="button"
              onClick={() => onSelect(b.code)}
              className={`group relative flex w-[15rem] shrink-0 cursor-pointer flex-col gap-2.5 rounded-lg border-2 px-4 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link focus-visible:ring-offset-2 active:scale-[0.99] lg:w-full ${
                active
                  ? 'border-app-link bg-amber-50/70 shadow-md ring-2 ring-app-link/35'
                  : 'border-app-border bg-white shadow-sm hover:border-app-link hover:bg-[var(--app-card-muted)] hover:shadow-[0_2px_8px_rgb(15_41_66/0.08)]'
              }`}
              aria-current={active ? 'true' : undefined}
            >
              {active && (
                <motion.span
                  layoutId="simtelog-flow-sidebar-active"
                  className="pointer-events-none absolute inset-0 rounded-[calc(0.5rem-2px)] border-2 border-app-link/50 bg-app-link/[0.04]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex items-center justify-between gap-2">
                <span
                  className={`rounded-md px-2.5 py-1 font-mono text-sm font-bold tabular-nums ${
                    active
                      ? 'bg-app-link text-white'
                      : 'bg-app-card-muted text-app-text group-hover:border group-hover:border-app-link/30 group-hover:bg-app-link/10'
                  }`}
                >
                  {b.code}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`text-sm font-semibold uppercase tracking-[0.08em] ${
                      active ? 'text-app-link' : 'text-app-text-muted group-hover:text-app-link'
                    }`}
                  >
                    {b.nodes.length} langkah
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      active
                        ? 'text-app-link'
                        : 'text-app-text-muted group-hover:translate-x-0.5 group-hover:text-app-link'
                    }`}
                    aria-hidden
                  />
                </span>
              </div>
              <p className="relative z-[1] text-lg font-semibold leading-snug text-app-text group-hover:text-app-text">
                {b.title}
              </p>
              <div className="relative z-[1] flex flex-wrap gap-1.5">
                {b.actors
                  .filter((a) => a !== 'sistem')
                  .map((aid) => (
                    <FlowActorBadge key={aid} actorId={aid} size="sm" />
                  ))}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
