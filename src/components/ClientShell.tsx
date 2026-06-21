'use client';

import React, { useState, useEffect } from 'react';
import { SystemProvider, useSystem } from '../context/SystemContext';
import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false });
const CustomCursor = dynamic(() => import('./ui/CustomCursor'), { ssr: false });
import ScrollProgress from './ui/ScrollProgress';
import ScrollHud from './ui/ScrollHud';
import SystemNotifications from './ui/SystemNotifications';
import EasterEgg from './ui/EasterEgg';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { recruiterMode } = useSystem();

  return (
    <>
      <ScrollProgress />
      {/* Hide 3D background canvas in recruiter mode */}
      {!recruiterMode && <ThreeBackground />}
      {/* Hide cursor trail in recruiter mode */}
      {!recruiterMode && <CustomCursor />}
      
      {/* Immersive HUD additions */}
      <ScrollHud />
      <SystemNotifications />
      <EasterEgg />
      
      {children}
    </>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SystemProvider>
        {children}
      </SystemProvider>
    );
  }

  return (
    <SystemProvider>
      <ShellContent>{children}</ShellContent>
    </SystemProvider>
  );
}
