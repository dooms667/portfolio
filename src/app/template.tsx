'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.2, // Sangat singkat
        ease: 'circOut', // Gaya easing yang 'berhenti mendadak'
      }}
    >
      {children}
    </motion.div>
  );
}