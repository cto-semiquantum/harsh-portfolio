'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Python', 'Node.js',
  'TensorFlow', 'Docker', 'Linux', 'FastAPI', 'Prisma',
  'ESP32', 'Assembly', 'Groq AI', 'HuggingFace', 'Three.js', 'GSAP',
];

const categories = [
  { label: 'Languages',    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Assembly'] },
  { label: 'Frontend',     items: ['React', 'Next.js', 'Three.js', 'GSAP', 'Tailwind'] },
  { label: 'Backend / AI', items: ['Node.js', 'FastAPI', 'Groq AI', 'HuggingFace', 'TensorFlow'] },
  { label: 'Systems',      items: ['Linux', 'Docker', 'AES-256', 'Nmap', 'Burp Suite'] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      const cols = sectionRef.current?.querySelectorAll('.skill-col');
      if (cols) {
        gsap.fromTo(cols,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36">
      {/* Rule */}
      <div className="h-rule mb-12" />

      <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 opacity-0">
        <div className="lg:col-span-3">
          <span className="section-label">Skills</span>
        </div>
        <div className="lg:col-span-9">
          <h2
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.92 }}
          >
            TECH<br />ARSENAL<span style={{ color: '#E63946' }}>.</span>
          </h2>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden border-t border-b py-4 mb-16" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to right, #0a0b14, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to left, #0a0b14, transparent)' }} />
        <div className="marquee-track">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-8 font-display font-black uppercase text-lg text-white/10 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: '#E63946' }} />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Category columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="skill-col opacity-0">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#E63946] mb-5">{cat.label}</h4>
            <ul className="space-y-2">
              {cat.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
