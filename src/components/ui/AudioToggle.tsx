'use client';

import React from 'react';
import { useSystem } from '@/src/context/SystemContext';
import Magnetic from './Magnetic';

export default function AudioToggle() {
  const { audioEnabled, setAudioEnabled } = useSystem();

  return (
    <Magnetic range={30}>
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
          audioEnabled
            ? 'border-[#06B6D4] text-[#06B6D4] bg-[#06B6D4]/8 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
            : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
        }`}
      >
        {audioEnabled ? '[SYSTEM AUDIO: ON]' : '[SYSTEM AUDIO: OFF]'}
      </button>
    </Magnetic>
  );
}
