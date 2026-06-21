'use client';

import React from 'react';
import { Terminal, ShieldCheck, Mail } from 'lucide-react';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 mt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-primary/20 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Column 1: Terminal WHOAMI */}
          <div className="md:col-span-6 font-mono text-xs text-gray-400 space-y-1 bg-black/40 border border-white/5 p-4 rounded-xl">
            <p className="text-neon-green">nyx@harsh:~$ whoami</p>
            <p className="text-white mb-2">&gt; AI Engineer | Systems Builder | CTO</p>
            <p className="text-neon-green">nyx@harsh:~$ cat philosophy.txt</p>
            <p className="text-white mb-2">&gt; Building systems beyond limits. Optimizing for efficiency.</p>
            <p className="text-neon-green flex items-center">
              nyx@harsh:~$ 
              <span className="w-1.5 h-3 bg-white animate-pulse inline-block ml-1"></span>
            </p>
          </div>

          {/* Column 2: Status & System info */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Node Status</h4>
            <div className="space-y-2 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                <span>SYSTEM: ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                <span>SSL ENCRYPTION: ACTIVE</span>
              </div>
              <div className="text-[10px] text-gray-500">
                LATENCY: 14ms (OPTIMAL)
              </div>
            </div>
          </div>

          {/* Column 3: Connect links */}
          <div className="md:col-span-3 space-y-4 md:text-right">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Index Links</h4>
            <div className="flex md:justify-end gap-4 text-gray-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 hover:border-primary/50 hover:text-white rounded-lg transition-colors cursor-pointer">
                <GithubIcon size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 hover:border-primary/50 hover:text-white rounded-lg transition-colors cursor-pointer">
                <LinkedinIcon size={16} />
              </a>
              <a href="mailto:harsh@semiquantum.live" className="p-2 bg-white/5 border border-white/10 hover:border-primary/50 hover:text-white rounded-lg transition-colors cursor-pointer">
                <Mail size={16} />
              </a>
            </div>
            <p className="text-[10px] text-gray-500 font-mono">
              SECURE HANDSHAKE COMPLIANT
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-primary" />
            <span>© 2026 Harsh Jha. Built with Next.js & Three.js.</span>
          </div>
          <div>
            <span>ALL MODULES OPERATIONAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
