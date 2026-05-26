'use client';

import { motion } from 'motion/react';
import { BENTUK_FLOWS } from '@/lib/simtelog-flow/flow-bentuk-data';
import { FlowActorBadge } from './flow-actor-badge';

type FlowSidebarProps = {
  activeCode: string;
  onSelect: (code: string) => void;
};

export function FlowSidebar({ activeCode, onSelect }: FlowSidebarProps) {
  return (
    <nav
      aria-label="Menu Bentuk SIMTELOG"
      className="relative flex flex-col gap-1 rounded-xl border border-app-border bg-app-card p-2"
    >
      <p className="px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
        SIMTELOG Flow Menu
      </p>
      <div className="relative flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {BENTUK_FLOWS.map((b) => {
          const active = b.code === activeCode;
          return (
            <button
              key={b.code}
              type="button"
              onClick={() => onSelect(b.code)}
              className={`group relative flex w-[12rem] shrink-0 flex-col gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors lg:w-auto ${
                active
                  ? 'border-transparent'
                  : 'border-transparent hover:border-app-border hover:bg-app-card-muted'
              }`}
              aria-current={active ? 'true' : undefined}
            >
              {active && (
                <motion.span
                  layoutId="simtelog-flow-sidebar-active"
                  className="absolute inset-0 rounded-lg border border-app-link bg-app-card-muted shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex items-center justify-between gap-2">
                <span
                  className={`rounded-md px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums ${
                    active
                      ? 'bg-app-link text-white'
                      : 'bg-app-card-muted text-app-text-muted group-hover:bg-app-card'
                  }`}
                >
                  {b.code}
                </span>
                <span
                  className={`text-[9px] uppercase tracking-wider ${
                    active ? 'text-app-link' : 'text-app-text-muted'
                  }`}
                >
                  {b.nodes.length} steps
                </span>
              </div>
              <p className="relative z-[1] text-sm font-semibold leading-tight text-app-text">
                {b.title}
              </p>
              <div className="relative z-[1] mt-0.5 flex flex-wrap gap-1">
                {b.actors
                  .filter((a) => a !== 'sistem')
                  .map((aid) => (
                    <FlowActorBadge key={aid} actorId={aid} size="xs" />
                  ))}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
