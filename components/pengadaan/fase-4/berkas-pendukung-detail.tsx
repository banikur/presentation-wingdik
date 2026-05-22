'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { FileSpreadsheet, ImageIcon, Loader2, ZoomIn } from 'lucide-react';
import { ImageLightbox } from '../shared/image-lightbox';
import {
  phaseImageSrc,
  type PhaseNode,
} from '@/lib/pengadaan/phase-assets';
import {
  BERKAS_DEFAULT_TIER_ID,
  BERKAS_PAKET_TIERS,
  checklistDownloadUrl,
  getPaketTier,
  type PaketTierId,
} from '@/lib/pengadaan/fase-4-berkas-tiers';
import { PhaseDocsTable } from '../shared/phase-docs-table';
import { usePhaseFiles } from '../shared/use-phase-files';
import type { Fase4Node } from './fase-4-nodes';

type BerkasPendukungDetailProps = {
  node: Fase4Node;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
};

function tierNode(base: Fase4Node, docFolder: string): PhaseNode {
  return { ...base, imgFolder: docFolder };
}

function ImagePreview({
  node,
  tierFolder,
  imageIndex,
  onImageIndexChange,
}: {
  node: Fase4Node;
  tierFolder: string;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
}) {
  const tierNodeData = useMemo(() => tierNode(node, tierFolder), [node, tierFolder]);
  const { files: imgs, loading, fetchError } = usePhaseFiles(4, 'images', tierNodeData);
  const total = imgs.length;
  const hasImages = total > 0;
  const currentFile = hasImages ? imgs[imageIndex] : undefined;
  const src = currentFile ? phaseImageSrc(4, tierFolder, currentFile) : null;
  const [loadFailed, setLoadFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [tierFolder, imageIndex, src]);

  useEffect(() => {
    setLightboxOpen(false);
  }, [tierFolder, node.id]);

  useEffect(() => {
    if (total > 0 && imageIndex >= total) onImageIndexChange(0);
  }, [total, imageIndex, onImageIndexChange]);

  const showPlaceholder = loading || !hasImages || !currentFile || loadFailed;

  return (
    <div className="flex min-h-[300px] flex-col">
      <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-lg border border-white/10 bg-[#0F172A]">
        {loading ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-white/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]/60" />
            <p className="text-xs">Memuat daftar gambar…</p>
          </div>
        ) : showPlaceholder ? (
          <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0F172A]/80 px-4 py-8 text-center">
            <ImageIcon className="mb-3 h-10 w-10 text-white/25" strokeWidth={1.25} />
            <p className="text-xs font-medium text-white/50">Pratinjau gambar</p>
            <p className="mt-2 text-[11px] text-white/45">
              {fetchError
                ? 'Gagal memuat daftar file.'
                : 'Belum ada tangkapan layar untuk kategori ini.'}
            </p>
            <p className="mt-2 font-mono text-[10px] text-[#D4AF37]/80">
              public/img/fase4/{tierFolder}/
            </p>
          </div>
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
              alt={`${node.label} — ${currentFile}`}
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
        alt={`${node.label} — ${currentFile ?? ''}`}
        counter={hasImages ? `${imageIndex + 1} / ${total}` : undefined}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => onImageIndexChange(Math.max(0, imageIndex - 1))}
        onNext={() => onImageIndexChange(Math.min(total - 1, imageIndex + 1))}
        hasPrev={!loading && hasImages && imageIndex > 0}
        hasNext={!loading && hasImages && imageIndex < total - 1}
      />

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onImageIndexChange(Math.max(0, imageIndex - 1))}
          disabled={loading || !hasImages || imageIndex <= 0}
          aria-label="Gambar sebelumnya"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-lg text-white/90 hover:bg-white/10 disabled:opacity-40"
        >
          ‹
        </button>
        <span className="min-w-[3rem] text-center text-xs tabular-nums text-white/60">
          {loading ? '…' : hasImages ? `${imageIndex + 1} / ${total}` : '0 / 0'}
        </span>
        <button
          type="button"
          onClick={() => onImageIndexChange(Math.min(total - 1, imageIndex + 1))}
          disabled={loading || !hasImages || imageIndex >= total - 1}
          aria-label="Gambar berikutnya"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-lg text-white/90 hover:bg-white/10 disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function BerkasPendukungDetail({
  node,
  imageIndex,
  onImageIndexChange,
}: BerkasPendukungDetailProps) {
  const [tierId, setTierId] = useState<PaketTierId>(BERKAS_DEFAULT_TIER_ID);
  const tier = getPaketTier(tierId);
  const docsNode = useMemo(() => tierNode(node, tier.docFolder), [node, tier.docFolder]);

  const handleTierChange = (id: PaketTierId) => {
    setTierId(id);
    onImageIndexChange(0);
  };

  return (
    <div
      className="grid grid-cols-1 gap-4 lg:grid-cols-[35%_65%] lg:gap-5"
      role="region"
      aria-label="Detail Berkas Pendukung"
    >
      <aside className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Tahapan</p>
        <h3 className="mt-1 text-xl font-bold text-[#F8FAFC]">{node.label}</h3>
        <p className="mt-0.5 text-xs text-white/50">{node.instansi}</p>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Proses singkat
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{node.description}</p>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Nilai paket pengadaan
          </p>
          <div
            className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
            role="tablist"
            aria-label="Kategori nilai paket"
          >
            {BERKAS_PAKET_TIERS.map((t) => {
              const active = t.id === tierId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTierChange(t.id)}
                  className={`flex flex-1 flex-col rounded-lg border px-3 py-2.5 text-left transition-all sm:min-w-[7rem] ${
                    active
                      ? 'border-[#D4AF37]/80 bg-[#D4AF37]/15 text-[#F8FAFC]'
                      : 'border-white/10 bg-[#0F172A]/40 text-white/70 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-bold">{t.shortLabel}</span>
                  <span className={`mt-0.5 text-[10px] ${active ? 'text-white/70' : 'text-white/45'}`}>
                    {t.rangeLabel}
                  </span>
                  <span
                    className={`mt-1 text-[10px] font-semibold ${active ? 'text-[#D4AF37]' : 'text-white/40'}`}
                  >
                    {t.checklist.length} dokumen
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Checklist — {tier.categoryTitle}
            </p>
            <a
              href={checklistDownloadUrl(tierId)}
              download={tier.excelFilename}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Download Excel
            </a>
          </div>
          <div className="max-h-[14rem] overflow-y-auto rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-[#1E293B]">
                <tr className="border-b border-white/10">
                  <th className="w-8 px-2 py-2 text-center text-[10px] font-semibold uppercase text-white/45">
                    No
                  </th>
                  <th className="px-2 py-2 text-[10px] font-semibold uppercase text-white/45">
                    Dokumen
                  </th>
                </tr>
              </thead>
              <tbody>
                {tier.checklist.map((item, idx) => {
                  const prev = tier.checklist[idx - 1];
                  const showGroup =
                    item.processGroup && item.processGroup !== prev?.processGroup;
                  return (
                    <Fragment key={item.no}>
                      {showGroup && (
                        <tr className="border-b border-[#D4AF37]/20 bg-[#D4AF37]/[0.06]">
                          <td
                            colSpan={2}
                            className="px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-[#D4AF37]/90"
                          >
                            {item.processGroup}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.04]">
                        <td className="px-2 py-2 text-center text-xs tabular-nums text-white/40">
                          {item.no}
                        </td>
                        <td className="px-2 py-2 text-xs leading-snug text-white/85">
                          {item.name}
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-white/40">
            File template Excel dihasilkan otomatis dari konfigurasi resmi ({tier.checklist.length}{' '}
            dokumen).
          </p>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            File dokumen (lampiran / contoh)
          </p>
          <PhaseDocsTable phase={4} node={docsNode} showTitle={false} />
        </div>
      </aside>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Pratinjau gambar — {tier.shortLabel}
        </p>
        <p className="mb-3 text-[11px] text-white/45">{tier.rangeLabel}</p>
        <ImagePreview
          node={node}
          tierFolder={tier.docFolder}
          imageIndex={imageIndex}
          onImageIndexChange={onImageIndexChange}
        />
      </div>
    </div>
  );
}
