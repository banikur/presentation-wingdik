'use client';

import type { ReactNode } from 'react';

export function SimtelogEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
      <span className="text-[9px]">◉</span>
      {children}
    </p>
  );
}

export function SimtelogPageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-bold text-3xl md:text-4xl leading-tight tracking-tight text-[#F8FAFC] uppercase">
      {children}
    </h2>
  );
}

export function SimtelogPageDesc({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-white/70">{children}</p>;
}

export function SimtelogSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
      {children}
    </p>
  );
}

export function SimtelogCtaPrimary({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-[#D4AF37] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[#0F172A] transition hover:bg-[#e8c84a] hover:shadow-[0_8px_24px_rgba(212,175,55,0.25)]"
    >
      {children}
    </button>
  );
}

export function SimtelogCtaSecondary({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
    >
      {children}
    </button>
  );
}

export function SimtelogNavBack({
  small,
  big,
  onClick,
}: {
  small: string;
  big: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-left text-white/60 transition hover:text-[#D4AF37]"
    >
      <span>←</span>
      <div>
        <span className="block text-[10px] uppercase tracking-[0.15em] text-white/40">{small}</span>
        <span className="block text-sm font-medium text-white/90 normal-case tracking-normal">
          {big}
        </span>
      </div>
    </button>
  );
}

export function SimtelogBreadcrumb({
  items,
}: {
  items: { label: string; onClick?: () => void; current?: boolean }[];
}) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-white/40">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/25">/</span>}
          {item.current ? (
            <span className="text-[#D4AF37]">{item.label}</span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="text-white/55 transition hover:text-[#D4AF37]"
            >
              {item.label}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SimtelogPageNav({
  left,
  right,
}: {
  left: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
      {left}
      {right ? <div className="flex flex-wrap gap-3">{right}</div> : null}
    </div>
  );
}
