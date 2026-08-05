import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Play, CornerDownLeft, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

interface TerminalProps {
  onCursorChange: (variant: any, text?: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

interface HistoryItem {
  type: 'input' | 'output' | 'system';
  content: string | string[];
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ onCursorChange, onNavigate, onOpenResume }) => {
  const [inputVal, setInputVal] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      type: 'system',
      content: [
        'Srinivas Chundi HyperDrive Workstation Terminal [v2.4.0-release]',
        'Type "help" to list available commands or click shortcut chips below.'
      ]
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    soundFx.playClick();

    // Append user input
    const newHistory: HistoryItem[] = [...history, { type: 'input', content: `$ ${cmdStr}` }];

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'matrix') {
      setMatrixActive(!matrixActive);
      newHistory.push({
        type: 'output',
        content: `Digital rain matrix effect ${!matrixActive ? 'ACTIVATED' : 'DEACTIVATED'}`
      });
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (trimmed === 'sudo hire' || trimmed === 'hire') {
      soundFx.playSuccess();
      newHistory.push({
        type: 'output',
        content: [
          '⚡ PRIORITY INQUIRY UNLOCKED!',
          'Direct contact: srinivaschundi1@gmail.com',
          'Navigating to contact section in 1.5 seconds...'
        ]
      });
      setHistory(newHistory);
      setInputVal('');
      setTimeout(() => onNavigate('contact'), 1500);
      return;
    }

    const matchedCmd = TERMINAL_COMMANDS[trimmed];
    if (matchedCmd) {
      newHistory.push({ type: 'output', content: matchedCmd.output });
    } else {
      newHistory.push({
        type: 'output',
        content: `Command not recognized: "${cmdStr}". Type "help" for command list.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFx.playKeypress();
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <section id="terminal" className="py-24 px-4 max-w-6xl mx-auto relative">
      <div className="space-y-4 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-[#93ccff] font-bold">
          <TerminalIcon className="w-3.5 h-3.5 text-[#93ccff]" />
          <span>DEVELOPER CONSOLE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Interactive Workstation Terminal
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl">
          Execute commands in real-time to inspect my bio, tech stack, career history, or trigger priority hire protocols.
        </p>
      </div>

      {/* Terminal Window Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative rounded-3xl glass-card border border-[#93ccff]/30 bg-black/90 p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-hidden ${
          matrixActive ? 'scanlines border-[#93ccff]/60' : ''
        }`}
      >
        {/* Terminal Window Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-zinc-500 mb-4 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-zinc-400 font-mono hidden sm:inline">srinivas@workstation:~</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#93ccff] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#93ccff] animate-pulse" />
              ONLINE
            </span>
            <button
              onClick={() => handleCommand('clear')}
              onMouseEnter={() => soundFx.playHover()}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all text-xs"
              title="Clear terminal screen"
            >
              clear
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-white/5 text-xs select-none">
          <span className="text-zinc-500 text-xs mr-1">Quick Run:</span>
          {['help', 'bio', 'skills', 'projects', 'exp', 'sudo hire', 'matrix'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              onMouseEnter={() => soundFx.playHover()}
              className="px-2.5 py-1 rounded-full bg-[#93ccff]/10 hover:bg-[#93ccff]/25 text-[#93ccff] hover:text-white border border-[#93ccff]/30 transition-all text-xs font-mono font-semibold"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="min-h-[260px] max-h-[380px] overflow-y-auto space-y-3 pt-4 pr-2 font-mono">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.type === 'input' ? (
                <div className="text-[#93ccff] font-bold">{item.content}</div>
              ) : Array.isArray(item.content) ? (
                item.content.map((line, lIdx) => (
                  <div key={lIdx} className="text-zinc-300 leading-relaxed pl-2 border-l border-[#93ccff]/30">
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-zinc-300 leading-relaxed pl-2 border-l border-[#93ccff]/30">{item.content}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Field */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <span className="text-[#93ccff] font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'skills', 'sudo hire')..."
            className="w-full bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm placeholder-zinc-600 focus:ring-0"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            onMouseEnter={() => soundFx.playHover()}
            className="p-1.5 rounded-lg bg-[#93ccff]/20 hover:bg-[#93ccff]/40 text-[#93ccff] hover:text-[#ffffff] transition-all"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
