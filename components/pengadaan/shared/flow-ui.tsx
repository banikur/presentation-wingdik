'use client';

import React from 'react';
import { FileText, LayoutDashboard } from 'lucide-react';

export const DocBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-app-accent px-3 py-1.5 text-sm font-bold leading-none text-app-text shadow-sm">
    <FileText className="h-4 w-4" />
    {text}
  </span>
);

export const AppBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-app-link px-3 py-1.5 text-sm font-bold leading-none text-white shadow-sm">
    <LayoutDashboard className="h-4 w-4" />
    {text}
  </span>
);

export const FlowBox = ({
  title,
  desc,
  badges = [],
  onClick,
  isActive,
}: {
  title: string;
  desc?: React.ReactNode;
  badges?: React.ReactNode[];
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <div
    onClick={onClick}
    className={`app-card flex w-full min-h-[110px] flex-col items-center justify-center rounded-lg p-4 text-center shadow-sm transition-colors md:p-5 ${
      onClick ? 'cursor-pointer' : ''
    } ${isActive ? 'border-2 border-app-accent ring-2 ring-app-accent/20' : ''}`}
  >
    <h3 className="mb-1 text-base font-bold leading-tight text-app-text md:text-lg">{title}</h3>
    {desc && <p className="mb-2 text-sm text-app-text-muted">{desc}</p>}
    {badges.length > 0 && (
      <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-2">
        {badges.map((badge, i) => React.cloneElement(badge as React.ReactElement, { key: i }))}
      </div>
    )}
  </div>
);

export const ArrowH = () => (
  <div className="relative hidden shrink-0 items-center justify-center px-1 text-app-text-muted md:flex md:px-2">
    <div className="h-0.5 w-8 bg-app-border" />
    <div className="absolute right-1 h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-app-border border-t-transparent md:right-2" />
  </div>
);

export const ArrowV = () => (
  <div className="relative flex h-8 w-6 shrink-0 items-center justify-center py-2 text-app-text-muted sm:hidden">
    <div className="absolute left-1/2 h-6 w-0.5 -translate-x-1/2 bg-app-border" />
    <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-app-border" />
  </div>
);
