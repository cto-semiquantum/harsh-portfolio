'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSystem } from '@/src/context/SystemContext';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logLinesRef = useRef<HTMLDivElement>(null);
  const [progressVal, setProgressVal] = useState(0);
  const { audioEnabled, setAudioEnabled, setLoadingComplete } = useSystem();

  const bootLines = [
    { text: "Initializing Neural Core...", status: "OK" },
    { text: "Loading AI Modules...", status: "OK" },
    { text: "Loading Quantum Systems...", status: "OK" },
    { text: "Connecting Secure Network...", status: "SECURE" },
    { text: "Loading Project Database...", status: "OK" },
    { text: "Verifying Identity...", status: "VERIFIED" },
    { text: "Access Granted.", status: "ACCESS_GRANTED" }
  ];

  // Helper to synthesize sound effects locally using Web Audio API
  const playSynthSound = (type: 'beep' | 'success' | 'riser' | 'glitch') => {
    if (!audioEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'success') {
        // Double chime
        const playChime = (freq: number, startDelay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
          gain.gain.setValueAtTime(0.025, ctx.currentTime + startDelay);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startDelay + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + startDelay);
          osc.stop(ctx.currentTime + startDelay + 0.25);
        };
        playChime(660, 0);
        playChime(880, 0.08);
      } else if (type === 'glitch') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.setValueAtTime(240, ctx.currentTime + 0.03);
        osc.frequency.setValueAtTime(80, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'riser') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(75, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 3.5);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 3.5);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.02, ctx.currentTime + 3.3);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 3.5);
      }
    } catch (e) {
      console.warn("Audio Context block or unsupported: ", e);
    }
  };

  useEffect(() => {
    // Force set loadingComplete state to false initially on load
    setLoadingComplete(false);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Trigger global state shift so components underneath can start executing
          setLoadingComplete(true);
          
          // Camera zoom dissolve transition
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.15,
            filter: 'blur(30px)',
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: onComplete
          });
        }
      });

      // 1. Initial State: Screen starts pitch black, modal invisible
      gsap.set(modalRef.current, { opacity: 0, scale: 0.95 });

      // 2. Slow fade in of the modal container
      tl.to(modalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out'
      }, 0.3);

      // 3. Progress bar fills smoothly (Duration: 3.5 seconds)
      tl.to(progressRef.current, {
        width: '100%',
        duration: 3.5,
        ease: 'power2.out',
        onStart: () => {
          playSynthSound('riser');
        }
      }, 1.2);

      // Animate percentage value counter
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 3.5,
        ease: 'power2.out',
        onUpdate: () => {
          setProgressVal(Math.round(progressObj.value));
        }
      }, 1.2);

      // 4. Staggered reveal of logs with glitch animations and synched beeps
      const lines = logLinesRef.current?.children;
      if (lines) {
        Array.from(lines).forEach((line, index) => {
          const isLast = index === bootLines.length - 1;
          
          tl.fromTo(line, 
            { opacity: 0, x: -15, filter: 'blur(4px)' },
            { 
              opacity: 1, 
              x: 0, 
              filter: 'blur(0px)',
              duration: 0.25, 
              ease: 'power2.out',
              onStart: () => {
                if (isLast) {
                  playSynthSound('success');
                } else {
                  playSynthSound('beep');
                }
                
                // Micro-glitch text distortion when printed
                gsap.fromTo(line, 
                  { skewX: -15, filter: 'hue-rotate(90deg) brightness(1.5)' },
                  { skewX: 0, filter: 'hue-rotate(0deg) brightness(1)', duration: 0.15 }
                );
              }
            }, 
            1.4 + index * 0.5 // stagger delay starting at 1.4s
          );
        });
      }

      // 5. Random subtle screen/matrix skews & hum beeps
      tl.to(modalRef.current, {
        skewX: 1.5,
        x: 3,
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        onStart: () => playSynthSound('glitch')
      }, 2.8);

      tl.to(modalRef.current, {
        skewX: -1.2,
        x: -3,
        duration: 0.05,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        onStart: () => playSynthSound('glitch')
      }, 4.0);

      // 6. Access Granted flash at 4.7s
      const lastLineIdx = bootLines.length - 1;
      if (lines && lines[lastLineIdx]) {
        tl.to(lines[lastLineIdx], {
          opacity: 0.2,
          duration: 0.07,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut'
        }, 4.7);
      }

      // Small delay at the end to hold "ACCESS GRANTED" before dissolve
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center font-mono p-6 select-none scanlines"
    >
      {/* CRT Scanline & grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 65%, rgba(0,0,0,0.7) 100%) pointer-events-none" />

      {/* Main Terminal Window */}
      <div
        ref={modalRef}
        className="w-full max-w-2xl flex flex-col h-[420px] border border-white/10 rounded-2xl bg-black/95 p-6 relative overflow-hidden shadow-[0_0_80px_rgba(112,0,255,0.25)]"
      >
        {/* Glowing holographic corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/45 rounded-tl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/45 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/45 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/45 rounded-br" />
        
        {/* Holographic grid scanline background */}
        <div className="absolute inset-0 cyber-grid opacity-[0.25] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="text-[10px] text-gray-500 ml-2 font-mono uppercase tracking-widest">BOOT_SEQUENCE.SYS</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Direct audio interaction switch */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`text-[9px] font-bold font-mono tracking-widest px-2 py-0.5 rounded border transition-all cursor-pointer ${
                audioEnabled 
                  ? 'border-neon-green/30 bg-neon-green/10 text-neon-green shadow-[0_0_10px_rgba(0,255,0,0.15)]' 
                  : 'border-white/10 bg-white/5 text-gray-500 hover:text-white hover:border-white/20'
              }`}
            >
              [ SOUND: {audioEnabled ? 'ON' : 'OFF'} ]
            </button>
            <span className="text-[10px] text-primary font-bold tracking-widest text-glow-primary">NYX OS v4.2</span>
          </div>
        </div>

        {/* Big OS Identity title */}
        <div className="mb-5 relative z-10">
          <h1 className="text-4xl font-black tracking-widest text-white select-none relative w-fit">
            NYX OS
            <span className="absolute -inset-0.5 bg-primary/20 blur-sm rounded" />
          </h1>
          <p className="text-[9px] text-primary font-bold tracking-widest mt-1.5 uppercase">NEURAL COGNITIVE SYSTEMS</p>
        </div>

        {/* Log Entries Container */}
        <div 
          ref={logLinesRef}
          className="flex-1 space-y-2.5 text-xs text-gray-400 font-mono pr-2 relative z-10"
        >
          {bootLines.map((line, index) => {
            let statusText = "[ OK ]";
            let statusColor = "text-[#00FF00] drop-shadow-[0_0_4px_rgba(0,255,0,0.4)]";

            if (line.status === "SECURE") {
              statusText = "[ SECURE ]";
              statusColor = "text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]";
            } else if (line.status === "VERIFIED") {
              statusText = "[ VERIFIED ]";
              statusColor = "text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]";
            } else if (line.status === "ACCESS_GRANTED") {
              statusText = "[ ACCESS GRANTED ]";
              statusColor = "text-primary drop-shadow-[0_0_6px_rgba(112,0,255,0.6)] font-black text-glow-primary";
            }

            return (
              <div key={index} className="flex items-start opacity-0 leading-relaxed">
                <span className={`mr-3 font-bold shrink-0 text-center min-w-[70px] ${statusColor}`}>{statusText}</span>
                <span className={line.status === "ACCESS_GRANTED" ? "text-white font-bold" : ""}>
                  {line.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Loading Progress Bar */}
        <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between gap-6 relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">INITIALIZING COGNITIVE INTERFACES</span>
            <span className="w-1.5 h-3 bg-[#00FF00] animate-pulse inline-block" />
          </div>
          
          <div className="flex items-center gap-4 w-1/2">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
              <div 
                ref={progressRef}
                className="h-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_12px_rgba(112,0,255,0.8)] w-[0%]"
              />
            </div>
            <span className="text-xs font-mono text-[#00FF00] font-bold min-w-[35px] text-right">
              {progressVal}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
