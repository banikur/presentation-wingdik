'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';
import type { BentukFlow, FlowNodeState } from '@/lib/simtelog-flow/flow-types';
import { FlowNode } from './flow-node';
import { FlowNodePopup } from './flow-node-popup';
import { FlowActorCard } from './flow-actor-card';
import { FlowReferenceImages } from './flow-reference-images';

type FlowCanvasProps = {
  bentuk: BentukFlow;
};

const AUTO_STEP_INTERVAL = 1400;

/**
 * Canvas utama: visualisasi flow + animasi sequential highlight + klik popup detail.
 * Otomatis di-reset & restart saat bentuk berubah.
 */
export function FlowCanvas({ bentuk }: FlowCanvasProps) {
  const total = bentuk.nodes.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  // Reset saat bentuk berubah
  useEffect(() => {
    setActiveIndex(0);
    setPlaying(true);
    setPopupIndex(null);
  }, [bentuk.code]);

  // Auto-advance
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1 >= total ? 0 : prev + 1));
    }, AUTO_STEP_INTERVAL);
    return () => clearTimeout(id);
  }, [activeIndex, playing, total]);

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
    setPopupIndex(index);
    setPlaying(false);
  };

  const resolveState = (index: number): FlowNodeState => {
    if (index === activeIndex) return 'active';
    if (index < activeIndex) return 'completed';
    return 'idle';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header bentuk */}
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-app-border bg-app-card p-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
            Bentuk {bentuk.code}
          </p>
          <h2 className="mt-0.5 text-xl font-bold text-app-text">{bentuk.title}</h2>
          {bentuk.subtitle && (
            <p className="mt-1 text-sm text-app-text-muted">{bentuk.subtitle}</p>
          )}
          <p className="mt-2 font-mono text-xs text-app-link">{bentuk.shortPath}</p>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-1 rounded-lg border border-app-border bg-app-card-muted p-1">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-app-text hover:bg-app-card"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Play
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((i) => Math.min(total - 1, i + 1))}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-app-text hover:bg-app-card"
            aria-label="Step berikutnya"
            disabled={activeIndex >= total - 1}
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveIndex(0);
              setPlaying(true);
            }}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-app-text hover:bg-app-card"
            aria-label="Restart"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Statuses */}
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

      {/* Flow visualization */}
      <div className="rounded-xl border border-app-border bg-app-card-muted p-4">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
          Flow Visualization · {activeIndex + 1} / {total}
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
                  <motion.span
                    className="shrink-0 text-app-text-muted"
                    animate={{
                      x: resolveState(i) === 'active' ? [0, 4, 0] : 0,
                      color:
                        resolveState(i) === 'completed' ? '#10b981' : '#94a3b8',
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: resolveState(i) === 'active' ? Infinity : 0,
                    }}
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-[11px] italic text-app-text-muted">
          Klik node untuk melihat detail aktor, peran, dan aksi.
        </p>
      </div>

      {/* Actor cards */}
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
          Aktor yang Terlibat
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {bentuk.actors.map((aid) => {
            const isActive = bentuk.nodes[activeIndex]?.actor === aid;
            return <FlowActorCard key={aid} actorId={aid} highlighted={isActive} />;
          })}
        </div>
      </div>

      {/* Catatan tambahan */}
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
