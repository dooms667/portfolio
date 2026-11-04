import React from 'react';

export default function Marquee() {
  return (
    <div className="w-full border-y-4 border-[var(--text-raw)] py-2 my-8 overflow-hidden bg-[var(--text-raw)] text-[var(--bg-raw)]">
      <div className="whitespace-nowrap">
        <div className="animate-marquee font-black text-lg tracking-widest uppercase">
          /// AVAILABLE FOR FREELANCE WORK // NEXT.JS & FLUTTER // JAKARTA ID /// AVAILABLE FOR FREELANCE WORK // NEXT.JS & FLUTTER // JAKARTA ID ///
        </div>
        {/* Duplikat konten di atas agar loop animasinya tidak terputus */}
        <div className="animate-marquee font-black text-lg tracking-widest uppercase">
          /// AVAILABLE FOR FREELANCE WORK // NEXT.JS & FLUTTER // JAKARTA ID /// AVAILABLE FOR FREELANCE WORK // NEXT.JS & FLUTTER // JAKARTA ID ///
        </div>
      </div>
    </div>
  );
}