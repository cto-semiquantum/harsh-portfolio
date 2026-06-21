'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Alert {
  id: number;
  title: string;
  msg: string;
  type: 'info' | 'success' | 'warn';
}

const alertPool = [
  { title: "NYX OS", msg: "New Project Detected", type: "success" },
  { title: "NYX OS", msg: "Quantum Core Stable", type: "info" },
  { title: "NYX OS", msg: "Shield Intercept Active", type: "warn" },
  { title: "NYX OS", msg: "Neural Sync Complete", type: "success" },
  { title: "NYX OS", msg: "Sub-Quantum Loop Synced", type: "info" },
  { title: "NYX OS", msg: "Intrusion Blocked on Port 443", type: "warn" }
] as const;

export default function SystemNotifications() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const triggerAlert = () => {
    const template = alertPool[Math.floor(Math.random() * alertPool.length)];
    const newAlert: Alert = {
      id: Date.now(),
      title: template.title,
      msg: template.msg,
      type: template.type
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto dismiss after 3.2 seconds
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
    }, 3200);
  };

  useEffect(() => {
    // Initial delay, then fire periodically
    const delay = setTimeout(() => {
      triggerAlert();
      const interval = setInterval(triggerAlert, 24000); // every 24 seconds
      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[99998] flex flex-col gap-3 max-w-[280px] sm:max-w-xs pointer-events-none select-none">
      <AnimatePresence>
        {alerts.map((alert) => {
          let badgeColor = "bg-[#00FF00] shadow-[0_0_8px_rgba(0,255,0,0.6)]";
          let borderGlow = "hover:border-[#00FF00]/40";
          
          if (alert.type === 'warn') {
            badgeColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]";
            borderGlow = "hover:border-red-500/40";
          } else if (alert.type === 'info') {
            badgeColor = "bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.6)]";
            borderGlow = "hover:border-cyan-400/40";
          }

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(5px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col gap-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] ${borderGlow} transition-colors pointer-events-auto cursor-default font-mono`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-[10px] text-primary font-bold tracking-widest">{alert.title}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${badgeColor}`} />
              </div>
              <p className="text-white text-xs leading-relaxed font-semibold">
                {alert.msg}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
