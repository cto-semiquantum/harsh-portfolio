'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import About from '@/src/components/About';
import Philosophy from '@/src/components/Philosophy';
import Projects from '@/src/components/Projects';
import Skills from '@/src/components/Skills';
import Experience from '@/src/components/Experience';
import Contact from '@/src/components/Contact';
import Footer from '@/src/components/Footer';
import LoadingScreen from '@/src/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'hidden';
    }
  }, [isLoading]);

  return (
    <>
      {mounted && (
        <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
          <LoadingScreen onComplete={() => setIsLoading(false)} />
          <Navbar />
          <Hero />
          <About />
          <Philosophy />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
}
