'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'farrelpraikal@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mt-32 border-t-4 border-[var(--text-raw)] pt-12 pb-8">
      {/* Section Header Badge */}
      <div className="relative mb-8 flex flex-col md:flex-row md:items-end gap-3">
        <div className="border-4 border-[var(--text-raw)] bg-[var(--text-raw)] text-[var(--bg-raw)] px-6 py-2 inline-block font-black text-2xl md:text-3xl uppercase tracking-tighter transform -rotate-1 shadow-[4px_4px_0px_0px_var(--text-raw)]">
          /// [SECTION: SEND SIGNAL]
        </div>
        <div className="border-2 border-[var(--text-raw)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest inline-block self-start">
          [COMMUNICATION_LINK]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Direct Channel Box (7 Kolom) */}
        <div className="md:col-span-7 border-4 border-[var(--text-raw)] p-6 md:p-8 bg-[var(--bg-raw)] shadow-[8px_8px_0px_0px_var(--text-raw)] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 leading-tight">
              START A FREELANCE INQUIRY OR SYSTEM COLLAB.
            </h3>
            <p className="text-xs md:text-sm font-bold opacity-90 uppercase leading-relaxed mb-6">
              AVAILABLE FOR WEB DEVELOPMENT (NEXT.JS), MOBILE APP ARCHITECTURE (FLUTTER), BRANDING, AND VISUAL ARCHIVE PROJECTS.
            </p>
          </div>

          {/* Email Copy Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t-4 border-[var(--text-raw)] pt-6">
            <span className="text-base md:text-lg font-black tracking-wider uppercase truncate">
              {email}
            </span>
            <button
              onClick={handleCopy}
              className="border-4 border-[var(--text-raw)] px-4 py-2 font-black text-xs tracking-widest bg-[var(--text-raw)] text-[var(--bg-raw)] hover:bg-[var(--bg-raw)] hover:text-[var(--text-raw)] transition-none uppercase shrink-0"
            >
              {copied ? '[COPIED TO CLIPBOARD!]' : '[COPY EMAIL]'}
            </button>
          </div>
        </div>

        {/* Frequency Directory / Socials (5 Kolom - Inverted Ink) */}
        <div className="md:col-span-5 border-4 border-[var(--text-raw)] p-6 bg-[var(--text-raw)] text-[var(--bg-raw)] shadow-[-8px_8px_0px_0px_var(--text-raw)] flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-black tracking-widest uppercase mb-4 border-b-2 border-current pb-1">
              [ FREQUENCY DIRECTORY ]
            </div>
            
            <ul className="space-y-3 font-black text-sm md:text-base tracking-wider uppercase">
              
              <li>
                <a 
                  href="https://github.com/dooms667" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex justify-between items-center"
                >
                  <span>/// GITHUB</span>
                  <span>[↗]</span>
                </a>
              </li>
              
              <li>
                <a 
                  href="https://www.linkedin.com/in/farrel-haikal-prasetya-5866712b6/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex justify-between items-center"
                >
                  <span>/// LinkedIn</span>
                  <span>[↗]</span>
                </a>
              </li>

              <li>
                <a 
                  href="https://instagram.com/dooms667" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex justify-between items-center"
                >
                  <span>/// INSTAGRAM</span>
                  <span>[↗]</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Terminal Stamp */}
          <div className="mt-8 pt-4 border-t-2 border-current text-[10px] font-bold tracking-widest uppercase opacity-80 flex justify-between">
            <span>[LOC: JAKARTA, ID]</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Anti-Regime Easter Egg Line */}
      <div className="mt-16 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-xs font-black tracking-widest uppercase border-t-4 border-[var(--text-raw)] pt-4 gap-2">
        <span>© 2026 FARREL HAIKAL /// DOOMS667. ALL RIGHTS RESERVED.</span>
        
        {/* Teks Rahasia Anti-Regime */}
        <Link 
          href="/regime" 
          className="cursor-pointer hover:text-red-600 transition-colors tracking-widest group relative"
          title="[ACCESS RESTRICTED]"
        >
          <span>/// POWER TENDS TO CORRUPT</span>
          <span className="absolute -top-3 right-0 text-[8px] opacity-0 group-hover:opacity-100 text-red-600 font-bold transition-opacity">
            [OPEN_DOSSIER]
          </span>
        </Link>
      </div>
    </footer>
  );
}