'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '3+', label: 'Years Building' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '1', label: 'Company Founded' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Statement text reveal
      gsap.fromTo(statementRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: statementRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // Stats stagger
      const statEls = statsRef.current?.querySelectorAll('.stat-item');
      if (statEls) {
        gsap.fromTo(statEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // Parallax scroll on photos
      gsap.to(img1Ref.current, {
        yPercent: -25,
        scrollTrigger: {
          trigger: imgContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(img2Ref.current, {
        yPercent: -50,
        scrollTrigger: {
          trigger: imgContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(img3Ref.current, {
        yPercent: 15,
        scrollTrigger: {
          trigger: imgContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Clip path reveal on photo containers
      const imgs = [img1Ref.current, img2Ref.current, img3Ref.current];
      gsap.fromTo(imgs,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: 0.15,
          scrollTrigger: {
            trigger: imgContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36 overflow-hidden">
      {/* Rule */}
      <div className="h-rule mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
        {/* Left label */}
        <div className="lg:col-span-3">
          <span className="section-label">About</span>
        </div>

        {/* Right: Statement + Bio & Stats + Photo Grid */}
        <div className="lg:col-span-9 space-y-20">
          <h2
            ref={statementRef}
            className="font-display font-black text-white uppercase leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)' }}
          >
            BUILDING AI SYSTEMS,<br />
            DEVELOPER TOOLS &<br />
            FUTURISTIC PRODUCTS<br />
            <span style={{ color: '#E63946' }}>THAT MATTER.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Bio & Stats (Left) */}
            <div className="lg:col-span-6 space-y-10">
              <p className="text-white/50 text-base leading-relaxed">
                Computer Science graduate, CTO at SemiQuantum Technologies. I combine deep technical knowledge 
                with product thinking to build real-world systems — from AI platforms to secure encrypted tools 
                and IoT devices.
              </p>

              <div ref={statsRef} className="grid grid-cols-3 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="stat-item opacity-0">
                    <div className="stat-number">{s.value}</div>
                    <div className="text-[11px] uppercase tracking-widest text-white/30 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlapping Parallax Photo Grid (Right) */}
            <div
              ref={imgContainerRef}
              className="lg:col-span-6 relative h-[450px] mt-8 lg:mt-0"
            >
              {/* Photo 1: Big background */}
              <div
                ref={img1Ref}
                className="absolute left-0 top-[10%] w-[60%] aspect-[4/5] rounded-xl overflow-hidden border border-white/10 z-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              >
                <Image
                  src="/images/project_dashboard.png"
                  alt="Dashboard concept"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Photo 2: Foreground pop-out */}
              <div
                ref={img2Ref}
                className="absolute right-0 top-0 w-[45%] aspect-[1/1] rounded-xl overflow-hidden border border-white/10 z-20 shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              >
                <Image
                  src="/images/nyx_male_character.png"
                  alt="Neural Identity"
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Photo 3: Tiny lower overlap */}
              <div
                ref={img3Ref}
                className="absolute right-[10%] bottom-[5%] w-[40%] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              >
                <Image
                  src="/images/project_blockchain.png"
                  alt="Blockchain Node"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
