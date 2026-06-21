'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSystem } from '@/src/context/SystemContext';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command handlers
  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    if (!trimmed) {
      setHistory(prev => [...prev, { command: cmd, output: '' }]);
      return;
    }

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-gray-400">
            <p className="text-white font-semibold">Available commands:</p>
            <p><span className="text-[#00FF00]">help</span> - Display this help message</p>
            <p><span className="text-[#00FF00]">whoami</span> - Display detailed profile of Harsh Jha</p>
            <p><span className="text-[#00FF00]">skills</span> - View tech stack / arsenal</p>
            <p><span className="text-[#00FF00]">projects</span> - View list of key projects</p>
            <p><span className="text-[#00FF00]">clear</span> - Clear terminal screen</p>
          </div>
        );
        break;

      case 'whoami':
        response = (
          <div className="space-y-2 text-gray-300">
            <p><span className="text-[#7000FF] font-bold">Name:</span> Harsh Jha</p>
            <p><span className="text-[#7000FF] font-bold">Role:</span> CTO at SemiQuantum Technologies | AI Engineer | Full Stack Developer</p>
            <p><span className="text-[#7000FF] font-bold">Core Focus:</span> Building secure AI systems, hardware/kernel engineering, dev tools, and Web3 architectures.</p>
            <p>Passionate about low-level coding (Kernel dev, x86 Assembly) and high-performance neural computing.</p>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="space-y-2 text-gray-400">
            <div>
              <p className="text-white font-semibold border-b border-white/5 pb-1">Languages</p>
              <p>Python, C++, JavaScript, TypeScript, SQL, Assembly</p>
            </div>
            <div>
              <p className="text-white font-semibold border-b border-white/5 pb-1">AI / ML</p>
              <p>TensorFlow, HuggingFace, Groq AI, OpenAI, Scikit-learn</p>
            </div>
            <div>
              <p className="text-white font-semibold border-b border-white/5 pb-1">Full Stack</p>
              <p>Next.js, Node.js, Express, Prisma, Tailwind CSS</p>
            </div>
            <div>
              <p className="text-white font-semibold border-b border-white/5 pb-1">Systems & Cyber</p>
              <p>Linux Kernel Development, Burp Suite, Nmap, GDB, Exploit Dev</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-2 text-gray-400">
            <p className="text-white font-semibold">Featured Projects:</p>
            <div className="border-l-2 border-[#7000FF] pl-3 py-1">
              <p className="text-white font-medium">1. SQ Apex</p>
              <p className="text-xs">AI talent assessment platform utilizing Resume Parsers and Groq AI models.</p>
            </div>
            <div className="border-l-2 border-[#7000FF] pl-3 py-1">
              <p className="text-white font-medium">2. SQ OS</p>
              <p className="text-xs">Custom x86 hobby operating system bootable in real protected mode.</p>
            </div>
            <div className="border-l-2 border-[#7000FF] pl-3 py-1">
              <p className="text-white font-medium">3. SQ ExamChain</p>
              <p className="text-xs">Decentralized, AES-256 encrypted exam integrity platform.</p>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        response = (
          <p className="text-red-500">
            Command not recognized: <span className="font-bold">{trimmed}</span>. Type <span className="text-[#00FF00]">help</span> for options.
          </p>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output: response }]);
    setInput('');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll to bottom on history change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Initial welcome message
  useEffect(() => {
    setHistory([
      {
        command: '',
        output: (
          <div className="text-gray-400 space-y-1 font-mono">
            <p className="text-white font-bold text-base tracking-widest text-glow-primary">NYX OS [Version 4.2.9]</p>
            <p>Establishing connection to core terminal...</p>
            <p className="text-[#00FF00]">Status: SECURE NODE ONLINE</p>
            <p className="text-xs text-gray-500">Type &apos;help&apos; to view available cyber instructions.</p>
            <p className="border-b border-white/10 pb-2"></p>
          </div>
        ),
      },
    ]);
  }, []);

  const { loadingComplete, recruiterMode } = useSystem();
  const autoTypeStarted = useRef(false);

  useEffect(() => {
    if (!loadingComplete || autoTypeStarted.current) return;
    autoTypeStarted.current = true;

    // Delay typing slightly after boot screen finishes
    const delayTimer = setTimeout(() => {
      const commandText = 'whoami';
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < commandText.length) {
          setInput(prev => prev + commandText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          
          // Press Enter after half a second
          setTimeout(() => {
            handleCommand('whoami');
          }, 500);
        }
      }, 120); // typing speed (120ms per char)
    }, recruiterMode ? 100 : 1800); // 1.8s delay on standard visual mode, near instant in recruiter mode

    return () => clearTimeout(delayTimer);
  }, [loadingComplete, handleCommand, recruiterMode]);

  return (
    <div
      onClick={focusInput}
      className="bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-5 font-mono text-sm w-full h-[320px] flex flex-col shadow-[0_0_40px_rgba(112,0,255,0.1)] hover:border-primary/30 transition-colors duration-300 cursor-text select-text"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="text-[10px] text-gray-500 ml-2">nyx@kernel_core</span>
        </div>
        <span className="text-[10px] text-primary font-bold">TERMINAL v4.2</span>
      </div>

      {/* History scroll section */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5 leading-relaxed">
            {item.command !== '' && (
              <div className="flex items-center gap-2">
                <span className="text-[#00FF00]">nyx-os@harsh:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.output && <div className="pl-2">{item.output}</div>}
          </div>
        ))}

        {/* Current Prompt Input */}
        <div className="flex items-center gap-2">
          <span className="text-[#00FF00] shrink-0">nyx-os@harsh:~$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white w-full caret-transparent font-mono p-0 select-text"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {/* Blinking Cyber Cursor */}
            <span
              className="absolute pointer-events-none bg-[#00FF00] w-2 h-4 animate-pulse"
              style={{
                left: `${input.length * 8.4}px`, // approximate monospace character width in px
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
