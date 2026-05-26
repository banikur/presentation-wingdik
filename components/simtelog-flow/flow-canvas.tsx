'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { BentukFlow, FlowNodeState } from '@/lib/simtelog-flow/flow-types';
import { FlowNode } from './flow-node';
import { FlowNodePopup } from './flow-node-popup';
import { FlowActorCard } from './flow-actor-card';

type FlowCanvasProps = {
  bentuk: BentukFlow;
};

function FlowSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-app-text-muted">
      {children}
    </p>
  );
}

/**
 * Canvas utama: visualisasi flow statis + klik popup detail.
 * Animasi masuk hanya saat bentuk diganti dari sidebar.
 */
export function FlowCanvas({ bentuk }: FlowCanvasProps) {
  const total = bentuk.nodes.length;
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  useEffect(() => {
    setPopupIndex(null);
  }, [bentuk.code]);

  const handleNodeClick = (index: number) => {
    setPopupIndex((prev) => (prev === index ? null : index));
  };

  const resolveState = (index: number): FlowNodeState => {
    if (popupIndex === index) return 'active';
    return 'idle';
  };

  const highlightedActor =
    popupIndex !== null ? bentuk.nodes[popupIndex]?.actor : undefined;

  return (
    <div className="flex flex-col gap-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={bentuk.code}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex flex-col gap-5"
        >
          <div className="app-card rounded-xl p-5 md:p-6">
            <FlowSectionLabel>Ringkasan bentuk</FlowSectionLabel>
            <h2 className="mt-2 text-xl font-bold text-app-text md:text-2xl">
              {bentuk.title}
            </h2>
            {bentuk.subtitle && (
              <p className="mt-2 text-sm leading-relaxed text-app-text-muted md:text-base">
                {bentuk.subtitle}
              </p>
            )}
            <p className="mt-3 font-mono text-sm text-app-link">{bentuk.shortPath}</p>
          </div>

          {bentuk.statuses && bentuk.statuses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <FlowSectionLabel>Status</FlowSectionLabel>
              {bentuk.statuses.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-app-border bg-app-card-muted px-3 py-1 text-sm font-medium text-app-text"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="rounded-xl border-2 border-dashed border-app-link/35 bg-app-page p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <FlowSectionLabel>Diagram alur</FlowSectionLabel>
                <p className="mt-1 text-sm font-medium text-app-text md:text-base">
                  {total} langkah · geser horizontal bila perlu
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-app-link/40 bg-white px-3 py-1.5 text-sm font-semibold text-app-link shadow-sm">
                <MousePointerClick className="h-4 w-4" aria-hidden />
                Klik node
              </span>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max items-stretch gap-3">
                {bentuk.nodes.map((node, i) => (
                  <div key={node.id} className="flex items-center gap-3">
                    <FlowNode
                      node={node}
                      index={i}
                      state={resolveState(i)}
                      isFocused={popupIndex === i}
                      onClick={() => handleNodeClick(i)}
                    />
                    {i < total - 1 && (
                      <span className="shrink-0 text-app-text-muted" aria-hidden>
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <FlowSectionLabel>Aktor yang terlibat</FlowSectionLabel>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bentuk.actors.map((aid) => (
                <FlowActorCard
                  key={aid}
                  actorId={aid}
                  highlighted={highlightedActor === aid}
                />
              ))}
            </div>
          </div>

          {bentuk.notes && bentuk.notes.length > 0 && (
            <div className="rounded-lg border-l-4 border-[#D4AF37] bg-[#fdf6e3] p-4 md:p-5">
              <FlowSectionLabel>Catatan</FlowSectionLabel>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-app-text md:text-base">
                {bentuk.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <FlowNodePopup
        open={popupIndex !== null}
        node={popupIndex !== null ? bentuk.nodes[popupIndex] : null}
        stepIndex={popupIndex ?? 0}
        totalSteps={total}
        onClose={() => setPopupIndex(null)}
      />
    </div>
  );
}
