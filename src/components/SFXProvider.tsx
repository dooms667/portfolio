'use client';

import { useEffect } from 'react';
import { initGlobalSFX } from '../utils/sfx';

export default function SFXProvider() {
  useEffect(() => {
    const cleanupSFX = initGlobalSFX();
    return () => {
      if (cleanupSFX) cleanupSFX();
    };
  }, []);

  return null;
}