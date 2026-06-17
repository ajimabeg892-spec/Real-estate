/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '#properties' },
    { name: 'Services', href: '#services' },
    { name: 'Story', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Advisors', href: '#advisors' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of sticky navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        id="main-navigation-menu"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#090909]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a
            id="navbar-brand-logo"
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-full border border-luxury-gold/50 flex items-center justify-center relative group-hover:border-luxury-gold transition-colors duration-300">
              <span className="serif-header text-sm font-semibold tracking-wider text-luxury-gold">M</span>
              <div className="absolute inset-0 rounded-full bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="serif-header text-lg font-light tracking-[0.25em] text-white group-hover:text-luxury-gold transition-colors duration-300">Maison</span>
              <span className="sans-text text-[8px] tracking-[0.35em] text-luxury-gold/80 font-light -mt-0.5 uppercase">Elite Private Advisory</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                id={`nav-link-${link.name.toLowerCase()}`}
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="sans-text text-xs tracking-[0.2em] uppercase font-light text-white/70 hover:text-luxury-gold transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Consultation CTA & Language Block */}
          <div className="hidden md:flex items-center gap-6">
            <a
              id="navbar-phone-advisory"
              href="tel:+13105550190"
              className="sans-text text-[11px] tracking-widest text-[#d4af37]/90 hover:text-[#d0c6b1] transition-colors duration-300 flex items-center gap-2 uppercase font-light"
            >
              <PhoneCall size={12} className="stroke-[1.5]" />
              <span>Advisory Desk</span>
            </a>
            
            <button
              id="navbar-btn-consultation"
              onClick={onOpenConsultation}
              className="sans-text text-xs tracking-[0.2em] font-light uppercase border border-luxury-gold/30 hover:border-luxury-gold bg-transparent hover:bg-luxury-gold/10 text-white hover:text-[#fafaf7] px-5 py-2.5 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={13} className="stroke-[1.5]" />
                Book Consultation
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-luxury-gold/5 via-luxury-gold/15 to-luxury-gold/5 transition-transform duration-500 ease-out" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              id="navbar-btn-mobile-consultation"
              onClick={onOpenConsultation}
              className="md:hidden p-2 rounded-full border border-luxury-gold/20 text-luxury-gold"
            >
              <Calendar size={15} />
            </button>
            <button
              id="navbar-btn-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-luxury-gold focus:outline-none p-1"
            >
              <Menu size={24} className="stroke-[1.5]" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="navbar-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-luxury-black/98 backdrop-blur-xl flex flex-col justify-between py-12 px-6"
          >
            <div className="flex items-center justify-between">
              {/* Logo in Drawer */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-luxury-gold/50 flex items-center justify-center">
                  <span className="serif-header text-xs font-semibold text-luxury-gold">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="serif-header text-base font-light tracking-[0.2em] text-white">Maison</span>
                  <span className="sans-text text-[8px] tracking-[0.3em] text-[#d4af37] font-light">Elite Advisory</span>
                </div>
              </div>

              <button
                id="navbar-mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-luxury-gold p-2 border border-white/5 rounded-full"
              >
                <X size={20} className="stroke-[1.5]" />
              </button>
            </div>

            {/* List Links */}
            <div className="flex flex-col gap-6 text-center my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <a
                    id={`nav-link-mobile-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="serif-header text-2xl font-light tracking-[0.15em] text-white hover:text-luxury-gold transition-colors block py-2"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer level contacts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-4 border-t border-white/5 pt-8 text-center"
            >
              <a href="tel:+13105550190" className="sans-text text-xs text-white/80 tracking-widest uppercase">
                Advisory Office: +1 (310) 555-0190
              </a>
              <button
                id="navbar-btn-consultation-mobile"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="sans-text text-xs tracking-widest uppercase bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black px-8 py-3 rounded-full font-medium transition-all"
              >
                Schedule Private Briefing
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
