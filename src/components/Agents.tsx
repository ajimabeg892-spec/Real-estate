/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, Award, Star, Compass } from 'lucide-react';
import { AGENTS } from '../data/properties';

export default function Agents() {
  return (
    <section id="advisors" className="py-24 md:py-32 bg-luxury-charcoal/20 select-none border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
            Private Brokers
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
            Meet the Global <br />
            <span className="italic font-medium text-luxury-gold/90">Portfolio Guardians.</span>
          </h2>
          <div className="w-16 h-[1px] bg-luxury-gold mt-6" />
        </div>

        {/* Advisors Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENTS.map((agent, idx) => (
            <motion.div
              id={`agent-card-${agent.id}`}
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-luxury-coal/70 border border-white/5 rounded-2xl overflow-hidden hover:border-luxury-gold/30 transition-all duration-500 shadow-xl"
            >
              {/* Photo Box */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#090909]">
                <img
                  id={`agent-avatar-${agent.id}`}
                  src={agent.image}
                  alt={agent.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-all duration-700 ease-out brightness-95 group-hover:brightness-100"
                />

                {/* Cover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />

                {/* Experience Badge */}
                <div className="absolute top-4 left-4 z-10 sans-text text-[8px] uppercase tracking-widest bg-luxury-black/90 border border-luxury-gold/20 text-[#d4af37] px-3.5 py-1.5 rounded-full flex items-center gap-1">
                  <Award size={10} />
                  <span>{agent.experience} Active</span>
                </div>
              </div>

              {/* Information Area */}
              <div className="p-6 relative">
                
                {/* Star ranking */}
                <div className="flex gap-1 items-center mb-2 text-luxury-gold">
                  {Array.from({ length: 5 }).map((_, sIdx) => {
                    const isHalf = sIdx === 4 && agent.rating === 4.9;
                    return (
                      <Star
                        key={sIdx}
                        size={10}
                        className={`fill-luxury-gold ${isHalf ? 'opacity-80' : ''}`}
                      />
                    );
                  })}
                  <span className="display-num text-[9px] text-[#fafaf7]/50 ml-1">({agent.rating.toFixed(1)}) ID No.{idx + 1}</span>
                </div>

                <div className="mb-6">
                  <h3 className="serif-header text-xl text-[#fafaf7] group-hover:text-luxury-gold transition-colors duration-300">
                    {agent.name}
                  </h3>
                  <p className="sans-text text-xs text-gray-400 font-light mt-1 tracking-wide">
                    {agent.role}
                  </p>
                </div>

                {/* Secure Contacts */}
                <div className="space-y-2 pt-4 border-t border-white/5 text-xs font-light tracking-wide">
                  <a
                    id={`agent-phone-action-${agent.id}`}
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-luxury-gold transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-luxury-gold group-hover:scale-105 transition-transform">
                      <Phone size={11} />
                    </div>
                    <span>{agent.phone}</span>
                  </a>

                  <a
                    id={`agent-mail-action-${agent.id}`}
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-luxury-gold transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-luxury-gold group-hover:scale-105 transition-transform">
                      <Mail size={11} />
                    </div>
                    <span>{agent.email}</span>
                  </a>
                </div>

                {/* Decorative gold anchor on card hover */}
                <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-15 transition-opacity duration-300">
                  <Compass size={40} className="text-luxury-gold" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
