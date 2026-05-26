'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';
import type { BentukFlow, FlowNodeState } from '@/lib/simtelog-flow/flow-types';
import { SimtelogDisclosure } from '@/components/simtelog/simtelog-ui';
import { FlowNode } from './flow-node';
import { FlowNodePopup } from './flow-node-popup';
import { FlowActorCard } from './flow-actor-card';
import { FlowReferenceImages } from './flow-reference-images';

type FlowCanvasProps = {
  bentuk: BentukFlow;
};

const AUTO_STEP_INTERVAL = 1400;

function PlaybackControls({
  playing,
  activeIndex,
  total,
  onTogglePlay,
  onStep,
  onRestart,
}: {
  playing: boolean;
  activeIndex: number;
  total: number;
  onTogglePlay: () => void;
  onStep: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-app-border bg-app-card-muted p-0.5">
      <button
        type="button"
        onClick={onTogglePlay}
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
        onClick={onStep}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-app-text hover:bg-app-card disabled:opacity-40"
        aria-label="Step berikutnya"
        disabled={activeIndex >= total - 1}
      >
        <SkipForward className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onRestart}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-app-text hover:bg-app-card"
        aria-label="Restart"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
      <span className="px-1.5 text-xs tabular-nums text-app-text-muted">
        {activeIndex + 1}/{total}
      </span>
    </div>
  );
}

/**
 * Canvas utama: visualisasi flow + animasi sequential highlight + klik popup detail.
 */
export function FlowCanvas({ bentuk }: FlowCanvasProps) {
  const total = bentuk.nodes.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setPlaying(true);
    setPopupIndex(null);
  }, [bentuk.code]);

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

  const hasReference = !!bentuk.workflowImage || (bentuk.appScreenshots?.length ?? 0) > 0;
  const screenshotCount = bentuk.appScreenshots?.length ?? 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-app-border bg-app-card-muted p-3 md:p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-app-text md:text-xl">
              Bentuk {bentuk.code}
              <span className="font-normal text-app-text-muted"> — {bentuk.title}</span>
            </h2>
            {bentuk.subtitle && (
              <p className="mt-0.5 text-sm text-app-text-muted">{bentuk.subtitle}</p>
            )}
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs text-app-link">{bentuk.shortPath}</p>
              {bentuk.statuses?.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-app-border bg-white px-2 py-0.5 text-[11px] font-medium text-app-text"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <PlaybackControls
            playing={playing}
            activeIndex={activeIndex}
            total={total}
            onTogglePlay={() => setPlaying((p) => !p)}
            onStep={() => setActiveIndex((i) => Math.min(total - 1, i + 1))}
            onRestart={() => {
              setActiveIndex(0);
              setPlaying(true);
            }}
          />
        </div>

        <div className="mt-3 overflow-x-auto pb-1">
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
                      color: resolveState(i) === 'completed' ? '#10b981' : '#94a3b8',
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
      </div>

      {hasReference && (
        <SimtelogDisclosure
          label="Referensi aplikasi SIMTELOG asli"
          badge={
            bentuk.workflowImage && screenshotCount > 0
              ? `Diagram + ${screenshotCount} SS`
              : bentuk.workflowImage
                ? 'Diagram'
                : `${screenshotCount} SS`
          }
          defaultOpen={false}
        >
          <FlowReferenceImages
            bentukCode={bentuk.code}
            workflowImage={bentuk.workflowImage}
            appScreenshots={bentuk.appScreenshots}
            embedded
          />
        </SimtelogDisclosure>
      )}

      <SimtelogDisclosure
        label="Aktor yang terlibat"
        badge={`${bentuk.actors.length} peran`}
        defaultOpen={false}
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {bentuk.actors.map((aid) => {
            const isActive = bentuk.nodes[activeIndex]?.actor === aid;
            return <FlowActorCard key={aid} actorId={aid} highlighted={isActive} />;
          })}
        </div>
      </SimtelogDisclosure>

      {bentuk.notes && bentuk.notes.length > 0 && (
        <SimtelogDisclosure label="Catatan" badge={`${bentuk.notes.length}`} defaultOpen={false}>
          <ul className="list-disc space-y-0.5 pl-4 text-sm text-app-text">
            {bentuk.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </SimtelogDisclosure>
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
