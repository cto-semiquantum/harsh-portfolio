'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const history = [
  {
    period: 'Feb 2026 — Present',
    company: 'SEMIQUANTUM',
    role: 'Chief Technology Officer',
    desc: 'Leading product engineering, system architecture, and machine learning pipelines. Scaled neural evaluation engines and orchestrated secure system infrastructures.',
    status: 'Active',
    active: true,
  },
  {
    period: 'May 2024 — Jan 2026',
    company: 'SACHBOL',
    role: 'Founding Developer',
    desc: 'Designed and deployed anonymous encrypted message relays. Scaled backend API gateways to handle peak traffic requests with zero downtime.',
    status: 'Shipped',
    active: false,
  },
  {
    period: 'Sep 2023 — Apr 2024',
    company: 'FREELANCE / LABS',
    role: 'Systems Integrator',
    desc: 'Configured low-level ESP32 microcontrollers, custom hardware firmware interfaces, and secure firebase datalinks for automated sensor telemetry.',
    status: 'Completed',
    active: false,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );

      const items = listRef.current?.querySelectorAll('.exp-row');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36">
      {/* Rule */}
      <div className="h-rule mb-12" />

      <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 opacity-0">
        <div className="lg:col-span-3">
          <span className="section-label">Experience</span>
        </div>
        <div className="lg:col-span-9">
          <h2
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.92 }}
          >
            WHERE I&apos;VE<br />WORKED<span style={{ color: '#E63946' }}>.</span>
          </h2>
        </div>
      </div>

      {/* Experience list */}
      <div ref={listRef} className="flex flex-col">
        {history.map((item, i) => (
          <div
            key={i}
            className="exp-row opacity-0 border-t py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group cursor-default"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {/* Period */}
            <div className="md:col-span-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">{item.period}</span>
            </div>

            {/* Company & Role */}
            <div className="md:col-span-5">
              <h3
                className="font-display font-black text-white uppercase tracking-tight group-hover:text-[#E63946] transition-colors duration-300"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', lineHeight: 1 }}
              >
                {item.company}
              </h3>
              <p className="text-white/40 text-sm mt-1 font-light tracking-wide">{item.role}</p>
            </div>

            {/* Description */}
            <div className="md:col-span-4">
              <p className="text-white/30 text-sm leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </div>

            {/* Status */}
            <div className="md:col-span-1 flex md:justify-end">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${
                  item.active 
                    ? 'text-[#E63946] border-red-500/20 bg-red-500/5' 
                    : 'text-white/30 border-white/10 bg-white/5'
                }`}
              >
                {item.active && <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />}
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
