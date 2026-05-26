'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { BentukFlow, FlowNodeState } from '@/lib/simtelog-flow/flow-types';
import { FlowNode } from './flow-node';
import { FlowNodePopup } from './flow-node-popup';
import { FlowActorCard } from './flow-actor-card';

type FlowCanvasProps = {
  bentuk: BentukFlow;
};

/**
 * Canvas utama: visualisasi flow statis + klik popup detail.
 * Animasi masuk hanya saat bentuk diganti dari sidebar (bukan auto-play step).
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
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={bentuk.code}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-xl border border-app-border bg-app-card p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
              Bentuk {bentuk.code}
            </p>
            <h2 className="mt-0.5 text-xl font-bold text-app-text">{bentuk.title}</h2>
            {bentuk.subtitle && (
              <p className="mt-1 text-sm text-app-text-muted">{bentuk.subtitle}</p>
            )}
            <p className="mt-2 font-mono text-xs text-app-link">{bentuk.shortPath}</p>
          </div>

          {bentuk.statuses && bentuk.statuses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
                Status:
              </span>
              {bentuk.statuses.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-app-border bg-app-card-muted px-2.5 py-0.5 text-[11px] font-medium text-app-text"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-app-border bg-app-card-muted p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
              Flow Visualization · {total} langkah
            </p>
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max items-stretch gap-2">
                {bentuk.nodes.map((node, i) => (
                  <div key={node.id} className="flex items-center gap-2">
                    <FlowNode
                      node={node}
                      index={i}
                      state={resolveState(i)}
                      isFocused={popupIndex === i}
                      onClick={() => handleNodeClick(i)}
                    />
                    {i < total - 1 && (
                      <span
                        className="shrink-0 text-app-text-muted"
                        aria-hidden
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-2 text-[11px] italic text-app-text-muted">
              Klik node untuk melihat detail aktor, peran, dan aksi.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
              Aktor yang Terlibat
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="rounded-lg border-l-4 border-[#D4AF37] bg-[#fdf6e3] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
                Catatan
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-app-text">
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
