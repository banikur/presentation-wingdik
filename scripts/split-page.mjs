import fs from 'fs';
import path from 'path';

const src = fs.readFileSync('app/page.tsx', 'utf8').split(/\r?\n/);

function slice(start, end) {
  return src.slice(start - 1, end).join('\n');
}

function write(rel, content) {
  const full = path.join(process.cwd(), rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log('wrote', rel);
}

function toExport(body, names) {
  let b = body;
  for (const n of names) {
    b = b.replace(new RegExp(`^const ${n} =`, 'm'), `export const ${n} =`);
    b = b.replace(new RegExp(`^function ${n}`, 'm'), `export function ${n}`);
  }
  return b;
}

write(
  'components/pengadaan/shared/flow-ui.tsx',
  `'use client';\n\nimport React from 'react';\nimport { FileText, LayoutDashboard } from 'lucide-react';\n\n${toExport(slice(77, 115), ['DocBadge', 'AppBadge', 'FlowBox', 'ArrowH', 'ArrowV'])}\n`
);

write(
  'components/pengadaan/portal/portal-flow-arrow.tsx',
  `'use client';\n\nimport { ArrowRight } from 'lucide-react';\n\n${toExport(slice(118, 125), ['PortalFlowArrow'])}\n`
);

write(
  'components/pengadaan/portal/portal-phases.ts',
  slice(127, 133).replace('const PORTAL_PHASES', 'export const PORTAL_PHASES') + '\n'
);

write(
  'components/pengadaan/fase-1/document-gallery-fase1.tsx',
  `'use client';\n\n${toExport(slice(135, 453), ['DocumentGalleryFase1Mock'])}\n`
);

write(
  'components/pengadaan/fase-2/document-gallery-fase2.tsx',
  `'use client';\n\nimport React, { useState } from 'react';\nimport { LayoutDashboard, Building, Briefcase } from 'lucide-react';\n\n${toExport(slice(455, 731), ['DocumentGalleryFase2Mock'])}\n`
);

write(
  'components/pengadaan/fase-3/up-document-mock.tsx',
  `'use client';\n\n${toExport(slice(733, 797), ['UpDocumentMock'])}\n`
);

let fase4 = slice(799, 934);
fase4 = fase4.replace('DocumentGalleryMock', 'DocumentGalleryFase4Mock');
write(
  'components/pengadaan/fase-4/document-gallery-fase4.tsx',
  `'use client';\n\nimport { useState } from 'react';\n\n${toExport(fase4, ['DocumentGalleryFase4Mock'])}\n`
);

write(
  'components/pengadaan/fase-5/document-gallery-fase5.tsx',
  `'use client';\n\nimport { useState } from 'react';\n\n${toExport(slice(1176, 1274), ['DocumentGalleryFase5Mock'])}\n`
);

// Phase sections
function phaseSection(num, slideStart, slideEnd, extraImports = '') {
  let slide = slice(slideStart, slideEnd);
  slide = slide.replace(`const SlidePhase${num}`, `export function Fase${num}Section`);
  return `'use client';\n\nimport React, { useState } from 'react';\n${extraImports}\nimport { DocBadge, AppBadge, FlowBox, ArrowH, ArrowV } from '../shared/flow-ui';\n\n${slide}\n`;
}

write('components/pengadaan/fase-1/fase-1-section.tsx', phaseSection(1, 973, 1031, "import { DocumentGalleryFase1Mock } from './document-gallery-fase1';\n"));
write('components/pengadaan/fase-2/fase-2-section.tsx', phaseSection(2, 1033, 1091, "import { MapPin } from 'lucide-react';\nimport { DocumentGalleryFase2Mock } from './document-gallery-fase2';\n"));
write('components/pengadaan/fase-3/fase-3-section.tsx', phaseSection(3, 1093, 1124, "import { UpDocumentMock } from './up-document-mock';\n"));
write('components/pengadaan/fase-4/fase-4-section.tsx', phaseSection(4, 1127, 1174, "import { DocumentGalleryFase4Mock } from './document-gallery-fase4';\n"));

let fase5 = slice(1276, 1308);
fase5 = fase5.replace('const SlidePhase5', 'export function Fase5Section');
write(
  'components/pengadaan/fase-5/fase-5-section.tsx',
  `'use client';\n\nimport React from 'react';\nimport { DocBadge, AppBadge, FlowBox, ArrowH, ArrowV } from '../shared/flow-ui';\nimport { DocumentGalleryFase5Mock } from './document-gallery-fase5';\n\n${fase5}\n`
);

let portal = slice(940, 971);
portal = portal.replace('const SlideOverview', 'export function PortalOverview');
write(
  'components/pengadaan/portal/portal-overview.tsx',
  `'use client';\n\nimport React from 'react';\nimport { PortalFlowArrow } from './portal-flow-arrow';\nimport { PORTAL_PHASES } from './portal-phases';\n\n${portal}\n`
);

let summary = slice(1310, 1328);
summary = summary.replace('const SlideSummary', 'export function SummarySection');
write(
  'components/pengadaan/summary/summary-section.tsx',
  `'use client';\n\nimport { CheckCircle2, Briefcase } from 'lucide-react';\n\n${summary}\n`
);

console.log('done');
