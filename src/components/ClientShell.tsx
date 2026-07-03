'use client';

import React, { useState, useEffect } from 'react';
import { SystemProvider } from '../context/SystemContext';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('./ui/CustomCursor'), { ssr: false });
const LenisProvider = dynamic(() => import('./ui/LenisProvider'), { ssr: false });
const ScrollProgress = dynamic(() => import('./ui/ScrollProgress'), { ssr: false });

function ShellContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LenisProvider />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <SystemProvider>{children}</SystemProvider>;
  }

  return (
    <SystemProvider>
      <ShellContent>{children}</ShellContent>
    </SystemProvider>
  );
}
