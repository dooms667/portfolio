'use client';

import React, { useState, useEffect } from 'react';

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Deteksi klik 3 kali di area status bar atas
  useEffect(() => {
    const statusBar = document.getElementById('sys-status-bar');
    if (!statusBar) return;

    const handleClick = () => {
      setClickCount((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setIsOpen(true);
          return 0; // reset
        }
        return next;
      });

      // Reset hitungan kalau gak nge-klik lagi dalam 1 detik
      setTimeout(() => setClickCount(0), 1000);
    };

    statusBar.addEventListener('click', handleClick);
    return () => statusBar.removeEventListener('click', handleClick);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="border-4 border-[var(--text-raw)] bg-[var(--bg-raw)] text-[var(--text-raw)] p-6 md:p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_var(--text-raw)] relative animate-in fade-in zoom-in duration-150">
        
        {/* Header Terminal */}
        <div className="flex justify-between items-center border-b-4 border-[var(--text-raw)] pb-3 mb-4">
          <span className="text-xs font-black tracking-widest uppercase text-red-600">
            [RESTRICTED_ACCESS // SECURE_SHELL]
          </span>
          <button 
            onClick={() => setIsOpen(false)}
            className="border-2 border-[var(--text-raw)] px-2 py-0.5 text-xs font-black uppercase hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)]"
          >
            [X]
          </button>
        </div>

        {/* ASCII Art Logo DOOMS667 */}
        <pre className="text-[9px] md:text-[11px] font-mono leading-none font-black mb-6 overflow-x-auto text-center">
{`
 ██████╗  ██████╗  ██████╗ ███╗   ███╗███████╗███████╗
 ██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║██╔════╝██╔════╝
 ██║  ██║██║   ██║██║   ██║██╔████╔██║███████╗███████╗
 ██║  ██║██║   ██║██║   ██║██║╚██╔╝██║╚════██║╚════██║
 ██████╔╝╚██████╔╝╚██████╔╝██║ ╚═╝ ██║███████║███████║
 ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝
`}
        </pre>

        {/* Pesan Rahasia */}
        <div className="border-2 border-[var(--text-raw)] p-4 mb-6 font-mono text-xs space-y-2 uppercase font-bold bg-[var(--text-raw)] text-[var(--bg-raw)]">
          <p>&gt; USER: FARREL HAIKAL [ALIAS: DOOMS667]</p>
          <p>&gt; STATUS: INFORMATICS ENG // UNINDRA</p>
          <p>&gt; DIRECTIVE: OFFLINE-FIRST, BRUTALIST UI, & ANTI-REGIME.</p>
          <p className="text-red-400 font-black">&gt; WARNING: NO REGIME STANDS FOREVER.</p>
        </div>

        <p className="text-[10px] font-black tracking-wider uppercase opacity-80 mb-6 text-center">
          LU MENEMUKAN JALUR FREKUENSI RAHASIA. SILAHKAN KEMBALI SEBELUM KETAHUAN.
        </p>

        {/* Tombol Tutup */}
        <div className="text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="border-4 border-[var(--text-raw)] px-6 py-2.5 font-black text-xs tracking-widest uppercase bg-[var(--text-raw)] text-[var(--bg-raw)] hover:bg-[var(--bg-raw)] hover:text-[var(--text-raw)] shadow-[4px_4px_0px_0px_var(--text-raw)]"
          >
            [CLOSE SECURE TERMINAL]
          </button>
        </div>

      </div>
    </div>
  );
}