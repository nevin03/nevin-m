import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nevin M — Full Stack Developer & Product Engineer',
  description:
    'Minimalist portfolio of Nevin M. Full Stack Developer & Product Engineer with 1.6+ years industrial experience in frontend engineering, product strategy, and backend development.',
  keywords: [
    'Nevin M',
    'Full Stack Developer',
    'Frontend Engineer',
    'Product Engineering',
    'Next.js Portfolio',
    'TypeScript',
  ],
  authors: [{ name: 'Nevin M' }],
  openGraph: {
    title: 'Nevin M — Full Stack Developer & Product Engineer',
    description:
      'Minimalist portfolio of Nevin M, Full Stack Developer & Product Engineer with 1.6+ years industrial experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
