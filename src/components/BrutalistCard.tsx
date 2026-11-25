'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '@/data/projects';
import { motion } from 'framer-motion';
import ProjectDossier from './ProjectDossier';

export default function BrutalistCard({ project }: { project: Project }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const previewW = 320;
    const previewH = 220;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 720;

    const rawX = e.clientX + 20;
    const rawY = e.clientY - 190;

    const clampedX = Math.min(Math.max(16, rawX), vw - previewW - 16);
    const clampedY = Math.min(Math.max(16, rawY), vh - previewH - 16);

    setMousePos({ x: clampedX, y: clampedY });
  };

  const isVideo = project.preview ? /\.(mp4|mov|webm)$/i.test(project.preview) : false;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        whileHover={{ y: -5, x: -3 }}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsHovered(false);
            setIsDossierOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsHovered(false);
              setIsDossierOpen(true);
            }
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={(e) => {
            setIsHovered(true);
            handleMouseMove(e);
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="relative border-4 border-[var(--text-raw)] p-5 md:p-6 bg-[var(--bg-raw)] hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)] transition-colors duration-100 group cursor-pointer block shadow-[6px_6px_0px_0px_var(--text-raw)] hover:shadow-[10px_10px_0px_0px_#ccff00]"
        >
          {/* Category & Tags Header */}
          <div className="flex justify-between items-center border-b-2 border-current pb-2 mb-4 font-mono">
            <span className="text-xs font-black tracking-widest uppercase">
              [{project.category}]
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              {project.tags.join(' / ')}
            </span>
          </div>

          {/* Main Title & Inspect Indicator */}
          <div className="flex justify-between items-start gap-3 mb-3">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">
              {project.title}
            </h3>
            <span className="font-mono text-xs font-black tracking-widest shrink-0 group-hover:translate-x-1 transition-transform duration-100">
              [OPEN_FILE]
            </span>
          </div>

          {/* Description */}
          <p className="text-sm opacity-90 leading-relaxed">
            {project.description}
          </p>
        </div>
      </motion.div>

      {/* Floating Preview via Portal */}
      {typeof document !== 'undefined' &&
        project.preview &&
        isHovered &&
        !isDossierOpen &&
        createPortal(
          <div
            style={{ top: mousePos.y, left: mousePos.x }}
            className="fixed z-50 w-64 md:w-80 border-4 border-[var(--text-raw)] bg-[var(--bg-raw)] p-2 pointer-events-none hidden md:block shadow-[8px_8px_0px_0px_#ccff00]"
          >
            {isVideo ? (
              <video
                src={project.preview}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                ref={(videoEl) => {
                  if (videoEl) {
                    videoEl.play().catch(() => {});
                  }
                }}
                className="w-full h-auto object-cover"
              />
            ) : (
              <img
                src={project.preview}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            )}
            <div className="text-[10px] font-mono font-black text-[var(--bg-raw)] mt-1.5 tracking-[0.18em] uppercase text-center bg-[var(--text-raw)] py-1">
              /// CLICK TO INSPECT DOSSIER
            </div>
          </div>,
          document.body
        )}

      {/* Interactive Project Dossier Drawer */}
      <ProjectDossier
        project={isDossierOpen ? project : null}
        onClose={() => setIsDossierOpen(false)}
      />
    </>
  );
}