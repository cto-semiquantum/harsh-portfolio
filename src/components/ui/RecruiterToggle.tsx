'use client';

import React from 'react';
import { useSystem } from '@/src/context/SystemContext';
import Magnetic from './Magnetic';

export default function RecruiterToggle() {
  const { recruiterMode, setRecruiterMode } = useSystem();

  return (
    <Magnetic range={30}>
      <button
        onClick={() => setRecruiterMode(!recruiterMode)}
        className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer uppercase font-bold tracking-wider ${
          recruiterMode
            ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)] animate-pulse'
            : 'border-[#E63946]/40 text-gray-300 bg-[#E63946]/8 hover:bg-[#E63946]/15 hover:border-[#E63946]/70 hover:text-white'
        }`}
      >
        {recruiterMode ? '⚡ Exit Recruiter Mode' : '💼 Recruiter Mode'}
      </button>
    </Magnetic>
  );
}
