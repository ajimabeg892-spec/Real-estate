/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Compass, Star, Mail, Phone, MapPin, Minimize2, Check, ArrowRight, User, Camera, Tv } from 'lucide-react';
import { Property, AGENTS } from '../data/properties';
import VirtualTourViewer from './VirtualTourViewer';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  initialMediaMode?: 'photos' | '3d' | 'video';
}

export default function PropertyDetailsModal({ property, onClose, initialMediaMode = 'photos' }: PropertyDetailsModalProps) {
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'amenities' | 'agent'>('details');
  const [mediaMode, setMediaMode] = useState<'photos' | '3d' | 'video'>('photos');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    advisorId: 'agent-1',
    date: '',
    time: '',
    message: ''
  });

  if (!property) return null;

  // Sync mediaMode and activeImage if property or initialMediaMode changes
  useEffect(() => {
    if (property) {
      setMediaMode(initialMediaMode);
      setActiveImage(property.image);
    }
  }, [property, initialMediaMode]);

  const assignedAgent = AGENTS.find(agent => agent.id === property.agentId) || AGENTS[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      // Keep state clear after some time or close nicely
    }, 5000);
  };

  const formattedPrice = property.price.toLocaleString();

  return (
    <AnimatePresence>
      <motion.div
        id="property-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-luxury-black/95 backdrop-blur-xl flex justify-center items-start py-8 px-4 md:py-16 md:px-8"
      >
        <motion.div
          id="property-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="relative bg-luxury-coal border border-white/10 rounded-2xl w-full max-w-6xl shadow-[0_45px_120px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Close Floating Button */}
          <button
            id="property-modal-btn-close"
            onClick={() => {
              setActiveImage('');
              setBookingSubmitted(false);
              onClose();
            }}
            className="absolute top-5 right-5 z-20 p-2.5 bg-black/50 hover:bg-luxury-gold/20 text-white hover:text-luxury-gold border border-white/10 rounded-full transition-all duration-300 shadow-xl"
          >
            <X size={18} className="stroke-[1.5]" />
          </button>

          {/* Grid Layout splits visual gallery and specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Left: Image Gallery (Column: 7) */}
            <div className="lg:col-span-7 flex flex-col bg-[#090909]">
              
              {/* Media Mode Switching Controls */}
              <div className="flex border-b border-white/5 bg-[#0e0e0e]/90 p-1.5 items-center justify-between flex-wrap gap-2">
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
                  <button
                    onClick={() => setMediaMode('photos')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[9px] uppercase font-semibold tracking-[0.1em] transition-all cursor-pointer ${
                      mediaMode === 'photos'
                        ? 'bg-luxury-gold text-luxury-black shadow-lg font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Camera size={11} />
                    Photos ({property.gallery.length})
                  </button>
                  <button
                    onClick={() => setMediaMode('3d')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[9px] uppercase font-semibold tracking-[0.1em] transition-all cursor-pointer ${
                      mediaMode === '3d'
                        ? 'bg-luxury-gold text-luxury-black shadow-lg font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Compass size={11} className={mediaMode === '3d' ? 'animate-spin-slow' : ''} />
                    3D Virtual Tour
                  </button>
                  <button
                    onClick={() => setMediaMode('video')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[9px] uppercase font-semibold tracking-[0.1em] transition-all cursor-pointer ${
                      mediaMode === 'video'
                        ? 'bg-luxury-gold text-luxury-black shadow-lg font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Tv size={11} />
                    HD Walkthrough
                  </button>
                </div>

                <div className="px-2.5 py-1 bg-luxury-gold/5 border border-luxury-gold/20 text-luxury-gold rounded text-[8px] uppercase tracking-[0.15em] mx-2 hidden sm:block">
                  Immersive Stage Enabled
                </div>
              </div>

              {/* Primary Active Showcase */}
              {mediaMode === 'photos' ? (
                <>
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                    <motion.img
                      key={activeImage}
                      id="modal-main-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      src={activeImage}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Floating Info */}
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="serif-header text-[#fafaf7] text-lg font-light tracking-[0.1em] drop-shadow-md">
                        {property.title}
                      </span>
                      <div className="flex items-center gap-1.5 text-[#d4af37] text-xs font-light mt-0.5 drop-shadow-md">
                        <MapPin size={11} />
                        <span>{property.location}</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Thumbnail strip */}
                  <div className="p-4 flex gap-3 overflow-x-auto bg-luxury-coal/30 border-b border-white/5 scrollbar-thin">
                    {property.gallery.map((thumb, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(thumb)}
                        className={`relative w-20 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 flex-shrink-0 ${
                          activeImage === thumb
                            ? 'border-luxury-gold shadow-md shadow-luxury-gold/10'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={thumb}
                          alt={`${property.title} View ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-[#050505] relative w-full h-[360px] md:h-[460px] max-w-full">
                  <VirtualTourViewer 
                    property={property} 
                    initialMode={mediaMode === '3d' ? '3d' : 'video'} 
                    isEmbedded={true} 
                  />
                </div>
              )}

              {/* Static Specifications details */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-4">
                    <span className="sans-text text-[9px] tracking-widest uppercase font-medium bg-luxury-gold text-luxury-black px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    <span className="sans-text text-[9px] tracking-widest uppercase font-medium bg-white/5 border border-white/10 text-white px-3 py-1 rounded-full">
                      Circa {property.yearBuilt} Built
                    </span>
                  </div>
                  <h4 className="serif-header text-xl text-[#fafaf7] tracking-wider mb-3">Architectural Philosophy</h4>
                  <p className="sans-text text-xs text-gray-400 font-light leading-relaxed tracking-wide">
                    {property.description}
                  </p>
                </div>

                {/* Technical data table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 text-gray-300">
                  <div>
                    <span className="sans-text text-[9px] text-[#8a7a63] uppercase tracking-wider block">Suites Config</span>
                    <span className="display-num text-sm text-[#fafaf7] font-medium mt-1 block">{property.beds} Bedrooms</span>
                  </div>
                  <div>
                    <span className="sans-text text-[9px] text-[#8a7a63] uppercase tracking-wider block">Wellness Baths</span>
                    <span className="display-num text-sm text-[#fafaf7] font-medium mt-1 block">{property.baths} Bathrooms</span>
                  </div>
                  <div>
                    <span className="sans-text text-[9px] text-[#8a7a63] uppercase tracking-wider block">Sovereign Area</span>
                    <span className="display-num text-sm text-[#fafaf7] font-medium mt-1 block">{property.sqft.toLocaleString()} Sq Ft</span>
                  </div>
                  <div>
                    <span className="sans-text text-[9px] text-[#8a7a63] uppercase tracking-wider block">Est. Built Value</span>
                    <span className="display-num text-sm text-luxury-gold font-medium mt-1 block">
                      ${property.price >= 1000000 ? `${(property.price / 1000000).toFixed(1)}M` : property.price.toLocaleString()} {property.purpose === 'Rent' ? '/ mo' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lead Generation Advisory Engine (Column: 5) */}
            <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between bg-luxury-charcoal/30">
              
              <div>
                <span className="sans-text text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-medium block mb-2">
                  Confidential Inquiry Desk
                </span>
                <h3 className="serif-header text-2xl font-light text-white tracking-wide mb-6">
                  Acquisition briefing
                </h3>

                {/* Advisor Assignment */}
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-4 mb-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-luxury-gold/30">
                    <img
                      src={assignedAgent.image}
                      alt={assignedAgent.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="sans-text text-[8px] text-luxury-gold uppercase tracking-widest font-semibold block">
                      Assigned Advisor
                    </span>
                    <span className="serif-header text-sm text-white font-medium block">
                      {assignedAgent.name}
                    </span>
                    <span className="sans-text text-[10px] text-gray-400 font-light block">
                      {assignedAgent.role}
                    </span>
                  </div>
                </div>

                {/* Segment Tabs */}
                <div className="flex gap-4 border-b border-white/5 pb-4 mb-6 text-xs font-light">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 tracking-wider uppercase transition-colors relative ${
                      activeTab === 'details' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Information
                  </button>
                  <button
                    onClick={() => setActiveTab('amenities')}
                    className={`pb-1 tracking-wider uppercase transition-colors relative ${
                      activeTab === 'amenities' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Amenities
                  </button>
                  <button
                    onClick={() => setActiveTab('agent')}
                    className={`pb-1 tracking-wider uppercase transition-colors relative ${
                      activeTab === 'agent' ? 'text-luxury-gold border-b border-luxury-gold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Advisor Profile
                  </button>
                </div>

                {/* Tab content rendering */}
                <div className="min-h-[160px] pb-6">
                  {activeTab === 'details' && (
                    <div className="sans-text text-xs font-light text-gray-300 space-y-3 leading-relaxed">
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-400">Off-Market Status</span>
                        <span className="text-luxury-gold font-semibold tracking-widest uppercase">AVAILABLE</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-400">Assigned ID No.</span>
                        <span className="display-num uppercase text-white font-medium">ME-09{property.id.split('-')[1]}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-gray-400">Ownership Tier</span>
                        <span className="text-white">Fee Simple / Absolute</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-400">Primary Curators</span>
                        <span className="text-white">Maison Elite Private Trust</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'amenities' && (
                    <div className="flex flex-wrap gap-2">
                      {property.lifestyle.map((life, index) => (
                        <span
                          key={index}
                          className="sans-text text-[10px] tracking-wider bg-luxury-charcoal hover:bg-luxury-gold/5 hover:border-luxury-gold/30 border border-white/5 text-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <Compass size={11} className="text-luxury-gold" />
                          {life}
                        </span>
                      ))}
                    </div>
                  )}

                  {activeTab === 'agent' && (
                    <div className="space-y-4">
                      <p className="sans-text text-xs text-gray-400 font-light leading-relaxed">
                        With over {assignedAgent.experience} of dedicated market service, {assignedAgent.name} advises international asset portfolios across multiple sovereign regions. Confidently managing complete transaction discretion is our core tenant.
                      </p>
                      
                      <div className="space-y-2 pt-2 text-xs font-light">
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-luxury-gold" />
                          <span className="text-white">{assignedAgent.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={12} className="text-luxury-gold" />
                          <span className="text-white">{assignedAgent.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star size={12} className="fill-luxury-gold text-luxury-gold" />
                          <Star size={12} className="fill-luxury-gold text-luxury-gold" />
                          <Star size={12} className="fill-luxury-gold text-luxury-gold" />
                          <Star size={12} className="fill-luxury-gold text-luxury-gold" />
                          <Star size={12} className="fill-luxury-gold text-luxury-gold" />
                          <span className="text-gray-400 ml-1">Certified Advisor</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation Scheduling Module */}
              <div className="border-t border-white/10 pt-6">
                {!bookingSubmitted ? (
                  <form onSubmit={handleBookTour} className="space-y-4">
                    <span className="sans-text text-[10px] tracking-widest uppercase text-luxury-gold font-medium block">
                      Request Signature Private Briefing
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        id="modal-input-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Your full name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all placeholder:text-gray-600"
                      />
                      <input
                        id="modal-input-email"
                        type="email"
                        name="email"
                        required
                        placeholder="Secure Email address"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        id="modal-input-date"
                        type="date"
                        name="date"
                        required
                        value={bookingData.date}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all cursor-pointer"
                      />
                      <select
                        id="modal-input-time"
                        name="time"
                        required
                        value={bookingData.time}
                        onChange={handleInputChange}
                        className="bg-black/30 border border-white/5 focus:border-luxury-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="">Aesthetic window</option>
                        <option value="09:00 AM">Morning Sunrise (09:00 AM)</option>
                        <option value="01:00 PM">Midday Solstice (01:00 PM)</option>
                        <option value="05:30 PM">Sunset Golden Hour (05:30 PM)</option>
                      </select>
                    </div>

                    <button
                      id="modal-btn-submit"
                      type="submit"
                      className="w-full sans-text text-[11px] font-medium tracking-[0.2em] uppercase bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-black-90 py-3.5 rounded-xl cursor-pointer shadow-lg hover:shadow-luxury-gold/5 active:scale-98 transition-all flex items-center justify-center gap-2 group text-luxury-black font-semibold"
                    >
                      <span>Inquire Off-Market Access</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    id="modal-booking-feedback-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-luxury-gold/10 border border-luxury-gold/30 rounded-xl p-5 text-center flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center mb-3">
                      <Check size={18} className="text-luxury-black" />
                    </div>
                    <span className="serif-header text-base text-[#fafaf7] font-light tracking-wide">
                      Briefing Confirmed
                    </span>
                    <p className="sans-text text-[10.5px] text-gray-400 font-light mt-2 leading-relaxed">
                      Dear {bookingData.name || 'Investor'}, {assignedAgent.name} has reserved the {bookingData.time || 'Golden Hour'} slot on {bookingData.date || 'your selected date'}. A secure credentials docket has been dispatched to {bookingData.email || 'your email'}.
                    </p>
                    <button
                      id="modal-booking-feedback-reset"
                      onClick={() => setBookingSubmitted(false)}
                      className="sans-text text-[9px] text-luxury-gold hover:text-white uppercase tracking-widest mt-4 font-light underline"
                    >
                      Modify Inquiry
                    </button>
                  </motion.div>
                )}
              </div>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
