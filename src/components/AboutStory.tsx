/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Award, EyeOff, Sparkles } from 'lucide-react';

export default function AboutStory() {
  return (
    <section id="story" className="py-24 md:py-32 bg-luxury-black select-none border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Image Montage (Column: 5) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                id="about-story-primary-img"
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800"
                alt="Maison Elite Private Office Lounge"
                className="w-full h-full object-cover object-center filter contrast-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#090909] mix-blend-color opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-luxury-coal/90 backdrop-blur-md border border-white/10 p-5 rounded-xl">
                <span className="serif-header text-[15px] text-[#fafaf7] tracking-wider block font-light">"Discretion is our absolute standard."</span>
                <span className="sans-text text-[9px] text-luxury-gold uppercase tracking-widest mt-1.5 block">Eleanor Vance, Principal Partner</span>
              </div>
            </motion.div>

            {/* Small offset floating shape representing high art */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-luxury-gold/20 rounded-full -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/5 rounded-full -z-10" />
          </div>

          {/* Right Block: Brand Narrative (Column: 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
                Established 2016
              </span>
              <h2 className="serif-header text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide leading-tight mb-8">
                Uncompromising Standards, <br />
                <span className="italic font-medium text-luxury-gold/90">Curated Legacies.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6 sans-text text-sm text-gray-300 font-light leading-relaxed tracking-wide"
            >
              <p>
                Maison Elite was founded to serve as a high-end alternative to transactional real estate brokerages. 
                Our mission is simple: to represent the interest of private wealth families, family estates, 
                and forward-thinking collectors with total operational silence and rigorous architectural discretion.
              </p>
              <p>
                We do not showcase listings on public directories; we map the world's most exceptional private 
                residences, and match them with clients whose lives dictate secure, magnificent backdrops. 
                Our deep alignments with internationally acclaimed architects enable us to guide projects from raw hillside plots to custom home completions.
              </p>
            </motion.div>

            {/* Core Values Rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
              
              {/* Pillar 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <EyeOff size={16} className="text-luxury-gold stroke-[1.5]" />
                  <span className="sans-text text-xs text-white uppercase tracking-widest font-semibold">Total Silence</span>
                </div>
                <p className="sans-text text-[11px] text-gray-400 font-light leading-normal">
                  Confidential registration, off-market escrow, and anonymous title storage.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-luxury-gold stroke-[1.5]" />
                  <span className="sans-text text-xs text-white uppercase tracking-widest font-semibold">Bespoke Curation</span>
                </div>
                <p className="sans-text text-[11px] text-gray-400 font-light leading-normal">
                  We look at properties not as inventory, but as physical fine art placements.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-luxury-gold stroke-[1.5]" />
                  <span className="sans-text text-xs text-white uppercase tracking-widest font-semibold">Asset Security</span>
                </div>
                <p className="sans-text text-[11px] text-gray-400 font-light leading-normal">
                  Sovereign consulting across tax benefits and multi-generational vaults.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
