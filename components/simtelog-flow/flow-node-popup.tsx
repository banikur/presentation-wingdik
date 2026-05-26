'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FlowNode } from '@/lib/simtelog-flow/flow-types';
import { FLOW_ACTORS } from '@/lib/simtelog-flow/flow-actors';

type FlowNodePopupProps = {
  open: boolean;
  node: FlowNode | null;
  stepIndex: number;
  totalSteps: number;
  onClose: () => void;
};

export function FlowNodePopup({
  open,
  node,
  stepIndex,
  totalSteps,
  onClose,
}: FlowNodePopupProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && node && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Detail tahapan alur"
        >
          <motion.div
            initial={{ scale: 0.92, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md overflow-hidden rounded-xl border border-app-border bg-app-card shadow-2xl"
          >
            <PopupHeader
              node={node}
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              onClose={onClose}
            />
            <PopupBody node={node} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PopupHeader({
  node,
  stepIndex,
  totalSteps,
  onClose,
}: {
  node: FlowNode;
  stepIndex: number;
  totalSteps: number;
  onClose: () => void;
}) {
  const actor = FLOW_ACTORS[node.actor];
  return (
    <div
      className="flex items-start gap-3 border-b border-app-border p-4"
      style={{ borderLeftWidth: 5, borderLeftColor: actor.accent }}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
        style={{ backgroundColor: `${actor.accent}18` }}
      >
        {actor.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-app-text-muted">
          Langkah {stepIndex + 1} / {totalSteps}
        </p>
        <h3 className="mt-1 text-xl font-bold leading-tight text-app-text">
          {node.label}
        </h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-md p-1 text-app-text-muted hover:bg-app-card-muted"
        aria-label="Tutup popup"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function PopupBody({ node }: { node: FlowNode }) {
  const actor = FLOW_ACTORS[node.actor];
  return (
    <div className="space-y-4 p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-app-text-muted">
          Aktor
        </p>
        <p className="mt-1.5 text-base font-semibold" style={{ color: actor.accent }}>
          {actor.short} — {actor.fullName}
        </p>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-app-text-muted">
          Peran
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-app-text md:text-base">
          {actor.role}
        </p>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-app-text-muted">
          Aksi
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-app-text md:text-base">
          {node.action}
        </p>
      </div>

      {node.note && (
        <div className="rounded-lg border-l-4 border-[#D4AF37] bg-[#fdf6e3] p-4">
          <p className="text-sm leading-relaxed text-app-text md:text-base">{node.note}</p>
        </div>
      )}
    </div>
  );
}
