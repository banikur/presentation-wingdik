'use client';

import { useEffect, useState } from 'react';
import { ImageIcon, Loader2, ZoomIn } from 'lucide-react';
import { ImageLightbox } from './image-lightbox';
import {
  phaseImageSrc,
  type PhaseNode,
} from '@/lib/pengadaan/phase-assets';
import type { PhaseNumber } from '@/lib/pengadaan/phase-registry';
import { usePhaseFiles } from './use-phase-files';
import { AppLogoStrip } from './app-logo';
import { PhaseDocsTable } from './phase-docs-table';

type PhaseDetailPanelProps = {
  phase: PhaseNumber;
  node: PhaseNode;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
};

function ImagePlaceholder({
  phase,
  folder,
  filename,
  hint,
}: {
  phase: PhaseNumber;
  folder: string;
  filename?: string;
  hint?: string;
}) {
  const label = filename ?? (hint ?? 'Letakkan file (.png, .jpg, …) di folder:');

  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0F172A]/80 px-4 py-8 text-center">
      <ImageIcon className="mb-3 h-10 w-10 text-white/25" strokeWidth={1.25} />
      <p className="text-xs font-medium text-white/50">Pratinjau gambar</p>
      <p className="mt-2 max-w-full break-all font-mono text-[11px] text-white/40">{label}</p>
      {!filename && (
        <p className="mt-2 font-mono text-[10px] text-[#D4AF37]/80">
          public/img/fase{phase}/{folder}/
        </p>
      )}
    </div>
  );
}

function ImagePreview({
  phase,
  node,
  imageIndex,
  onImageIndexChange,
}: PhaseDetailPanelProps) {
  const { files: imgs, loading, fetchError } = usePhaseFiles(phase, 'images', node);
  const total = imgs.length;
  const hasImages = total > 0;
  const currentFile = hasImages ? imgs[imageIndex] : undefined;
  const src = currentFile ? phaseImageSrc(phase, node.imgFolder, currentFile) : null;

  const [loadFailed, setLoadFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [node.id, imageIndex, src]);

  useEffect(() => {
    setLightboxOpen(false);
  }, [node.id]);

  useEffect(() => {
    if (total > 0 && imageIndex >= total) {
      onImageIndexChange(0);
    }
  }, [total, imageIndex, onImageIndexChange]);

  const showPlaceholder = loading || !hasImages || !currentFile || loadFailed;

  const goPrev = () => onImageIndexChange(Math.max(0, imageIndex - 1));
  const goNext = () => onImageIndexChange(Math.min(total - 1, imageIndex + 1));

  return (
    <div className="flex min-h-[300px] flex-col">
      <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-lg border border-white/10 bg-[#0F172A]">
        {loading ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-white/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]/60" />
            <p className="text-xs">Memuat daftar gambar…</p>
          </div>
        ) : showPlaceholder ? (
          <ImagePlaceholder
            phase={phase}
            folder={node.imgFolder}
            filename={loadFailed && currentFile ? currentFile : undefined}
            hint={
              fetchError
                ? 'Gagal memuat daftar file. Muat ulang halaman.'
                : !hasImages
                  ? 'Belum ada file gambar di folder ini.'
                  : undefined
            }
          />
        ) : (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group absolute inset-0 flex h-full w-full cursor-zoom-in items-center justify-center p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60"
            aria-label="Perbesar gambar"
          >
            <img
              key={src!}
              src={src!}
              alt={`${node.label} - ${currentFile}`}
              className="max-h-full max-w-full object-contain object-center"
              onError={() => setLoadFailed(true)}
            />
            <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" />
              Klik untuk perbesar
            </span>
          </button>
        )}
      </div>

      <ImageLightbox
        open={lightboxOpen && !!src}
        src={src}
        alt={`${node.label} - ${currentFile ?? ''}`}
        counter={hasImages ? `${imageIndex + 1} / ${total}` : undefined}
        onClose={() => setLightboxOpen(false)}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={!loading && hasImages && imageIndex > 0}
        hasNext={!loading && hasImages && imageIndex < total - 1}
      />

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={loading || !hasImages || imageIndex <= 0}
          aria-label="Gambar sebelumnya"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-lg leading-none text-white/90 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>
        <span className="min-w-[3rem] text-center text-xs font-medium tabular-nums text-white/60">
          {loading ? '…' : hasImages ? `${imageIndex + 1} / ${total}` : '0 / 0'}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={loading || !hasImages || imageIndex >= total - 1}
          aria-label="Gambar berikutnya"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-lg leading-none text-white/90 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function PhaseDetailPanel({
  phase,
  node,
  imageIndex,
  onImageIndexChange,
}: PhaseDetailPanelProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 lg:grid-cols-[35%_65%] lg:gap-5"
      role="region"
      aria-label={`Detail ${node.label}`}
    >
      <aside className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5 lg:max-w-none">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Tahapan</p>
        <h3 className="mt-1 text-xl font-bold text-[#F8FAFC]">{node.label}</h3>
        <p className="mt-0.5 text-xs text-white/50">{node.instansi}</p>

        {node.apps?.length ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-[#0F172A]/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Aplikasi terkait
            </p>
            <AppLogoStrip
              apps={node.apps}
              size="md"
              showLabels
              className="mt-2 justify-start gap-3"
            />
          </div>
        ) : null}

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Proses singkat
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{node.description}</p>
        </div>

        <PhaseDocsTable phase={phase} node={node} />
      </aside>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Pratinjau gambar (tangkapan layar)
        </p>
        <p className="mb-3 text-[11px] text-white/45">Klik gambar untuk membuka pop-up perbesar.</p>
        <ImagePreview
          phase={phase}
          node={node}
          imageIndex={imageIndex}
          onImageIndexChange={onImageIndexChange}
        />
      </div>
    </div>
  );
}
