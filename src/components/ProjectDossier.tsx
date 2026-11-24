'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from '@/data/projects';

interface ProjectDossierProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!mounted) return null;

  const isVideo = project?.preview ? /\.(mp4|mov|webm)$/i.test(project.preview) : false;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[9990] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-[2px] cursor-pointer"
          />

          {/* Slide-Over Dossier Panel */}
          <motion.aside
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl h-full overflow-y-auto border-l-4 border-[var(--text-raw)] bg-[var(--bg-raw)] text-[var(--text-raw)] p-6 md:p-10 flex flex-col justify-between shadow-[-12px_0px_0px_0px_#ccff00]"
          >
            <div>
              {/* Top Classification Bar */}
              <div className="flex justify-between items-center border-b-4 border-[var(--text-raw)] pb-4 mb-6 gap-4">
                <div className="text-[10px] md:text-xs font-black tracking-widest uppercase bg-[var(--text-raw)] text-[var(--bg-raw)] px-2.5 py-1">
                  /// DOSSIER_FILE: {project.id.toUpperCase()}
                </div>
                <button
                  onClick={onClose}
                  className="brutalist-interactive border-4 border-[var(--text-raw)] px-3 py-1 text-xs font-black tracking-widest uppercase bg-[var(--bg-raw)] hover:bg-[var(--text-raw)] hover:text-[var(--bg-raw)] cursor-pointer shadow-[4px_4px_0px_0px_var(--text-raw)]"
                >
                  [X] CLOSE_ESC
                </button>
              </div>

              {/* Title & Meta Grid */}
              <div className="mb-8">
                <div className="text-xs font-black tracking-widest uppercase opacity-75 mb-2">
                  [{project.category}] {project.year ? `// ${project.year}` : ''}
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                  {project.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 border-4 border-[var(--text-raw)] text-xs uppercase font-bold">
                  <div className="p-3 border-b-4 sm:border-b-0 sm:border-r-4 border-[var(--text-raw)]">
                    <span className="block text-[10px] opacity-60 mb-1">[ROLE / EXECUTION]</span>
                    <span>{project.role || 'DESIGN & ENGINEERING'}</span>
                  </div>
                  <div className="p-3">
                    <span className="block text-[10px] opacity-60 mb-1">[STACK / MEDIUM]</span>
                    <span>{project.tags.join(' // ')}</span>
                  </div>
                </div>
              </div>

              {/* Full Visual Feed */}
              {project.preview && (
                <div className="mb-8 border-4 border-[var(--text-raw)] bg-[var(--text-raw)] p-2 shadow-[6px_6px_0px_0px_var(--text-raw)] w-fit max-w-full mx-auto">
                  {isVideo ? (
                    <video
                      src={project.preview}
                      autoPlay
                      loop
                      muted
                      controls
                      playsInline
                      className="block w-auto h-auto max-w-full max-h-[70vh] bg-black"
                    />
                  ) : (
                    <img
                      src={project.preview}
                      alt={project.title}
                      className="block w-auto h-auto max-w-full max-h-[70vh]"
                    />
                  )}
                  <div className="text-[10px] font-black tracking-widest uppercase text-[var(--bg-raw)] pt-2 px-1 flex justify-between gap-4">
                    <span>/// VISUAL_EVIDENCE_01</span>
                    <span>[RAW_FEED]</span>
                  </div>
                </div>
              )}

              {/* Dossier Sections */}
              <div className="space-y-6 mb-10">
                <div className="border-l-4 border-[var(--text-raw)] pl-4">
                  <h3 className="text-xs font-black tracking-widest uppercase mb-2 bg-[var(--text-raw)] text-[var(--bg-raw)] inline-block px-2 py-0.5">
                    [01 // BRIEF & CONTEXT]
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed font-medium">
                    {project.problem || project.description}
                  </p>
                </div>

                {project.architecture && (
                  <div className="border-l-4 border-[var(--text-raw)] pl-4">
                    <h3 className="text-xs font-black tracking-widest uppercase mb-2 bg-[var(--text-raw)] text-[var(--bg-raw)] inline-block px-2 py-0.5">
                      [02 // SYSTEM & ART DIRECTION]
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed font-medium">
                      {project.architecture}
                    </p>
                  </div>
                )}

                {project.deliverables && project.deliverables.length > 0 && (
                  <div className="border-l-4 border-[var(--text-raw)] pl-4">
                    <h3 className="text-xs font-black tracking-widest uppercase mb-2 bg-[var(--text-raw)] text-[var(--bg-raw)] inline-block px-2 py-0.5">
                      [03 // DELIVERABLES]
                    </h3>
                    <ul className="space-y-1.5 text-xs md:text-sm font-bold uppercase tracking-wide">
                      {project.deliverables.map((item, idx) => (
                        <li key={idx}>[+] {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="border-t-4 border-[var(--text-raw)] pt-6 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <span className="text-[10px] font-black tracking-widest uppercase opacity-70">
                [END_OF_RECORD]
              </span>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutalist-interactive border-4 border-[var(--text-raw)] bg-[#ccff00] text-black px-6 py-3 font-black text-xs md:text-sm tracking-widest uppercase text-center shadow-[6px_6px_0px_0px_var(--text-raw)]"
                >
                  LAUNCH LIVE DEPLOYMENT [↗]
                </a>
              ) : (
                <span className="border-2 border-[var(--text-raw)] px-4 py-2 text-xs font-black tracking-widest uppercase opacity-60 text-center">
                  [INTERNAL / ARCHIVE ONLY]
                </span>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}