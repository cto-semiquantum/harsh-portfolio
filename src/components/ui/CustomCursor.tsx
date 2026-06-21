'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const points = useRef<{ x: number; y: number }[]>([]);
  const maxPoints = 20; // Length of the trail
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor only after first mouse move
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Track hover states for links/buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
        document.body.classList.add('cursor-hover');
      } else {
        setIsHovered(false);
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Setup Trail animation loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth outer ring position
      if (ringRef.current) {
        // Simple lerp for outer ring
        lastMouse.current.x += (mouse.current.x - lastMouse.current.x) * 0.15;
        lastMouse.current.y += (mouse.current.y - lastMouse.current.y) * 0.15;
        ringRef.current.style.left = `${lastMouse.current.x}px`;
        ringRef.current.style.top = `${lastMouse.current.y}px`;
      }

      // Exact dot position
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }

      // Add current point to trail
      points.current.push({ x: mouse.current.x, y: mouse.current.y });
      if (points.current.length > maxPoints) {
        points.current.shift();
      }

      // Draw glowing cyber trail line
      if (points.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);

        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }

        ctx.strokeStyle = isHovered 
          ? 'rgba(0, 255, 0, 0.25)' 
          : 'rgba(112, 0, 255, 0.25)';
        ctx.lineWidth = isHovered ? 4 : 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Inner core of the trail
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);
        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }
        ctx.strokeStyle = isHovered
          ? 'rgba(0, 255, 0, 0.6)'
          : 'rgba(167, 139, 250, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleFirstMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      document.body.classList.remove('cursor-hover');
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99997]"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Outer Ring */}
      <div ref={ringRef} className="cursor-glow" />
      {/* Center Dot */}
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
