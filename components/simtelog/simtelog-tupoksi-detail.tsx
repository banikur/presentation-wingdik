'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileText, ImageIcon, Loader2, ZoomIn } from 'lucide-react';
import { ImageLightbox } from '@/components/pengadaan/shared/image-lightbox';
import { IMAGE_EXTENSIONS } from '@/lib/pengadaan/phase-assets';
import {
  formatDocDisplayName,
  simtelogDocSrc,
  simtelogImageSrc,
  type SimtelogNode,
} from '@/lib/simtelog/simtelog-assets';
import {
  filterSimtelogImagesForTupoksi,
  simtelogRoleImageFolder,
} from '@/lib/simtelog/simtelog-data';
import type { SimtelogRole } from '@/lib/simtelog/simtelog-types';
import { SimtelogDocsTable } from './simtelog-docs-table';
import { useSimtelogFiles } from './use-simtelog-files';

type SimtelogTupoksiDetailProps = {
  role: SimtelogRole;
  activeTupoksiIndex: number;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
};

function assetNode(role: SimtelogRole, tupoksiIndex: number): SimtelogNode {
  const t = role.tupoksi[tupoksiIndex];
  const folder = simtelogRoleImageFolder(role.id);
  return {
    id: `${role.id}-${tupoksiIndex}`,
    label: t.title,
    instansi: role.fullname,
    outputDoc: '',
    description: t.desc,
    imgFolder: folder,
    flowSummary: t.desc,
  };
}

function ImageSlidePreview({
  node,
  tupoksiTitle,
  imageIndex,
  onImageIndexChange,
}: {
  node: SimtelogNode;
  tupoksiTitle: string;
  imageIndex: number;
  onImageIndexChange: (index: number) => void;
}) {
  const { files: allImgs, loading, fetchError } = useSimtelogFiles('images', node);
  const imgs = useMemo(
    () => filterSimtelogImagesForTupoksi(allImgs, tupoksiTitle),
    [allImgs, tupoksiTitle],
  );
  const total = imgs.length;
  const hasImages = total > 0;
  const currentFile = hasImages ? imgs[imageIndex] : undefined;
  const src = currentFile ? simtelogImageSrc(node.imgFolder, currentFile) : null;
  const [loadFailed, setLoadFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [node.imgFolder, imageIndex, src]);

  useEffect(() => {
    setLightboxOpen(false);
  }, [node.imgFolder]);

  useEffect(() => {
    if (total > 0 && imageIndex >= total) onImageIndexChange(0);
  }, [total, imageIndex, onImageIndexChange, tupoksiTitle]);

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
            <p className="text-xs font-medium text-white/50">Pratinjau tangkapan layar</p>
            <p className="mt-2 text-[11px] text-white/45">
              {fetchError
                ? 'Gagal memuat daftar file.'
                : 'Belum ada gambar untuk tupoksi ini.'}
            </p>
            <p className="mt-2 font-mono text-[10px] text-[#D4AF37]/80">
              public/img/simtelog/{node.imgFolder}/
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

function DocPreviewPane({ node, activeDocFile }: { node: SimtelogNode; activeDocFile: string | null }) {
  if (!activeDocFile) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0F172A]/80 p-6 text-center text-xs text-white/45">
        Pilih dokumen di galeri untuk pratinjau
      </div>
    );
  }

  const dot = activeDocFile.lastIndexOf('.');
  const ext = dot >= 0 ? activeDocFile.slice(dot).toLowerCase() : '';
  const isImage = IMAGE_EXTENSIONS.has(ext);

  if (isImage) {
    return (
      <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-white/10 bg-[#0F172A]">
        <img
          src={simtelogImageSrc(node.imgFolder, activeDocFile)}
          alt={activeDocFile}
          className="absolute inset-0 h-full w-full object-contain p-2"
        />
      </div>
    );
  }

  if (ext === '.pdf') {
    return (
      <div className="min-h-[280px] overflow-hidden rounded-lg border border-white/10 bg-white">
        <iframe
          title={activeDocFile}
          src={simtelogDocSrc(node.imgFolder, activeDocFile)}
          className="h-[min(400px,55vh)] w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#0F172A]/80 p-6 text-center">
      <FileText className="h-10 w-10 text-[#D4AF37]/60" />
      <p className="text-sm text-white/70">{formatDocDisplayName(activeDocFile)}</p>
      <a
        href={simtelogDocSrc(node.imgFolder, activeDocFile)}
        download={activeDocFile}
        className="rounded-md border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/20"
      >
        Download file
      </a>
    </div>
  );
}

export function SimtelogTupoksiDetail({
  role,
  activeTupoksiIndex,
  imageIndex,
  onImageIndexChange,
}: SimtelogTupoksiDetailProps) {
  const tupoksi = role.tupoksi[activeTupoksiIndex];
  const node = useMemo(
    () => assetNode(role, activeTupoksiIndex),
    [role, activeTupoksiIndex],
  );
  const { files: docFiles, loading: docsLoading } = useSimtelogFiles('docs', node);
  const [activeDocFile, setActiveDocFile] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'slides' | 'doc'>('slides');

  useEffect(() => {
    setActiveDocFile(null);
    setPreviewMode('slides');
    onImageIndexChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset slide saat ganti tupoksi
  }, [role.id, activeTupoksiIndex]);

  useEffect(() => {
    if (docFiles.length > 0 && activeDocFile === null && !docsLoading) {
      setActiveDocFile(docFiles[0]);
    }
  }, [docFiles, activeDocFile, docsLoading]);

  const demo = role.demo;

  return (
    <div
      className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[35%_65%] lg:gap-5"
      role="region"
      aria-label={`Demo ${tupoksi.title}`}
    >
      <aside className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Tupoksi</p>
        <h3 className="mt-1 text-xl font-bold text-[#F8FAFC]">{tupoksi.title}</h3>
        <p className="mt-0.5 text-xs text-white/50">{role.name} · {role.fullname}</p>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Deskripsi
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{tupoksi.desc}</p>
        </div>

        <div className="mt-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
            Contoh task — {demo.title}
          </p>
          <p className="mt-1 text-xs text-white/55">{demo.subtitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{demo.context}</p>
        </div>

        <div className="mt-5 max-h-[10rem] space-y-2 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Langkah-langkah
          </p>
          {demo.steps.map((s, i) => (
            <div key={s.title} className="flex gap-2 text-xs text-white/75">
              <span className="font-bold text-[#D4AF37]">{i + 1}.</span>
              <span>
                <strong className="text-white/90">{s.title}</strong> — {s.desc}
              </span>
            </div>
          ))}
        </div>

        {docFiles.length > 0 && (
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#1E293B]">
            <p className="border-b border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/50">
              Galeri dokumen
            </p>
            <div className="max-h-[11rem] overflow-y-auto">
              {docFiles.map((filename) => {
                const active = activeDocFile === filename;
                return (
                  <button
                    key={filename}
                    type="button"
                    onClick={() => {
                      setActiveDocFile(filename);
                      setPreviewMode('doc');
                    }}
                    className={`block w-full border-b border-white/5 px-3 py-2.5 text-left text-xs font-medium transition-colors last:border-0 ${
                      active && previewMode === 'doc'
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {formatDocDisplayName(filename)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <SimtelogDocsTable node={node} />

        {role.warning && (
          <div className="mt-4 rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-2.5 text-xs text-white/80">
            <span className="font-semibold text-[#D4AF37]">{role.warning.label}: </span>
            {role.warning.text}
          </div>
        )}
      </aside>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
        <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label="Mode pratinjau">
          <button
            type="button"
            role="tab"
            aria-selected={previewMode === 'slides'}
            onClick={() => setPreviewMode('slides')}
            className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
              previewMode === 'slides'
                ? 'border-[#D4AF37]/80 bg-[#D4AF37]/15 text-[#F8FAFC]'
                : 'border-white/10 text-white/60 hover:border-white/20'
            }`}
          >
            Slide gambar
          </button>
          {docFiles.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={previewMode === 'doc'}
              onClick={() => setPreviewMode('doc')}
              className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                previewMode === 'doc'
                  ? 'border-[#D4AF37]/80 bg-[#D4AF37]/15 text-[#F8FAFC]'
                  : 'border-white/10 text-white/60 hover:border-white/20'
              }`}
            >
              Pratinjau dokumen
            </button>
          )}
        </div>

        {previewMode === 'slides' ? (
          <>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Tangkapan layar — {tupoksi.title}
            </p>
            <ImageSlidePreview
              node={node}
              tupoksiTitle={tupoksi.title}
              imageIndex={imageIndex}
              onImageIndexChange={onImageIndexChange}
            />
          </>
        ) : (
          <>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              {activeDocFile ? formatDocDisplayName(activeDocFile) : 'Dokumen'}
            </p>
            <DocPreviewPane node={node} activeDocFile={activeDocFile} />
          </>
        )}

        <div className="mt-5 border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
            Poin kunci
          </p>
          <ul className="mt-2 space-y-1.5">
            {demo.takeaways.map((t) => (
              <li key={t} className="flex gap-2 text-xs text-white/75">
                <span className="text-[#D4AF37]">→</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
