'use client';

import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' }
];

export default function ScrollHud() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 font-mono text-[9px] tracking-widest text-gray-500 select-none pointer-events-auto"
      style={{ textShadow: '0 0 2px rgba(0,0,0,0.8)' }}
    >
      <div className="text-gray-400 font-bold border-b border-white/10 pb-1 mb-2 tracking-widest text-right">
        SYSTEM PROGRESS
      </div>
      
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`flex items-center gap-4 transition-all duration-300 hover:text-white cursor-pointer group text-right ${
              isActive ? 'text-white' : 'text-gray-600'
            }`}
          >
            {/* Label */}
            <span className="font-bold">{sec.label.padEnd(8, ' ')}</span>
            
            {/* Custom progress block */}
            <span 
              className={`transition-all duration-300 ${
                isActive 
                  ? 'text-[#00FF00] drop-shadow-[0_0_4px_rgba(0,255,0,0.6)] font-bold scale-x-110 origin-right' 
                  : 'text-gray-800'
              }`}
            >
              ████
            </span>
          </button>
        );
      })}
    </div>
  );
}
