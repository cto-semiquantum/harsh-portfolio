'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    num: '01',
    title: 'SYSTEMS ARCHITECTURE',
    desc: 'Low-level optimization, custom secure protocols, low-latency firmware, and multi-threaded systems. Building robust foundations from the silicon up.',
    image: '/images/hacker_7.png',
  },
  {
    num: '02',
    title: 'COGNITIVE INTEGRATION',
    desc: 'Harnessing advanced LLMs, local Groq inference, vector indexing, and autonomous agent frameworks to engineer next-generation intelligent applications.',
    image: '/images/hacker_8.png',
  },
  {
    num: '03',
    title: 'CRYPTO & SECURITY',
    desc: 'Hardened cyber-security engineering utilizing AES-256 ciphers, secure communication link layers, and threat mitigation audits to protect core vectors.',
    image: '/images/hacker_6.png',
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );

      // Cards slide up & scale-in
      const cards = sectionRef.current?.querySelectorAll('.pillar-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36 overflow-hidden">
      {/* Rule */}
      <div className="h-rule mb-12" />

      {/* Header */}
      <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 opacity-0">
        <div className="lg:col-span-3">
          <span className="section-label">Philosophy</span>
        </div>
        <div className="lg:col-span-9">
          <h2
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.92 }}
          >
            ENGINEERING<br />PARADIGMS<span style={{ color: '#E63946' }}>.</span>
          </h2>
        </div>
      </div>

      {/* 3-Column Asymmetric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="pillar-card opacity-0 group flex flex-col justify-between border border-white/8 rounded-2xl p-6 bg-[#0c0e18] hover:border-[#E63946]/40 transition-colors duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
          >
            <div>
              {/* Card top details */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-white/20">{p.num}</span>
                <span className="font-mono text-[9px] text-[#E63946] border border-[#E63946]/20 px-2 py-0.5 rounded-full">ACTIVE CORE</span>
              </div>

              {/* Card image with zoom hover */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-white/5 bg-[#0a0b14]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-1.04 transition-all duration-700 opacity-60 group-hover:opacity-90 contrast-125"
                />
              </div>

              {/* Title & description */}
              <h3 className="font-display font-black text-white uppercase tracking-tight mb-3 text-lg group-hover:text-[#E63946] transition-colors duration-300">
                {p.title}
              </h3>
            </div>
            
            <p className="text-white/40 text-sm leading-relaxed font-light mt-4">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
