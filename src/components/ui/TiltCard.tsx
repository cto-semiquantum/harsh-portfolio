'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltX?: number; // max rotation degrees on X axis
  maxTiltY?: number; // max rotation degrees on Y axis
}

export default function TiltCard({
  children,
  className = '',
  maxTiltX = 8,
  maxTiltY = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for normalized cursor positions (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damping and stiffness for smooth springs
  const springConfig = { stiffness: 180, damping: 25, mass: 0.4 };
  
  // Transform normalized x/y to degrees rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTiltX, -maxTiltX]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTiltY, maxTiltY]), springConfig);

  // Subtle glow layer follow coordinates in percentage
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  // We convert glowX and glowY values into string outputs for CSS background
  const backgroundGlow = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(circle 200px at ${gx}% ${gy}%, rgba(112, 0, 255, 0.15) 0%, transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to range [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {/* Subtle hover radial glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-10"
        style={{
          background: backgroundGlow,
        }}
      />
      {children}
    </motion.div>
  );
}
