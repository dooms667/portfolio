'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [glitchCode, setGlitchCode] = useState('0x0000_FATAL');

  useEffect(() => {
    // Random error hex generator ala kernel panic
    const interval = setInterval(() => {
      const randHex = Math.floor(Math.random() * 0xffffffff).toString(16);
      setGlitchCode(`0x${randHex.toUpperCase()}_ERR_CORRUPT`);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[var(--bg-raw)] text-[var(--text-raw)] flex flex-col justify-between selection:bg-[var(--text-raw)] selection:text-[var(--bg-raw)]">
      {/* Top Warning Bar */}
      <div className="flex justify-between items-center border-b-4 border-[var(--text-raw)] pb-3">
        <div className="text-xs font-black tracking-widest uppercase flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-600 animate-ping inline-block"></span>
          <span className="text-red-600 font-black">[SYS_CRITICAL: KERNEL PANIC]</span>
        </div>
        <div className="text-xs font-bold tracking-widest uppercase border-2 border-[var(--text-raw)] px-2 py-0.5">
          ERR_CODE: 404
        </div>
      </div>

      {/* Main Glitch Content Box */}
      <div className="my-auto py-12 max-w-4xl mx-auto w-full">
        {/* Warning Sticker */}
        <div className="inline-block bg-[var(--text-raw)] text-[var(--bg-raw)] font-black text-xs px-3 py-1 tracking-widest uppercase transform -rotate-2 mb-4 shadow-[4px_4px_0px_0px_var(--bg-raw)]">
          /// MEMORY SECTOR OBLITERATED
        </div>

        <div className="border-4 border-[var(--text-raw)] p-6 md:p-10 bg-[var(--bg-raw)] shadow-[12px_12px_0px_0px_var(--text-raw)] relative">
          
          {/* Glitch Heading */}
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 glitch-text">
            404 // NOT_FOUND
          </h1>

          {/* Diagnostic Log */}
          <div className="border-t-4 border-[var(--text-raw)] pt-6 mb-8 space-y-2 font-mono text-xs md:text-sm font-bold uppercase opacity-90">
            <p className="flex justify-between border-b border-dashed border-current pb-1">
              <span>TARGET ROUTE:</span>
              <span className="text-right">UNKNOWN_ENDPOINT</span>
            </p>
            <p className="flex justify-between border-b border-dashed border-current pb-1">
              <span>EXCEPTION CODE:</span>
              <span className="text-right font-black">{glitchCode}</span>
            </p>
            <p className="flex justify-between pb-1">
              <span>SYSTEM STATUS:</span>
              <span className="text-right text-red-600">HALTED_UNEXPECTEDLY</span>
            </p>
          </div>

          <p className="text-xs md:text-sm font-bold uppercase tracking-wider leading-relaxed mb-8 opacity-80">
            THE PAGE YOU ARE LOOKING FOR HAS BEEN LOST AMONG THE MEMORY SECTORS OR DELIBERATELY REMOVED BY THE REGIME. RETURN TO THE BASE DIRECTORY BEFORE THE SYSTEM UNDERGOES A TOTAL REBOOT.
          </p>

          {/* Action Button */}
          <div>
            <Link 
              href="/" 
              className="inline-block border-4 border-[var(--text-raw)] px-8 py-4 text-lg md:text-xl font-black tracking-widest uppercase bg-[var(--text-raw)] text-[var(--bg-raw)] hover:bg-[var(--bg-raw)] hover:text-[var(--text-raw)] transition-none shadow-[6px_6px_0px_0px_var(--text-raw)]"
            >
              [← RETURN TO BASE // HOME]
            </Link>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t-4 border-[var(--text-raw)] pt-4 flex justify-between items-center text-[10px] md:text-xs font-black tracking-widest uppercase">
        <span>FARREL HAIKAL /// DOOMS667</span>
        <span>[SAFE_MODE_ENABLED]</span>
      </div>
    </main>
  );
}