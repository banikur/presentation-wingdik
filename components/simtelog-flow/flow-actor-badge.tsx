'use client';

import type { FlowActorId } from '@/lib/simtelog-flow/flow-types';
import { FLOW_ACTORS } from '@/lib/simtelog-flow/flow-actors';

type FlowActorBadgeProps = {
  actorId: FlowActorId;
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
};

/**
 * Badge kecil untuk menampilkan aktor (mis. "TB", "GPL").
 * Warna otomatis dari FLOW_ACTORS registry.
 */
export function FlowActorBadge({
  actorId,
  size = 'sm',
  showIcon = false,
}: FlowActorBadgeProps) {
  const actor = FLOW_ACTORS[actorId];

  const sizeClass =
    size === 'xs'
      ? 'text-xs px-1.5 py-0.5'
      : size === 'sm'
        ? 'text-sm px-2 py-0.5'
        : 'text-sm px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold tracking-wide ${sizeClass}`}
      style={{
        color: actor.accent,
        borderColor: `${actor.accent}55`,
        backgroundColor: `${actor.accent}15`,
      }}
      title={actor.fullName}
    >
      {showIcon && <span aria-hidden>{actor.icon}</span>}
      {actor.short}
    </span>
  );
}
