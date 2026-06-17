/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ZoomIn, Compass } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/properties';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterCategories = ['All', 'Interiors', 'Wellness', 'Outdoor', 'Landscape'];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const openLightbox = (index: number) => {
    // Find absolute index in the filtered items array
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-luxury-black select-none border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
              Lifestyle Curation
            </span>
            <h2 className="serif-header text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
              Architectural <br />
              <span className="italic font-medium text-luxury-gold/90">Sanctuary Vignettes</span>
            </h2>
          </div>

          {/* Luxury Categories Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {filterCategories.map((cat) => (
              <button
                id={`gallery-tab-${cat.toLowerCase()}`}
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`sans-text text-[10px] tracking-widest uppercase font-medium py-2.5 px-5 rounded-full transition-all duration-350 border ${
                  selectedFilter === cat
                    ? 'bg-[#fafaf7] text-luxury-black border-[#fafaf7] shadow-xl'
                    : 'text-white/60 hover:text-white border-white/5 bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                id={`gallery-item-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-[#090909] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Cover Mask */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-6 z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-12 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass size={12} className="text-luxury-gold animate-spin-slow" />
                    <span className="sans-text text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="serif-header text-lg text-white font-light tracking-wide">
                    {item.title}
                  </h3>
                  <span className="sans-text text-[9px] text-gray-400 font-light mt-1 uppercase tracking-widest flex items-center gap-1">
                    <ZoomIn size={10} /> View Curated Lens
                  </span>
                </div>

                {/* Absolute Top category tag when not hovering */}
                <span className="absolute top-4 left-4 z-10 sans-text text-[8px] uppercase tracking-widest bg-[#090909]/90 border border-white/5 text-gray-300 px-3 py-1.5 rounded-full group-hover:opacity-0 transition-opacity duration-300">
                  {item.category}
                </span>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal Screen */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              id="gallery-lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#090909]/98 backdrop-blur-xl flex flex-col justify-center items-center py-10 px-4"
            >
              {/* Close Button */}
              <button
                id="gallery-lightbox-btn-close"
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-white hover:text-luxury-gold hover:border-luxury-gold bg-black/40 transition-colors"
              >
                <X size={20} className="stroke-[1.5]" />
              </button>

              {/* Big Image box */}
              <div className="relative max-w-5xl max-h-[70vh] aspect-[16/10] overflow-hidden rounded-2xl border border-white/5">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={filteredItems[lightboxIndex]?.image}
                  alt={filteredItems[lightboxIndex]?.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Footer text */}
              <div className="text-center mt-6 max-w-md">
                <span className="sans-text text-[10px] text-luxury-gold tracking-[0.3em] font-medium uppercase">
                  {filteredItems[lightboxIndex]?.category}
                </span>
                <h4 className="serif-header text-xl text-white font-light mt-1.5 tracking-wider">
                  {filteredItems[lightboxIndex]?.title}
                </h4>
                <p className="sans-text text-[10.5px] text-gray-500 tracking-wide font-light mt-1">
                  Maison Elite Private Sanctuary Collection
                </p>

                {/* Quick Slide Navigation */}
                <div className="flex gap-4 justify-center items-center mt-8">
                  <button
                    id="gallery-lightbox-btn-prev"
                    disabled={lightboxIndex === 0}
                    onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                    className="sans-text text-[10px] text-white hover:text-luxury-gold uppercase tracking-widest disabled:opacity-20 cursor-pointer"
                  >
                    &larr; Prev
                  </button>
                  <span className="display-num text-xs text-gray-600">
                    {String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </span>
                  <button
                    id="gallery-lightbox-btn-next"
                    disabled={lightboxIndex === filteredItems.length - 1}
                    onClick={() => setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : prev))}
                    className="sans-text text-[10px] text-white hover:text-luxury-gold uppercase tracking-widest disabled:opacity-20 cursor-pointer"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
