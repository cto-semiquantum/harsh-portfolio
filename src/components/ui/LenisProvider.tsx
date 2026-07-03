'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSystem } from '@/src/context/SystemContext';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const { loadingComplete } = useSystem();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis RAF to GSAP ticker for ScrollTrigger sync
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Expose lenis globally for other components to use
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Initial state: stop scrolling during load
    lenis.stop();

    return () => {
      lenis.destroy();
      (window as unknown as Record<string, unknown>).__lenis = null;
      lenisRef.current = null;
    };
  }, []);

  // Lock/Unlock scroll based on loading state
  useEffect(() => {
    if (!lenisRef.current) return;
    if (loadingComplete) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [loadingComplete]);

  return null;
}
