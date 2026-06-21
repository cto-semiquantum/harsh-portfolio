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
            ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/5 shadow-[0_0_12px_rgba(0,255,0,0.2)]'
            : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
        }`}
      >
        {audioEnabled ? '[SYSTEM AUDIO: ON]' : '[SYSTEM AUDIO: OFF]'}
      </button>
    </Magnetic>
  );
}
