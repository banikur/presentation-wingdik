'use client';

import { getAppMeta, type AppId } from '@/lib/pengadaan/app-logos';

type AppLogoProps = {
  appId: AppId;
  size?: 'sm' | 'md';
  showLabel?: boolean;
};

const SIZE_CLASS = {
  sm: 'h-6 w-6',
  md: 'h-9 w-9',
} as const;

export function AppLogo({ appId, size = 'sm', showLabel = false }: AppLogoProps) {
  const meta = getAppMeta(appId);

  return (
    <div
      className={`flex flex-col items-center gap-0.5 ${showLabel ? 'min-w-[3.25rem]' : ''}`}
      title={meta.name}
    >
      <div
        className={`${SIZE_CLASS[size]} flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-white/15`}
      >
        <img
          src={meta.logoSrc}
          alt={`Logo ${meta.name}`}
          className="h-full w-full object-contain p-0.5"
        />
      </div>
      {showLabel && (
        <span className="max-w-[4.5rem] truncate text-[8px] font-semibold leading-none text-app-text-muted">
          {meta.shortName}
        </span>
      )}
    </div>
  );
}

type AppLogoStripProps = {
  apps?: AppId[];
  size?: 'sm' | 'md';
  showLabels?: boolean;
  className?: string;
};

export function AppLogoStrip({
  apps,
  size = 'sm',
  showLabels = false,
  className = '',
}: AppLogoStripProps) {
  if (!apps?.length) return null;

  return (
    <div className={`flex flex-wrap items-end justify-center gap-1.5 ${className}`}>
      {apps.map((id) => (
        <AppLogo key={id} appId={id} size={size} showLabel={showLabels} />
      ))}
    </div>
  );
}
