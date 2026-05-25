'use client';

import type { ReactNode } from 'react';

export function SimtelogEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-app-accent">
      <span className="text-xs">◉</span>
      {children}
    </p>
  );
}

export function SimtelogPageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-bold leading-tight tracking-tight text-app-text md:text-3xl">
      {children}
    </h2>
  );
}

export function SimtelogPageDesc({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-2xl text-base leading-relaxed text-app-text-muted md:text-[1.0625rem]">
      {children}
    </p>
  );
}

export function SimtelogSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold tracking-wide text-app-text-muted">{children}</p>
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
      className="inline-flex items-center gap-2 bg-app-accent px-6 py-3.5 text-sm font-bold text-app-text transition hover:bg-[var(--app-accent-hover)] hover:shadow-md"
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
      className="inline-flex items-center gap-2 border border-app-border bg-transparent px-5 py-3 text-sm font-semibold text-app-text transition hover:border-app-accent hover:text-app-accent"
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
      <span className="text-lg">←</span>
      <div>
        <span className="block text-sm text-app-text-muted">{small}</span>
        <span className="block text-base font-medium text-app-text">{big}</span>
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
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-app-text-muted">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span className="text-app-border">/</span>}
          {item.current ? (
            <span className="font-semibold text-app-accent">{item.label}</span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="font-medium transition hover:text-app-link"
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
    <div className="mt-10 flex flex-col gap-4 border-t border-app-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      {left}
      {right ? <div className="flex flex-wrap gap-3">{right}</div> : null}
    </div>
  );
}
