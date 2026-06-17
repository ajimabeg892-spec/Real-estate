/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, SlidersHorizontal, Home, DollarSign, BedDouble, RotateCcw, ShieldCheck } from 'lucide-react';

export interface FilterState {
  purpose: 'Buy' | 'Rent' | 'All';
  location: string;
  type: string;
  priceRange: string;
  beds: string;
}

interface SearchBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function SearchBar({ onFilterChange }: SearchBarProps) {
  const [activePurpose, setActivePurpose] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [beds, setBeds] = useState('All');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const locations = ['All', 'Malibu', 'New York', 'France', 'Switzerland', 'Palm Springs', 'Bel Air'];
  const types = ['All', 'Villa', 'Penthouse', 'Mansion', 'Chalet', 'Estate'];
  const bedsOptions = ['All', '4', '5', '6', '8'];

  const priceRanges = [
    { label: 'All Capital Scales', value: 'All' },
    { label: 'Under $1,000,000 (Lease)', value: 'under-1m' },
    { label: '$1,000,000 - $15,000,000', value: '1m-15m' },
    { label: '$15,000,000 - $30,000,000', value: '15m-30m' },
    { label: '$30,000,000+', value: '30m-plus' }
  ];

  const handleApplyFilters = (updatedPurpose = activePurpose, updatedLoc = location, updatedType = type, updatedPrice = priceRange, updatedBeds = beds) => {
    onFilterChange({
      purpose: updatedPurpose,
      location: updatedLoc,
      type: updatedType,
      priceRange: updatedPrice,
      beds: updatedBeds
    });
  };

  const handlePurposeChange = (purpose: 'All' | 'Buy' | 'Rent') => {
    setActivePurpose(purpose);
    handleApplyFilters(purpose, location, type, priceRange, beds);
  };

  const handleReset = () => {
    setActivePurpose('All');
    setLocation('All');
    setType('All');
    setPriceRange('All');
    setBeds('All');
    onFilterChange({
      purpose: 'All',
      location: 'All',
      type: 'All',
      priceRange: 'All',
      beds: 'All'
    });
  };

  return (
    <div
      id="search-experience-panel"
      className="max-w-6xl mx-auto -mt-20 md:-mt-24 relative z-30 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-luxury-coal/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
      >
        {/* Purpose Toggles & Floating Reset */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-white/5">
            {(['All', 'Buy', 'Rent'] as const).map((mode) => (
              <button
                id={`search-toggle-mode-${mode.toLowerCase()}`}
                key={mode}
                onClick={() => handlePurposeChange(mode)}
                className={`sans-text text-[10px] sm:text-xs tracking-widest uppercase font-medium py-2 px-5 sm:px-7 rounded-full transition-all duration-300 ${
                  activePurpose === mode
                    ? 'bg-luxury-gold text-luxury-black shadow-lg shadow-luxury-gold/10'
                    : 'text-white/60 hover:text-white bg-transparent'
                }`}
              >
                {mode === 'All' ? 'All Portfolio' : mode === 'Buy' ? 'To Acquire' : 'To Lease'}
              </button>
            ))}
          </div>

          <button
            id="search-btn-reset"
            onClick={handleReset}
            className="sans-text text-[10px] sm:text-xs text-luxury-gold/80 hover:text-white tracking-widest uppercase flex items-center gap-2 transition-colors duration-300 py-1"
          >
            <RotateCcw size={12} />
            Reset Custom Filters
          </button>
        </div>

        {/* Primary Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Location Selection */}
          <div className="flex flex-col gap-2">
            <label className="sans-text text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80 font-medium flex items-center gap-1.5">
              <MapPin size={11} className="text-luxury-gold" />
              Destinations
            </label>
            <div className="relative">
              <select
                id="search-select-destination"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  handleApplyFilters(activePurpose, e.target.value, type, priceRange, beds);
                }}
                className="w-full bg-luxury-charcoal/80 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-luxury-gold cursor-pointer appearance-none transition-all duration-300"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-luxury-charcoal text-white">
                    {loc === 'All' ? 'All Global Regions' : loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                <SlidersHorizontal size={12} />
              </div>
            </div>
          </div>

          {/* Property types */}
          <div className="flex flex-col gap-2">
            <label className="sans-text text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80 font-medium flex items-center gap-1.5">
              <Home size={11} className="text-luxury-gold" />
              Sovereign Type
            </label>
            <div className="relative">
              <select
                id="search-select-type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  handleApplyFilters(activePurpose, location, e.target.value, priceRange, beds);
                }}
                className="w-full bg-luxury-charcoal/80 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-luxury-gold cursor-pointer appearance-none transition-all duration-300"
              >
                {types.map((t) => (
                  <option key={t} value={t} className="bg-luxury-charcoal text-white">
                    {t === 'All' ? 'All Architectural Types' : t}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                <SlidersHorizontal size={12} />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label className="sans-text text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80 font-medium flex items-center gap-1.5">
              <DollarSign size={11} className="text-luxury-gold" />
              Capital Bracket
            </label>
            <div className="relative">
              <select
                id="search-select-price"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  handleApplyFilters(activePurpose, location, type, e.target.value, beds);
                }}
                className="w-full bg-luxury-charcoal/80 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-luxury-gold cursor-pointer appearance-none transition-all duration-300"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value} className="bg-luxury-charcoal text-white">
                    {range.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                <SlidersHorizontal size={12} />
              </div>
            </div>
          </div>

          {/* Bedrooms Selector */}
          <div className="flex flex-col gap-2">
            <label className="sans-text text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80 font-medium flex items-center gap-1.5">
              <BedDouble size={11} className="text-luxury-gold" />
              Bedroom Count
            </label>
            <div className="relative">
              <select
                id="search-select-beds"
                value={beds}
                onChange={(e) => {
                  setBeds(e.target.value);
                  handleApplyFilters(activePurpose, location, type, priceRange, e.target.value);
                }}
                className="w-full bg-luxury-charcoal/80 border border-white/10 rounded-xl px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-luxury-gold cursor-pointer appearance-none transition-all duration-300"
              >
                {bedsOptions.map((b) => (
                  <option key={b} value={b} className="bg-luxury-charcoal text-white">
                    {b === 'All' ? 'All Configurations' : `${b}+ Guest Suites`}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                <SlidersHorizontal size={12} />
              </div>
            </div>
          </div>

        </div>

        {/* Small Trust Seal Underneath */}
        <div className="mt-5 flex flex-wrap items-center justify-between text-[#8a7a63] text-[9.5px] tracking-widest uppercase font-light">
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-luxury-gold" />
            Direct Off-Market Private Listing Included
          </span>
          <span className="mt-1 sm:mt-0 text-[9px] tracking-[0.2em] italic capitalize">
            Curated updates matching your search criteria
          </span>
        </div>

      </motion.div>
    </div>
  );
}
