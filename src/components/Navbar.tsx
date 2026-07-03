'use client';

import { useEffect, useRef, useState } from 'react';
import { useSystem } from '@/src/context/SystemContext';
import RecruiterToggle from './ui/RecruiterToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { recruiterMode } = useSystem();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = ['about', 'philosophy', 'projects', 'skills', 'experience', 'contact'];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 h-16 flex items-center justify-between transition-all duration-500 border-b ${
          scrolled ? 'nav-scrolled' : 'border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 cursor-pointer group"
        >
          <span className="font-display font-black text-xl text-white tracking-tight group-hover:text-white/80 transition-colors">
            HJ
          </span>
          <span className="text-[#E63946] font-black text-2xl leading-none">.</span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {recruiterMode && (
            <span className="hidden md:block text-[10px] font-medium text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full uppercase tracking-widest">
              Recruiter Mode
            </span>
          )}
          <RecruiterToggle />
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-white/60 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2 rounded-full cursor-pointer"
          >
            Contact
          </button>
          {/* Menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#0a0b14' }}
      >
        <div className="flex flex-col items-start justify-center h-full px-10 lg:px-20 gap-2">
          {links.map((link, i) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="cursor-pointer group flex items-end gap-4"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease`,
              }}
            >
              <span className="text-white/20 font-mono text-xs w-6 text-right">0{i + 1}</span>
              <span className="font-display font-black text-white uppercase tracking-tight group-hover:text-[#E63946] transition-colors duration-300"
                    style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1 }}>
                {link}
              </span>
            </button>
          ))}
        </div>

        {/* Menu close hint */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest"
        >
          Close ✕
        </button>
      </div>
    </>
  );
}
