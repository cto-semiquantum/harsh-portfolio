'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Download, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import Terminal from '@/src/components/Terminal';
import Magnetic from '@/src/components/ui/Magnetic';
import { useSystem } from '@/src/context/SystemContext';

// Loaded client-only — Three.js can't run on the server
const PlanetScene = dynamic(() => import('./PlanetScene'), { ssr: false });

// ─── Icon helpers ─────────────────────────────────────────────────────────────
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

// ─── Framer variants ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0, duration = 0.8) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

const fadeIn = (delay = 0, duration = 0.6) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration, delay } },
});

// ─── Floating Sparks Background Component ─────────────────────────────────────
function FloatingParticles() {
  const { recruiterMode } = useSystem();
  const count = 25;
  const particles = Array.from({ length: count });

  if (recruiterMode) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 5;
        const duration = Math.random() * 6 + 6;
        const left = Math.random() * 100;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/40 shadow-[0_0_8px_rgba(112,0,255,0.6)]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: '-5%',
            }}
            animate={{
              y: ['0vh', '-110vh'],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Hero Component ───────────────────────────────────────────────────────────
export default function Hero() {
  const { recruiterMode, loadingComplete } = useSystem();
  // Mouse Parallax values using springs for butter smooth transitions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 60, damping: 20 };
  const pxTextX = useSpring(useMotionValue(0), springConfig);
  const pxTextY = useSpring(useMotionValue(0), springConfig);
  const pxCharX = useSpring(useMotionValue(0), springConfig);
  const pxCharY = useSpring(useMotionValue(0), springConfig);
  const pxGlowX = useSpring(useMotionValue(0), springConfig);
  const pxGlowY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const x = (e.clientX - cx) / cx;
      const y = (e.clientY - cy) / cy;

      // Parallax translation factors: text moves slightly, character moves opposite, glow moves more
      pxTextX.set(x * 12);
      pxTextY.set(y * 12);
      
      pxCharX.set(x * -20);
      pxCharY.set(y * -20);
      
      pxGlowX.set(x * -35);
      pxGlowY.set(y * -35);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pxTextX, pxTextY, pxCharX, pxCharY, pxGlowX, pxGlowY]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen lg:h-screen flex items-center pt-24 lg:pt-0 overflow-hidden w-full bg-black"
    >
      {/* ── Visual FX Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-[3] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-[2]" />
      
      <FloatingParticles />

      {/* ── 3D Planet (behind content) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loadingComplete || recruiterMode ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: recruiterMode ? 0.1 : 2.0, delay: recruiterMode ? 0 : 0.2 }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <PlanetScene />
      </motion.div>

      {/* ── Main layout grid ── */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Floating Social Icons (Wrapped in Magnetic) */}
        <motion.div
          className="hidden xl:flex flex-col gap-5 fixed left-8 top-1/2 -translate-y-1/2 z-20"
          initial="hidden" 
          animate={loadingComplete || recruiterMode ? "visible" : "hidden"} 
          variants={fadeIn(recruiterMode ? 0 : 1.2)}
        >
          {[
            { icon: <GithubIcon size={20} />,   href: '#' },
            { icon: <LinkedinIcon size={20} />,  href: '#' },
            { icon: <Mail size={20} />,          href: '#' },
            { icon: <Download size={20} />,      href: '#' },
          ].map(({ icon, href }, i) => (
            <Magnetic key={i} range={40}>
              <a
                href={href}
                className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400
                           hover:text-[#00FF00] hover:border-[#00FF00]/40 hover:bg-[#00FF00]/5
                           hover:shadow-[0_0_15px_rgba(0,255,0,0.2)]
                           transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                {icon}
              </a>
            </Magnetic>
          ))}
        </motion.div>

        {/* ── Left Column: Content (7/12 cols) ── */}
        <motion.div 
          className={`space-y-6 lg:pl-10 relative z-10 ${
            recruiterMode ? 'lg:col-span-12 max-w-4xl mx-auto' : 'lg:col-span-7'
          }`}
          style={{ x: pxTextX, y: pxTextY }}
        >
          {/* Recruiter Mode Active Banner */}
          {recruiterMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block bg-yellow-500/10 border border-yellow-500/35 text-yellow-500 font-mono text-[10px] px-3 py-1 rounded-xl uppercase tracking-widest font-black"
            >
              💼 Recruiter Optimization Active (3D Graphics & Animations Bypassed)
            </motion.div>
          )}
          {/* Eyebrow */}
          <motion.p
            className="text-primary font-mono tracking-widest text-xs lg:text-sm font-bold glow-text flex items-center gap-2"
            initial="hidden"
            animate={loadingComplete || recruiterMode ? "visible" : "hidden"}
            variants={fadeUp(recruiterMode ? 0 : 0.1, recruiterMode ? 0.1 : 0.8)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary glow-primary animate-ping" />
            AI ENGINEER • FULL STACK DEVELOPER • CTO
          </motion.p>

          {/* Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase select-none leading-none"
            initial="hidden"
            animate={loadingComplete || recruiterMode ? "visible" : "hidden"}
            variants={fadeUp(recruiterMode ? 0 : 0.25, recruiterMode ? 0.1 : 0.8)}
          >
            Harsh Jha
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-xl font-mono leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1"
            initial="hidden"
            animate={loadingComplete || recruiterMode ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: recruiterMode ? 0 : 0.05,
                  delayChildren: recruiterMode ? 0 : 0.4,
                }
              }
            }}
          >
            {"Building secure AI systems, developer tools & futuristic web infrastructures.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Interactive Terminal */}
          <motion.div
            className="w-full max-w-xl"
            initial="hidden"
            animate={loadingComplete || recruiterMode ? "visible" : "hidden"}
            variants={fadeUp(recruiterMode ? 0 : 0.55, recruiterMode ? 0.1 : 0.8)}
          >
            <Terminal />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate={loadingComplete || recruiterMode ? "visible" : "hidden"}
            variants={fadeUp(recruiterMode ? 0 : 0.75, recruiterMode ? 0.1 : 0.8)}
          >
            <Magnetic>
              <button 
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-bold
                           transition-all flex items-center gap-2 glow-primary cursor-pointer border border-primary/50"
              >
                View Projects
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Magnetic>
            <Magnetic>
              <Link 
                href="/resume" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-6 py-3.5
                           rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer inline-flex items-center"
              >
                Resume <Download size={18} />
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ── Right Column: Nyx Hologram (5 cols) ── */}
        {!recruiterMode && (
          <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[600px] flex items-center justify-center z-0">
            
            {/* Purple Atmospheric Glow Behind Character */}
            <motion.div
              className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full filter blur-[80px] pointer-events-none opacity-40 lg:opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(112, 0, 255, 0.45) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 70%)',
                x: pxGlowX,
                y: pxGlowY,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Secondary glowing ring */}
            <div className="absolute w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full border border-primary/10 animate-[spin_25s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-cyan-500/5 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

            {/* Floating Cyber Character Hologram Wrapper */}
            <motion.div
              className="relative w-[320px] h-[380px] lg:w-[420px] lg:h-[500px] select-none pointer-events-none z-10 scanlines"
              initial={{ opacity: 0, y: 20 }}
              animate={loadingComplete || recruiterMode ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: recruiterMode ? 0.15 : 1.2, ease: 'easeOut', delay: recruiterMode ? 0 : 0.4 }}
            >
              {/* Floating inner container */}
              <motion.div
                className="w-full h-full relative"
                style={{ x: pxCharX, y: pxCharY }}
                animate={recruiterMode ? {} : { y: [0, -15, 0] }}
                transition={recruiterMode ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Hologram glitch effects */}
                <div className="absolute inset-0 bg-[#7000FF]/5 mix-blend-color z-20 rounded-2xl" />
                
                <Image
                  src="/images/nyx_character.png"
                  alt="Nyx AI Character"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain drop-shadow-[0_0_35px_rgba(112,0,255,0.4)] opacity-90 transition-opacity duration-500"
                  priority
                />

                {/* Glowing Scanline overlay indicator */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF00] to-transparent opacity-40 z-30"
                  animate={{
                    top: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Interactive CTO Card */}
            <motion.div
              className="absolute bottom-4 right-4 lg:bottom-12 lg:right-0 bg-black/85 backdrop-blur-md
                         border border-white/10 rounded-2xl p-4 items-center gap-4 glow-primary
                         hover:border-[#00FF00]/40 transition-all cursor-default z-20 flex"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={loadingComplete || recruiterMode ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: recruiterMode ? 0 : 1.0, duration: 0.7 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(112,0,255,0.3)' }}
            >
              <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30">
                <div className="w-8 h-8 flex items-center justify-center text-primary font-bold text-xl select-none">
                  N<span className="text-white">X</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold font-mono text-sm">CTO UNIT</h3>
                  <span className="w-2 h-2 rounded-full bg-[#00FF00] glow-green animate-pulse" />
                </div>
                <p className="text-gray-400 text-xs font-mono">SemiQuantum<br/>Technologies</p>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
}
