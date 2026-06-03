'use client';

import Image from 'next/image';

/* ============================================================
   PortalOverview — Light institutional redesign.
   Fit-to-viewport, no scroll on desktop, 2×2 module grid.
   Uses Noto Sans (project font) via CSS inheritance.
   All styles scoped with .po-* prefix to avoid Tailwind conflicts.
   ============================================================ */

type PortalOverviewProps = {
  onGoToFlow: () => void;
  onSelectSimtelog: () => void;
  onSelectSimtelogFlow: () => void;
};

/* ---- SVG corner accents (one per card) ---- */
const AccentRadar = () => (
  <div className="po-card-accent" aria-hidden="true">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path d="M80 40 A40 40 0 0 0 40 80" stroke="#1B3A6B" strokeOpacity="0.08" strokeWidth="1.5" fill="none"/>
      <path d="M80 20 A60 60 0 0 0 20 80" stroke="#1B3A6B" strokeOpacity="0.08" strokeWidth="1.5" fill="none"/>
      <path d="M80 0 A80 80 0 0 0 0 80"   stroke="#1B3A6B" strokeOpacity="0.08" strokeWidth="1.5" fill="none"/>
    </svg>
  </div>
);

const AccentGrid = () => (
  <div className="po-card-accent" aria-hidden="true">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {[32,44,56,68].flatMap(y =>
        [32,44,56,68].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#1B3A6B" fillOpacity="0.07"/>
        ))
      )}
    </svg>
  </div>
);

const AccentCircles = () => (
  <div className="po-card-accent" aria-hidden="true">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="80" cy="80" r="20" stroke="#1B3A6B" strokeOpacity="0.07" strokeWidth="1.5" fill="none"/>
      <circle cx="80" cy="80" r="35" stroke="#1B3A6B" strokeOpacity="0.07" strokeWidth="1.5" fill="none"/>
      <circle cx="80" cy="80" r="52" stroke="#1B3A6B" strokeOpacity="0.07" strokeWidth="1.5" fill="none"/>
    </svg>
  </div>
);

const AccentDiagonals = () => (
  <div className="po-card-accent" aria-hidden="true">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <line x1="20" y1="80" x2="80" y2="20" stroke="#1B3A6B" strokeOpacity="0.06" strokeWidth="1.5"/>
      <line x1="30" y1="80" x2="80" y2="30" stroke="#1B3A6B" strokeOpacity="0.06" strokeWidth="1.5"/>
      <line x1="40" y1="80" x2="80" y2="40" stroke="#1B3A6B" strokeOpacity="0.06" strokeWidth="1.5"/>
      <line x1="50" y1="80" x2="80" y2="50" stroke="#1B3A6B" strokeOpacity="0.06" strokeWidth="1.5"/>
      <line x1="60" y1="80" x2="80" y2="60" stroke="#1B3A6B" strokeOpacity="0.06" strokeWidth="1.5"/>
      <line x1="70" y1="80" x2="80" y2="70" stroke="#1B3A6B" strokeOpacity="0.06" strokeWidth="1.5"/>
    </svg>
  </div>
);

/* ---- Arrow icon for CTA ---- */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ---- Card icons ---- */
const IconBuilding = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="9" width="14" height="9" rx="1" stroke="#1B3A6B" strokeWidth="1.5"/>
    <path d="M1 9L10 3L19 9" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="8" y="13" width="4" height="5" rx="0.5" fill="#1B3A6B" fillOpacity="0.3"/>
  </svg>
);

const IconClipboard = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="4" y="3" width="12" height="14" rx="1.5" stroke="#1B3A6B" strokeWidth="1.5"/>
    <path d="M7 7H13M7 10H13M7 13H10" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="8" y="1.5" width="4" height="3" rx="1" stroke="#1B3A6B" strokeWidth="1.5" fill="#EFF4FF"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <circle cx="8" cy="6" r="2.5" stroke="#1B3A6B" strokeWidth="1.5"/>
    <path d="M3 16C3 13.2 5.2 11 8 11C10.8 11 13 13.2 13 16" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="14" cy="7" r="2" stroke="#1B3A6B" strokeWidth="1.5"/>
    <path d="M14 12C15.7 12 17 13.3 17 15" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="2" y="10" width="3.5" height="7" rx="1" fill="#1B3A6B" fillOpacity="0.25"/>
    <rect x="8" y="6"  width="3.5" height="11" rx="1" fill="#1B3A6B" fillOpacity="0.45"/>
    <rect x="14" y="2" width="3.5" height="15" rx="1" fill="#1B3A6B" fillOpacity="0.75"/>
    <path d="M2 15L7 10L12 12L18 5" stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function PortalOverview({
  onGoToFlow,
  onSelectSimtelog,
  onSelectSimtelogFlow,
}: PortalOverviewProps) {
  return (
    <div className="po-root">

      {/* ---- HEADER ---- */}
      <header className="po-header" role="banner">
        <div className="po-brand">
          <div className="po-emblem-wrap">
            <Image
              src="/images/wingdik/wingdik-logo.png"
              alt="Logo Wing Pendidikan 600 TNI AU"
              width={36}
              height={36}
              className="po-emblem-img"
              priority
              onError={(e) => {
                // hide broken img, show fallback SVG sibling
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback SVG badge */}
            <svg
              className="po-emblem-fallback"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
              style={{ display: 'none' }}
            >
              <circle cx="18" cy="18" r="17" fill="#1B3A6B"/>
              <circle cx="18" cy="18" r="14.5" stroke="#C9972C" strokeWidth="1.5"/>
              <text x="18" y="22.5" textAnchor="middle" fontFamily="sans-serif"
                fontSize="10" fontWeight="700" fill="#FFFFFF">AU</text>
            </svg>
          </div>
          <div className="po-brand-text">
            <span className="po-brand-name">Wing Pendidikan 600 / Pembekalan</span>
            <span className="po-brand-sub">Tentara Nasional Indonesia Angkatan Udara</span>
          </div>
        </div>
      </header>

      {/* ---- PAGE INTRO ---- */}
      <section className="po-intro" aria-labelledby="po-heading">
        <p className="po-intro-label">Daftar Modul</p>
        <h1 className="po-intro-heading" id="po-heading">
          Portal Pembekalan Pengadaan &amp; SIMTELOG
        </h1>
      </section>

      {/* ---- MODULE GRID ---- */}
      <div className="po-grid" role="list">

        {/* Card 01 — Terpusat (disabled) */}
        <article
          className="po-card po-card--disabled"
          role="listitem"
          aria-label="Modul 01 — Alur Pengadaan Terpusat — Segera Hadir"
          style={{ animationDelay: '0.05s' }}
        >
          <div className="po-card-top">
            <div className="po-card-icon" aria-hidden="true"><IconBuilding /></div>
            <span className="po-card-num" aria-hidden="true">01</span>
          </div>
          <p className="po-card-category">Tingkat Mabes</p>
          <span className="po-badge" aria-label="Status: Segera Hadir">Segera Hadir</span>
          <h2 className="po-card-title">Alur Pengadaan — Terpusat</h2>
          <p className="po-card-desc">
            Proses pengadaan barang dan jasa pada tingkat Markas Besar TNI AU,
            mencakup mekanisme perencanaan dan pelaksanaan terpusat.
          </p>
          <span className="po-cta-disabled" aria-disabled="true">Dalam Penyusunan</span>
          <AccentRadar />
        </article>

        {/* Card 02 — Lokal/Satker (active) */}
        <article
          className="po-card po-card--clickable"
          role="listitem"
          aria-label="Modul 02 — Alur Pengadaan Lokal / Satuan Kerja"
          style={{ animationDelay: '0.15s' }}
          onClick={() => onGoToFlow()}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onGoToFlow();
            }
          }}
        >
          <div className="po-card-top">
            <div className="po-card-icon" aria-hidden="true"><IconClipboard /></div>
            <span className="po-card-num" aria-hidden="true">02</span>
          </div>
          <p className="po-card-category">Tingkat Satuan Kerja</p>
          <h2 className="po-card-title">Alur Pengadaan — Lokal / Satker</h2>
          <p className="po-card-desc">
            Mekanisme pengadaan di tingkat satuan kerja, dari perencanaan kebutuhan
            hingga pendataan aset hasil pengadaan.
          </p>
          <div className="po-pills" role="list" aria-label="Fase-fase pengadaan">
            {['Perencanaan','Penyaluran Anggaran','Usul Pesanan','Pelaksanaan','Pendataan Aset'].map(p => (
              <span key={p} className="po-pill" role="listitem">{p}</span>
            ))}
          </div>
          <span
            className="po-cta"
            aria-label="Buka Modul 02 — Alur Pengadaan Lokal / Satker"
          >
            Buka Modul <ArrowRight />
          </span>
          <AccentGrid />
        </article>

        {/* Card 03 — SIMTELOG Tupoksi (active) */}
        <article
          className="po-card po-card--clickable"
          role="listitem"
          aria-label="Modul 03 — SIMTELOG Tupoksi 16 Operator"
          style={{ animationDelay: '0.25s' }}
          onClick={() => onSelectSimtelog()}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectSimtelog();
            }
          }}
        >
          <div className="po-card-top">
            <div className="po-card-icon" aria-hidden="true"><IconUsers /></div>
            <span className="po-card-num" aria-hidden="true">03</span>
          </div>
          <p className="po-card-category">16 Operator · 4 Bidang</p>
          <h2 className="po-card-title">SIMTELOG — Tupoksi 16 Operator</h2>
          <p className="po-card-desc">
            Peran, fungsi, dan tugas pokok masing-masing dari 16 operator SIMTELOG
            yang terbagi dalam 4 bidang pengelolaan logistik.
          </p>
          <span
            className="po-cta"
            aria-label="Buka Modul 03 — SIMTELOG Tupoksi 16 Operator"
          >
            Buka Modul <ArrowRight />
          </span>
          <AccentCircles />
        </article>

        {/* Card 04 — SIMTELOG Visualisasi (active) */}
        <article
          className="po-card po-card--clickable"
          role="listitem"
          aria-label="Modul 04 — SIMTELOG Visualisasi TB/SIKAL dan GPL"
          style={{ animationDelay: '0.35s' }}
          onClick={() => onSelectSimtelogFlow()}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectSimtelogFlow();
            }
          }}
        >
          <div className="po-card-top">
            <div className="po-card-icon" aria-hidden="true"><IconChart /></div>
            <span className="po-card-num" aria-hidden="true">04</span>
          </div>
          <p className="po-card-category">Visualisasi Interaktif</p>
          <h2 className="po-card-title">SIMTELOG — Visualisasi TB/SIKAL &amp; GPL</h2>
          <p className="po-card-desc">
            Eksplorasi interaktif alur data Tabel Bekalan (TB), SIKAL, dan Garis
            Penyaluran Logistik (GPL) dalam sistem SIMTELOG.
          </p>
          <span
            className="po-cta"
            aria-label="Buka Modul 04 — SIMTELOG Visualisasi TB/SIKAL dan GPL"
          >
            Buka Modul <ArrowRight />
          </span>
          <AccentDiagonals />
        </article>

      </div>{/* /.po-grid */}

      {/* ---- FOOTER ---- */}
      <footer className="po-footer" role="contentinfo">
        <p>© 2025 Wing Pendidikan 600 TNI AU — Materi Pembekalan Internal</p>
      </footer>

      {/* ============================================================
          Scoped styles — all selectors prefixed .po-*
          Uses CSS custom properties so no Tailwind token conflicts.
          ============================================================ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ---------- ROOT: full-viewport, no scroll (desktop) ---------- */
        .po-root {
          --po-primary:      #1B3A6B;
          --po-accent:       #C9972C;
          --po-surface:      #FFFFFF;
          --po-border:       #E2E8F0;
          --po-text:         #1A202C;
          --po-muted:        #64748B;
          --po-faint:        #E2E8F0;
          --po-shadow:       0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --po-shadow-hover: 0 6px 18px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
          --po-radius:       8px;

          /* Stretch to fill AppShell's <main> area exactly */
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          overflow: hidden;

          /* Dot-grid background texture */
          background-color: #F5F7FA;
          background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23CBD5E0' fill-opacity='0.4'/%3E%3C/svg%3E");
          background-size: 28px 28px;
          color: var(--po-text);
        }

        /* ---------- HEADER (white, compact ~56px) ---------- */
        .po-header {
          background: var(--po-surface);
          border-bottom: 1px solid var(--po-border);
          height: 56px;
          min-height: 56px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 40px;
        }
        .po-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .po-emblem-wrap {
          position: relative;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }
        .po-emblem-img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          border-radius: 4px;
        }
        .po-emblem-fallback {
          position: absolute;
          inset: 0;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
        }
        .po-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .po-brand-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--po-primary);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .po-brand-sub {
          font-size: 11px;
          font-weight: 400;
          color: var(--po-muted);
          letter-spacing: 0.01em;
        }

        /* ---------- PAGE INTRO (tight ~64px) ---------- */
        .po-intro {
          padding: 24px 40px 16px;
          width: 100%;
          flex-shrink: 0;
        }
        .po-intro-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--po-muted);
          margin-bottom: 10px;
        }
        .po-intro-heading {
          font-size: 26px;
          font-weight: 700;
          color: var(--po-text);
          line-height: 1.25;
        }

        /* ---------- MODULE GRID (fills remaining height) ---------- */
        .po-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 16px;
          padding: 0 40px;
          width: 100%;
          min-height: 0;
        }

        /* ---------- CARD ---------- */
        .po-card {
          background: var(--po-surface);
          border: 1px solid var(--po-border);
          border-radius: var(--po-radius);
          padding: 20px 24px 18px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--po-shadow);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          color: inherit;

          opacity: 0;
          transform: translateY(6px);
          animation: poCardIn 0.35s ease forwards;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        @keyframes poCardIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .po-card:not(.po-card--disabled):hover {
          transform: translateY(-2px);
          box-shadow: var(--po-shadow-hover);
        }
        .po-card--clickable {
          cursor: pointer;
        }
        .po-card--clickable:focus-visible {
          outline: 2px solid var(--po-primary);
          outline-offset: 2px;
        }
        .po-card--disabled {
          cursor: default;
        }

        /* ---- Card internals ---- */
        .po-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .po-card-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #EFF4FF;
          border-radius: 7px;
          flex-shrink: 0;
        }
        .po-card-icon svg {
          width: 18px;
          height: 18px;
        }
        .po-card-num {
          font-size: 44px;
          font-weight: 700;
          color: var(--po-faint);
          line-height: 1;
          user-select: none;
          letter-spacing: -2px;
        }
        .po-card-category {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #4A6FA5;
          margin-bottom: 6px;
        }
        .po-badge {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 4px;
          margin-bottom: 6px;
          background: #F1F5F9;
          color: #94A3B8;
          border: 1px solid #E2E8F0;
        }
        .po-card-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--po-text);
          line-height: 1.3;
          margin-bottom: 8px;
        }
        .po-card-desc {
          font-size: 13px;
          font-weight: 400;
          color: var(--po-muted);
          line-height: 1.55;
          margin-bottom: 12px;
          flex: 1;
        }

        /* ---- Phase pills ---- */
        .po-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 12px;
        }
        .po-pill {
          font-size: 10.5px;
          font-weight: 500;
          color: #2563EB;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 100px;
          padding: 2px 9px;
          line-height: 1.4;
          white-space: nowrap;
        }

        /* ---- CTA ---- */
        .po-cta {
          font-size: 13px;
          font-weight: 600;
          color: var(--po-primary);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: auto;
          padding-top: 2px;
          flex-shrink: 0;
          text-decoration: none;
        }
        .po-card:not(.po-card--disabled):hover .po-cta {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .po-cta-disabled {
          font-size: 13px;
          font-weight: 500;
          color: #94A3B8;
          cursor: default;
          margin-top: auto;
          flex-shrink: 0;
          display: block;
        }

        /* ---- Corner accent container ---- */
        .po-card-accent {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 80px;
          height: 80px;
          overflow: hidden;
          pointer-events: none;
        }

        /* ---------- FOOTER ---------- */
        .po-footer {
          flex-shrink: 0;
          background: #F1F5F9;
          border-top: 1px solid var(--po-border);
          padding: 12px 40px;
          text-align: center;
        }
        .po-footer p {
          font-size: 11px;
          color: var(--po-muted);
          letter-spacing: 0.01em;
        }

        /* ---------- RESPONSIVE (mobile: allow scroll, 1 col) ---------- */
        @media (max-width: 768px) {
          .po-root {
            height: auto;
            overflow: visible;
          }
          .po-header {
            padding: 0 20px;
            height: 52px;
            min-height: 52px;
          }
          .po-intro {
            padding: 28px 20px 16px;
          }
          .po-intro-heading {
            font-size: 20px;
          }
          .po-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            padding: 0 20px 24px;
            gap: 14px;
            flex: none;
          }
          .po-card {
            height: auto;
            padding: 20px 18px 16px;
          }
          .po-card-num {
            font-size: 38px;
          }
          .po-footer {
            padding: 14px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .po-card {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}} />
    </div>
  );
}
