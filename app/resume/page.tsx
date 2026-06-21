'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Mail, MapPin, Globe, Award, Briefcase, GraduationCap, Cpu, Layers } from 'lucide-react';
import Magnetic from '@/src/components/ui/Magnetic';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-black text-gray-300 font-mono p-4 md:p-12 relative overflow-hidden scanlines selection:bg-primary selection:text-white">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8 print:p-0">
        
        {/* Navigation / Actions (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 print:hidden">
          <Link href="/">
            <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white cursor-pointer border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
              <ArrowLeft size={14} /> [RETURN TO MAIN TERMINAL]
            </button>
          </Link>

          <div className="flex gap-4">
            <Magnetic>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(112,0,255,0.15)]"
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Resume Sheet Container */}
        <div className="bg-black/80 border-2 border-primary/30 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(112,0,255,0.15)] space-y-8 relative print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
          {/* Cyber accents (Hidden in Print) */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary rounded-tl print:hidden" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary rounded-tr print:hidden" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary rounded-bl print:hidden" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary rounded-br print:hidden" />

          {/* 1. Header Information */}
          <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 print:border-black/10">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight print:text-black leading-none">
                Harsh Jha
              </h1>
              <p className="text-cyan-400 font-bold text-sm mt-2 tracking-wide uppercase font-mono print:text-primary">
                B.Sc Computer Science (3rd Year) &bull; AI Developer &bull; Full Stack Developer
              </p>
            </div>
            
            {/* Contact details */}
            <div className="text-xs space-y-1.5 md:text-right text-gray-400 print:text-black">
              <p className="flex items-center md:justify-end gap-2">
                <Mail size={12} className="text-primary print:text-black" /> harsh@semiquantum.live
              </p>
              <p className="flex items-center md:justify-end gap-2">
                <Globe size={12} className="text-primary print:text-black" /> harsh.semiquantum.live
              </p>
              <p className="flex items-center md:justify-end gap-2">
                <MapPin size={12} className="text-primary print:text-black" /> Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* 2. Overview / Summary */}
          <div className="space-y-3">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center gap-2 print:text-black print:border-black/10">
              <Cpu size={14} className="text-primary print:text-black" /> System Profile // Summary
            </h2>
            <p className="text-xs leading-relaxed text-gray-300 print:text-black">
              B.Sc Computer Science student with hands-on experience in AI-assisted software development, full-stack web applications, IoT systems, cybersecurity fundamentals, automation tools and scalable technology solutions. CTO at SemiQuantum Technologies, working on AI platforms, secure systems and practical real-world projects.
            </p>
          </div>

          {/* 3. Skills Grid */}
          <div className="space-y-3">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center gap-2 print:text-black print:border-black/10">
              <Layers size={14} className="text-primary print:text-black" /> Technical Core // Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <p><strong className="text-white print:text-black">Languages:</strong> Python, JavaScript, HTML, CSS, SQL</p>
                <p><strong className="text-white print:text-black">Frontend Stack:</strong> React, Next.js, Tailwind CSS</p>
                <p><strong className="text-white print:text-black">Backend Services:</strong> Node.js, Express, REST APIs</p>
                <p><strong className="text-white print:text-black">Databases & Tools:</strong> Prisma ORM, SQLite, Git, Docker, Linux</p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-white print:text-black">AI & Neural:</strong> AI Integrations, LLM APIs, TensorFlow Basics</p>
                <p><strong className="text-white print:text-black">Cybersecurity:</strong> Linux Security, Secure Coding, Systems Basics</p>
                <p><strong className="text-white print:text-black">Internet of Things:</strong> ESP32, Sensors, Firebase / Blynk Basics</p>
                <p><strong className="text-white print:text-black">Additional:</strong> Automation Scripting, Command Line Dev</p>
              </div>
            </div>
          </div>

          {/* 4. Experience Timeline */}
          <div className="space-y-3">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center gap-2 print:text-black print:border-black/10">
              <Briefcase size={14} className="text-primary print:text-black" /> Professional Node // Experience
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-start text-xs font-bold">
                  <div className="text-white print:text-black">Chief Technology Officer (CTO)</div>
                  <div className="text-cyan-400 print:text-primary">Feb 2026 — Present</div>
                </div>
                <div className="text-[10px] text-gray-500 font-bold">SEMIQUANTUM TECHNOLOGIES</div>
                <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1 print:text-black">
                  <li>Leading technical development of AI and web applications.</li>
                  <li>Managing product architectures, development workflows, and mentoring developer interns.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. Projects Listing */}
          <div className="space-y-4">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center gap-2 print:text-black print:border-black/10">
              <Cpu size={14} className="text-primary print:text-black" /> Shipped Projects // Missions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl space-y-2 print:border-black/10 print:bg-transparent print:p-0">
                <h3 className="text-white font-bold print:text-black flex justify-between items-center">
                  <span>SQ Apex</span>
                  <span className="text-[10px] text-cyan-400 font-bold font-mono print:text-primary">ACTIVE</span>
                </h3>
                <p className="text-[10px] text-gray-500">AI Powered Talent Vetting Platform</p>
                <p className="text-gray-400 print:text-black leading-relaxed">
                  Developed an AI-based resume screening system. Integrated resume parsing pipelines, database schemas via Prisma, and Groq LLM scoring models.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl space-y-2 print:border-black/10 print:bg-transparent print:p-0">
                <h3 className="text-white font-bold print:text-black flex justify-between items-center">
                  <span>SQ ExamChain</span>
                  <span className="text-[10px] text-cyan-400 font-bold font-mono print:text-primary">ACTIVE</span>
                </h3>
                <p className="text-[10px] text-gray-500">Secure Exam Distribution System</p>
                <p className="text-gray-400 print:text-black leading-relaxed">
                  Built secure exam management pipelines using encryption and audit logging. Coded exam generation, tracking, and secure blockchain smart contract logs.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl space-y-2 print:border-black/10 print:bg-transparent print:p-0">
                <h3 className="text-white font-bold print:text-black flex justify-between items-center">
                  <span>Medibox</span>
                  <span className="text-[10px] text-cyan-400 font-bold font-mono print:text-primary">ACTIVE</span>
                </h3>
                <p className="text-[10px] text-gray-500">Smart Medication Reminder</p>
                <p className="text-gray-400 print:text-black leading-relaxed">
                  Created an IoT reminder system using ESP32, sensors, and Firebase. Implemented notification triggers and logical verification loops to reduce missed doses.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl space-y-2 print:border-black/10 print:bg-transparent print:p-0">
                <h3 className="text-white font-bold print:text-black flex justify-between items-center">
                  <span>SachBol</span>
                  <span className="text-[10px] text-cyan-400 font-bold font-mono print:text-primary">ACTIVE</span>
                </h3>
                <p className="text-[10px] text-gray-500">Anonymous Expression Platform</p>
                <p className="text-gray-400 print:text-black leading-relaxed">
                  Coded an anonymous sharing application, organizing development lifecycle, REST endpoints, content screening, and user retention algorithms.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Education & Credentials */}
          <div className="space-y-3">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center gap-2 print:text-black print:border-black/10">
              <GraduationCap size={14} className="text-primary print:text-black" /> Academic Node // Education
            </h2>
            <div className="flex justify-between items-start text-xs">
              <div>
                <h3 className="text-white font-bold print:text-black">B.Sc. Computer Science (3rd Year)</h3>
                <p className="text-gray-400 print:text-black">Mumbai University</p>
              </div>
              <span className="text-cyan-400 font-bold print:text-primary">EXPECTED 2027</span>
            </div>
          </div>

          {/* 7. Achievements */}
          <div className="space-y-3">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center gap-2 print:text-black print:border-black/10">
              <Award size={14} className="text-primary print:text-black" /> Signal Highlights // Achievements
            </h2>
            <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1.5 print:text-black">
              <li><strong className="text-white print:text-black">Zonal Winner</strong> – Mumbai University Avishkar Research Convention.</li>
              <li><strong className="text-white print:text-black">University Level Runner-up</strong> – Mumbai University Avishkar Research Convention.</li>
              <li>Successfully designed, coded, and deployed multiple IoT, web-based, and AI products.</li>
            </ul>
          </div>

        </div>

        {/* Footer (Hidden in print) */}
        <div className="text-center text-[10px] text-gray-500 font-mono border-t border-white/5 pt-6 print:hidden">
          NYX SECURE SYSTEMS &bull; VERIFICATION KEY SHA-256 COMPLIANT
        </div>
      </div>

      {/* Global CSS overrides for Print Mode */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          main {
            background-color: white !important;
            background-image: none !important;
            color: black !important;
            padding: 0 !important;
          }
          h1, h2, h3, h4, h5, p, span, li, strong {
            color: black !important;
            text-shadow: none !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
