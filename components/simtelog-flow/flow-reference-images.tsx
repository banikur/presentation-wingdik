'use client';

import { useEffect, useState } from 'react';
import { ImageIcon, Monitor, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FlowReferenceImage } from '@/lib/simtelog-flow/flow-types';

type FlowReferenceImagesProps = {
  bentukCode: string;
  workflowImage?: FlowReferenceImage;
  appScreenshots?: FlowReferenceImage[];
  /** Tanpa border/card sendiri — dipakai di dalam disclosure */
  embedded?: boolean;
};

type TabKey = 'workflow' | 'app';

/**
 * Section "Referensi dari Aplikasi Asli" — tampilkan workflow diagram BPMN
 * dan/atau screenshot aplikasi SIMTELOG. Klik gambar untuk fullscreen lightbox.
 */
export function FlowReferenceImages({
  bentukCode,
  workflowImage,
  appScreenshots = [],
  embedded = false,
}: FlowReferenceImagesProps) {
  const hasWorkflow = !!workflowImage;
  const hasApp = appScreenshots.length > 0;

  const [tab, setTab] = useState<TabKey>(hasWorkflow ? 'workflow' : 'app');
  const [zoomed, setZoomed] = useState<FlowReferenceImage | null>(null);

  // Reset tab saat bentuk berubah
  useEffect(() => {
    setTab(hasWorkflow ? 'workflow' : 'app');
    setZoomed(null);
  }, [bentukCode, hasWorkflow]);

  if (!hasWorkflow && !hasApp) return null;

  return (
    <section
      aria-label="Referensi dari aplikasi SIMTELOG asli"
      className={embedded ? '' : 'rounded-xl border border-app-border bg-app-card p-4'}
    >
      <div className={`flex flex-wrap items-center justify-between gap-2 ${embedded ? 'mb-2' : 'mb-3'}`}>
        {!embedded && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">
              Referensi aplikasi asli
            </p>
            <p className="mt-0.5 text-xs text-app-text-muted">
              <span className="font-mono text-app-link">simtelog.tni-au.mil.id/ilsms</span>
            </p>
          </div>
        )}

        {/* Tab switcher */}
        <div
          className={`flex items-center gap-1 rounded-lg border border-app-border bg-app-card-muted p-1 ${embedded ? 'w-full' : ''}`}
          role="tablist"
        >
          {hasWorkflow && (
            <TabButton
              active={tab === 'workflow'}
              onClick={() => setTab('workflow')}
              icon={<ImageIcon className="h-3.5 w-3.5" />}
              label="Workflow Diagram"
            />
          )}
          {hasApp && (
            <TabButton
              active={tab === 'app'}
              onClick={() => setTab('app')}
              icon={<Monitor className="h-3.5 w-3.5" />}
              label={`Screenshot UI (${appScreenshots.length})`}
            />
          )}
        </div>
      </div>

      {/* Content */}
      {tab === 'workflow' && workflowImage && (
        <ReferenceCard image={workflowImage} onZoom={() => setZoomed(workflowImage)} />
      )}
      {tab === 'app' && hasApp && (
        <div className="grid gap-3 sm:grid-cols-2">
          {appScreenshots.map((img) => (
            <ReferenceCard
              key={img.src}
              image={img}
              onZoom={() => setZoomed(img)}
              compact
            />
          ))}
        </div>
      )}

      <ReferenceLightbox image={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
        active
          ? 'bg-app-link text-white shadow-sm'
          : 'text-app-text hover:bg-app-card'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ReferenceCard({
  image,
  onZoom,
  compact,
}: {
  image: FlowReferenceImage;
  onZoom: () => void;
  compact?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-app-border bg-app-card-muted">
      <button
        type="button"
        onClick={onZoom}
        className={`group relative block w-full overflow-hidden bg-white ${
          compact ? 'max-h-44' : 'max-h-56'
        }`}
        aria-label={`Zoom ${image.caption}`}
      >
        <img
          src={image.src}
          alt={image.caption}
          className="h-full w-full object-contain"
        />
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" />
          Klik untuk perbesar
        </span>
        {image.placeholder && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-amber-400 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
            ⚠ Placeholder
          </span>
        )}
      </button>
      <figcaption className="border-t border-app-border bg-app-card px-2 py-1.5 text-xs leading-snug text-app-text line-clamp-2">
        {image.caption}
      </figcaption>
    </figure>
  );
}

function ReferenceLightbox({
  image,
  onClose,
}: {
  image: FlowReferenceImage | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/15"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            className="flex max-h-[92vh] max-w-[min(96vw,1400px)] flex-col items-center gap-3"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <img
              src={image.src}
              alt={image.caption}
              className="max-h-[82vh] w-auto max-w-full object-contain shadow-2xl"
            />
            <p className="max-w-[min(96vw,900px)] px-3 text-center text-sm leading-relaxed text-white/90">
              {image.caption}
            </p>
            {image.placeholder && (
              <p className="rounded-full border border-amber-400 bg-amber-50/95 px-3 py-1 text-xs font-semibold text-amber-800">
                ⚠ Gambar masih placeholder — versi asli per bentuk belum tersedia
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
