'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AudioToggle from './ui/AudioToggle';
import RecruiterToggle from './ui/RecruiterToggle';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="text-3xl font-bold tracking-tighter text-white">
            HJ<span className="text-primary text-4xl leading-[0]">.</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-mono">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs text-gray-300 hover:text-white uppercase tracking-wider transition-colors relative group"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <RecruiterToggle />
          <AudioToggle />
          <button 
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 px-5 py-2 rounded-xl transition-all text-xs font-mono font-bold tracking-wider uppercase cursor-pointer"
          >
            Connect
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
}
