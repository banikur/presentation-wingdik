'use client';

import type { FlowActorId } from '@/lib/simtelog-flow/flow-types';
import { FLOW_ACTORS } from '@/lib/simtelog-flow/flow-actors';

type FlowActorCardProps = {
  actorId: FlowActorId;
  highlighted?: boolean;
};

export function FlowActorCard({ actorId, highlighted }: FlowActorCardProps) {
  const actor = FLOW_ACTORS[actorId];

  return (
    <div
      className={`app-card flex items-start gap-2.5 rounded-lg p-3 transition-all ${
        highlighted ? 'shadow-md ring-2 ring-app-link/25' : ''
      }`}
      style={{
        borderLeftWidth: 4,
        borderLeftColor: actor.accent,
      }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl"
        style={{ backgroundColor: `${actor.accent}15` }}
      >
        {actor.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold leading-tight" style={{ color: actor.accent }}>
          {actor.short}{' '}
          <span className="text-xs font-normal text-app-text-muted">· {actor.fullName}</span>
        </p>
        <p className="mt-1 text-xs leading-snug text-app-text-muted line-clamp-2">
          {actor.role}
        </p>
      </div>
    </div>
  );
}
