/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Video, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Map, 
  Sparkles, 
  RotateCcw, 
  Play, 
  Pause,
  ChevronRight,
  ChevronLeft,
  Tv,
  HelpCircle
} from 'lucide-react';
import { Property, VirtualTourRoom, VirtualTourHotspot } from '../data/properties';

interface VirtualTourViewerProps {
  property: Property;
  initialMode?: '3d' | 'video';
  isEmbedded?: boolean;
}

export default function VirtualTourViewer({ 
  property, 
  initialMode = '3d', 
  isEmbedded = true 
}: VirtualTourViewerProps) {
  const [mode, setMode] = useState<'3d' | 'video'>(initialMode);
  
  // 3D Tour State
  const [currentRoomId, setCurrentRoomId] = useState<string>(property.virtualTour.rooms[0]?.id || 'foyer');
  const [panX, setPanX] = useState<number>(-100); // offset pan
  const [panY, setPanY] = useState<number>(-30);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showFloorPlan, setShowFloorPlan] = useState<boolean>(false);
  const [viewPreset, setViewPreset] = useState<'default' | 'golden' | 'noir' | 'vibrant'>('default');
  const [showTutorial, setShowTutorial] = useState<boolean>(true);
  
  // Ambient Sound Synth State
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  
  // HD Video Walkthrough State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(15);
  const [activeNarrativeIdx, setActiveNarrativeIdx] = useState<number>(0);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    noiseSource?: AudioBufferSourceNode;
    lfo?: OscillatorNode;
    filter?: BiquadFilterNode;
    gain?: GainNode;
    chimesGain?: GainNode;
  }>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rooms = property.virtualTour.rooms;
  const currentRoom = rooms.find(r => r.id === currentRoomId) || rooms[0];

  // Sync mode if initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, property]);

  // Handle ambient synthesize audio (Cozy and realistic Soundscapes)
  useEffect(() => {
    if (audioEnabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // 1. Noise Generator for wind/ocean/crackle textures
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = buffer;
        noiseNode.loop = true;

        const mainFilter = ctx.createBiquadFilter();
        mainFilter.type = 'lowpass';
        
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.06, ctx.currentTime);

        noiseNode.connect(mainFilter);
        mainFilter.connect(mainGain);
        mainGain.connect(ctx.destination);
        noiseNode.start();

        synthNodesRef.current.noiseSource = noiseNode;
        synthNodesRef.current.filter = mainFilter;
        synthNodesRef.current.gain = mainGain;

        // Soundscape types configuration
        const soundType = property.virtualTour.ambientAudio;
        if (soundType === 'ocean') {
          // Modulate Ocean Wave Sweeps via low frequency oscillator
          mainFilter.frequency.setValueAtTime(350, ctx.currentTime);
          
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // 12 seconds per sweep loop
          
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(250, ctx.currentTime); // Sweep range

          lfo.connect(lfoGain);
          lfoGain.connect(mainFilter.frequency);
          lfo.start();

          synthNodesRef.current.lfo = lfo;

          // Gentle ambient chime on timeout
          const scheduleOceanChime = () => {
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
            playSoftBell(ctx, 440 + Math.random() * 220, 0.05);
            setTimeout(scheduleOceanChime, 8000 + Math.random() * 7000);
          };
          setTimeout(scheduleOceanChime, 3000);

        } else if (soundType === 'fireplace' || soundType === 'forest') {
          // Simulate Cozy Hearth Crackles using bandpass filters
          mainFilter.frequency.setValueAtTime(180, ctx.currentTime);
          
          const crackleGain = ctx.createGain();
          crackleGain.gain.setValueAtTime(0.03, ctx.currentTime);

          // Spawn random little pops
          const makePop = () => {
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
            const popOsc = ctx.createOscillator();
            const popGain = ctx.createGain();
            popOsc.type = 'triangle';
            popOsc.frequency.setValueAtTime(80 + Math.random() * 120, ctx.currentTime);
            
            popGain.gain.setValueAtTime(0.08, ctx.currentTime);
            popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            
            popOsc.connect(popGain);
            popGain.connect(ctx.destination);
            popOsc.start();
            popOsc.stop(ctx.currentTime + 0.1);

            setTimeout(makePop, 100 + Math.random() * 1400);
          };
          makePop();

        } else if (soundType === 'city' || soundType === 'lounge') {
          // Low warm jazz synth drone
          mainFilter.frequency.setValueAtTime(150, ctx.currentTime);
          
          const padOsc1 = ctx.createOscillator();
          const padOsc2 = ctx.createOscillator();
          const padGain = ctx.createGain();

          padOsc1.type = 'triangle';
          padOsc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 Note
          
          padOsc2.type = 'triangle';
          padOsc2.frequency.setValueAtTime(138.61, ctx.currentTime); // C#3 Note

          padGain.gain.setValueAtTime(0.015, ctx.currentTime);

          padOsc1.connect(padGain);
          padOsc2.connect(padGain);
          padGain.connect(ctx.destination);

          padOsc1.start();
          padOsc2.start();

          const scheduleBell = () => {
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
            // Pentatonic luxury notes
            const notes = [220, 277.18, 329.63, 440, 554.37];
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            playSoftBell(ctx, randomNote, 0.08);
            setTimeout(scheduleBell, 5000 + Math.random() * 5000);
          };
          setTimeout(scheduleBell, 2000);
        }

      } catch (err) {
        console.warn('AudioContext failed to boot securely:', err);
      }
    } else {
      cleanupSynth();
    }

    return () => cleanupSynth();
  }, [audioEnabled, property]);

  const playSoftBell = (ctx: AudioContext, freq: number, gainVal: number) => {
    try {
      const osc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      bellGain.gain.setValueAtTime(0, ctx.currentTime);
      bellGain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.05);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      
      osc.connect(bellGain);
      bellGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3);
    } catch (_) {}
  };

  const cleanupSynth = () => {
    try {
      if (synthNodesRef.current.noiseSource) {
        synthNodesRef.current.noiseSource.stop();
      }
      if (synthNodesRef.current.lfo) {
        synthNodesRef.current.lfo.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } catch (_) {}
    audioContextRef.current = null;
    synthNodesRef.current = {};
  };

  // Video narrative step controller (Subtitles overlay sync)
  useEffect(() => {
    if (mode === 'video') {
      const interval = setInterval(() => {
        if (isPlaying) {
          setVideoProgress(prev => {
            const next = prev + (0.4 * videoSpeed);
            if (next >= 100) {
              setActiveNarrativeIdx(0);
              return 0;
            }
            // Sync active comments
            const narrativeCount = property.virtualTour.narrative.length;
            const blockPercent = 100 / narrativeCount;
            const currentIdx = Math.floor(next / blockPercent);
            if (currentIdx !== activeNarrativeIdx && currentIdx < narrativeCount) {
              setActiveNarrativeIdx(currentIdx);
            }
            return next;
          });
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [mode, isPlaying, videoSpeed, activeNarrativeIdx, property]);

  // Handle Drag Panning for 3D simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panX, y: e.clientY - panY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    
    // Bounds constraints to prevent panning out of context
    const maxBoundX = 0;
    const minBoundX = -250;
    const maxBoundY = 0;
    const minBoundY = -90;

    setPanX(Math.max(minBoundX, Math.min(maxBoundX, newX)));
    setPanY(Math.max(minBoundY, Math.min(maxBoundY, newY)));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { 
        x: e.touches[0].clientX - panX, 
        y: e.touches[0].clientY - panY 
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - dragStartRef.current.x;
    const newY = e.touches[0].clientY - dragStartRef.current.y;
    
    const maxBoundX = 0;
    const minBoundX = -250;
    const maxBoundY = 0;
    const minBoundY = -90;

    setPanX(Math.max(minBoundX, Math.min(maxBoundX, newX)));
    setPanY(Math.max(minBoundY, Math.min(maxBoundY, newY)));
  };

  // Preset Filters
  const getFilterCSS = () => {
    switch (viewPreset) {
      case 'golden':
        return 'sepia(0.20) contrast(1.10) saturate(1.15) brightness(0.95)';
      case 'noir':
        return 'contrast(1.20) brightness(0.85) saturate(0.1) sepia(0.05)';
      case 'vibrant':
        return 'saturate(1.4) contrast(1.05) brightness(1.02)';
      default:
        return 'none';
    }
  };

  // Toggle fullscreen state safely inside iframe limits
  const toggleFullscreen = () => {
    // If we cannot request actual browser fullscreen due to sandbox iframe limits,
    // we toggle a beautiful mock viewport-filling layout
    setIsFullScreen(!isFullScreen);
  };

  // Jump room handle
  const handleRoomTransition = (targetId: string) => {
    setCurrentRoomId(targetId);
    // Reset camera central
    setPanX(-100);
    setPanY(-30);
    // Silent pop transition feedback
    if (audioContextRef.current) {
      playSoftBell(audioContextRef.current, 600, 0.02);
    }
  };

  return (
    <div 
      id={`tour-viewer-${property.id}`}
      ref={containerRef}
      className={`relative select-none bg-black overflow-hidden transition-all duration-500 rounded-xl border border-white/5 shadow-2xl ${
        isFullScreen 
          ? 'fixed inset-0 z-[100] rounded-none border-0' 
          : 'w-full h-full min-h-[360px] md:min-h-[460px]'
      }`}
    >
      {/* 1. Header Navigation Bar */}
      <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#fafaf7]">
            {mode === '3d' ? '3D Active Panorama' : 'HD Walkthrough Broadcast'}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
          <button
            onClick={() => setMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all ${
              mode === '3d' 
                ? 'bg-luxury-gold text-luxury-black font-bold' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Compass size={11} className={mode === '3d' ? 'animate-spin-slow' : ''} />
            3D Space
          </button>
          <button
            onClick={() => setMode('video')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold transition-all ${
              mode === 'video' 
                ? 'bg-luxury-gold text-luxury-black font-bold' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Video size={11} />
            Cinematic
          </button>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Ambient Sound Sync */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-full border transition-all duration-300 ${
              audioEnabled 
                ? 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/40' 
                : 'bg-black/40 border-white/10 text-gray-400 hover:text-[#fafaf7]'
            }`}
            title="Acoustic Ambience loop"
          >
            {audioEnabled ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
          </button>

          {/* Expanded Full Screen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/40 border border-white/10 text-gray-400 hover:text-[#fafaf7] transition-all"
            title="Toggle presentation stage"
          >
            {isFullScreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* 2. Primary Showcase Area */}
      <div className="w-full h-full relative" style={{ height: isFullScreen ? '100vh' : '100%' }}>
        <AnimatePresence mode="wait">
          {mode === '3d' ? (
            /* 3D Panorama Simulation Stage */
            <motion.div
              key={`pan-${currentRoomId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUpOrLeave}
              className={`w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative flex items-center justify-center`}
            >
              {/* Ultra wide panning image backdrop */}
              <img
                src={currentRoom.image}
                alt={currentRoom.name}
                referrerPolicy="no-referrer"
                style={{
                  transform: `translate(${panX}px, ${panY}px) scale(1.20)`,
                  filter: getFilterCSS(),
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="absolute w-[180%] h-[125%] max-w-none object-cover pointer-events-none"
              />

              {/* Dynamic hotspot pins */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: `translate(${panX}px, ${panY}px) scale(1.20)`,
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {currentRoom.hotspots.map((spot, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoomTransition(spot.targetRoomId);
                    }}
                    className="absolute pointer-events-auto p-1.5 flex flex-col items-center group/spot cursor-pointer"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <div className="relative flex h-8 w-8 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold/50 opacity-75"></span>
                      <div className="relative rounded-full h-4 w-4 bg-luxury-gold shadow-md shadow-black flex items-center justify-center border border-[#fafaf7]">
                        <Compass className="text-luxury-black stroke-[2.5]" size={9} />
                      </div>
                    </div>
                    
                    <span className="caption-pill mt-1 whitespace-nowrap bg-luxury-black/90 backdrop-blur-md text-[#fafaf7] text-[8.5px] tracking-widest font-semibold px-2.5 py-1 rounded border border-[#fafaf7]/10 opacity-60 group-hover/spot:opacity-100 transition-opacity uppercase shadow-xl">
                      {spot.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Central crosshair helper for mobile panning */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-10 h-10 border border-dashed border-[#fafaf7] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#fafaf7] rounded-full" />
                </div>
              </div>
            </motion.div>
          ) : (
            /* HD Video Walkthrough Stage */
            <motion.div
              key="video-walk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative bg-[#050505] flex items-center justify-center"
            >
              {/* Cinematic Video Player */}
              <video
                ref={videoRef}
                src={property.virtualTour.videoUrl}
                playsInline
                muted
                autoPlay={isPlaying}
                loop
                style={{ filter: getFilterCSS() }}
                className="w-full h-full object-cover"
              />

              {/* Video subtle vignetting shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

              {/* Narrative Overlay block */}
              <div className="absolute bottom-16 inset-x-0 px-6 z-20 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNarrativeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl bg-luxury-black/85 backdrop-blur-md rounded-2xl p-4 border border-[#fafaf7]/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center text-[#fafaf7]"
                  >
                    <span className="text-[8px] uppercase font-bold text-luxury-gold tracking-[0.2em] mb-1 block">Luxury Narrative Guide</span>
                    <p className="sans-text text-[10.5px] sm:text-xs font-light leading-relaxed tracking-wide italic">
                      &ldquo;{property.virtualTour.narrative[activeNarrativeIdx]}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Left/Right manual sequence buttons */}
              <button
                onClick={() => {
                  setActiveNarrativeIdx(prev => (prev - 1 + property.virtualTour.narrative.length) % property.virtualTour.narrative.length);
                  setVideoProgress(prev => Math.max(0, prev - (100 / property.virtualTour.narrative.length)));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-luxury-gold/20 hover:text-luxury-gold text-white/70 border border-white/5 transition-all hidden sm:flex"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => {
                  setActiveNarrativeIdx(prev => (prev + 1) % property.virtualTour.narrative.length);
                  setVideoProgress(prev => Math.min(99, prev + (100 / property.virtualTour.narrative.length)));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-luxury-gold/20 hover:text-luxury-gold text-white/70 border border-white/5 transition-all hidden sm:flex"
              >
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Drag Instruction Helper Overlay */}
      {showTutorial && mode === '3d' && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          onAnimationComplete={() => setShowTutorial(false)}
          className="absolute inset-x-8 top-1/3 z-20 flex flex-col items-center text-center pointer-events-none"
        >
          <div className="bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center text-white max-w-xs shadow-2xl">
            <Compass className="text-luxury-gold animate-bounce mb-2 stroke-[1.5]" size={28} />
            <span className="serif-header text-[12px] uppercase font-light tracking-widest text-luxury-gold">Drag To Look Around</span>
            <span className="sans-text text-[9px] text-[#8a7a63] font-light mt-1 uppercase tracking-widest">
              Tap compass pins &bull; Explores luxury rooms
            </span>
          </div>
        </motion.div>
      )}

      {/* 4. Bottom Control HUD Panel */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-3">
        
        {/* Dynamic Walkthrough Progress Timeline (only for video mode) */}
        {mode === 'video' && (
          <div className="flex items-center gap-3 w-full">
            <span className="display-num text-[8px] text-gray-500 font-medium">0:0{Math.floor((videoProgress / 100) * 12)}</span>
            <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer">
              <div 
                className="h-full bg-luxury-gold transition-all duration-300"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
            <span className="display-num text-[8px] text-gray-500 font-medium">0:12</span>
          </div>
        )}

        {/* Action Controls HUD Layout */}
        <div className="flex items-center justify-between">
          
          {/* LEFT: Preset filter controller */}
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] uppercase tracking-wider text-gray-500 font-semibold hidden sm:inline">Camera Preset</span>
            <div className="flex border border-white/5 bg-black/40 rounded px-1 py-0.5 text-[8.5px] font-medium text-gray-300">
              <button 
                onClick={() => setViewPreset('default')} 
                className={`px-1.5 py-0.5 rounded ${viewPreset === 'default' ? 'bg-luxury-gold text-luxury-black font-bold' : ''}`}
              >
                RAW
              </button>
              <button 
                onClick={() => setViewPreset('golden')} 
                className={`px-1.5 py-0.5 rounded ${viewPreset === 'golden' ? 'bg-luxury-gold text-luxury-black font-bold' : ''}`}
              >
                WARM
              </button>
              <button 
                onClick={() => setViewPreset('noir')} 
                className={`px-1.5 py-0.5 rounded ${viewPreset === 'noir' ? 'bg-luxury-gold text-luxury-black font-bold' : ''}`}
              >
                NOIR
              </button>
              <button 
                onClick={() => setViewPreset('vibrant')} 
                className={`px-1.5 py-0.5 rounded ${viewPreset === 'vibrant' ? 'bg-luxury-gold text-luxury-black font-bold' : ''}`}
              >
                VIVID
              </button>
            </div>
          </div>

          {/* MIDDLE: Active Location Label & Room Selector / Media Buttons */}
          <div className="flex items-center gap-3">
            {mode === '3d' ? (
              <div className="flex items-center gap-2">
                <span className="sans-text text-[8px] uppercase tracking-widest text-[#8a7a63]">Active Room</span>
                <span className="serif-header text-[11px] sm:text-[13px] text-luxury-gold tracking-widest uppercase bg-black/60 px-3.5 py-1 rounded-full border border-white/5 font-light">
                  {currentRoom.name}
                </span>
                
                {/* Micro Floor Plan view trigger */}
                <button
                  onClick={() => setShowFloorPlan(!showFloorPlan)}
                  className={`p-1.5 rounded-full border transition-all ${
                    showFloorPlan 
                      ? 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/40' 
                      : 'bg-black/50 border-white/10 text-gray-400 hover:text-white'
                  }`}
                  title="View floor blueprint"
                >
                  <Map size={12} />
                </button>
              </div>
            ) : (
              /* Playback elements for cinematic video */
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full bg-luxury-gold text-luxury-black shadow-lg hover:scale-105 active:scale-95 transition-all text-luxury-black font-bold"
                >
                  {isPlaying ? <Pause size={10} className="fill-current" /> : <Play size={10} className="fill-current" />}
                </button>
                <div className="flex border border-white/5 bg-black/40 rounded px-1.5 py-0.5 text-[8px]">
                  <button onClick={() => setVideoSpeed(0.5)} className={`px-1 py-0.5 rounded ${videoSpeed === 0.5 ? 'text-luxury-gold font-bold' : 'text-gray-500'}`}>0.5x</button>
                  <button onClick={() => setVideoSpeed(1)} className={`px-1 py-0.5 rounded ${videoSpeed === 1 ? 'text-luxury-gold font-bold' : 'text-gray-500'}`}>1x</button>
                  <button onClick={() => setVideoSpeed(1.5)} className={`px-1 py-0.5 rounded ${videoSpeed === 1.5 ? 'text-luxury-gold font-bold' : 'text-gray-500'}`}>1.5x</button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Quick reset and guide */}
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
            {mode === '3d' && (
              <button 
                onClick={() => {
                  setPanX(-100);
                  setPanY(-30);
                }}
                className="flex items-center gap-1 hover:text-white transition-all pointer-events-auto bg-white/5 px-2.5 py-1 rounded border border-white/5 active:scale-95"
              >
                <RotateCcw size={10} /> Reset Camera
              </button>
            )}
            <button 
              onClick={() => setShowTutorial(true)}
              className="p-1 text-gray-500 hover:text-white transition-all hidden sm:inline"
              title="Show guide"
            >
              <HelpCircle size={12} />
            </button>
          </div>

        </div>

      </div>

      {/* 5. Expanded Blueprint Floor Plan Overlay */}
      <AnimatePresence>
        {showFloorPlan && mode === '3d' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-16 right-4 z-40 bg-luxury-black/95 border border-[#fafaf7]/10 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-60 text-[#fafaf7]"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[#fafaf7]/10 mb-3">
              <span className="serif-header text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37]">Blueprint Level 1</span>
              <button 
                onClick={() => setShowFloorPlan(false)}
                className="text-[9px] text-gray-400 hover:text-white uppercase font-light"
              >
                hide
              </button>
            </div>

            {/* Vector style structural map */}
            <div className="relative aspect-[4/3] bg-coal/80 border border-white/5 rounded-lg flex items-center justify-center overflow-hidden mb-3">
              <svg className="absolute inset-0 w-full h-full stroke-gray-700 stroke-1 fill-none p-3" viewBox="0 0 100 80">
                {/* Outlines of a luxury floor plan */}
                <rect x="5" y="5" width="90" height="70" rx="3" className="stroke-white/10" strokeDasharray="2 2" />
                <line x1="33" y1="5" x2="33" y2="75" className="stroke-white/10" strokeDasharray="3 3" />
                <line x1="66" y1="5" x2="66" y2="75" className="stroke-white/10" strokeDasharray="3 3" />
                <line x1="5" y1="40" x2="95" y2="40" className="stroke-white/10" strokeDasharray="3 3" />
                
                {/* Abstract wall elements */}
                <path d="M 5 40 L 40 40 M 60 40 L 95 40 M 33 20 L 33 60" className="stroke-luxury-gold/20 stroke-1.5" />
              </svg>

              {/* Dynamic room links mapped above */}
              <div className="absolute inset-0 p-3">
                {rooms.map((room, index) => {
                  // Fixed coordinate nodes representation
                  const coords = [
                    { x: 30, y: 55 }, // foyer
                    { x: 50, y: 35 }, // living
                    { x: 75, y: 65 }, // pool / patio
                    { x: 20, y: 25 }, // suite / kitchen
                  ];
                  const pos = coords[index] || { x: 50, y: 50 };

                  const isActive = room.id === currentRoomId;

                  return (
                    <button
                      key={room.id}
                      onClick={() => handleRoomTransition(room.id)}
                      className="absolute group/node -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-luxury-gold opacity-75"></span>
                        )}
                        <div className={`w-2.5 h-2.5 rounded-full border transition-all ${
                          isActive 
                            ? 'bg-luxury-gold border-white scale-125' 
                            : 'bg-luxury-coal border-gray-600 hover:border-luxury-gold'
                        }`} />
                        
                        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 bg-black/95 text-white/90 text-[7px] tracking-widest border border-white/10 px-1 py-0.5 rounded whitespace-nowrap opacity-0 group-hover/node:opacity-100 uppercase transition-opacity scale-90 pointer-events-none">
                          {room.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector list */}
            <div className="space-y-1 text-[9.5px]">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleRoomTransition(room.id)}
                  className={`w-full text-left px-2 py-1 rounded flex items-center justify-between transition-colors ${
                    room.id === currentRoomId
                      ? 'bg-luxury-gold text-luxury-black font-semibold'
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="truncate uppercase tracking-wider">{room.name}</span>
                  {room.id === currentRoomId && <span className="text-[7px] font-bold tracking-widest bg-black text-luxury-gold px-1 py-0.5 rounded">LIVE</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
