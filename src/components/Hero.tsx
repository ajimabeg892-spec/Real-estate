/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Compass, ShieldCheck } from 'lucide-react';
import heroVilla from '../assets/images/luxury_hero_villa_1781657129005.jpg';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreProperties: () => void;
}

export default function Hero({ onOpenConsultation, onExploreProperties }: HeroProps) {
  // Stat animation states
  const [experience, setExperience] = useState(0);
  const [propertiesSold, setPropertiesSold] = useState(0);
  const [happyClients, setHappyClients] = useState(0);

  useEffect(() => {
    // Experience counter (0 to 10)
    const expTimer = setInterval(() => {
      setExperience((prev) => {
        if (prev >= 10) {
          clearInterval(expTimer);
          return 10;
        }
        return prev + 1;
      });
    }, 100);

    // Properties counter (0 to 520, step of 13)
    const propTimer = setInterval(() => {
      setPropertiesSold((prev) => {
        if (prev >= 520) {
          clearInterval(propTimer);
          return 520;
        }
        return prev + 13;
      });
    }, 45);

    // Clients counter (0 to 1000, step of 25)
    const clientTimer = setInterval(() => {
      setHappyClients((prev) => {
        if (prev >= 1000) {
          clearInterval(clientTimer);
          return 1000;
        }
        return prev + 25;
      });
    }, 45);

    return () => {
      clearInterval(expTimer);
      clearInterval(propTimer);
      clearInterval(clientTimer);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-luxury-black overflow-hidden pt-28 pb-12"
    >
      {/* Background Image Container with parallax & dark overlays */}
      <div className="absolute inset-0 z-0">
        <motion.div
          id="hero-bg-wrapper"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 0.65 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            id="hero-bg-image"
            src={heroVilla}
            alt="Maison Luxury Villa Malibu Cliffside Sunset"
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        {/* Subtle color tinting & heavy rich dark ambient vignettes */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-gradient-to-r from-luxury-black via-luxury-black/70 to-transparent z-1" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-1" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center relative z-10 select-none">
        <div className="max-w-3xl mt-10 md:mt-20">
          
          {/* Subtle Accent Label */}
          <motion.div
            id="hero-subline-accent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-luxury-gold" />
            <span className="sans-text text-[11px] uppercase tracking-[0.4em] text-luxury-gold font-light flex items-center gap-2">
              <Compass size={14} className="stroke-[1.5] text-luxury-gold animate-pulse" />
              Sovereign Real Estate Portfolio
            </span>
          </motion.div>

          {/* Cinematic Headings */}
          <h1 className="serif-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block tracking-tight text-white/95"
            >
              Curating Real Estate
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium tracking-wide italic text-[#fafaf7] mt-2 text-luxury-gold/90"
            >
              As Fine Art.
            </motion.span>
          </h1>

          {/* Editorial Paragraph */}
          <motion.p
            id="hero-editorial-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="sans-text text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-12 max-w-xl tracking-wide"
          >
            We represent an international collection of modern architectural marvels, 
            private peninsula sanctuaries, and monumental penthouses configured for high-net-worth lifestyles.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            id="hero-cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-16"
          >
            <button
              id="hero-btn-explore"
              onClick={onExploreProperties}
              className="sans-text text-xs tracking-[0.25em] font-medium uppercase bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black px-8 py-4.5 rounded-full shadow-2xl transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Explore Properties</span>
              <ArrowDownRight size={15} className="group-hover:rotate-45 transition-transform duration-500" />
            </button>

            <button
              id="hero-btn-cons"
              onClick={onOpenConsultation}
              className="sans-text text-xs tracking-[0.25em] font-light uppercase border border-white/20 hover:border-luxury-gold bg-black/40 hover:bg-luxury-gold/5 text-white px-8 py-4.5 rounded-full transition-all duration-500 flex items-center justify-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
              <span>Private Consultation</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trust Statistics / Counter Blocks */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          id="hero-trust-banners"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-10"
        >
          {/* Stat 1 */}
          <div className="flex items-start gap-4">
            <span className="serif-header text-4xl lg:text-5xl font-light text-luxury-gold display-num font-medium">
              {experience}+
            </span>
            <div className="flex flex-col">
              <span className="sans-text text-xs tracking-[0.1em] font-medium text-white uppercase">
                Years of Master Trust
              </span>
              <span className="sans-text text-[10px] text-gray-400 font-light mt-0.5">
                Representing the world's finest curators.
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-start gap-4">
            <span className="serif-header text-4xl lg:text-5xl font-light text-luxury-gold display-num font-medium">
              {propertiesSold}+
            </span>
            <div className="flex flex-col">
              <span className="sans-text text-xs tracking-[0.1em] font-medium text-white uppercase">
                Properties Exchanged
              </span>
              <span className="sans-text text-[10px] text-gray-400 font-light mt-0.5">
                Over $4.2B in secure real estate assets.
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-start gap-4">
            <span className="serif-header text-4xl lg:text-5xl font-light text-luxury-gold display-num font-medium">
              {happyClients >= 1000 ? '1,000' : happyClients}+
            </span>
            <div className="flex flex-col">
              <span className="sans-text text-xs tracking-[0.1em] font-medium text-white uppercase">
                UHNW Clients Advised
              </span>
              <span className="sans-text text-[10px] text-gray-400 font-light mt-0.5">
                Confidential family office representations.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
