import type { Metadata } from 'next';
import './globals.css';
import SFXProvider from '../components/SFXProvider';

export const metadata: Metadata = {
  title: 'FARREL HAIKAL /// DOOMS667',
  description: 'Logic & Pixels Archive',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SFXProvider />
        {children}
      </body>
    </html>
  );
}