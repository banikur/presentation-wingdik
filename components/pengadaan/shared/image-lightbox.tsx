'use client';

import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type ImageLightboxProps = {
  open: boolean;
  src: string | null;
  alt: string;
  onClose: () => void;
  counter?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  /** Caption opsional yang muncul di bawah gambar (paragraf penjelasan). */
  caption?: string;
};

export function ImageLightbox({
  open,
  src,
  alt,
  onClose,
  counter,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  caption,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau gambar diperbesar"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white/15"
        aria-label="Tutup"
      >
        <X className="h-5 w-5" />
      </button>

      {hasPrev && onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/15 sm:left-4"
          aria-label="Gambar sebelumnya"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/15 sm:right-4"
          aria-label="Gambar berikutnya"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        className="flex max-h-[92vh] max-w-[min(96vw,1200px)] flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] w-auto max-w-full object-contain shadow-2xl"
        />
        {(counter || alt) && (
          <p className="max-w-full truncate px-2 text-center text-xs text-white/70">
            {counter ? `${counter} · ` : ''}
            {alt}
          </p>
        )}
        {caption && (
          <p className="max-w-[min(96vw,900px)] px-3 text-center text-sm leading-relaxed text-white/85">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
