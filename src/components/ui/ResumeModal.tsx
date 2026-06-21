'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Printer } from 'lucide-react';
import { useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  const rawResumeText = `Harsh Jha
Mumbai, Maharashtra, India
Email: harsh@semiquantum.live | Portfolio: harsh.semiquantum.live
B.Sc Computer Science (3rd Year) | AI Developer | Full Stack Developer

SUMMARY
B.Sc Computer Science student with hands-on experience in AI-assisted software development, full-stack web applications, IoT systems, cybersecurity fundamentals, automation tools and scalable technology solutions. CTO at SemiQuantum Technologies, working on AI platforms, secure systems and practical real-world projects.

TECHNICAL SKILLS
Languages: Python, JavaScript, HTML, CSS, SQL
Frontend: React, Next.js, Tailwind CSS
Backend: Node.js, Express, APIs
Database & Tools: Prisma ORM, SQLite, Git, Docker, Linux
AI/ML: AI Integration, LLM APIs, TensorFlow Basics
Cybersecurity: Linux Security, Secure Coding, Security Fundamentals
Additional: Automation Tools, System Programming Basics
IoT: ESP32, Sensors, Firebase/Blynk Basics

EXPERIENCE
CTO – SemiQuantum Technologies (Feb 2026 – Present)
• Leading technical development of AI and software projects
• Managing product architecture, development workflows and interns

PROJECTS
• SQ Apex – AI Powered Talent Assessment Platform
  Tech: Next.js, Node.js, Prisma ORM, AI APIs
• SQ ExamChain – Secure Exam Distribution System
  Tech: AES-256, Blockchain, FastAPI, Smart Contracts, JWT
• Medibox – Smart Medication Reminder System (AI + IoT)
  Tech: ESP32, Firebase/Blynk, Sensors, Python
• SachBol – Anonymous Expression Platform
  Tech: Next.js, Node.js, API Integration

ACHIEVEMENTS
• Mumbai University Avishkar Zonal Winner
• University Level Runner-up
• Built multiple AI, IoT and web-based projects`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[11000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono scanlines"
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-black/95 border-2 border-primary border-double rounded-2xl w-full max-w-2xl p-6 relative shadow-[0_0_60px_rgba(112,0,255,0.3)] text-gray-300 flex flex-col h-[90vh]"
          >
            {/* Cyber highlights */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white border border-white/5 hover:border-white/20 p-2 rounded-xl cursor-pointer transition-colors z-20"
            >
              <X size={16} />
            </button>

            {/* Dossier Header */}
            <div className="border-b border-white/10 pb-4 mb-4 shrink-0 pr-8">
              <h2 className="text-white font-bold text-glow-primary text-lg">
                PERSONNEL FILE: HARSH_JHA.CV
              </h2>
              <div className="text-[10px] text-gray-500 space-y-0.5 mt-2">
                <p>CLASSIFICATION: RESTRICTED // CLEARANCE LEVEL 4</p>
                <p>ROLE: AI DEV &bull; FULL STACK &bull; CTO SEMIQUANTUM</p>
                <p>NODE: harsh@semiquantum.live</p>
              </div>
            </div>

            {/* Scrollable CV Document */}
            <div className="flex-1 overflow-y-auto space-y-6 text-xs pr-2 scrollbar-thin scrollbar-thumb-white/10">
              
              {/* Header Info */}
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-white text-base font-bold">Harsh Jha</h3>
                <p className="text-cyan-400 font-bold mt-0.5">B.Sc Computer Science (3rd Year) | AI Developer | Full Stack Developer</p>
                <p className="text-gray-500 mt-1">Mumbai, Maharashtra, India | Email: harsh@semiquantum.live</p>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-primary font-bold uppercase tracking-wider mb-1.5 border-b border-white/5 pb-1">Summary</h4>
                <p className="text-gray-300 leading-relaxed">
                  B.Sc Computer Science student with hands-on experience in AI-assisted software development, full-stack web applications, IoT systems, cybersecurity fundamentals, automation tools and scalable technology solutions. CTO at SemiQuantum Technologies, working on AI platforms, secure systems and practical real-world projects.
                </p>
              </div>

              {/* Technical Stack */}
              <div>
                <h4 className="text-primary font-bold uppercase tracking-wider mb-2 border-b border-white/5 pb-1">Technical Stack</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <p><span className="text-cyan-400 font-bold">Languages:</span> Python, JavaScript, HTML, CSS, SQL</p>
                  <p><span className="text-cyan-400 font-bold">Frontend:</span> React, Next.js, Tailwind CSS</p>
                  <p><span className="text-cyan-400 font-bold">Backend:</span> Node.js, Express, APIs</p>
                  <p><span className="text-cyan-400 font-bold">Databases & Tools:</span> Prisma ORM, SQLite, Git, Docker, Linux</p>
                  <p><span className="text-cyan-400 font-bold">AI/ML:</span> AI Integration, LLM APIs, TensorFlow Basics</p>
                  <p><span className="text-cyan-400 font-bold">Cybersecurity:</span> Linux Security, Secure Coding, Fundamentals</p>
                  <p><span className="text-cyan-400 font-bold">IoT:</span> ESP32, Sensors, Firebase/Blynk Basics</p>
                  <p><span className="text-cyan-400 font-bold">Additional:</span> Automation Tools, Systems Basics</p>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-primary font-bold uppercase tracking-wider mb-2.5 border-b border-white/5 pb-1">Professional Experience</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-white font-bold">Chief Technology Officer (CTO)</h5>
                      <p className="text-gray-400 text-[11px]">SemiQuantum Technologies</p>
                    </div>
                    <span className="text-neon-green text-[10px] font-mono">FEB 2026 — PRESENT</span>
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-gray-300">
                    <li>Leading technical development of AI and software products.</li>
                    <li>Managing product architecture, development workflows and mentoring developer interns.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-primary font-bold uppercase tracking-wider mb-2.5 border-b border-white/5 pb-1">Highlighted Projects</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-white font-bold flex items-center justify-between">
                      <span>SQ Apex – AI Powered Talent Assessment Platform</span>
                    </h5>
                    <p className="text-gray-300 mt-1">Developed an AI-based resume screening and candidate evaluation system. Implemented authentication, resume parsing pipeline, database integration and AI analysis workflows. (Tech: Next.js, Node.js, Prisma, AI APIs)</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold">SQ ExamChain – Secure Exam Distribution System</h5>
                    <p className="text-gray-300 mt-1">Built secure exam management concepts using encryption, audit logging and controlled access. Worked on paper generation, lifecycle tracking and security-focused workflows.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold">Medibox – Smart Medication Reminder System (AI + IoT)</h5>
                    <p className="text-gray-300 mt-1">Created IoT based medication reminder system to reduce missed doses. Integrated sensors and AI-assisted logic for improved reliability.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-bold">SachBol – Anonymous Expression Platform</h5>
                    <p className="text-gray-300 mt-1">Developed user-focused anonymous expression platform. Worked on product idea, development flow and engagement improvements.</p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-primary font-bold uppercase tracking-wider mb-2 border-b border-white/5 pb-1">Achievements</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-gray-300">
                  <li><strong className="text-white">Mumbai University Avishkar Zonal Winner</strong></li>
                  <li><strong className="text-white">University Level Runner-up</strong></li>
                  <li>Built and shipped multiple AI, IoT and web-based projects.</li>
                </ul>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl border border-white/10 text-xs cursor-pointer transition-colors"
              >
                <Printer size={14} /> Print Dossier
              </button>

              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-300 font-bold ${
                  copied 
                    ? 'border-[#00FF00] bg-[#00FF00]/10 text-[#00FF00]' 
                    : 'border-primary bg-primary/10 hover:bg-primary/20 text-primary'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} 
                {copied ? 'Dossier Copied!' : 'Copy Plain Text CV'}
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
