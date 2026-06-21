import { Terminal } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-l from-primary/50 to-transparent mr-4"></div>
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Experience</h2>
        </div>

        <div className="bg-card-bg border border-primary/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden glow-primary">
          {/* Glow effect background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="bg-black border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center min-w-[160px] h-[160px]">
             <div className="text-4xl font-black text-primary mb-2">S<span className="text-white">Q</span></div>
             <div className="text-xs text-gray-500 font-mono tracking-widest">SemiQuantum</div>
          </div>

          <div className="flex-1 z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Chief Technology Officer</h3>
            <p className="text-gray-400 text-lg mb-4">SemiQuantum Technologies</p>
            <div className="flex items-center gap-2 mb-6 text-sm text-neon-green font-mono bg-neon-green/10 w-fit px-3 py-1 rounded-full border border-neon-green/20">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              Feb 2026 — Present
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <Terminal size={18} className="text-primary mt-1 shrink-0" />
                <span>Leading AI product engineering and system architecture.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Terminal size={18} className="text-primary mt-1 shrink-0" />
                <span>Managing and mentoring developer teams.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Terminal size={18} className="text-primary mt-1 shrink-0" />
                <span>Driving innovation in AI, Cybersecurity & Systems.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Terminal size={18} className="text-primary mt-1 shrink-0" />
                <span>Building the SemiQuantum ecosystem and developer tools.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
