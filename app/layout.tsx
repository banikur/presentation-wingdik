import type { Metadata } from 'next';
import './globals.css'; // Global styles
import ErrorBoundary from './ErrorBoundary';

export const metadata: Metadata = {
  title: 'Mockup Proses Pengadaan',
  description: 'Pengenalan interaktif alur pengadaan barang/jasa militer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

