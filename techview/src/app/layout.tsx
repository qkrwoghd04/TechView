import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TechView | 테크뷰',
  description: 'AI 기반 개발자 면접 모의 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
