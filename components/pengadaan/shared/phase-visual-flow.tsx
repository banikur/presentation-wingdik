'use client';

import { Fragment } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowDown, ArrowRight, Circle } from 'lucide-react';
import type { VisualFlowNode } from '@/lib/pengadaan/phase-assets';
import { AppLogoStrip } from './app-logo';

type PhaseVisualFlowProps = {
  nodes: VisualFlowNode[];
  /** Beberapa baris (mis. Fase 4). Jika diisi, `nodes` tetap dipakai untuk lookup id. */
  rows?: VisualFlowNode[][];
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  flowTitle?: string;
  cardClassName?: string;
};

function FlowConnectorHorizontal() {
  return (
    <div
      className="flex w-8 shrink-0 items-center justify-center self-center sm:w-10"
      aria-hidden
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] sm:h-9 sm:w-9">
        <ArrowRight className="h-4 w-4 text-white/35" strokeWidth={2} />
      </div>
    </div>
  );
}

function FlowConnectorDown({ alignEnd }: { alignEnd?: boolean }) {
  return (
    <div
      className={`flex py-1 ${alignEnd ? 'justify-end pr-[0.35rem] sm:pr-2' : 'justify-center'}`}
      aria-hidden
    >
      <div className="flex flex-col items-center">
        <div className="h-3 w-px bg-white/15" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] sm:h-9 sm:w-9">
          <ArrowDown className="h-4 w-4 text-white/35" strokeWidth={2} />
        </div>
        <div className="h-3 w-px bg-white/15" />
      </div>
    </div>
  );
}

function FlowSegmentGap() {
  return (
    <div
      className="flex w-6 shrink-0 items-center justify-center self-center sm:w-8"
      aria-hidden
    >
      <div className="hidden h-14 w-px border-l border-dashed border-white/20 sm:block" />
      <div className="h-10 w-px border-l border-dashed border-white/25 sm:hidden" />
    </div>
  );
}

function FlowStepIcon({
  node,
  isActive,
}: {
  node: VisualFlowNode;
  isActive: boolean;
}) {
  const boxClass = `flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all ${
    isActive
      ? 'bg-[#D4AF37] text-[#0F172A] shadow-[0_0_18px_rgba(212,175,55,0.45)]'
      : 'bg-white/[0.06] text-white/45 group-hover:text-white/65'
  }`;

  if (node.apps?.length) {
    return (
      <div
        className={`${boxClass} ${isActive ? 'bg-white ring-2 ring-[#D4AF37]' : 'bg-white/[0.08]'}`}
      >
        <AppLogoStrip apps={node.apps} size="sm" className="gap-0.5" />
      </div>
    );
  }

  const Icon: LucideIcon = node.Icon ?? Circle;

  return (
    <div className={boxClass}>
      <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 2} />
    </div>
  );
}

function FlowStepCard({
  node,
  stepNum,
  isActive,
  onClick,
}: {
  node: VisualFlowNode;
  stepNum: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex h-full w-full min-w-0 flex-col rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] sm:p-4 ${
        isActive
          ? 'border-[#D4AF37]/80 bg-[#D4AF37]/[0.06] shadow-[0_0_0_1px_rgba(212,175,55,0.2)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <FlowStepIcon node={node} isActive={isActive} />
        <span
          className={`text-sm font-bold tabular-nums leading-none ${
            isActive ? 'text-white/30' : 'text-white/20'
          }`}
        >
          {String(stepNum).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-bold leading-snug text-[#F8FAFC] sm:text-base">
        {node.label}
      </h3>
      <p className="mt-1.5 text-[11px] leading-relaxed text-white/55 sm:mt-2 sm:text-xs">
        {node.flowSummary}
      </p>
    </button>
  );
}

function FlowHorizontalRow({
  rowNodes,
  startStepNum,
  activeNodeId,
  onSelectNode,
  cardClassName,
}: {
  rowNodes: VisualFlowNode[];
  startStepNum: number;
  activeNodeId: string;
  onSelectNode: (id: string) => void;
  cardClassName: string;
}) {
  return (
    <div className="flex w-full items-stretch gap-0 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch] sm:overflow-visible sm:pb-0">
      {rowNodes.map((node, index) => (
        <div
          key={node.id}
          className={`flex shrink-0 snap-center items-stretch sm:min-w-0 sm:flex-1 sm:basis-0 ${cardClassName}`}
        >
          {index > 0 && (node.flowBreakBefore ? <FlowSegmentGap /> : <FlowConnectorHorizontal />)}
          <FlowStepCard
            node={node}
            stepNum={startStepNum + index}
            isActive={activeNodeId === node.id}
            onClick={() => onSelectNode(node.id)}
          />
        </div>
      ))}
    </div>
  );
}

export function PhaseVisualFlow({
  nodes,
  rows,
  activeNodeId,
  onSelectNode,
  flowTitle = 'Alur tahapan',
  cardClassName,
}: PhaseVisualFlowProps) {
  const flowRows = rows && rows.length > 0 ? rows : [nodes];
  const multiRow = flowRows.length > 1;
  const resolvedCardClass =
    cardClassName ??
    (multiRow
      ? 'w-[11.25rem] sm:w-[12.5rem] md:flex-1 md:min-w-[10.5rem] md:max-w-[13.5rem]'
      : 'w-[17rem] sm:w-auto');

  let stepOffset = 0;

  return (
    <div className="w-full">
      {flowTitle ? (
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
          {flowTitle}
        </p>
      ) : null}

      <div className="flex flex-col gap-1">
        {flowRows.map((rowNodes, rowIndex) => {
          const startStep = stepOffset + 1;
          stepOffset += rowNodes.length;
          const isLastRow = rowIndex === flowRows.length - 1;

          return (
            <Fragment key={rowIndex}>
              {rowIndex > 0 && <FlowConnectorDown alignEnd />}
              <FlowHorizontalRow
                rowNodes={rowNodes}
                startStepNum={startStep}
                activeNodeId={activeNodeId}
                onSelectNode={onSelectNode}
                cardClassName={resolvedCardClass}
              />
              {!isLastRow && multiRow && (
                <p className="sr-only">
                  Lanjut baris {rowIndex + 2} tahap {startStep + rowNodes.length}
                </p>
              )}
            </Fragment>
          );
        })}
      </div>

      <p className="mt-3 text-center text-[11px] text-white/40 sm:hidden">
        {multiRow
          ? 'Geser ke samping per baris untuk melihat seluruh alur'
          : 'Geser ke samping untuk melihat seluruh alur'}
      </p>
    </div>
  );
}
