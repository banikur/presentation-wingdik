import type { LucideIcon } from 'lucide-react';
import type { AppId } from './app-logos';
import type { PhaseNumber } from './phase-registry';

export type PhaseNode = {
  id: string;
  label: string;
  instansi: string;
  outputDoc: string;
  description: string;
  imgFolder: string;
  /** Logo aplikasi terkait (SAKTI, SIRUP, dll.) */
  apps?: AppId[];
  imgs?: string[];
  docs?: string[];
};

/** Node untuk kartu alur visual (ikon / logo aplikasi + ringkasan) */
export type VisualFlowNode = PhaseNode & {
  flowSummary: string;
  Icon?: LucideIcon;
  /** Tanpa panah dari tahap sebelumnya (jalur paralel, mis. SIMTELOG setelah SIMAK) */
  flowBreakBefore?: boolean;
};

export const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

export const DOC_EXTENSIONS = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.csv',
  '.zip',
  '.rar',
  '.7z',
]);

function encodeFilename(filename: string): string {
  return filename.split('/').map((part) => encodeURIComponent(part)).join('/');
}

export function phaseImageSrc(phase: PhaseNumber, folder: string, filename: string): string {
  return `/img/fase${phase}/${folder}/${encodeFilename(filename)}`;
}

export function phaseDocSrc(phase: PhaseNumber, folder: string, filename: string): string {
  return `/docs/fase${phase}/${folder}/${encodeFilename(filename)}`;
}

export function formatDocDisplayName(filename: string, maxLength = 70): string {
  if (filename.length <= maxLength) return filename;
  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')) : '';
  const baseMax = maxLength - ext.length - 1;
  if (baseMax < 1) return `${filename.slice(0, maxLength - 1)}…`;
  return `${filename.slice(0, baseMax)}…${ext}`;
}

export function getPhaseNodeById(nodes: PhaseNode[], id: string): PhaseNode | undefined {
  return nodes.find((n) => n.id === id);
}
