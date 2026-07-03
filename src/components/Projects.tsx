'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    title: 'SQ APEX',
    subtitle: 'AI Talent Assessment Platform',
    tags: ['Next.js', 'Groq AI', 'Prisma'],
    image: '/images/project_dashboard.png',
    year: '2025',
  },
  {
    num: '02',
    title: 'SQ EXAMCHAIN',
    subtitle: 'Secure Exam Distribution System',
    tags: ['AES-256', 'Blockchain', 'FastAPI'],
    image: '/images/project_blockchain.png',
    year: '2025',
  },
  {
    num: '03',
    title: 'MEDIBOX',
    subtitle: 'Smart IoT Medication System',
    tags: ['ESP32', 'Firebase', 'Python'],
    image: '/images/project_drone.png',
    year: '2024',
  },
  {
    num: '04',
    title: 'SACHBOL',
    subtitle: 'Anonymous Expression Platform',
    tags: ['Next.js', 'Node.js', 'REST API'],
    image: '/images/project_dashboard.png',
    year: '2024',
  },
];

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );

      // Rows fade-in
      const items = sectionRef.current?.querySelectorAll('.project-item-row');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
        );
      }

      // Mouse-follow custom gallery card
      const hoverCard = hoverCardRef.current;
      if (!hoverCard) return;

      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };

      const setMousePos = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      window.addEventListener('mousemove', setMousePos);

      // Lerp mouse follow with tilt/rotation based on speed
      const ticker = gsap.ticker.add(() => {
        const dt = 1 - Math.pow(0.85, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;

        const vx = mouse.x - pos.x;
        const rotate = gsap.utils.clamp(-15, 15, vx * 0.12);

        gsap.set(hoverCard, {
          x: pos.x,
          y: pos.y,
          rotate: rotate,
        });
      });

      return () => {
        window.removeEventListener('mousemove', setMousePos);
        gsap.ticker.remove(ticker);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36 relative">
      {/* Rule */}
      <div className="h-rule mb-12" />

      {/* Header */}
      <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 opacity-0">
        <div className="lg:col-span-3">
          <span className="section-label">Recent Work</span>
        </div>
        <div className="lg:col-span-9 flex items-end justify-between">
          <h2
            className="font-display font-black text-white uppercase tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.92 }}
          >
            RECENT<br />WORK<span style={{ color: '#E63946' }}>.</span>
          </h2>
          <span className="text-[11px] uppercase tracking-widest text-white/30 hidden md:block">
            {projects.length} Projects
          </span>
        </div>
      </div>

      {/* Project list rows */}
      <div className="flex flex-col relative">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-item-row opacity-0 project-item group cursor-pointer py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Number */}
            <div className="lg:col-span-1">
              <span className="font-mono text-[11px] text-white/20">{project.num}</span>
            </div>

            {/* Title */}
            <div className="lg:col-span-5">
              <h3
                className="font-display font-black text-white uppercase tracking-tight group-hover:text-[#E63946] transition-colors duration-300"
                style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.8rem)', lineHeight: 1 }}
              >
                {project.title}
              </h3>
              <p className="text-white/30 text-sm mt-1 font-light">{project.subtitle}</p>
            </div>

            {/* Tags */}
            <div className="lg:col-span-4 flex flex-wrap gap-2">
              {project.tags.map((tag, ti) => (
                <span
                  key={ti}
                  className="text-[10px] font-medium uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Year */}
            <div className="lg:col-span-2 flex justify-end">
              <span className="font-mono text-[11px] text-white/20">{project.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Awwwards Style Cursor Follower Floating Card */}
      <div
        ref={hoverCardRef}
        className="fixed top-0 left-0 w-[360px] h-[225px] pointer-events-none z-50 rounded-2xl overflow-hidden border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.9)] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          opacity: hoveredIdx !== null ? 1 : 0,
          visibility: hoveredIdx !== null ? 'visible' : 'hidden',
          scale: hoveredIdx !== null ? 1 : 0.85,
        }}
      >
        <div className="relative w-full h-full">
          {projects.map((project, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: hoveredIdx === i ? 1 : 0 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="360px"
                className="object-cover contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
