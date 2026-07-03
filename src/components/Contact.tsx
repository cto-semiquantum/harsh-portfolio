'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  const [form, setForm]           = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 95%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: 'top 95%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputClass = `w-full bg-transparent border-b py-4 text-white placeholder-white/20 
    focus:outline-none focus:border-white/60 transition-colors text-sm font-light`;
  const inputStyle = { borderColor: 'rgba(255,255,255,0.1)' };

  return (
    <section id="contact" ref={sectionRef} className="px-6 lg:px-10 py-24 lg:py-36">
      {/* Rule */}
      <div className="h-rule mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        <div className="lg:col-span-3">
          <span className="section-label">Contact</span>
        </div>
        <div className="lg:col-span-9">
          {/* Giant LET'S TALK */}
          <h2
            ref={headingRef}
            className="font-display font-black text-white uppercase tracking-tight opacity-0"
            style={{ fontSize: 'clamp(3rem, 9vw, 10rem)', lineHeight: 0.88, letterSpacing: '-0.02em' }}
          >
            LET&apos;S<br />TALK<span style={{ color: '#E63946' }}>.</span>
          </h2>
        </div>
      </div>

      {/* Form + Info */}
      <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 opacity-0">
        {/* Left: info */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</p>
            <a
              href="mailto:harsh@semiquantum.live"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              harsh@semiquantum.live
            </a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Location</p>
            <p className="text-sm text-white/60">Mumbai, India</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Socials</p>
            <div className="flex gap-4">
              {[
                { label: 'GitHub', href: 'https://github.com/' },
                { label: 'LinkedIn', href: 'https://linkedin.com/' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mask-link text-sm"
                  data-text={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
              <span className="text-sm text-white/60">Available for opportunities</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-8 relative">
          {submitted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-xl"
                 style={{ background: '#0a0b14' }}>
              <div className="text-5xl mb-4">✓</div>
              <p className="font-display font-black text-white text-2xl uppercase">Sent.</p>
              <p className="text-white/40 text-sm mt-2">I'll get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-0">
            <div>
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your Name" required
                className={inputClass} style={inputStyle}
              />
            </div>
            <div>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Email Address" required
                className={inputClass} style={inputStyle}
              />
            </div>
            <div>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Your Message" rows={5} required
                className={`${inputClass} resize-none`} style={inputStyle}
              />
            </div>
            <div className="pt-8">
              <button
                type="submit" disabled={submitting}
                className="group flex items-center gap-3 cursor-pointer disabled:opacity-40"
              >
                <span
                  className="font-display font-black text-white uppercase tracking-tight group-hover:text-[#E63946] transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </span>
                <span
                  className="font-display font-black text-[#E63946] group-hover:translate-x-2 transition-transform duration-300 inline-block"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
