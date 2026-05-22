'use client';

import React from 'react';
import { FileText, LayoutDashboard } from 'lucide-react';

export const DocBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#D4AF37] text-black rounded-full text-[10px] md:text-xs font-bold leading-none tracking-wider uppercase shadow-sm whitespace-nowrap">
    <FileText className="w-3 h-3" />
    {text}
  </span>
);

export const AppBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1E40AF] text-white rounded-full text-[10px] md:text-xs font-bold leading-none tracking-wider uppercase shadow-sm whitespace-nowrap">
    <LayoutDashboard className="w-3 h-3" />
    {text}
  </span>
);

export const FlowBox = ({ title, desc, badges = [], onClick, isActive }: { title: string, desc?: React.ReactNode, badges?: React.ReactNode[], onClick?: () => void, isActive?: boolean }) => (
  <div onClick={onClick} className={`bg-white/5 border rounded-lg p-3 md:p-4 shadow-sm flex flex-col items-center justify-center text-center w-full min-h-[100px] relative z-10 transition-colors ${onClick ? 'cursor-pointer' : ''} ${isActive ? 'border-[#D4AF37]' : 'border-white/10 hover:border-white/20'}`}>
    <h3 className="font-bold text-[#F8FAFC] text-sm md:text-base leading-tight mb-1">{title}</h3>
    {desc && <p className="text-xs text-white/70 mb-2">{desc}</p>}
    {badges.length > 0 && (
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-auto pt-2">
        {badges.map((badge, i) => React.cloneElement(badge as React.ReactElement, { key: i }))}
      </div>
    )}
  </div>
);

export const ArrowH = () => (
  <div className="flex items-center justify-center px-1 md:px-2 shrink-0 text-[#334155] hidden sm:flex relative">
    <div className="w-8 h-0.5 bg-[#334155]"></div>
    <div className="absolute right-1 md:right-2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#334155]"></div>
  </div>
);

export const ArrowV = () => (
  <div className="flex items-center justify-center py-2 shrink-0 text-[#334155] sm:hidden relative h-8 w-6">
    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#334155]"></div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#334155]"></div>
  </div>
);
