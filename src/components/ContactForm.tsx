/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, Send, Compass, MessageCircle, MapPin, Check } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '$10M+',
    interest: 'Acquisition Representing',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppChat = () => {
    // Generate text template for luxury WhatsApp redirect
    const parsedText = encodeURIComponent(
      `Hello Maison Elite Advisory, this is ${formData.name || 'an investor'} requesting a private briefing regarding: ${formData.interest}. Budget context: ${formData.budget}. Please arrange a consultation slot.`
    );
    window.open(`https://wa.me/13105550190?text=${parsedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-luxury-black select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Layout details (two column split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Block: Corporate details info (Column: 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
                Advisory Ingress
              </span>
              <h2 className="serif-header text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide leading-tight mb-8">
                Initiate Private <br />
                <span className="italic font-medium text-luxury-gold/90">Portfolio Alignment.</span>
              </h2>
              <p className="sans-text text-sm text-gray-400 font-light leading-relaxed tracking-wide mb-12 max-w-sm">
                Inquiries are registered securely in our off-market encryption ledger. 
                Our advisors respond directly within a designated 2-hour window.
              </p>

              {/* Secure contacts */}
              <div className="space-y-6 text-sm tracking-wide font-light">
                {/* Desk */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-charcoal border border-white/5 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="sans-text text-[9px] uppercase text-[#8a7a63] tracking-widest block font-medium">International Desk</span>
                    <a href="tel:+13105550190" className="text-white hover:text-luxury-gold transition-colors block mt-1 serif-header text-base">
                      +1 (310) 555-0190
                    </a>
                  </div>
                </div>

                {/* secure email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-charcoal border border-white/5 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="sans-text text-[9px] uppercase text-[#8a7a63] tracking-widest block font-medium">Certified Advisory Registry</span>
                    <a href="mailto:privatedesk@maisonelite.com" className="text-white hover:text-luxury-gold transition-colors block mt-1 serif-header text-base">
                      privatedesk@maisonelite.com
                    </a>
                  </div>
                </div>

                {/* office */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-luxury-charcoal border border-white/5 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="sans-text text-[9px] uppercase text-[#8a7a63] tracking-widest block font-medium">Bespoke Suite</span>
                    <address className="text-[#fafaf7] not-italic block mt-1 sans-text text-xs tracking-wider leading-relaxed">
                      9560 Wilshire Blvd, Beverly Hills,<br />California, 90212, USA
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro details */}
            <div className="mt-16 pt-8 border-t border-white/5 text-[9.5px] uppercase tracking-[0.25em] text-gray-500 font-light flex items-center gap-1.5 leading-relaxed">
              <Compass size={12} className="text-luxury-gold stroke-[1.5]" />
              <span>Full compliance under FINTRAC & SEC Family Trust standards.</span>
            </div>
          </div>

          {/* Right Block: Interactive Lead Generation Card (Column: 7) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-luxury-coal/60 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              
              {!submitted ? (
                <form id="contact-form-secure" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label id="contact-label-name" className="sans-text text-[9px] uppercase tracking-widest text-luxury-gold font-medium">Your Name</label>
                      <input
                        id="contact-input-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Investor full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label id="contact-label-email" className="sans-text text-[9px] uppercase tracking-widest text-luxury-gold font-medium">Secure Email</label>
                      <input
                        id="contact-input-email"
                        type="email"
                        name="email"
                        required
                        placeholder="private@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Grid row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label id="contact-label-phone" className="sans-text text-[9px] uppercase tracking-widest text-luxury-gold font-medium">Telephone Access</label>
                      <input
                        id="contact-input-phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label id="contact-label-budget" className="sans-text text-[9px] uppercase tracking-widest text-[#d4af37] font-medium">Capital Bracket</label>
                        <select
                          id="contact-input-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="$1M - $5M">$1M - $5M</option>
                          <option value="$5M - $15M">$5M - $15M</option>
                          <option value="$15M - $30M">$15M - $30M</option>
                          <option value="$30M+">$30M+</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label id="contact-label-interest" className="sans-text text-[9px] uppercase tracking-widest text-[#d4af37] font-medium">Alinement</label>
                        <select
                          id="contact-input-interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="Acquisition Representing">Acquire</option>
                          <option value="Private Asset Placements">Sell / Lease</option>
                          <option value="Investment Advisory">Invest</option>
                          <option value="White-Glove Estate Management">Manage</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Textarea */}
                  <div className="flex flex-col gap-2">
                    <label id="contact-label-message" className="sans-text text-[9px] uppercase tracking-widest text-luxury-gold font-medium">Confidential Message</label>
                    <textarea
                      id="contact-input-message"
                      name="message"
                      rows={4}
                      placeholder="Specify your private timeline or listing targets..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700 resize-none"
                    />
                  </div>

                  {/* Dual buttons submit & WhatsApp */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                    
                    {/* Send form */}
                    <button
                      id="contact-btn-submit"
                      type="submit"
                      className="flex-1 sans-text text-[11px] font-semibold tracking-[0.2em] uppercase bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black py-4 rounded-xl cursor-pointer shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 text-luxury-black"
                    >
                      <Send size={12} />
                      <span>Transmit Briefing</span>
                    </button>

                    {/* WhatsApp */}
                    <button
                      id="contact-btn-whatsapp"
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="sans-text text-[11px] tracking-[0.2em] uppercase border border-[#25d366]/30 hover:border-[#25d366] hover:bg-[#25d366]/5 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                    >
                      <MessageCircle size={15} className="text-[#25d366] fill-[#25d366]/20" />
                      <span>WhatsApp Secure Desk</span>
                    </button>

                  </div>

                </form>
              ) : (
                <motion.div
                  id="contact-form-feedback-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mb-6">
                    <Check size={28} className="text-luxury-gold" />
                  </div>
                  <h3 className="serif-header text-2xl font-light text-white tracking-widest uppercase mb-4">
                    Briefing Transmitted
                  </h3>
                  <p className="sans-text text-xs text-gray-400 font-light max-w-sm mx-auto leading-relaxed tracking-wider mb-8">
                    An encrypt signature block has securely committed your credentials. Your assigned concierge partner, Eleanor Vance, will telephone your encrypted access line: <span className="text-[#fafaf7] font-normal">{formData.phone}</span> shortly.
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/5 mb-8" />

                  <button
                    id="contact-btn-reset-success"
                    onClick={() => setSubmitted(false)}
                    className="sans-text text-[10px] text-luxury-gold hover:text-white uppercase tracking-widest font-light underline transition-colors"
                  >
                    Transmit another private inquiry
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
