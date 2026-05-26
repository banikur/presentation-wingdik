'use client';

import type { FlowActorId } from '@/lib/simtelog-flow/flow-types';
import { FLOW_ACTORS } from '@/lib/simtelog-flow/flow-actors';

type FlowActorCardProps = {
  actorId: FlowActorId;
  /** Dipakai untuk highlight bila aktor ini adalah yang sedang aktif di canvas. */
  highlighted?: boolean;
};

export function FlowActorCard({ actorId, highlighted }: FlowActorCardProps) {
  const actor = FLOW_ACTORS[actorId];

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border bg-app-card p-3 transition-all ${
        highlighted ? 'shadow-md' : ''
      }`}
      style={{
        borderColor: highlighted ? actor.accent : 'var(--app-border)',
        borderLeftWidth: 4,
        borderLeftColor: actor.accent,
      }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
        style={{ backgroundColor: `${actor.accent}15` }}
      >
        {actor.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm font-bold leading-tight"
          style={{ color: actor.accent }}
        >
          {actor.short}{' '}
          <span className="text-[11px] font-normal text-app-text-muted">
            · {actor.fullName}
          </span>
        </p>
        <p className="mt-1 text-xs leading-snug text-app-text-muted">{actor.role}</p>
      </div>
    </div>
  );
}
