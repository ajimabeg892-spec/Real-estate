/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BedDouble, Bath, Square, MapPin, ArrowUpRight, Compass, Video } from 'lucide-react';
import { Property } from '../data/properties';

interface PropertyCardProps {
  key?: string | number;
  property: Property;
  onSelect: (property: Property, initialMediaMode?: 'photos' | '3d' | 'video') => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  // Format price into USD commas
  const formatPrice = (price: number, purpose: 'Buy' | 'Rent') => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString()}${purpose === 'Rent' ? ' / mo' : ''}`;
  };

  return (
    <motion.div
      id={`property-card-${property.id}`}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(property, 'photos')}
      className="group bg-luxury-charcoal/40 border border-white/5 rounded-2xl overflow-hidden hover:border-luxury-gold/30 cursor-pointer shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-gold/5 flex flex-col h-full"
    >
      {/* Property Image Cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#090909]">
        <img
          id={`property-img-${property.id}`}
          src={property.image}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        
        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Badge Chip left */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="sans-text text-[9px] tracking-[0.2em] font-medium uppercase bg-luxury-coal/90 text-[#fafaf7] px-3.5 py-1.5 rounded-full border border-luxury-gold/25 shadow-md">
            {property.badge}
          </span>
          <span className={`sans-text text-[9px] tracking-[0.2em] font-medium uppercase px-3 y-1 py-1.5 rounded-full shadow-md text-[#0c0c0c] bg-luxury-gold`}>
            {property.purpose === 'Buy' ? 'Acquire' : 'Lease'}
          </span>
        </div>

        {/* Floating details icon trigger */}
        <div className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full bg-luxury-black/85 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 text-luxury-gold">
          <ArrowUpRight size={14} className="stroke-[1.5]" />
        </div>
      </div>

      {/* Card Information */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Tiny Type / Year */}
        <div className="flex justify-between items-center text-[#8a7a63] text-[9.5px] uppercase tracking-widest mb-2.5">
          <span>{property.type}</span>
          <span className="display-num text-[#fafaf7]/50">Circa {property.yearBuilt}</span>
        </div>

        {/* Title & Location */}
        <div className="mb-4">
          <h3 className="serif-header text-lg font-light text-[#fafaf7] group-hover:text-luxury-gold tracking-wide transition-colors duration-300 line-clamp-1">
            {property.title}
          </h3>
          <p className="sans-text text-xs text-gray-400 font-light flex items-center gap-1 mt-1">
            <MapPin size={11} className="stroke-[1.5]" />
            {property.location}
          </p>
        </div>

        {/* Essential Specs Grid */}
        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-4 mb-4 text-gray-300">
          <div className="flex flex-col items-center justify-center border-r border-[#181818]">
            <span className="display-num text-sm text-[#fafaf7] font-medium">{property.beds}</span>
            <span className="sans-text text-[9px] text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-1">
              <BedDouble size={9} /> Suites
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-r border-[#181818]">
            <span className="display-num text-sm text-[#fafaf7] font-medium">{property.baths}</span>
            <span className="sans-text text-[9px] text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-1">
              <Bath size={9} /> Baths
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="display-num text-sm text-[#fafaf7] font-medium">
              {property.sqft.toLocaleString()}
            </span>
            <span className="sans-text text-[9px] text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-1">
              <Square size={9} /> Sq Ft
            </span>
          </div>
        </div>

        {/* Virtual Tour Options Strip */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            id={`property-3d-tour-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(property, '3d');
            }}
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/5 border border-white/5 rounded-lg hover:bg-luxury-gold/10 hover:border-luxury-gold/30 text-[9px] uppercase tracking-wider font-semibold text-gray-300 hover:text-luxury-gold transition-all cursor-pointer"
          >
            <Compass size={11} className="text-luxury-gold animate-spin-slow" />
            3D Tour
          </button>
          <button
            id={`property-video-tour-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(property, 'video');
            }}
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white/5 border border-white/5 rounded-lg hover:bg-luxury-gold/10 hover:border-luxury-gold/30 text-[9px] uppercase tracking-wider font-semibold text-gray-300 hover:text-luxury-gold transition-all cursor-pointer"
          >
            <Video size={11} className="text-luxury-gold" />
            HD Video
          </button>
        </div>

        {/* Pricing tag & View details */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="sans-text text-[8px] text-[#8a7a63] uppercase tracking-widest font-medium">Asking Capital</span>
            <span className="serif-header text-xl font-light text-luxury-gold tracking-wide mt-0.5">
              {formatPrice(property.price, property.purpose)}
            </span>
          </div>

          <span
            id={`property-view-${property.id}`}
            className="sans-text text-[10px] uppercase font-medium tracking-[0.15em] text-[#fafaf7] group-hover:text-luxury-gold group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1"
          >
            View Details
            <span className="text-luxury-gold font-bold">&rarr;</span>
          </span>
        </div>

      </div>
    </motion.div>
  );
}
