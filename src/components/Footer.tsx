import React, { useEffect, useState } from 'react';
import { ArrowUp, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onCursorChange: (variant: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onCursorChange }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#93ccff]/20 py-12 px-4 sm:px-8 max-w-7xl mx-auto text-xs text-zinc-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-base font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>{PERSONAL_INFO.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#93ccff]" />
            <span className="text-xs font-mono font-normal text-[#93ccff]">Software & AI Engineer</span>
          </div>
          <p className="text-zinc-400 text-xs">
            © {new Date().getFullYear()} Srinivas Chundi. Engineered with React & Tailwind CSS.
          </p>
        </div>

        {/* Live System Time */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-[#93ccff]/30 bg-[#080d1a]/80 font-mono text-xs text-[#93ccff]">
          <span className="w-2 h-2 rounded-full bg-[#93ccff] animate-pulse" />
          <span>Local Time: {time || '00:00:00'}</span>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              onCursorChange('hover');
            }}
            onMouseLeave={() => onCursorChange('default')}
            className="p-2.5 rounded-full glass-pill border border-[#93ccff]/30 bg-[#080d1a]/80 text-[#93ccff] hover:text-white hover:border-[#93ccff] transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => {
              onCursorChange('magnetic');
            }}
            onMouseLeave={() => onCursorChange('default')}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-[#93ccff]/30 bg-[#080d1a]/80 text-[#93ccff] hover:text-white hover:border-[#93ccff] transition-all group font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
