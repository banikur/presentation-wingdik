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
  getSimtelogImageCaption,
  isSimtelogRoleWithoutImages,
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
  role,
  node,
  tupoksiTitle,
  imageIndex,
  onImageIndexChange,
}: {
  role: SimtelogRole;
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
  const caption = getSimtelogImageCaption(role, currentFile);
  const roleHasNoImages = isSimtelogRoleWithoutImages(role.id);
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
      <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-lg border border-app-border bg-slate-100">
        {loading ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-app-text-muted">
            <Loader2 className="h-8 w-8 animate-spin text-app-accent" />
            <p className="text-sm">Memuat daftar gambar…</p>
          </div>
        ) : showPlaceholder ? (
          <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-card-muted px-4 py-8 text-center">
            <ImageIcon className="mb-3 h-10 w-10 text-app-border" strokeWidth={1.25} />
            <p className="text-sm font-medium text-app-text-muted">Pratinjau tangkapan layar</p>
            {roleHasNoImages ? (
              <>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-app-accent/40 bg-amber-50 px-3 py-1 text-sm font-semibold text-app-accent">
                  Belum ada tangkapan layar
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-app-text-muted">
                  Peran <strong className="text-app-text">{role.name}</strong> belum memiliki
                  tangkapan layar pada materi pembekalan. Caption tetap akan muncul di sini bila
                  gambar ditambahkan di folder berikut.
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-app-text-muted">
                {fetchError ? 'Gagal memuat daftar file.' : 'Belum ada gambar untuk tupoksi ini.'}
              </p>
            )}
            <p className="mt-2 font-mono text-sm text-app-link">
              public/img/simtelog/{node.imgFolder}/
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group absolute inset-0 flex h-full w-full cursor-zoom-in items-center justify-center bg-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-link"
            aria-label="Perbesar gambar"
          >
            <img
              key={src!}
              src={src!}
              alt={`${node.label} - ${currentFile}`}
              className="max-h-full max-w-full object-contain object-center"
              onError={() => setLoadFailed(true)}
            />
            <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-app-header/85 px-2.5 py-1 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
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
        onPrev={() => onImageIndexChange(Math.max(0, imageIndex - 1))}
        onNext={() => onImageIndexChange(Math.min(total - 1, imageIndex + 1))}
        hasPrev={!loading && hasImages && imageIndex > 0}
        hasNext={!loading && hasImages && imageIndex < total - 1}
        caption={caption}
      />

      {caption && hasImages && !showPlaceholder && (
        <figcaption className="mt-3 rounded-r-md border-l-4 border-app-accent bg-amber-50/80 px-3 py-2 text-sm leading-relaxed text-app-text">
          {caption}
        </figcaption>
      )}

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onImageIndexChange(Math.max(0, imageIndex - 1))}
          disabled={loading || !hasImages || imageIndex <= 0}
          aria-label="Gambar sebelumnya"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-app-border bg-white text-lg text-app-text hover:bg-app-card-muted disabled:opacity-40"
        >
          ‹
        </button>
        <span className="min-w-[3.5rem] text-center text-sm tabular-nums text-app-text-muted">
          {loading ? '…' : hasImages ? `${imageIndex + 1} / ${total}` : '0 / 0'}
        </span>
        <button
          type="button"
          onClick={() => onImageIndexChange(Math.min(total - 1, imageIndex + 1))}
          disabled={loading || !hasImages || imageIndex >= total - 1}
          aria-label="Gambar berikutnya"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-app-border bg-white text-lg text-app-text hover:bg-app-card-muted disabled:opacity-40"
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
      <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-app-border bg-app-card-muted p-6 text-center text-base text-app-text-muted">
        Pilih dokumen di galeri untuk pratinjau
      </div>
    );
  }

  const dot = activeDocFile.lastIndexOf('.');
  const ext = dot >= 0 ? activeDocFile.slice(dot).toLowerCase() : '';
  const isImage = IMAGE_EXTENSIONS.has(ext);

  if (isImage) {
    return (
      <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-app-border bg-slate-100">
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
      <div className="min-h-[280px] overflow-hidden rounded-lg border border-app-border bg-white">
        <iframe
          title={activeDocFile}
          src={simtelogDocSrc(node.imgFolder, activeDocFile)}
          className="h-[min(400px,55vh)] w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-lg border border-app-border bg-app-card-muted p-6 text-center">
      <FileText className="h-10 w-10 text-app-accent" />
      <p className="text-base text-app-text">{formatDocDisplayName(activeDocFile)}</p>
      <a
        href={simtelogDocSrc(node.imgFolder, activeDocFile)}
        download={activeDocFile}
        className="rounded-md border border-app-accent bg-amber-50 px-4 py-2 text-sm font-semibold text-app-accent hover:bg-amber-100"
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
  const tabActive =
    'border-app-accent bg-amber-50 text-app-text font-semibold';
  const tabIdle =
    'border-app-border text-app-text-muted hover:border-app-border hover:bg-app-card-muted';

  return (
    <div
      className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[35%_65%] lg:gap-5"
      role="region"
      aria-label={`Demo ${tupoksi.title}`}
    >
      <aside className="app-card rounded-xl p-4 md:p-5">
        <p className="text-sm font-bold text-app-accent">Tupoksi</p>
        <h3 className="mt-1 text-xl font-bold text-app-text md:text-2xl">{tupoksi.title}</h3>
        <p className="mt-0.5 text-sm text-app-text-muted">
          {role.name} · {role.fullname}
        </p>

        <div className="mt-4">
          <p className="text-sm font-semibold text-app-text-muted">Deskripsi</p>
          <p className="mt-1 text-base leading-relaxed text-app-text">{tupoksi.desc}</p>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-app-accent">Contoh task — {demo.title}</p>
          <p className="mt-1 text-sm text-app-text-muted">{demo.subtitle}</p>
          <p className="mt-2 text-base leading-relaxed text-app-text">{demo.context}</p>
        </div>

        <div className="mt-5 max-h-[12rem] space-y-2 overflow-y-auto">
          <p className="text-sm font-semibold text-app-text-muted">Langkah-langkah</p>
          {demo.steps.map((s, i) => (
            <div key={s.title} className="flex gap-2 text-sm text-app-text">
              <span className="font-bold text-app-accent">{i + 1}.</span>
              <span>
                <strong>{s.title}</strong> — {s.desc}
              </span>
            </div>
          ))}
        </div>

        {docFiles.length > 0 && (
          <div className="mt-5 overflow-hidden rounded-xl border border-app-border bg-app-card-muted">
            <p className="border-b border-app-border bg-white px-3 py-2.5 text-sm font-bold text-app-text-muted">
              Galeri dokumen
            </p>
            <div className="max-h-[12rem] overflow-y-auto">
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
                    className={`block w-full border-b border-app-border-subtle px-3 py-3 text-left text-sm font-medium transition-colors last:border-0 ${
                      active && previewMode === 'doc'
                        ? 'bg-amber-50 text-app-accent'
                        : 'text-app-text hover:bg-white'
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
          <div className="mt-4 rounded-lg border border-app-accent/40 bg-amber-50 px-3 py-3 text-sm text-app-text">
            <span className="font-semibold text-app-accent">{role.warning.label}: </span>
            {role.warning.text}
          </div>
        )}
      </aside>

      <div className="app-card rounded-xl p-4 md:p-5">
        <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label="Mode pratinjau">
          <button
            type="button"
            role="tab"
            aria-selected={previewMode === 'slides'}
            onClick={() => setPreviewMode('slides')}
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
              previewMode === 'slides' ? tabActive : tabIdle
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
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                previewMode === 'doc' ? tabActive : tabIdle
              }`}
            >
              Pratinjau dokumen
            </button>
          )}
        </div>

        {previewMode === 'slides' ? (
          <>
            <p className="mb-3 text-sm font-semibold text-app-text-muted">
              Tangkapan layar — {tupoksi.title}
            </p>
            <ImageSlidePreview
              role={role}
              node={node}
              tupoksiTitle={tupoksi.title}
              imageIndex={imageIndex}
              onImageIndexChange={onImageIndexChange}
            />
          </>
        ) : (
          <>
            <p className="mb-3 text-sm font-semibold text-app-text-muted">
              {activeDocFile ? formatDocDisplayName(activeDocFile) : 'Dokumen'}
            </p>
            <DocPreviewPane node={node} activeDocFile={activeDocFile} />
          </>
        )}

        <div className="mt-5 rounded-lg border border-app-border bg-app-card-muted p-4">
          <p className="text-sm font-semibold text-app-accent">Poin kunci</p>
          <ul className="mt-2 space-y-2">
            {demo.takeaways.map((t) => (
              <li key={t} className="flex gap-2 text-sm text-app-text">
                <span className="text-app-accent">→</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
