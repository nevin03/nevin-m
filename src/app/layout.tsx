import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nevin M',
  description:
    'Product Developer and Frontend Engineer with experience in building scalable and efficient web applications.',
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
  title: 'Nevin M',
  description:
    'Product Developer and Frontend Engineer with experience in building scalable and efficient web applications.',
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
