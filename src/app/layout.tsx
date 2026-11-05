import type { Metadata } from 'next';
import './globals.css';
import SFXProvider from '../components/SFXProvider';
import CustomCursor from '../components/CustomCursor';
import AudioPlayer from '../components/AudioPlayer';

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
      <body className="bg-[var(--bg-raw)] text-[var(--text-raw)] cursor-none selection:bg-[#ccff00] selection:text-black flex flex-col min-h-screen">
        <AudioPlayer />
        <SFXProvider />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}