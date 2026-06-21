'use client';

import React from 'react';
import { Code2, Brain, Layers, ShieldAlert, Wrench, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './ui/TiltCard';

export default function Skills() {
  const categories = [
    {
      title: "LANGUAGES",
      icon: <Code2 className="text-primary mb-2" size={24} />,
      skills: ["Python", "JavaScript", "HTML", "CSS", "SQL"]
    },
    {
      title: "AI / ML",
      icon: <Brain className="text-primary mb-2" size={24} />,
      skills: ["AI Integration", "LLM APIs", "TensorFlow Basics", "HuggingFace", "Groq AI"]
    },
    {
      title: "FULL STACK",
      icon: <Layers className="text-primary mb-2" size={24} />,
      skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express", "APIs"]
    },
    {
      title: "CYBER / SYSTEMS",
      icon: <ShieldAlert className="text-primary mb-2" size={24} />,
      skills: ["Linux Security", "Secure Coding", "Security Fundamentals", "System Programming Basics", "Assembly", "Kernel Dev", "Burp Suite", "Nmap"],
      colSpan: 2
    },
    {
      title: "IOT & TOOLS",
      icon: <Wrench className="text-primary mb-2" size={24} />,
      skills: ["Prisma ORM", "SQLite", "Git", "Docker", "Linux", "ESP32", "Sensors", "Firebase/Blynk Basics", "Automation Tools"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase">Tech Arsenal</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent ml-4"></div>
      </div>

      {/* Grid of floating cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => {
          // Alternating floating speeds and offsets to feel organic
          const floatDuration = 5 + (index % 3) * 0.8;
          const floatY = [0, -10 - (index % 2) * 4, 0];

          return (
            <motion.div
              key={index}
              animate={{ y: floatY }}
              transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              className={`flex h-full ${cat.colSpan === 2 ? 'lg:col-span-2' : ''}`}
            >
              <TiltCard
                maxTiltX={8}
                maxTiltY={8}
                className="w-full flex h-full rounded-2xl overflow-hidden"
              >
                <div 
                  className="bg-black/60 backdrop-blur-md border border-white/10 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 w-full h-full relative cyber-grid group flex flex-col justify-between overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(112,0,255,0.2)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Cyber micro corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/30 rounded-tl" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/30 rounded-tr" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/30 rounded-bl" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/30 rounded-br" />

                  {/* Scanning Laser Line (moves vertically on hover) */}
                  <motion.div
                    className="absolute left-0 right-0 h-[1.5px] bg-cyan-400 opacity-0 group-hover:opacity-40 z-20 pointer-events-none"
                    animate={{
                      top: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Card Header */}
                  <div 
                    className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4"
                    style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                  >
                    {/* Animated Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                      className="text-primary"
                    >
                      {cat.icon}
                    </motion.div>
                    <h3 className="text-white font-mono text-sm tracking-wider font-bold">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <ul 
                    className={`grid gap-3 flex-1 ${cat.colSpan === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    {cat.skills.map((skill, sIdx) => (
                      <li 
                        key={sIdx} 
                        className="text-gray-300 flex items-center gap-3.5 text-xs font-mono group-hover:text-white transition-colors"
                      >
                        <CheckCircle2 size={13} className="text-[#00FF00] shrink-0 drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
