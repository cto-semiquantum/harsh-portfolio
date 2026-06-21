'use client';

import Image from 'next/image';
import { ArrowRight, ChevronRight, Folder, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import TiltCard from './ui/TiltCard';

export default function Projects() {
  const projects = [
    {
      title: "SQ Apex",
      subtitle: "AI Talent Assessment Platform",
      image: "/images/project_dashboard.png",
      tags: ["Next.js", "Node.js", "Prisma", "JWT", "Groq AI", "Resume Parser"],
      features: [
        "AI Resume Scoring",
        "ATS Engine",
        "AI Interview System",
        "Role-based Dashboards"
      ],
      description: "A secure talent vetting interface that analyzes developer profiles using customized Groq neural vectors, parsing metadata, and generating real-time interactive technical interviews.",
      featured: true
    },
    {
      title: "SQ ExamChain",
      subtitle: "Secure Exam Distribution System",
      image: "/images/project_blockchain.png",
      tags: ["AES-256", "Blockchain", "FastAPI", "Smart Contracts", "JWT"],
      features: [
        "Secure Exam System",
        "Blockchain Integrity",
        "Paper Generation",
        "Smart Contract Logs"
      ],
      description: "Built secure exam management concepts using encryption, audit logging, and controlled access. Worked on paper generation, lifecycle tracking, and security-focused workflows."
    },
    {
      title: "Medibox",
      subtitle: "Smart Medication Reminder System",
      image: "/images/project_drone.png",
      tags: ["ESP32", "Sensors", "Firebase", "Blynk", "Python"],
      features: [
        "IoT Medication Alerts",
        "Missed Dose Reduction",
        "Physical Sensors",
        "AI Assisted Logic"
      ],
      description: "Created an IoT-based medication reminder system to reduce missed doses. Integrated physical sensors and AI-assisted logic for improved system reliability."
    },
    {
      title: "SachBol",
      subtitle: "Anonymous Expression Platform",
      image: "/images/project_dashboard.png",
      tags: ["Next.js", "Node.js", "Express", "REST APIs", "Tailwind CSS"],
      features: [
        "Anonymous Posting Feed",
        "Product Lifecycle Design",
        "Content Security Checks",
        "Engagement Optimization"
      ],
      description: "Developed a user-focused anonymous expression platform, designing the product idea, development flow, and user engagement loops."
    }
  ];

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Framer Motion entry animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="projects" className="py-24 relative max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Title Header */}
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(112,0,255,0.15)]">
            <Folder className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Featured Projects</h2>
            <p className="text-xs text-gray-500 font-mono mt-1">SYSTEMS &bull; DECENTRALIZED &bull; NEURAL NETWORKS</p>
          </div>
        </div>
        <a 
          href="#" 
          className="text-primary hover:text-white transition-all flex items-center gap-2 text-sm font-bold font-mono border border-primary/20 hover:border-primary/50 px-4 py-2 rounded-xl bg-primary/5"
        >
          View All Projects
          <ArrowRight size={16} />
        </a>
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full flex"
          >
            <TiltCard
              maxTiltX={10}
              maxTiltY={10}
              className="w-full flex h-full rounded-2xl overflow-hidden cursor-pointer"
            >
              <div 
                onClick={() => setSelectedProject(project)}
                className="bg-black/70 backdrop-blur-md border border-white/10 hover:border-primary/50 rounded-2xl overflow-hidden flex flex-col group transition-all duration-500 w-full h-full relative cyber-grid shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(112,0,255,0.25)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Micro tech corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/40 rounded-tl" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/40 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/40 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/40 rounded-br" />

                {/* Shifting Gradient Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animated-gradient z-0" />

                {/* Image Container */}
                <div 
                  className="relative h-44 w-full border-b border-white/10 overflow-hidden z-10"
                  style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                >
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-20 bg-primary text-white text-[10px] px-3 py-1 rounded-lg font-bold font-mono uppercase tracking-widest shadow-[0_0_12px_rgba(112,0,255,0.6)] border border-primary/40">
                      Featured
                    </div>
                  )}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div 
                  className="p-6 flex-1 flex flex-col relative z-10"
                  style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                >
                  <h3 
                    className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors duration-300"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {project.title}
                  </h3>
                  
                  <p 
                    className="text-cyan-400 text-xs font-mono font-bold tracking-wider mt-1 mb-4 uppercase"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {project.subtitle}
                  </p>

                  <div 
                    className="flex flex-wrap gap-1.5 mb-6 border-b border-white/5 pb-4"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="bg-white/5 border border-white/10 text-gray-400 font-mono text-[9px] px-2 py-0.5 rounded-md uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-mono text-gray-600 self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <ul 
                    className="space-y-2 mt-auto"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {project.features.slice(0, 3).map((feature, fIdx) => (
                      <li key={fIdx} className="text-gray-300 text-xs flex items-start gap-2 font-sans leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary glow-primary shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Cyber Dossier Modal Component */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono scanlines"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-black/95 border-2 border-primary border-double rounded-2xl w-full max-w-xl p-6 relative shadow-[0_0_60px_rgba(112,0,255,0.3)] text-gray-300 flex flex-col gap-4 relative"
            >
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white border border-white/5 hover:border-white/20 p-2 rounded-xl cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>

              {/* Dossier Headers */}
              <div className="border-b border-white/10 pb-4 mb-2">
                <h3 className="text-white font-bold text-glow-primary text-lg">
                  MISSION FILE: {selectedProject.title.toUpperCase()}
                </h3>
                <div className="text-[10px] text-gray-500 space-y-0.5 mt-2">
                  <p>CLASSIFICATION: CLASSIFIED // LEVEL 4 AUTHORIZED</p>
                  <p>STATUS: DEPLOYED // LIVE CORE ACTIVE</p>
                  <p>DEVELOPER NODE: harsh@semiquantum.com</p>
                </div>
              </div>

              {/* Dossier body */}
              <div className="space-y-4 text-xs leading-relaxed overflow-y-auto max-h-[300px] pr-2">
                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-wider mb-1">Project Objective</h4>
                  <p className="text-gray-300">{selectedProject.description || "System data loaded. Operation records are active."}</p>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-wider mb-2">Technical Specifications</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-md text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-wider mb-2">Mission Payload Features</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] drop-shadow-[0_0_3px_rgba(0,255,0,0.5)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Terminate trigger */}
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full mt-4 bg-primary/10 hover:bg-primary/20 border border-primary text-primary py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer text-center"
              >
                [TERMINATE DOSSIER CONNECTION]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
