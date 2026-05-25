'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export function SimtelogEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-app-accent">
      <span className="text-[9px]">◉</span>
      {children}
    </p>
  );
}

export function SimtelogPageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-app-text md:text-4xl">
      {children}
    </h2>
  );
}

export function SimtelogPageDesc({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-app-text-muted md:text-base">
      {children}
    </p>
  );
}

export function SimtelogSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-app-text-muted">
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
      className="inline-flex items-center gap-2 bg-app-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-app-text transition hover:bg-[var(--app-accent-hover)] hover:shadow-md"
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
      className="inline-flex items-center gap-2 border border-app-border bg-transparent px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-app-text transition hover:border-app-accent hover:text-app-accent"
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
      className="inline-flex items-center gap-2 text-left text-app-text-muted transition hover:text-app-link"
    >
      <span>←</span>
      <div>
        <span className="block text-[10px] uppercase tracking-[0.15em] text-app-text-muted">
          {small}
        </span>
        <span className="block text-sm font-medium text-app-text normal-case tracking-normal">
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
    <nav className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-app-text-muted">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span className="text-app-border">/</span>}
          {item.current ? (
            <span className="text-app-accent">{item.label}</span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="transition hover:text-app-link"
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
    <div className="mt-6 flex flex-col gap-4 border-t border-app-border pt-5 sm:flex-row sm:items-center sm:justify-between">
      {left}
      {right ? <div className="flex flex-wrap gap-3">{right}</div> : null}
    </div>
  );
}

export function SimtelogDisclosure({
  label,
  children,
  defaultOpen = false,
  badge,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-app-border bg-app-card-muted">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition hover:bg-white"
      >
        <span className="text-sm font-semibold text-app-text">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          {badge ? (
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-app-text-muted">
              {badge}
            </span>
          ) : null}
          <ChevronDown
            className={`h-4 w-4 text-app-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      {open ? <div className="border-t border-app-border px-3 py-3">{children}</div> : null}
    </div>
  );
}
