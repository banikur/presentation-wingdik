'use client';

import { motion } from 'motion/react';
import type {
  FlowNode as FlowNodeData,
  FlowNodeState,
} from '@/lib/simtelog-flow/flow-types';
import { FLOW_ACTORS } from '@/lib/simtelog-flow/flow-actors';

type FlowNodeProps = {
  node: FlowNodeData;
  index: number;
  state: FlowNodeState;
  onClick: () => void;
  isFocused: boolean;
};

/**
 * Node alur — kartu dapat diklik untuk popup detail.
 */
export function FlowNode({ node, index, state, onClick, isFocused }: FlowNodeProps) {
  const actor = FLOW_ACTORS[node.actor];

  const stateStyles: Record<FlowNodeState, string> = {
    idle:
      'border-app-border bg-white text-app-text hover:border-app-link hover:shadow-md cursor-pointer',
    active:
      'border-[#D4AF37] bg-[#fdf6e3] text-app-text shadow-[0_0_0_3px_rgba(212,175,55,0.25)] cursor-pointer',
    completed: 'border-emerald-400 bg-emerald-50 text-emerald-800',
    error: 'border-red-400 bg-red-50 text-red-800',
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-[12.5rem] min-w-[12.5rem] flex-col items-start gap-2.5 rounded-lg border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link focus-visible:ring-offset-2 sm:w-[13.5rem] sm:min-w-[13.5rem] sm:p-5 ${
        stateStyles[state]
      } ${isFocused ? 'ring-2 ring-app-link ring-offset-2' : ''}`}
      aria-label={`${node.label} - ${actor.fullName}`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: actor.accent }}
        >
          {String(index + 1).padStart(2, '0')} · {actor.short}
        </span>
        <span className="text-2xl leading-none" aria-hidden>
          {actor.icon}
        </span>
      </div>
      <p className="text-lg font-semibold leading-snug text-app-text">{node.label}</p>
      <span className="text-sm leading-relaxed text-app-text-muted line-clamp-3 md:text-base">
        {node.action}
      </span>

      {state === 'active' && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-white">
          ●
        </span>
      )}
    </motion.button>
  );
}
