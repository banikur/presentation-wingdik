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
 * Node compact untuk visualisasi alur. Klik untuk buka popup detail.
 * State-aware styling: idle (default), active (highlight gold), completed (dimmed check).
 */
export function FlowNode({ node, index, state, onClick, isFocused }: FlowNodeProps) {
  const actor = FLOW_ACTORS[node.actor];

  const stateStyles: Record<FlowNodeState, string> = {
    idle: 'border-app-border bg-app-card text-app-text',
    active:
      'border-[#D4AF37] bg-[#fdf6e3] text-app-text shadow-[0_0_0_3px_rgba(212,175,55,0.25)]',
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-[10rem] min-w-[10rem] flex-col items-start gap-1.5 rounded-lg border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link focus-visible:ring-offset-2 ${
        stateStyles[state]
      } ${isFocused ? 'ring-2 ring-app-link ring-offset-2' : ''}`}
      aria-label={`${node.label} - ${actor.fullName}`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span
          className="text-[9px] font-bold uppercase tracking-wider"
          style={{ color: actor.accent }}
        >
          {String(index + 1).padStart(2, '0')} · {actor.short}
        </span>
        <span className="text-base leading-none" aria-hidden>
          {actor.icon}
        </span>
      </div>
      <p className="text-sm font-semibold leading-tight">{node.label}</p>
      <span className="mt-1 text-[10px] text-app-text-muted line-clamp-2">
        {node.action}
      </span>

      {state === 'active' && (
        <motion.span
          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          ●
        </motion.span>
      )}
      {state === 'completed' && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
          ✓
        </span>
      )}
    </motion.button>
  );
}
