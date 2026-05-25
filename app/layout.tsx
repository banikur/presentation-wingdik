import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import ErrorBoundary from './ErrorBoundary';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mockup Proses Pengadaan',
  description: 'Pengenalan interaktif alur pengadaan barang/jasa militer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={notoSans.variable}>
      <body className={`${notoSans.className} antialiased`} suppressHydrationWarning>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
