'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useSystem } from '@/src/context/SystemContext';

const WORDS = ['AI ENGINEER', 'FULL STACK DEV', 'CTO', 'SYSTEMS BUILDER', 'PROBLEM SOLVER'];

function WordSwitcher() {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState('word-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('word-out');
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length);
        setAnimClass('word-in');
      }, 420);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden h-[1.1em] relative">
      <span
        key={index}
        className={`${animClass} inline-block font-display font-black uppercase tracking-tight text-[#E63946]`}
        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)', lineHeight: 1.1 }}
      >
        {WORDS[index]}
      </span>
    </div>
  );
}

export default function Hero() {
  const { loadingComplete, recruiterMode } = useSystem();
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);
  const wordRef      = useRef<HTMLDivElement>(null);
  const floatCard1   = useRef<HTMLDivElement>(null);
  const floatCard2   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingComplete && !recruiterMode) return;

    const delay = recruiterMode ? 0 : 0.1;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      const harsh = line1Ref.current?.querySelectorAll('.letter-clip-inner') ?? [];
      const jha   = line2Ref.current?.querySelectorAll('.letter-clip-inner') ?? [];

      tl.fromTo([...harsh],
        { yPercent: 105 },
        { yPercent: 0, duration: 1, stagger: 0.04, delay }
      );
      tl.fromTo([...jha],
        { yPercent: 105 },
        { yPercent: 0, duration: 1, stagger: 0.05 },
        '-=0.7'
      );
      tl.fromTo(wordRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // Animate floating images
      tl.fromTo([floatCard1.current, floatCard2.current],
        { opacity: 0, scale: 0.8, y: 40 },
        { opacity: 0.45, scale: 1, y: 0, duration: 1.2, stagger: 0.1 },
        '-=0.5'
      );

      tl.fromTo(bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        '-=0.3'
      );

      // Mouse parallax hover on floating cards
      const handleMouseMove = (e: MouseEvent) => {
        if (recruiterMode) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        gsap.to(floatCard1.current, {
          x: dx * -35,
          y: dy * -35,
          rotation: dx * -6,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(floatCard2.current, {
          x: dx * 35,
          y: dy * 35,
          rotation: dx * 6,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      // Scroll parallax using GSAP ScrollTrigger
      gsap.to(floatCard1.current, {
        yPercent: -45,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(floatCard2.current, {
        yPercent: -75,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [loadingComplete, recruiterMode]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-16 overflow-hidden"
      style={{ background: '#0a0b14' }}
    >
      {/* Floating Parallax Card 1 (Left background) */}
      {!recruiterMode && (
        <div
          ref={floatCard1}
          className="absolute left-[8%] top-[20%] w-[180px] md:w-[280px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 z-0 pointer-events-none opacity-0 select-none shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        >
          <Image
            src="/images/project_blockchain.png"
            alt="Blockchain abstraction"
            fill
            className="object-cover grayscale opacity-60 contrast-125"
          />
          <div className="absolute inset-0 bg-[#0a0b14]/10" />
        </div>
      )}

      {/* Floating Parallax Card 2 (Right background) */}
      {!recruiterMode && (
        <div
          ref={floatCard2}
          className="absolute right-[6%] bottom-[15%] w-[150px] md:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 z-0 pointer-events-none opacity-0 select-none shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        >
          <Image
            src="/images/project_drone.png"
            alt="Drone system"
            fill
            className="object-cover grayscale opacity-50 contrast-125"
          />
          <div className="absolute inset-0 bg-[#0a0b14]/10" />
        </div>
      )}

      {/* Section label */}
      <div className="px-6 lg:px-10 pt-10 flex items-center justify-between z-10">
        <span className="section-label">Portfolio — 2026</span>
        {recruiterMode && (
          <span className="text-[10px] text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full font-mono uppercase tracking-widest">
            💼 Recruiter Mode
          </span>
        )}
      </div>

      {/* Main headline — MASSIVE */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-10 py-4 z-10 relative">
        {/* HARSH */}
        <div ref={line1Ref} className="overflow-hidden" aria-label="Harsh">
          <div className="flex" style={{ gap: 'clamp(0.05em, 0.5vw, 0.15em)' }}>
            {'HARSH'.split('').map((letter, i) => (
              <div key={i} className="letter-clip">
                <div
                  className="letter-clip-inner font-display font-black text-white uppercase select-none"
                  style={{
                    fontSize: 'clamp(5rem, 17vw, 18rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {letter}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JHA. — with red dot */}
        <div ref={line2Ref} className="overflow-hidden mt-[-0.04em]" aria-label="Jha">
          <div className="flex items-end" style={{ gap: 'clamp(0.05em, 0.5vw, 0.15em)' }}>
            {'JHA'.split('').map((letter, i) => (
              <div key={i} className="letter-clip">
                <div
                  className="letter-clip-inner font-display font-black text-white uppercase select-none"
                  style={{
                    fontSize: 'clamp(5rem, 17vw, 18rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {letter}
                </div>
              </div>
            ))}
            {/* Red dot */}
            <div className="letter-clip self-end mb-[0.04em]">
              <div
                className="letter-clip-inner font-display font-black select-none"
                style={{
                  fontSize: 'clamp(5rem, 17vw, 18rem)',
                  lineHeight: 0.9,
                  color: '#E63946',
                }}
              >
                .
              </div>
            </div>
          </div>
        </div>

        {/* Word switcher */}
        <div ref={wordRef} className="mt-6 opacity-0 flex items-center gap-4">
          <WordSwitcher />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomRef}
        className="opacity-0 px-6 lg:px-10 pb-8 flex items-end justify-between border-t z-10"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="pt-5">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30">
            MUMBAI — INDIA
          </p>
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/30 mt-0.5">
            SEMIQUANTUM TECHNOLOGIES
          </p>
        </div>

        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="pt-5 flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/30 hover:text-white transition-colors cursor-pointer group"
        >
          <span>Scroll</span>
          <span className="group-hover:translate-y-1 transition-transform inline-block">↓</span>
        </button>
      </div>
    </section>
  );
}
