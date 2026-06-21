'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Shield, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 w-full relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Mail className="text-primary" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Transmit Signal</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Technical Node details */}
          <div className="lg:col-span-5 space-y-8 font-mono">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">NODE INTERFACE</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Establish a secure connection with Harsh Jha. Responses are typically routed within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Connection Status */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-4">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-neon-green"></span>
                </span>
                <div>
                  <div className="text-xs text-gray-500">CONNECTION STATUS</div>
                  <div className="text-sm font-bold text-white">SECURE DIRECT NODE ACTIVE</div>
                </div>
              </div>

              {/* Contact Info Items */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Secure Mail</div>
                    <a href="mailto:harsh@semiquantum.live" className="text-sm hover:text-primary transition-colors">
                      harsh@semiquantum.live
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">Sector Location</div>
                    <span className="text-sm">Mumbai, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-primary">
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">PGP Key ID</div>
                    <span className="text-sm text-neon-green">0x9F4C8E21B072AA1D</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Retro Shell Output mockup */}
            <div className="bg-black/60 border border-white/10 rounded-xl p-5 text-xs text-gray-500 space-y-1 shadow-inner">
              <div className="text-neon-green">nyx@harsh:~$ ping -c 3 semiquantum.live</div>
              <div>64 bytes from 104.244.42.1: icmp_seq=1 ttl=56 time=14.2 ms</div>
              <div>64 bytes from 104.244.42.1: icmp_seq=2 ttl=56 time=13.9 ms</div>
              <div>64 bytes from 104.244.42.1: icmp_seq=3 ttl=56 time=14.5 ms</div>
              <div className="text-white">--- semiquantum.live ping statistics ---</div>
              <div>3 packets transmitted, 3 received, 0% packet loss, time 2003ms</div>
              <div className="text-neon-green">nyx@harsh:~$ _</div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-card-bg backdrop-blur-md border border-card-border rounded-2xl p-8 lg:p-10 relative overflow-hidden">
              {/* Form Success Animation overlay */}
              {isSubmitted && (
                <motion.div 
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle size={64} className="text-neon-green mb-4 mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">SIGNAL TRANSMITTED</h3>
                  <p className="text-gray-400 text-sm max-w-sm font-mono">
                    Message encrypted with AES-256 and sent to node harsh@semiquantum.live. Secure handshake established.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                    Identity Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(112,0,255,0.2)] transition-all font-sans text-sm"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                    Return Signal Path (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(112,0,255,0.2)] transition-all font-sans text-sm"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                    Transmission Payload
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(112,0,255,0.2)] transition-all font-sans text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/95 text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] cursor-pointer glow-primary disabled:opacity-50 disabled:cursor-not-allowed uppercase font-mono tracking-widest text-xs"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Encrypting & Sending...
                    </>
                  ) : (
                    <>
                      Transmit Signal
                      <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
