'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/src/context/SystemContext';

export default function EasterEgg() {
  const { easterEggActive, setEasterEggActive } = useSystem();
  const [typed, setTyped] = useState<string[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [diagLogs, setDiagLogs] = useState<string[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Detect key inputs for "nyx"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toLowerCase();
      // Only keep alphanumeric characters
      if (char.length === 1 && /[a-z]/.test(char)) {
        setTyped(prev => {
          const next = [...prev, char];
          // Keep only last 3 characters
          if (next.length > 3) {
            next.shift();
          }
          
          const combo = next.join('');
          if (combo === 'nyx') {
            setShowFlash(true);
            setEasterEggActive(true);
            return []; // reset
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setEasterEggActive]);

  // Handle flash screen timer
  useEffect(() => {
    if (showFlash) {
      const timer = setTimeout(() => setShowFlash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showFlash]);

  // Generate scrolling diagnostics when active
  useEffect(() => {
    if (!easterEggActive) {
      setDiagLogs([]);
      return;
    }

    const logTemplates = [
      "CRITICAL: Loading neural weights...",
      "DEBUG: Checking memory offset at 0x7FFA830C",
      "INFO: Connection established with quantum core [A1]",
      "SUCCESS: Syncing AI Assessment engine - SQ Apex",
      "SECURITY: Burp Suite network listener attached",
      "SYSTEM: CPU core temperature at 32°C",
      "WARNING: Low latency connection detected to secure node",
      "SUCCESS: x86 kernel compiled using linker link.ld",
      "DEBUG: Initializing VGA Mode 13h buffer write",
      "SYSTEM: Decrypting files with AES-256 cipher...",
      "INFO: SemiQuantum Node verified: harsh@semiquantum.com",
      "SUCCESS: Integrity check complete on SQ ExamChain logs",
    ];

    const interval = setInterval(() => {
      const randomLog = `[${new Date().toLocaleTimeString()}] ${
        logTemplates[Math.floor(Math.random() * logTemplates.length)]
      }`;
      setDiagLogs(prev => {
        const next = [...prev, randomLog];
        if (next.length > 50) next.shift();
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [easterEggActive]);

  // Scroll diagnostics to bottom
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [diagLogs]);

  return (
    <>
      {/* Screen flash when unlocked */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-[100001] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Easter Egg Overlay Diagnostic Screen */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100000] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 text-[#00FF00] font-mono scanlines overflow-hidden"
          >
            {/* Hologram details */}
            <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

            <div className="w-full max-w-4xl border border-[#00FF00]/30 rounded-2xl bg-black/90 p-6 flex flex-col h-[85vh] shadow-[0_0_50px_rgba(0,255,0,0.15)] relative">
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00FF00] rounded-tl" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00FF00] rounded-tr" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00FF00] rounded-bl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00FF00] rounded-br" />

              {/* Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#00FF00]/20 pb-4 mb-6 shrink-0 gap-3">
                <div>
                  <h1 className="text-xl font-bold tracking-widest text-glow-green text-white flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF00] glow-green animate-ping" />
                    NYX DIAGONISTIC INTERFACE
                  </h1>
                  <p className="text-[10px] text-gray-500 mt-0.5 tracking-wider">RESTRICTED LEVEL 5 PRIVILEGES ENFORCED</p>
                </div>
                <button
                  onClick={() => setEasterEggActive(false)}
                  className="bg-transparent border border-[#00FF00]/30 hover:bg-[#00FF00]/10 text-[#00FF00] px-4 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all duration-300 shadow-[0_0_8px_rgba(0,255,0,0.1)] hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                >
                  [CLOSE DIAGNOSTIC CORE]
                </button>
              </div>

              {/* Main Content: Split grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
                {/* Left Side: Classified Memo (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4 border border-[#00FF00]/10 rounded-xl p-5 bg-black/60 overflow-y-auto">
                  <h2 className="text-white font-bold border-b border-[#00FF00]/20 pb-2 text-sm tracking-wider uppercase">
                    Classified Dossier: Operator.log
                  </h2>
                  <div className="space-y-4 text-xs leading-relaxed text-gray-300">
                    <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-2">
                      <span className="text-[#00FF00] font-bold">SUBJECT:</span>
                      <span className="col-span-2 text-white font-semibold">Harsh Jha (CTO)</span>
                      
                      <span className="text-[#00FF00] font-bold">CLEARANCE:</span>
                      <span className="col-span-2 text-white font-semibold">L5 EXECUTIVE</span>
                      
                      <span className="text-[#00FF00] font-bold">LOCATION:</span>
                      <span className="col-span-2 text-white font-semibold">MUMBAI_NODE_PRIMARY</span>
                    </div>

                    <p>
                      <strong className="text-white">STATUS ASSESSMENT:</strong> Operator has successfully established SemiQuantum core technologies. Systems are operational. 3D projection rendering (Planet core) is loaded in main landing.
                    </p>
                    <p>
                      <strong className="text-white">COGNITIVE ASSETS:</strong> Advanced skills in low-level compilation (x86 Assemblers, bootloaders, protected mode execution) and high-level artificial network structures.
                    </p>
                    <p>
                      <strong className="text-white">DIAGNOSTIC SUMMARY:</strong> No integrity leaks detected in ledger SQ ExamChain. Talents scored at 99.8th percentile on SQ Apex neural models. Host core is stable.
                    </p>
                  </div>
                </div>

                {/* Right Side: Fast scrolling logs (5 cols) */}
                <div className="lg:col-span-5 flex flex-col border border-[#00FF00]/10 rounded-xl p-4 bg-black/85 min-h-[200px] lg:min-h-0">
                  <div className="text-[10px] text-gray-500 font-bold tracking-widest border-b border-[#00FF00]/10 pb-2 mb-3">
                    REALTIME OS SIGNAL TRAFFIC
                  </div>
                  <div 
                    ref={logsContainerRef}
                    className="flex-1 overflow-y-auto space-y-1.5 text-[9px] text-[#00FF00]/80 pr-1 scrollbar-thin scrollbar-thumb-[#00FF00]/20"
                  >
                    {diagLogs.length === 0 && (
                      <p className="text-gray-600 italic">Listening for system messages...</p>
                    )}
                    {diagLogs.map((log, idx) => (
                      <div key={idx} className="leading-tight truncate">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Footer status line */}
              <div className="border-t border-[#00FF00]/10 pt-4 mt-6 flex items-center justify-between text-[10px] text-gray-500 shrink-0 uppercase tracking-widest font-bold">
                <span>Core: Operational</span>
                <span>Security node: SECURE</span>
                <span>Buffer size: 4.2 MB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
