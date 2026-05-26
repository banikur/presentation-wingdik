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
import { SimtelogDisclosure } from './simtelog-ui';
import { SimtelogDocsTable } from './simtelog-docs-table';
import { useSimtelogFiles } from './use-simtelog-files';

const PREVIEW_MAX_H = 'min(42vh, 380px)';
const DOC_PREVIEW_MAX_H = 'min(38vh, 340px)';

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
    <div className="flex flex-col">
      <div
        className="relative overflow-hidden rounded-lg border border-app-border bg-slate-100"
        style={{ height: PREVIEW_MAX_H }}
      >
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-app-text-muted">
            <Loader2 className="h-8 w-8 animate-spin text-app-accent" />
            <p className="text-sm">Memuat daftar gambar…</p>
          </div>
        ) : showPlaceholder ? (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-card-muted px-4 py-6 text-center">
            <ImageIcon className="mb-2 h-9 w-9 text-app-border" strokeWidth={1.25} />
            <p className="text-sm font-medium text-app-text-muted">Pratinjau tangkapan layar</p>
            {roleHasNoImages ? (
              <>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-app-accent/40 bg-amber-50 px-3 py-1 text-sm font-semibold text-app-accent">
                  Belum ada tangkapan layar
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-app-text-muted">
                  Folder:{' '}
                  <span className="font-mono text-app-link">
                    public/img/simtelog/{node.imgFolder}/
                  </span>
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-app-text-muted">
                {fetchError ? 'Gagal memuat daftar file.' : 'Belum ada gambar untuk tupoksi ini.'}
              </p>
            )}
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
              Perbesar
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

      {caption && hasImages && !showPlaceholder ? (
        <p className="mt-2 line-clamp-2 rounded-r border-l-4 border-app-accent bg-amber-50/80 px-2 py-1.5 text-sm leading-snug text-app-text">
          {caption}
        </p>
      ) : null}

      <div className="mt-2 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onImageIndexChange(Math.max(0, imageIndex - 1))}
          disabled={loading || !hasImages || imageIndex <= 0}
          aria-label="Gambar sebelumnya"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-app-border bg-white text-lg text-app-text hover:bg-app-card-muted disabled:opacity-40"
        >
          ‹
        </button>
        <span className="min-w-[3rem] text-center text-sm tabular-nums text-app-text-muted">
          {loading ? '…' : hasImages ? `${imageIndex + 1} / ${total}` : '0 / 0'}
        </span>
        <button
          type="button"
          onClick={() => onImageIndexChange(Math.min(total - 1, imageIndex + 1))}
          disabled={loading || !hasImages || imageIndex >= total - 1}
          aria-label="Gambar berikutnya"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-app-border bg-white text-lg text-app-text hover:bg-app-card-muted disabled:opacity-40"
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
      <div
        className="flex items-center justify-center rounded-lg border border-dashed border-app-border bg-app-card-muted p-4 text-center text-sm text-app-text-muted"
        style={{ height: DOC_PREVIEW_MAX_H }}
      >
        Pilih baris dokumen di panel kiri, lalu buka tab Pratinjau dokumen.
      </div>
    );
  }

  const dot = activeDocFile.lastIndexOf('.');
  const ext = dot >= 0 ? activeDocFile.slice(dot).toLowerCase() : '';
  const isImage = IMAGE_EXTENSIONS.has(ext);

  if (isImage) {
    return (
      <div
        className="relative overflow-hidden rounded-lg border border-app-border bg-slate-100"
        style={{ height: DOC_PREVIEW_MAX_H }}
      >
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
      <div
        className="overflow-hidden rounded-lg border border-app-border bg-white"
        style={{ height: DOC_PREVIEW_MAX_H }}
      >
        <iframe
          title={activeDocFile}
          src={simtelogDocSrc(node.imgFolder, activeDocFile)}
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-app-border bg-app-card-muted p-4 text-center"
      style={{ height: DOC_PREVIEW_MAX_H }}
    >
      <FileText className="h-9 w-9 text-app-accent" />
      <p className="text-sm font-medium text-app-text">{formatDocDisplayName(activeDocFile)}</p>
      <a
        href={simtelogDocSrc(node.imgFolder, activeDocFile)}
        download={activeDocFile}
        className="rounded-md border border-app-accent bg-amber-50 px-3 py-1.5 text-sm font-semibold text-app-accent hover:bg-amber-100"
      >
        Download file
      </a>
    </div>
  );
}

function StepsList({ steps }: { steps: { title: string; desc: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? steps : steps.slice(0, 2);
  const hiddenCount = steps.length - 2;

  return (
    <div className="space-y-2">
      {visible.map((s, i) => (
        <div key={s.title} className="flex gap-2 text-sm text-app-text">
          <span className="font-bold text-app-accent">{i + 1}.</span>
          <span>
            <strong>{s.title}</strong> — {s.desc}
          </span>
        </div>
      ))}
      {hiddenCount > 0 && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-sm font-semibold text-app-link hover:underline"
        >
          Lihat {hiddenCount} langkah lainnya
        </button>
      ) : null}
      {expanded && steps.length > 2 ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-sm font-semibold text-app-text-muted hover:underline"
        >
          Ringkas langkah
        </button>
      ) : null}
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

  const handleSelectDoc = (filename: string) => {
    setActiveDocFile(filename);
    setPreviewMode('doc');
  };

  return (
    <div
      className="mt-4 flex min-h-[min(70vh,820px)] w-full flex-col"
      role="region"
      aria-label={`Demo ${tupoksi.title}`}
    >
      <div className="grid min-h-0 w-full flex-1 grid-cols-1 lg:grid-cols-[minmax(280px,34%)_1fr] lg:divide-x lg:divide-app-border">
        <aside className="flex min-h-0 flex-col overflow-hidden py-1 pr-0 lg:py-2 lg:pr-5">
          <div className="shrink-0">
            <p className="text-sm font-bold text-app-accent">Tupoksi aktif</p>
            <h3 className="text-base font-bold leading-tight text-app-text">{tupoksi.title}</h3>
          </div>

          <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            <div className="rounded-lg border border-app-border-subtle bg-app-card-muted px-3 py-2">
              <p className="text-sm leading-snug text-app-text">{tupoksi.desc}</p>
              <p className="mt-2 text-sm leading-snug text-app-text-muted">
                <span className="font-semibold text-app-accent">{demo.title}:</span>{' '}
                {demo.context}
              </p>
            </div>

            <SimtelogDisclosure
              label="Langkah-langkah"
              badge={`${demo.steps.length} langkah`}
              defaultOpen
            >
              <StepsList steps={demo.steps} />
            </SimtelogDisclosure>

            <SimtelogDisclosure label="Poin kunci" badge={`${demo.takeaways.length} poin`}>
              <ul className="space-y-1.5">
                {demo.takeaways.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-app-text">
                    <span className="text-app-accent">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </SimtelogDisclosure>

            <SimtelogDocsTable
              node={node}
              compact
              activeFilename={activeDocFile}
              onSelectFilename={handleSelectDoc}
            />

            {role.warning ? (
              <div className="rounded-lg border border-app-accent/40 bg-amber-50 px-3 py-2 text-sm text-app-text">
                <span className="font-semibold text-app-accent">{role.warning.label}: </span>
                {role.warning.text}
              </div>
            ) : null}
          </div>
        </aside>

        <div className="flex min-h-[280px] flex-col overflow-hidden py-1 lg:min-h-0 lg:py-2 lg:pl-5">
          <div className="mb-2 flex shrink-0 flex-wrap gap-2" role="tablist" aria-label="Mode pratinjau">
            <button
              type="button"
              role="tab"
              aria-selected={previewMode === 'slides'}
              onClick={() => setPreviewMode('slides')}
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                previewMode === 'slides' ? tabActive : tabIdle
              }`}
            >
              Tangkapan layar
            </button>
            {docFiles.length > 0 && (
              <button
                type="button"
                role="tab"
                aria-selected={previewMode === 'doc'}
                onClick={() => setPreviewMode('doc')}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  previewMode === 'doc' ? tabActive : tabIdle
                }`}
              >
                Pratinjau dokumen
              </button>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {previewMode === 'slides' ? (
              <ImageSlidePreview
                role={role}
                node={node}
                tupoksiTitle={tupoksi.title}
                imageIndex={imageIndex}
                onImageIndexChange={onImageIndexChange}
              />
            ) : (
              <DocPreviewPane node={node} activeDocFile={activeDocFile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
