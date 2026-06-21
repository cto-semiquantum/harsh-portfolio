'use client';

import { BookOpen, Briefcase, Shield, Cpu } from 'lucide-react';
import TiltCard from './ui/TiltCard';

export default function About() {
  const cards = [
    {
      icon: <BookOpen className="text-primary mb-4" size={32} />,
      title: "B.Sc. Computer Science",
      subtitle: "Mumbai University"
    },
    {
      icon: <Briefcase className="text-primary mb-4" size={32} />,
      title: "Chief Technology Officer",
      subtitle: "SemiQuantum Technologies"
    },
    {
      icon: <Shield className="text-primary mb-4" size={32} />,
      title: "AI • Cybersecurity • Systems",
      subtitle: "My Core Domains"
    },
    {
      icon: <Cpu className="text-primary mb-4" size={32} />,
      title: "Building Real World Products",
      subtitle: "From idea to impact"
    }
  ];

  return (
    <section id="about" className="py-24 relative max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <BookOpen className="text-primary" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight uppercase">About Me</h2>
      </div>

      <p className="text-gray-400 text-lg max-w-3xl mb-16 leading-relaxed">
        Computer Science graduate with a passion for AI, Cybersecurity, and Systems Programming. I build real-world products and developer tools that solve meaningful problems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <TiltCard
            key={index}
            className="flex rounded-2xl overflow-hidden"
          >
            <div className="bg-card-bg border border-card-border hover:border-primary/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_20px_rgba(112,0,255,0.08)] group w-full flex flex-col"
                 style={{ transformStyle: 'preserve-3d' }}>
              <div className="group-hover:scale-105 transition-transform duration-300 w-fit"
                   style={{ transform: 'translateZ(25px)' }}>
                {card.icon}
              </div>
              <h3 className="text-white font-bold mb-2"
                  style={{ transform: 'translateZ(15px)' }}>
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm mt-auto"
                 style={{ transform: 'translateZ(10px)' }}>
                {card.subtitle}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
