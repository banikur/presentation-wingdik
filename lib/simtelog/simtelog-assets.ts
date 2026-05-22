import type { LucideIcon } from 'lucide-react';
import type { AppId } from '@/lib/pengadaan/app-logos';
import { formatDocDisplayName } from '@/lib/pengadaan/phase-assets';

export type SimtelogNode = {
  id: string;
  label: string;
  instansi: string;
  outputDoc: string;
  description: string;
  imgFolder: string;
  flowSummary: string;
  Icon?: LucideIcon;
  apps?: AppId[];
  imgs?: string[];
  docs?: string[];
};

export { formatDocDisplayName };

function encodeFilename(filename: string): string {
  return filename.split('/').map((part) => encodeURIComponent(part)).join('/');
}

export function simtelogImageSrc(folder: string, filename: string): string {
  return `/img/simtelog/${folder}/${encodeFilename(filename)}`;
}

export function simtelogDocSrc(folder: string, filename: string): string {
  return `/docs/simtelog/${folder}/${encodeFilename(filename)}`;
}

export function getSimtelogNodeById(
  nodes: SimtelogNode[],
  id: string,
): SimtelogNode | undefined {
  return nodes.find((n) => n.id === id);
}
