export type AppId =
  | 'sakti'
  | 'sirup'
  | 'inaproc'
  | 'simak-bmn'
  | 'simtelog';

export type AppLogoMeta = {
  id: AppId;
  name: string;
  shortName: string;
  /** Path di public - ganti file PNG/SVG resmi di folder ini */
  logoSrc: string;
  accent: string;
};

export const APP_LOGO_REGISTRY: Record<AppId, AppLogoMeta> = {
  sakti: {
    id: 'sakti',
    name: 'SAKTI (Kemenkeu)',
    shortName: 'SAKTI',
    logoSrc: '/images/apps/sakti.jpg',
    accent: '#1e40af',
  },
  sirup: {
    id: 'sirup',
    name: 'SIRUP',
    shortName: 'SIRUP',
    logoSrc: '/images/apps/sirup.webp',
    accent: '#b91c1c',
  },
  inaproc: {
    id: 'inaproc',
    name: 'INAPROC',
    shortName: 'INAPROC',
    logoSrc: '/images/apps/inaproc.svg',
    accent: '#0d9488',
  },
  'simak-bmn': {
    id: 'simak-bmn',
    name: 'SIMAN',
    shortName: 'SIMAN',
    logoSrc: '/images/apps/logo-siman-landing-biru.png',
    accent: '#047857',
  },
  simtelog: {
    id: 'simtelog',
    name: 'Sistem Informasi Manajemen Terintegrasi Logistik',
    shortName: 'SIMTELOG',
    logoSrc: '/images/apps/simtelog.svg',
    accent: '#c2410c',
  },
};

export function getAppMeta(id: AppId): AppLogoMeta {
  return APP_LOGO_REGISTRY[id];
}
