'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface RegimeNews {
  id: string;
  code: string;
  headline: string;
  summary: string;
  date: string;
}

const REGIME_REPORTS: RegimeNews[] = [
  {
    id: '01',
    code: 'IDN_LOG_070914',
    headline: 'DI UDARA',
    summary: 'Munir diracun arsenik di pesawat menuju Amsterdam pada 7 September 2004. Karena kasusnya tidak pernah dinaikkan jadi pelanggaran HAM berat, masa kedaluwarsanya habis pada 7 September 2022. Komnas HAM sempat menyiapkan tim eksternal untuk penyelidikan pada April 2023. Siapa otak pembunuhan itu masih belum terjawab.',
    date: '07/09/2004',
  },
  {
    id: '02',
    code: 'IDN_LOG_??07',
    headline: 'ANAK ITU BELUM PULANG',
    summary: 'Bernardus Realino Norma Irawan, tewas saat penumpasan demonstran anti-Soeharto tahun 1998, dan Ibu Sumarsih menggelar Aksi Kamisan di depan istana setiap Kamis sejak 2007. Aksi Kamisan ke-900 digelar pada 5 Maret 2026, dan Ibu Sumarsih menegaskan perjuangan menuntut keadilan belum selesai. Menjelang HUT ke-80 RI ia menuduh negara melindungi para pelanggar HAM berat.',
    date: '??/??/2007',
  },
  {
    id: '03',
    code: 'IDN_LOG_280825',
    headline: 'AFFAN KURNIAWAN',
    summary: 'Affan tewas dilindas rantis Brimob di Pejompongan saat demo. Kompol Cosmas dipecat, Bripka Rohmad didemosi 7 tahun, dan penumpang rantis hanya disanksi minta maaf. Pemerintah menyebut kasusnya berlanjut ke pidana.',
    date: '28/08/2025',
  },
  {
    id: '04',
    code: 'IDN_LOG_060926',
    headline: 'KARHUTLA',
    summary: 'Sekitar 37,9 juta orang di delapan provinsi terdampak asap pada Agustus. CREA memperkirakan 1.700 kematian pada bulan itu, dan lebih dari 570.000 siswa belajar dari rumah.',
    date: '06/09/2026',
  },
  {
    id: '05',
    code: 'IDN_LOG_250126',
    headline: 'BANJIR DAN LONGSOR SUMATRA',
    summary: 'BNPB mencatat 1.201 korban meninggal di Aceh, Sumatra Utara, dan Sumatra Barat. Di Bandung Barat, longsor 24 Januari menewaskan 94 orang.',
    date: '25/01/2026',
  },
  {
    id: '06',
    code: 'IDN_LOG_040926',
    headline: 'MAKANAN BERACUN GRATIS',
    summary: 'Kepala BGN mencatat 5.482 korban sejak 22 Juli 2026. Di antaranya 707 orang di SMKN 6 Semarang dan 129 siswa di Pariaman.',
    date: '04/09/2026',
  },
  {
    id: '07',
    code: 'IDN_LOG_030526',
    headline: 'PENDIRI CABUL!',
    summary: 'Polisi menangkap pendiri ponpes yang diduga melecehkan santriwati dengan memanfaatkan relasi kuasa dan dalil agama. LPSK turun menjangkau korban, dan Kemenag merekomendasikan ponpes ditutup.',
    date: '03/05/2026',
  },
  {
    id: '08',
    code: 'IDN_LOG_041126',
    headline: 'GERUNG NYAMPE ISTANA',
    summary: 'Analis politik sekaligus akademisi Rocky Gerung mendadak jadi perbincangan hangat setelah namanya disebut-sebut masuk dalam daftar tokoh yang dipertimbangkan untuk mengisi posisi strategis di Dewan Pertimbangan Presiden (Wantimpres). Spekulasi ini memicu perdebatan luas di ruang publik mengenai arah rekonsiliasi politik dan independensi kritik',
    date: '04/11/2026',
  },
  {
    id: '09',
    code: 'IDN_LOG_060626',
    headline: 'DADAN KORUP!',
    summary: 'Kejaksaan Agung resmi menetapkan dan menahan mantan Kepala Badan Gizi Nasional Dadan Hindayana terkait skandal korupsi dan mark-up anggaran pengadaan bernilai triliunan rupiah, termasuk proyek pengadaan motor listrik serta fasilitas fiktif dalam program strategis nasional.',
    date: '06/06/2026',
  },
  {
    id: '10',
    code: 'IDN_LOG_041126',
    headline: 'RAKYAT LAGI AJE YANG NGALAH!',
    summary: 'Penggunaan gestur tiga jari sebagai lambang solidaritas dan perlawanan terhadap kebijakan otoriter diadopsi luas oleh jaringan gerakan bawah tanah, memicu pengawasan ketat dari otoritas siber.',
    date: '04/11/2026',
  },
];

export default function RegimeArchive() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const activeNews = REGIME_REPORTS.find((item) => item.id === activeId);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[var(--bg-raw)] text-[var(--text-raw)] flex flex-col justify-between font-mono selection:bg-[var(--text-raw)] selection:text-[var(--bg-raw)] relative overflow-x-hidden">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center border-b-2 border-[var(--text-raw)] pb-3 z-20">
        <div className="text-xs font-black tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-red-600 animate-ping inline-block"></span>
          <span className="text-red-600 font-black">[RESTRICTED_LOGS]</span>
        </div>
        <Link 
          href="/"
          className="text-xs font-black uppercase hover:underline"
        >
          [X EXIT]
        </Link>
      </div>

      {/* Center Minimalist List with Strong Typography Hierarchy */}
      <div className="my-auto py-12 max-w-xl mx-auto w-full z-20 text-center">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 border-b-4 border-[var(--text-raw)] pb-4 inline-block">
          WHAT THEY DID:
        </h1>

        <div className="space-y-4 flex flex-col items-center">
          {REGIME_REPORTS.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <div 
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className="cursor-pointer"
              >
                <div className={`text-sm md:text-lg font-black tracking-widest uppercase transition-none py-1 px-3 inline-block ${
                  isActive ? 'bg-[var(--text-raw)] text-[var(--bg-raw)]' : 'hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)]'
                }`}>
                  {index + 1}. {item.code}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Preview Box following mouse position on desktop */}
      {activeNews && (
        <div 
          style={{
            transform: `translate(${Math.min(mousePos.x + 20, (typeof window !== 'undefined' ? window.innerWidth - 380 : 800))}px, ${mousePos.y - 120}px)`
          }}
          className="hidden md:block fixed top-0 left-0 w-80 bg-[var(--text-raw)] text-[var(--bg-raw)] p-4 border-2 border-[var(--text-raw)] shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] z-50 pointer-events-none transition-all duration-75 ease-out"
        >
          <div className="text-[10px] font-black uppercase tracking-widest border-b border-current pb-1 mb-2 flex justify-between">
            <span>[PREVIEW // {activeNews.code}]</span>
            <span className="text-red-500">{activeNews.date}</span>
          </div>
          <h3 className="text-xs font-black uppercase tracking-tight mb-2 leading-tight">
            {activeNews.headline}
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-90 leading-relaxed">
            {activeNews.summary}
          </p>
        </div>
      )}

      {/* Fallback floating box at the bottom for mobile/touchscreens */}
      {activeNews && (
        <div className="md:hidden fixed bottom-6 inset-x-6 bg-[var(--text-raw)] text-[var(--bg-raw)] p-4 border-2 border-[var(--text-raw)] shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] z-50">
          <div className="text-[10px] font-black uppercase tracking-widest border-b border-current pb-1 mb-2 flex justify-between">
            <span>[PREVIEW // {activeNews.code}]</span>
            <span className="text-red-500">{activeNews.date}</span>
          </div>
          <h3 className="text-xs font-black uppercase tracking-tight mb-2 leading-tight">
            {activeNews.headline}
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-90 leading-relaxed">
            {activeNews.summary}
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="border-t-2 border-[var(--text-raw)] pt-4 flex justify-between items-center text-[10px] md:text-xs font-black tracking-widest uppercase opacity-70 z-20">
        <span>F*** P**********</span>
        <span>AND ABSOLUTE POWER CORRUPTS ABSOLUTELY ///</span>
      </div>

    </main>
  );
}