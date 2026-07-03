'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const repos = [
  {
    path: 'src/crypto/aes_cipher.cpp',
    title: 'sq-ciphers',
    desc: 'High-performance C++ implementation of AES-256 ciphers with multi-threaded block processing for secure server connections.',
    lang: 'C++',
    stars: '34',
    forks: '8',
  },
  {
    path: 'src/agents/groq_orchestrator.ts',
    title: 'groq-agent-core',
    desc: 'Lightweight TypeScript framework for orchestrating memory-linked AI agents utilizing Groq LPU API endpoints for low-latency feedback.',
    lang: 'TypeScript',
    stars: '56',
    forks: '12',
  },
  {
    path: 'firmware/main_rtos.c',
    title: 'esp32-rtos-relay',
    desc: 'FreeRTOS firmware designed for ESP32 microcontrollers to schedule telemetry data collection and pipe details securely to database sockets.',
    lang: 'C / Assembly',
    stars: '21',
    forks: '4',
  },
  {
    path: 'app/network/sachbol_api.go',
    title: 'sachbol-core',
    desc: 'Scalable Go-based API gateway implementing secure message relays with token hashing to support anonymous endpoints.',
    lang: 'Go',
    stars: '42',
    forks: '9',
  },
];

export default function Labs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );

      // Cards reveal
      const cards = gridRef.current?.querySelectorAll('.lab-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="labs" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36">
      {/* Rule */}
      <div className="h-rule mb-12" />

      {/* Header */}
      <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 opacity-0">
        <div className="lg:col-span-3">
          <span className="section-label">Archive / Labs</span>
        </div>
        <div className="lg:col-span-9">
          <h2
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.92 }}
          >
            OPEN SOURCE<br />EXPERIMENTS<span style={{ color: '#E63946' }}>.</span>
          </h2>
        </div>
      </div>

      {/* Repos Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((r, i) => (
          <div
            key={i}
            className="lab-card opacity-0 group flex flex-col justify-between border border-white/6 rounded-xl p-6 bg-[#0c0e18] hover:border-[#E63946]/30 transition-colors duration-300"
          >
            <div>
              {/* Path tag */}
              <div className="flex justify-between items-center mb-5">
                <span className="font-mono text-[10px] text-white/30 tracking-tight">{r.path}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#E63946] transition-colors" />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight group-hover:text-[#E63946] transition-colors duration-300">
                {r.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed font-light mt-3">
                {r.desc}
              </p>
            </div>

            {/* Bottom details / stats */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
              <span className="font-mono text-[10px] text-white/40">{r.lang}</span>
              <div className="flex gap-4 font-mono text-[10px] text-white/30">
                <span className="flex items-center gap-1">
                  <span>★</span> {r.stars}
                </span>
                <span className="flex items-center gap-1">
                  <span>⑂</span> {r.forks}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
