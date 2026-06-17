/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        // Random incremental steps for high quality organic feel
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      id="preloader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090909] text-white select-none"
    >
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Decorative Monogram */}
        <motion.div
          id="preloader-monogram"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8 w-16 h-16 rounded-full border border-luxury-gold/40 flex items-center justify-center relative"
        >
          <span className="serif-header text-2xl font-light text-luxury-gold tracking-widest pl-0.5">M</span>
          <motion.div
            id="preloader-glow"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border border-[#c5a880]/15 border-t-transparent border-b-transparent"
          />
        </motion.div>

        {/* Brand Typography */}
        <motion.h1
          id="preloader-brand-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="serif-header text-3xl font-light uppercase tracking-[0.25em] text-white mb-2"
        >
          Maison Elite
        </motion.h1>

        <motion.p
          id="preloader-brand-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="sans-text text-[10px] tracking-[0.35em] text-[#d0c6b1] uppercase font-light mb-12"
        >
          Global Luxury Real Estate Advisory
        </motion.p>

        {/* Clean Progress Meter */}
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mb-3">
          <motion.div
            id="preloader-progress-bar"
            className="h-full bg-luxury-gold absolute left-0 top-0"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Counter */}
        <motion.div
          id="preloader-progress-text"
          className="display-num text-[11px] text-luxury-gold/80 tracking-widest font-light"
        >
          {String(Math.floor(progress)).padStart(3, '0')} %
        </motion.div>

        <motion.div
          id="preloader-editorial-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 60 ? 0.4 : 0 }}
          className="absolute -bottom-24 w-64 sans-text text-[10px] italic font-light tracking-wide text-[#e5e5e5]/80"
        >
          Curating exceptional architecture since 2016
        </motion.div>
      </div>
    </motion.div>
  );
}
