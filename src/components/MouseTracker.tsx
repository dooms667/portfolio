'use client';

import React, { useState, useEffect } from 'react';

export default function MouseTracker() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none hidden md:block">
      <div className="border-2 border-[var(--text-raw)] bg-[var(--bg-raw)] px-3 py-1 text-[10px] font-black tracking-widest text-[var(--text-raw)] uppercase shadow-[3px_3px_0px_0px_var(--text-raw)]">
        [X: {String(coords.x).padStart(4, '0')} /// Y: {String(coords.y).padStart(4, '0')}]
      </div>
    </div>
  );
}