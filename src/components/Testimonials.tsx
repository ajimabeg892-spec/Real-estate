/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/properties';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto slide rotation every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-luxury-black select-none border-b border-[#181818] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        
        {/* Quote watermark background */}
        <div className="absolute top-10 left-10 md:left-20 opacity-5 -z-1 translate-x-[-20px] translate-y-[-20px]">
          <Quote size={200} className="text-luxury-gold stroke-[0.5]" />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
            Client Reflections
          </span>
          <h2 className="serif-header text-3xl md:text-4xl font-light text-white tracking-widest uppercase">
            Confidential Voices
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-4" />
        </div>

        {/* Testimonials Core Carousels */}
        <div className="min-h-[290px] relative flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              id={`testimonial-slide-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center"
            >
              {/* Star line */}
              <div className="flex justify-center gap-1 mb-8 text-luxury-gold">
                {Array.from({ length: activeTestimonial.rating }).map((_, idx) => (
                  <Star key={idx} size={15} className="fill-[#c5a880]" />
                ))}
              </div>

              {/* Editorial Quote */}
              <blockquote className="serif-header text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-[#fafaf7]/90 max-w-4xl mx-auto px-4 md:px-8 mb-10 tracking-wide">
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Author & Profile credentials */}
              <div className="flex flex-col items-center">
                <span className="serif-header text-base text-[#fafaf7] font-normal tracking-wider">
                  {activeTestimonial.author}
                </span>
                <span className="sans-text text-[10.5px] uppercase tracking-[0.2em] text-[#8a7a63] font-medium mt-1">
                  {activeTestimonial.title}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls indicators absolute layout */}
          <div className="flex justify-between items-center mt-12 md:mt-16 border-t border-white/5 pt-8 w-full max-w-sm mx-auto z-10">
            <button
              id="testimonial-btn-prev"
              onClick={handlePrev}
              className="p-3 border border-white/10 hover:border-luxury-gold text-white hover:text-luxury-gold rounded-full bg-transparent hover:bg-white/5 transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Pagination Bullet Indicators */}
            <div className="flex gap-2.5">
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  id={`testimonial-bullet-btn-${dotIdx}`}
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === dotIdx ? 'w-8 bg-luxury-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              id="testimonial-btn-next"
              onClick={handleNext}
              className="p-3 border border-white/10 hover:border-luxury-gold text-white hover:text-luxury-gold rounded-full bg-transparent hover:bg-white/5 transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
