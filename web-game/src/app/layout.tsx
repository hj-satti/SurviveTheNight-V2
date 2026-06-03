import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Survive the Night | Fox Platformer',
  description: 'A fox platformer adventure - Parallel and Distributed Computing Lab Project by Hifsa, Ayesha & Aliza',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950">{children}</body>
    </html>
  );
}
