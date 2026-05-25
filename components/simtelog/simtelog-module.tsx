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
        <div className="mt-8 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
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
                <span className="text-sm font-semibold uppercase tracking-wide text-[#F8FAFC]">
                  {cat.name}
                </span>
                <span className="text-[11px] text-white/40">{roles.length} Peran</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {roles.map((r) => {
                  const noImg = isSimtelogRoleWithoutImages(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelectRole(r.id)}
                      className="group relative flex min-h-[10rem] flex-col border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
                      style={{ borderLeftWidth: 3, borderLeftColor: cat.color }}
                    >
                      {noImg && (
                        <span
                          className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white/55"
                          title="Belum ada tangkapan layar pada materi pembekalan"
                        >
                          Tanpa SS
                        </span>
                      )}
                      <span className="text-2xl">{r.icon}</span>
                      <span className="mt-3 text-lg font-semibold text-[#F8FAFC]">{r.name}</span>
                      <span className="mt-2 flex-1 text-sm leading-snug text-white/55">
                        {r.tagline}
                      </span>
                      <span
                        className="mt-3 text-[11px] font-semibold uppercase tracking-wide"
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
    <div className="bg-[#1E293B]/80 px-6 py-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p>
      <p className="mt-2 text-xl font-semibold text-[#F8FAFC]">{value}</p>
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

      <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
        <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center border border-white/15 bg-white/5 text-4xl">
          {role.icon}
        </div>
        <div>
          <SimtelogEyebrow>{cat.name}</SimtelogEyebrow>
          <h2 className="text-3xl font-bold uppercase text-[#F8FAFC]">{role.name}</h2>
          <p className="mt-1 text-sm text-white/55">{role.fullname}</p>
        </div>
      </div>

      <div
        className="mb-8 border-l-[3px] bg-white/[0.04] px-5 py-4"
        style={{ borderColor: cat.color }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
          Skenario
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{role.scenario}</p>
      </div>

      <SimtelogSectionLabel>Tugas Pokok & Fungsi</SimtelogSectionLabel>
      <p className="mb-4 text-xs text-white/45">
        Klik kartu untuk melihat contoh dokumen dan slide gambar di bawah.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {role.tupoksi.map((t, i) => {
          const active = i === activeTupoksiIndex;
          return (
            <button
              key={t.title}
              type="button"
              onClick={() => handleSelectTupoksi(i)}
              className={`relative min-h-[10rem] border p-5 text-left transition ${
                active
                  ? 'border-[#D4AF37]/70 bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]/40'
                  : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]'
              }`}
            >
              <span className="absolute right-4 top-4 text-3xl font-bold text-white/15">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-xl">{t.icon}</span>
              <h4 className="mt-3 text-sm font-semibold text-[#F8FAFC]">{t.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-white/55">{t.desc}</p>
            </button>
          );
        })}
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
