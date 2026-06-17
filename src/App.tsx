/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, AlertCircle, Building2, ExternalLink } from 'lucide-react';

// Data Imports
import { PROPERTIES, Property } from './data/properties';

// Component Imports
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar, { FilterState } from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import Services from './components/Services';
import AboutStory from './components/AboutStory';
import Gallery from './components/Gallery';
import Agents from './components/Agents';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [tourMediaMode, setTourMediaMode] = useState<'photos' | '3d' | 'video'>('photos');
  
  const handleSelectProperty = (property: Property, mediaMode: 'photos' | '3d' | 'video' = 'photos') => {
    setTourMediaMode(mediaMode);
    setSelectedProperty(property);
  };
  
  // Real-time filtering configuration state
  const [filters, setFilters] = useState<FilterState>({
    purpose: 'All',
    location: 'All',
    type: 'All',
    priceRange: 'All',
    beds: 'All',
  });

  // Calculate filtered listings
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // 1. Filter by purchase purpose (Acquire vs Lease)
      if (filters.purpose !== 'All' && property.purpose !== filters.purpose) {
        return false;
      }

      // 2. Filter by location (sub-string region check)
      if (filters.location !== 'All') {
        const matchesLocation = property.location.toLowerCase().includes(filters.location.toLowerCase());
        if (!matchesLocation) return false;
      }

      // 3. Filter by property type
      if (filters.type !== 'All' && property.type !== filters.type) {
        return false;
      }

      // 4. Filter by suites configuration (beds capacity)
      if (filters.beds !== 'All') {
        const minBeds = parseInt(filters.beds, 10);
        if (property.beds < minBeds) {
          return false;
        }
      }

      // 5. Filter by luxury price bands
      if (filters.priceRange !== 'All') {
        if (filters.priceRange === 'under-1m') {
          // Primarily matching lease rentals
          if (property.price >= 1500000) return false;
        } else if (filters.priceRange === '1m-15m') {
          if (property.price < 1000000 || property.price > 15000000) return false;
        } else if (filters.priceRange === '15m-30m') {
          if (property.price < 15000000 || property.price > 30000000) return false;
        } else if (filters.priceRange === '30m-plus') {
          if (property.price <= 30000000) return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Scroll Actions
  const handleScrollToSection = (selector: string) => {
    const targetElement = document.querySelector(selector);
    if (targetElement) {
      const offset = 80; // account for sticky header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenConsultationModal = () => {
    handleScrollToSection('#contact');
  };

  return (
    <div className="relative min-h-screen bg-[#090909] overflow-hidden text-[#fafaf7] selection:bg-luxury-gold selection:text-luxury-black font-sans leading-relaxed">
      
      {/* 1. Preloader Screen on first load */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Container transitions on preloader complete */}
      {!loading && (
        <motion.div
          id="main-applet-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col min-h-screen"
        >
          {/* 2. Sticky Translucent Navigation */}
          <Navbar onOpenConsultation={handleOpenConsultationModal} />

          {/* 3. Cinematic Hero Banner */}
          <Hero
            onOpenConsultation={handleOpenConsultationModal}
            onExploreProperties={() => handleScrollToSection('#properties')}
          />

          {/* 4. Advanced Property Search Dock */}
          <SearchBar onFilterChange={handleFilterChange} />

          {/* 5. Properties Showcase Section */}
          <section id="properties" className="py-24 md:py-32 bg-luxury-black select-none border-b border-[#181818]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              
              {/* Header Title Grid */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <span className="sans-text text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium block mb-3">
                    Curated Collection
                  </span>
                  <h2 className="serif-header text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
                    Sovereign Listings <br />
                    <span className="italic font-medium text-luxury-gold/90">For Private Escrow.</span>
                  </h2>
                </div>

                {/* Counter metrics display */}
                <div className="sans-text text-[10.5px] uppercase tracking-widest text-[#8a7a63] font-light flex items-center gap-2">
                  <span className="inline-block w-2-h-2 relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold"></span>
                  </span>
                  <span>Dispatched: <strong className="text-white display-num font-medium">{filteredProperties.length}</strong> Masterpieces</span>
                </div>
              </div>

              {/* Grid cards */}
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  <AnimatePresence mode="popLayout">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSelect={handleSelectProperty}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  id="search-empty-feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-luxury-coal border border-white/5 rounded-2xl p-16 text-center max-w-xl mx-auto flex flex-col items-center"
                >
                  <AlertCircle className="text-luxury-gold stroke-[1.2] mb-6" size={44} />
                  <span className="serif-header text-lg text-white font-light tracking-wide">
                    No Matching Sanctuaries Found
                  </span>
                  <p className="sans-text text-xs text-gray-400 font-light mt-3 leading-relaxed tracking-wider">
                    Our international advisors maintain an extensive database of unlisted physical assets 
                    meeting ultra-niche specifications. Please transmit your details to the desk.
                  </p>
                  
                  <button
                    id="search-feedback-btn-reset"
                    onClick={() => setFilters({
                      purpose: 'All',
                      location: 'All',
                      type: 'All',
                      priceRange: 'All',
                      beds: 'All'
                    })}
                    className="sans-text text-[10px] tracking-widest uppercase text-luxury-black bg-luxury-gold hover:bg-luxury-gold-hover px-6 py-3 rounded-full mt-8 font-semibold transition-all shadow-md active:scale-98"
                  >
                    Reset Filter Search
                  </button>
                </motion.div>
              )}

            </div>
          </section>

          {/* 6. Immersive Brand Story */}
          <AboutStory />

          {/* 7. Concierge Advisory Services */}
          <Services />

          {/* 8. Luxury Image Masonry Gallery */}
          <Gallery />

          {/* 9. Specialized Agents Profiles */}
          <Agents />

          {/* 10. Client Testimonials Slideshow */}
          <Testimonials />

          {/* 11. Secure Lead Consultation Form */}
          <ContactForm />

          {/* 12. Immersive Property Listing Discovery Modal Case */}
          <PropertyDetailsModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            initialMediaMode={tourMediaMode}
          />

          {/* 13. High-End Agency Footer */}
          <footer className="bg-[#090909] border-t border-white/5 py-16 text-gray-500 text-xs font-light tracking-wide select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              
              {/* Grid split */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                {/* Column 1: signature brand metadata */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full border border-luxury-gold flex items-center justify-center">
                      <span className="serif-header text-xs text-luxury-gold font-bold">M</span>
                    </div>
                    <span className="serif-header text-lg uppercase tracking-[0.2em] text-[#fafaf7]">Maison Elite</span>
                  </div>
                  <p className="sans-text text-[11px] text-gray-400 leading-relaxed font-light">
                    An award-winning luxury advisory curating extraordinary physical architecture and secure high-net-worth investments globally.
                  </p>
                </div>

                {/* Column 2: navigational lists */}
                <div className="space-y-3">
                  <span className="sans-text text-[9.5px] uppercase tracking-widest text-[#d4af37] font-semibold">Directives</span>
                  <ul className="space-y-2 text-[11px]">
                    <li><button onClick={() => handleScrollToSection('#properties')} className="hover:text-white transition-colors cursor-pointer text-left">Portfolio Listings</button></li>
                    <li><button onClick={() => handleScrollToSection('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Exclusive Services</button></li>
                    <li><button onClick={() => handleScrollToSection('#story')} className="hover:text-white transition-colors cursor-pointer text-left">Brand Integrity</button></li>
                    <li><button onClick={() => handleScrollToSection('#gallery')} className="hover:text-white transition-colors cursor-pointer text-left">Aesthetic Gallery</button></li>
                  </ul>
                </div>

                {/* Column 3: Corporate details */}
                <div className="space-y-3">
                  <span className="sans-text text-[9.5px] uppercase tracking-widest text-[#d4af37] font-semibold">Sovereigns</span>
                  <ul className="space-y-2 text-[11px]">
                    <li>Beverly Hills Desk</li>
                    <li>Saint-Jean-Cap-Ferrat Office</li>
                    <li>Zurich Escrow Trust Desk</li>
                    <li>Malibu Shore Pavilion</li>
                  </ul>
                </div>

                {/* Column 4: Newsletter placeholder */}
                <div className="space-y-4">
                  <span className="sans-text text-[9.5px] uppercase tracking-widest text-[#d4af37] font-semibold">Confidential Updates</span>
                  <p className="sans-text text-[11px] text-gray-400 leading-relaxed font-light">
                    Subscribe to receive seasonal private collections and off-market announcements.
                  </p>
                  
                  {/* Subtle input form */}
                  <div className="flex bg-luxury-charcoal rounded-lg overflow-hidden border border-white/5 focus-within:border-luxury-gold/50 transition-colors">
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter secure email"
                      className="bg-transparent text-white px-3 py-2 text-xs w-full focus:outline-none placeholder:text-gray-600"
                    />
                    <button
                      id="footer-newsletter-btn"
                      onClick={() => alert("Registration confidential. Your access is now secure.")}
                      className="px-3 text-luxury-gold bg-black/40 hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                    >
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sub copyright row */}
              <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-light uppercase tracking-wider leading-relaxed">
                <div className="flex items-center gap-2">
                  <Building2 size={12} className="text-luxury-gold" />
                  <span>&copy; {new Date().getFullYear()} Maison Elite Advisory Private Ltd. All Rights Reserved.</span>
                </div>

                <div className="flex gap-6">
                  <a href="#discretion" className="hover:text-white transition-colors">Discretion Protocol</a>
                  <a href="#compliance" className="hover:text-white transition-colors">SEC Compliance</a>
                  <a href="#security" className="hover:text-white transition-colors">Off-Market Escrow</a>
                </div>
              </div>

            </div>
          </footer>

        </motion.div>
      )}

    </div>
  );
}
