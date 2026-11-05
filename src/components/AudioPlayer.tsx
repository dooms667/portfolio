'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mengatur volume default agar tidak terlalu kencang (40%)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <audio ref={audioRef} src="/assets/audio/bgm.mp3" loop />
      <button 
        onClick={togglePlay}
        className="text-[10px] md:text-xs font-black tracking-widest uppercase bg-[var(--text-raw)] text-[var(--bg-raw)] px-3 py-1.5 border-2 border-[var(--text-raw)] hover:bg-[var(--bg-raw)] hover:text-[var(--text-raw)] transition-none shadow-[4px_4px_0px_0px_rgba(255,0,0,1)]"
      >
        {isPlaying ? '[|| STOP NOISE]' : '[> PLAY BGM]'}
      </button>
    </div>
  );
}