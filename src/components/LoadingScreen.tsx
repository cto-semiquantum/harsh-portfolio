'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSystem } from '@/src/context/SystemContext';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const { setLoadingComplete, recruiterMode } = useSystem();

  // Canvas-based hacker matrix/terminal video loop animation
  useEffect(() => {
    if (recruiterMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    
    // Set explicit size
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Matrix columns setup
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const rainDrops = new Array(columns).fill(1);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ☣☠🔒⚙🔓';
    const logStrings = [
      'SYSTEM: INITIALIZING NEURAL CORE...',
      'SECURE LINK: ESTABLISHED (128-BIT)',
      'LINKING HOST: harsh@semiquantum.live',
      'DECRYPTING PORTFOLIO NODE...',
      'INTEGRITY VERIFICATION: 100% PASS',
      'ACCESS GRANTED - PRIVILEGES INHERITED',
    ];
    let logIdx = 0;
    let logTimer = 0;

    const draw = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(10, 11, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw red matrix characters
      ctx.fillStyle = '#E63946';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Random opacity for glitch feel
        ctx.fillStyle = Math.random() > 0.98 ? '#ffffff' : 'rgba(230, 57, 70, 0.35)';
        
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      // Draw hacker terminal logs on top of matrix rain
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 12px monospace';
      
      // Flash current log
      logTimer++;
      if (logTimer > 25) {
        logIdx = (logIdx + 1) % logStrings.length;
        logTimer = 0;
      }
      ctx.fillText(`> ${logStrings[logIdx]}`, 40, canvas.height - 80);

      // System grids/scanlines overlay
      ctx.strokeStyle = 'rgba(230, 57, 70, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [recruiterMode]);

  // Loading animation sequence (zoom & auto-dismiss)
  useEffect(() => {
    setLoadingComplete(false);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide up and dismiss automatically after 3 seconds of zoom
          gsap.to(containerRef.current, {
            yPercent: -100,
            scale: 0.94,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
              setLoadingComplete(true);
              onComplete(); // Unlocks scrolling in page.tsx
              if (containerRef.current) {
                containerRef.current.style.display = 'none';
              }
            },
          });
        },
      });

      // Slowly zoom in the background matrix canvas (video-like zoom)
      tl.fromTo(canvasRef.current,
        { scale: 1 },
        { scale: 1.15, duration: 3.0, ease: 'power1.out' },
        0
      );

      // Fade in the bottom status text slowly
      tl.fromTo(textRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.45, y: 0, duration: 0.6 },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col justify-between p-8 lg:p-12 select-none overflow-hidden"
      style={{ background: '#0a0b14', transformOrigin: 'bottom center' }}
    >
      {/* Canvas-based dynamic Hacker code terminal video stream loop */}
      {!recruiterMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none origin-center"
        />
      )}

      {/* Top: Logo */}
      <div className="flex items-center gap-1 z-10">
        <span className="font-display font-black text-2xl text-white tracking-tight">HJ</span>
        <span className="font-black text-3xl leading-none" style={{ color: '#E63946' }}>.</span>
      </div>

      {/* Bottom: Minimal Status Text */}
      <div ref={textRef} className="w-full z-10 opacity-0 flex justify-between items-end">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          OPERATOR CORE ONLINE
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          INITIALIZING SECURE LINK
        </span>
      </div>
    </div>
  );
}
