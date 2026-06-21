'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SystemContextProps {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  fpsLow: boolean;
  easterEggActive: boolean;
  setEasterEggActive: (val: boolean) => void;
  loadingComplete: boolean;
  setLoadingComplete: (val: boolean) => void;
}

const SystemContext = createContext<SystemContextProps | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [fpsLow, setFpsLow] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Web Audio Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; lfo: OscillatorNode } | null>(null);

  // Toggle recruiter mode class on body for CSS overrides
  useEffect(() => {
    if (recruiterMode) {
      document.body.classList.add('recruiter-mode');
    } else {
      document.body.classList.remove('recruiter-mode');
    }
  }, [recruiterMode]);

  // 1. Web Audio Synth Engine
  useEffect(() => {
    if (audioEnabled) {
      try {
        // Initialize AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Low hum oscillators
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 55; // low A hum

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = 110; // octave harmonic

        // Low pass filter to make it warmer/subtler
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150;
        filter.Q.value = 1.0;

        // LFO to modulate the filter for "breathing" cyber effect
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.15; // slow speed

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 40; // modulate filter range ±40Hz

        // Master Gain (extremely quiet hum)
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        // Fade-in audio to prevent pop sounds
        masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
        gainNodeRef.current = masterGain;

        // Connections
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency); // Modulate filter cutoff

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        // Start Oscillators
        osc1.start(0);
        osc2.start(0);
        lfo.start(0);

        oscsRef.current = { osc1, osc2, lfo };

        // Handle browser autoplay policy
        if (ctx.state === 'suspended') {
          const resume = () => {
            ctx.resume();
            window.removeEventListener('click', resume);
          };
          window.addEventListener('click', resume);
        }
      } catch (err) {
        console.error("Web Audio API failed to load: ", err);
      }
    } else {
      // Fade-out and stop audio
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const gain = gainNodeRef.current;
        
        try {
          gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
          
          setTimeout(() => {
            if (oscsRef.current) {
              oscsRef.current.osc1.stop();
              oscsRef.current.osc2.stop();
              oscsRef.current.lfo.stop();
            }
            ctx.close();
            audioCtxRef.current = null;
            gainNodeRef.current = null;
            oscsRef.current = null;
          }, 600);
        } catch (e) {
          // Context might already be closed
        }
      }
    }

    return () => {
      // Cleanup audio context if unmounting
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, [audioEnabled]);

  // 2. FPS Protection Monitor
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;
    const fpsHistory: number[] = [];
    const minFps = 40;
    
    // 5 second delay before monitoring to ignore initial page loads
    const startDelay = setTimeout(() => {
      const monitor = () => {
        frameCount++;
        const now = performance.now();
        const elapsed = now - lastTime;

        if (elapsed >= 1000) {
          const currentFps = Math.round((frameCount * 1000) / elapsed);
          fpsHistory.push(currentFps);
          if (fpsHistory.length > 3) {
            fpsHistory.shift();
          }

          // Evaluate last 3 seconds
          if (fpsHistory.length === 3) {
            const avgFps = fpsHistory.reduce((a, b) => a + b, 0) / 3;
            if (avgFps < minFps) {
              setFpsLow(true);
            } else {
              setFpsLow(false);
            }
          }

          frameCount = 0;
          lastTime = now;
        }

        animId = requestAnimationFrame(monitor);
      };
      
      animId = requestAnimationFrame(monitor);
    }, 5000);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <SystemContext.Provider
      value={{
        recruiterMode,
        setRecruiterMode,
        audioEnabled,
        setAudioEnabled,
        fpsLow,
        easterEggActive,
        setEasterEggActive,
        loadingComplete,
        setLoadingComplete,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}
