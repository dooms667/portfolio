'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECTS } from '../data/projects';
import BrutalistCard from '../components/BrutalistCard';
import Marquee from '../components/Marquee';
import Footer from '../components/Footer';
import MouseTracker from '../components/MouseTracker';
import { playInvertSFX, initGlobalSFX } from '../utils/sfx';

export default function Home() {
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    if (isInverted) {
      document.body.classList.add('invert-mode');
    } else {
      document.body.classList.remove('invert-mode');
    }
  }, [isInverted]);

  const handleToggleInvert = (e: React.MouseEvent) => {
    e.stopPropagation(); // Biar gak bunyi double dengan click global
    playInvertSFX(); // Khusus toggle pakai suara Zap
    setIsInverted(!isInverted);
  };

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <main className="min-h-screen p-6 md:p-12 overflow-x-hidden">
      {/* Top Status Bar */}
      <div className="flex justify-between items-center border-b-4 border-[var(--text-raw)] pb-3">
        <div className="text-xs font-black tracking-widest uppercase flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[var(--text-raw)] animate-pulse inline-block"></span>
          <span>[SYS_STATUS: ONLINE /// JAKARTA UTC+7]</span>
        </div>
        
        <button 
          onClick={handleToggleInvert}
          className="border-4 border-[var(--text-raw)] px-4 py-1.5 font-black text-xs tracking-widest hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)] transition-none uppercase cursor-pointer"
        >
          {isInverted ? '[X] REVERT INK' : '[ ] INVERT INK'}
        </button>
      </div>

      {/* Marquee Ticker */}
      <div className="my-6">
        <Marquee />
      </div>

      {/* Asymmetric Header Section */}
      <header className="relative my-8 mb-16">
        <div className="inline-block bg-[var(--text-raw)] text-[var(--bg-raw)] font-black text-xs px-3 py-1 tracking-widest uppercase transform -rotate-1 mb-4 relative z-20 shadow-[4px_4px_0px_0px_var(--bg-raw)]">
          /// LEGAL: FARREL HAIKAL // ALIAS: DOOMS667
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          <div className="border-4 border-[var(--text-raw)] p-5 md:p-6 bg-[var(--bg-raw)] shadow-[8px_8px_0px_0px_var(--text-raw)] relative z-10 w-full lg:w-auto shrink-0">
            <div className="flex flex-row items-center gap-4 md:gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 whitespace-nowrap">
                  FARREL HAIKAL
                </h1>
                <p className="text-xs md:text-sm font-black tracking-widest uppercase border-t-4 border-[var(--text-raw)] pt-2 inline-block">
                  /// AKA DOOMS667
                </p>
              </div>

              <div className="relative z-20 transform rotate-3 hover:rotate-0 transition-transform duration-200 shrink-0">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-[var(--text-raw)] opacity-40 border border-[var(--bg-raw)] z-30 transform -rotate-2 pointer-events-none"></div>

                <div className="border-2 border-[var(--text-raw)] bg-[var(--bg-raw)] p-1 shadow-[3px_3px_0px_0px_var(--text-raw)] w-24 md:w-28">
                  <div className="aspect-[3/4] border border-[var(--text-raw)] overflow-hidden bg-[var(--text-raw)] relative">
                    <img 
                      src="/assets/images/profile.jpeg" 
                      alt="Farrel Haikal" 
                      className="w-full h-full object-cover grayscale contrast-250 brightness-90 hover:scale-105 transition-transform duration-300 [image-rendering:pixelated]" 
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[var(--bg-raw)] text-[var(--text-raw)] text-[8px] font-black text-center py-0.5 tracking-widest uppercase border-t border-[var(--text-raw)]">
                      [FIG_01]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 border-4 border-[var(--text-raw)] p-6 bg-[var(--text-raw)] text-[var(--bg-raw)] shadow-[-8px_8px_0px_0px_var(--text-raw)] relative z-20 w-full flex flex-col justify-center">
            <div className="text-[10px] font-black tracking-widest uppercase mb-2 border-b-2 border-current pb-1">
              [ MANIFESTO ]
            </div>
            <p className="text-xs md:text-sm font-bold tracking-wider leading-relaxed uppercase">
              a developer and illustrator based in Jakarta, Indonesia. I build web and mobile applications with Next.js and Flutter, backed by tools like Supabase, SQLite, and MySQL, and I have a foundation in Java development as well. I care about software that is clean, dependable, and pleasant to use. Oh, I also hate the regime!
            </p>
          </div>
        </div>
      </header>

      {/* Floating Scattered Navigation Buttons */}
      <nav className="relative my-16 space-y-12 md:space-y-0">
        <div className="flex justify-end md:pr-75 md:mb-16">
          <Link 
            href="/logic" 
            className="border-4 border-[var(--text-raw)] px-6 py-3 text-2xl md:text-3xl font-black tracking-wider uppercase bg-[var(--bg-raw)] hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)] transition-none shadow-[6px_6px_0px_0px_var(--text-raw)]"
          >
            [01] /// LOGIC
          </Link>
        </div>

        <div className="flex justify-start md:pl-70">
          <Link 
            href="/pixels" 
            className="border-4 border-[var(--text-raw)] px-6 py-3 text-2xl md:text-3xl font-black tracking-wider uppercase bg-[var(--bg-raw)] hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)] transition-none shadow-[6px_6px_0px_0px_var(--text-raw)]"
          >
            [02] /// PIXELS
          </Link>
        </div>
      </nav>

      {/* Curated Highlights Section */}
      <section className="mt-24">
        <div className="relative mb-8 flex flex-col md:flex-row md:items-end gap-3">
          <div className="border-4 border-[var(--text-raw)] bg-[var(--text-raw)] text-[var(--bg-raw)] px-6 py-2 inline-block font-black text-2xl md:text-3xl uppercase tracking-tighter transform -rotate-1 shadow-[4px_4px_0px_0px_var(--text-raw)]">
            /// CURATED HIGHLIGHTS
          </div>
          <div className="border-2 border-[var(--text-raw)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest inline-block self-start">
            [SELECTED WORKS]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <BrutalistCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Footer / Send Signal Section */}
      <Footer />

      {/* Live Mouse Tracker */}
      <MouseTracker />
    </main>
  );
}