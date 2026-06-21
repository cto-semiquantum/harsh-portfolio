'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance in pixels to trigger the effect
  strength?: number; // Power of the pull (0.1 to 0.5 is good)
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);

    // Calculate distance
    const distance = Math.sqrt(x * x + y * y);

    if (distance < range) {
      // Pull toward mouse
      setPosition({ x: x * strength, y: y * strength });
    } else {
      // Reset position
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } as const;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={springConfig}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
