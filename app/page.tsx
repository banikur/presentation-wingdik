'use client';

import { useCallback, useState } from 'react';
import { AppShell, type AppView } from '@/components/pengadaan/layout/app-shell';
import { PortalOverview } from '@/components/pengadaan/portal/portal-overview';
import { Fase1Section } from '@/components/pengadaan/fase-1/fase-1-section';
import { Fase2Section } from '@/components/pengadaan/fase-2/fase-2-section';
import { Fase3Section } from '@/components/pengadaan/fase-3/fase-3-section';
import { Fase4Section } from '@/components/pengadaan/fase-4/fase-4-section';
import { Fase5Section } from '@/components/pengadaan/fase-5/fase-5-section';
import { SummarySection } from '@/components/pengadaan/summary/summary-section';
import { SimtelogSection } from '@/components/simtelog/simtelog-section';
import { SimtelogFlowSection } from '@/components/simtelog-flow/simtelog-flow-section';

function viewForPhase(phase: 1 | 2 | 3 | 4 | 5): AppView {
  return `fase-${phase}` as AppView;
}

function renderView(
  view: AppView,
  onSelectPhase: (phase: 1 | 2 | 3 | 4 | 5) => void,
  onSelectSimtelog: () => void,
  onSelectSimtelogFlow: () => void,
) {
  switch (view) {
    case 'portal':
      return (
        <PortalOverview
          onSelectPhase={onSelectPhase}
          onSelectSimtelog={onSelectSimtelog}
          onSelectSimtelogFlow={onSelectSimtelogFlow}
        />
      );
    case 'fase-1':
      return <Fase1Section />;
    case 'fase-2':
      return <Fase2Section />;
    case 'fase-3':
      return <Fase3Section />;
    case 'fase-4':
      return <Fase4Section />;
    case 'fase-5':
      return <Fase5Section />;
    case 'simtelog':
      return <SimtelogSection />;
    case 'simtelog-flow':
      return <SimtelogFlowSection />;
    case 'summary':
      return <SummarySection />;
    default:
      return (
        <PortalOverview
          onSelectPhase={onSelectPhase}
          onSelectSimtelog={onSelectSimtelog}
          onSelectSimtelogFlow={onSelectSimtelogFlow}
        />
      );
  }
}

export default function HomePage() {
  const [view, setView] = useState<AppView>('portal');

  const goToPhase = useCallback(
    (phase: 1 | 2 | 3 | 4 | 5) => setView(viewForPhase(phase)),
    [],
  );
  const goToSimtelog = useCallback(() => setView('simtelog'), []);
  const goToSimtelogFlow = useCallback(() => setView('simtelog-flow'), []);

  return (
    <AppShell view={view} onBackToPortal={view !== 'portal' ? () => setView('portal') : undefined}>
      {renderView(view, goToPhase, goToSimtelog, goToSimtelogFlow)}
    </AppShell>
  );
}
