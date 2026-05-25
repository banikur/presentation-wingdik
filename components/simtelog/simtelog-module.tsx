'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  SIMTELOG_CATEGORY_ORDER,
  SIMTELOG_CATEGORIES,
  getRolesByCategory,
  getSimtelogRole,
  isSimtelogRoleWithoutImages,
} from '@/lib/simtelog/simtelog-data';
import type { SimtelogRole, SimtelogScreen } from '@/lib/simtelog/simtelog-types';
import { SimtelogTupoksiDetail } from './simtelog-tupoksi-detail';
import {
  SimtelogBreadcrumb,
  SimtelogDisclosure,
  SimtelogEyebrow,
  SimtelogNavBack,
  SimtelogPageDesc,
  SimtelogPageNav,
  SimtelogPageTitle,
  SimtelogSectionLabel,
} from './simtelog-ui';

const STATUS_LABELS: Record<SimtelogScreen, string> = {
  landing: 'Beranda',
  role: 'Tupoksi aktif',
};

type SimtelogModuleProps = {
  onStatusChange?: (label: string) => void;
};

export function SimtelogModule({ onStatusChange }: SimtelogModuleProps) {
  const [screen, setScreen] = useState<SimtelogScreen>('landing');
  const [roleId, setRoleId] = useState<string | null>(null);

  const role = useMemo(
    () => (roleId ? getSimtelogRole(roleId) : undefined),
    [roleId],
  );

  const goLanding = useCallback(() => {
    setScreen('landing');
    setRoleId(null);
    onStatusChange?.(STATUS_LABELS.landing);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [onStatusChange]);

  const selectRole = useCallback(
    (id: string) => {
      setRoleId(id);
      setScreen('role');
      onStatusChange?.(STATUS_LABELS.role);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [onStatusChange],
  );

  return (
    <div className="relative w-full">
      {screen === 'landing' && <LandingScreen onSelectRole={selectRole} />}
      {screen === 'role' && role && (
        <RoleTupoksiScreen role={role} onHome={goLanding} />
      )}
    </div>
  );
}

function LandingScreen({ onSelectRole }: { onSelectRole: (id: string) => void }) {
  return (
    <div>
      <div className="text-center">
        <SimtelogEyebrow>Modul Pembelajaran · Logistik Materiel</SimtelogEyebrow>
        <SimtelogPageTitle>
          Pengenalan Tupoksi
          <br />
          Modul Pembekalan SIMTELOGAU
        </SimtelogPageTitle>
        <SimtelogPageDesc>
          Pilih peran untuk mempelajari tupoksi, contoh dokumen, dan tangkapan layar sistem
          per tugas.
        </SimtelogPageDesc>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetaItem label="Total Peran" value="16 Tupoksi" />
          <MetaItem label="Kategori" value="4 Bidang" />
          <MetaItem label="Format" value="Self-paced" />
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {SIMTELOG_CATEGORY_ORDER.map((catId) => {
          const cat = SIMTELOG_CATEGORIES[catId];
          const roles = getRolesByCategory(catId);
          return (
            <div key={catId}>
              <div className="mb-4 flex items-baseline gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: cat.color }}
                />
                <span className="text-sm font-semibold text-app-text">{cat.name}</span>
                <span className="text-xs text-app-text-muted">{roles.length} Peran</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {roles.map((r) => {
                  const noImg = isSimtelogRoleWithoutImages(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelectRole(r.id)}
                      className="app-card-interactive group relative flex min-h-[11rem] flex-col p-5 text-left shadow-sm"
                      style={{ borderLeftWidth: 4, borderLeftColor: cat.color }}
                    >
                      {noImg && (
                        <span
                          className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-app-border bg-app-card-muted px-2 py-0.5 text-xs font-medium text-app-text-muted"
                          title="Belum ada tangkapan layar pada materi pembekalan"
                        >
                          Tanpa SS
                        </span>
                      )}
                      <span className="text-2xl">{r.icon}</span>
                      <span className="mt-3 text-sm font-semibold text-app-text">{r.name}</span>
                      <span className="mt-2 flex-1 text-xs leading-snug text-app-text-muted">
                        {r.tagline}
                      </span>
                      <span
                        className="mt-3 text-sm font-semibold"
                        style={{ color: cat.color }}
                      >
                        Lihat Tupoksi →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="app-card-muted rounded-lg px-6 py-5">
      <p className="text-sm font-medium text-app-text-muted">{label}</p>
      <p className="mt-2 text-lg font-semibold text-app-text">{value}</p>
    </div>
  );
}

function RoleTupoksiScreen({
  role,
  onHome,
}: {
  role: SimtelogRole;
  onHome: () => void;
}) {
  const cat = SIMTELOG_CATEGORIES[role.category];
  const [activeTupoksiIndex, setActiveTupoksiIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const handleSelectTupoksi = (index: number) => {
    setActiveTupoksiIndex(index);
    setImageIndex(0);
  };

  return (
    <div>
      <SimtelogBreadcrumb
        items={[
          { label: 'Beranda', onClick: onHome },
          { label: role.name, current: true },
        ]}
      />

      <div className="mb-4 flex items-center gap-3 border-b border-app-border pb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-app-border bg-app-card-muted text-2xl">
          {role.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-app-accent">{cat.name}</p>
          <h2 className="text-lg font-bold text-app-text md:text-xl">{role.name}</h2>
          <p className="truncate text-sm text-app-text-muted">{role.fullname}</p>
        </div>
      </div>

      <SimtelogDisclosure label="Tampilkan skenario peran" badge="Opsional">
        <p className="text-sm leading-relaxed text-app-text">{role.scenario}</p>
      </SimtelogDisclosure>

      <div className="mt-5">
        <SimtelogSectionLabel>Tugas Pokok &amp; Fungsi</SimtelogSectionLabel>
        <p className="mb-3 text-sm text-app-text-muted">
          Pilih nomor tugas — materi tampil di panel bawah tanpa perlu scroll ke atas.
        </p>

        <div
          className="sticky top-0 z-10 -mx-0.5 flex gap-2 overflow-x-auto border-b border-app-border bg-app-page pb-2 pt-1"
          role="tablist"
          aria-label="Pilih tupoksi"
        >
          {role.tupoksi.map((t, i) => {
            const active = i === activeTupoksiIndex;
            return (
              <button
                key={t.title}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleSelectTupoksi(i)}
                className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition ${
                  active
                    ? 'border-app-accent bg-amber-50 ring-1 ring-app-accent/40'
                    : 'border-app-border bg-white hover:bg-app-card-muted'
                }`}
              >
                <span
                  className={`text-sm font-bold tabular-nums ${active ? 'text-app-accent' : 'text-app-text-muted'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base leading-none">{t.icon}</span>
                <span
                  className={`max-w-[9rem] text-sm font-semibold leading-tight sm:max-w-[11rem] ${active ? 'text-app-text' : 'text-app-text-muted'}`}
                >
                  {t.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <SimtelogTupoksiDetail
        role={role}
        activeTupoksiIndex={activeTupoksiIndex}
        imageIndex={imageIndex}
        onImageIndexChange={setImageIndex}
      />

      <SimtelogPageNav
        left={<SimtelogNavBack small="Kembali" big="Beranda" onClick={onHome} />}
      />
    </div>
  );
}
