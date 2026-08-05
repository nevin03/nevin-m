import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nevin M',
  description:
    'Product Developer and Frontend Engineer with experience in building scalable and efficient web applications.',
  keywords: [
    'Nevin M',
    'nevin',
    'nevin m',
    'react developer',
    'Full Stack Developer',
    'Frontend Engineer',
    'Product Engineering',
    'Next.js Portfolio',
    'TypeScript',
    'web developer kerala',
    'web3 kerala',
  ],
  authors: [{ name: 'Nevin M' }],
  openGraph: {
    title: 'Nevin M | Product Developer',
    description:
      'Product Developer and Frontend Engineer with experience in building scalable and efficient web applications.',
    type: 'website',
    images: [
      {
        url: '/portrait_v3.png',
        width: 800,
        height: 1000,
        alt: 'Nevin M - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevin M | Product Developer',
    description: 'Product Developer and Frontend Engineer with experience in building scalable and efficient web applications.',
    images: ['/portrait_v3.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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
