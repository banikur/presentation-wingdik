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
      className={`app-card flex items-start gap-3 rounded-lg p-4 transition-all ${
        highlighted ? 'shadow-md ring-2 ring-app-link/25' : ''
      }`}
      style={{
        borderLeftWidth: 4,
        borderLeftColor: actor.accent,
      }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-2xl"
        style={{ backgroundColor: `${actor.accent}15` }}
      >
        {actor.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold leading-tight" style={{ color: actor.accent }}>
          {actor.short}{' '}
          <span className="text-base font-normal text-app-text-muted">
            · {actor.fullName}
          </span>
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-app-text-muted md:text-base">
          {actor.role}
        </p>
      </div>
    </div>
  );
}
