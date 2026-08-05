import React from 'react';
import { motion } from 'motion/react';
import { Code2, Trophy, Terminal, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SocialSidebarProps {
  onCursorChange: (variant: any, text?: string) => void;
}

const PROFILES = [
  {
    name: 'LeetCode',
    stat: '400+ Solved',
    url: PERSONAL_INFO.leetcode,
    icon: Code2,
    color: 'hover:text-[#93ccff] hover:border-[#93ccff]/50 hover:bg-[#93ccff]/10',
    iconColor: 'text-[#93ccff]',
  },
  {
    name: 'CodeChef',
    stat: '4★ Rating',
    url: PERSONAL_INFO.codechef,
    icon: Trophy,
    color: 'hover:text-[#93ccff] hover:border-[#93ccff]/50 hover:bg-[#93ccff]/10',
    iconColor: 'text-[#93ccff]',
  },
  {
    name: 'Codeforces',
    stat: 'Active Rated',
    url: PERSONAL_INFO.codeforces,
    icon: Terminal,
    color: 'hover:text-[#93ccff] hover:border-[#93ccff]/50 hover:bg-[#93ccff]/10',
    iconColor: 'text-[#93ccff]',
  },
  {
    name: 'GitHub',
    stat: 'srinivasc16',
    url: PERSONAL_INFO.github,
    icon: Github,
    color: 'hover:text-[#93ccff] hover:border-[#93ccff]/50 hover:bg-[#93ccff]/10',
    iconColor: 'text-[#93ccff]',
  },
  {
    name: 'LinkedIn',
    stat: 'Connect',
    url: PERSONAL_INFO.linkedin,
    icon: Linkedin,
    color: 'hover:text-[#93ccff] hover:border-[#93ccff]/50 hover:bg-[#93ccff]/10',
    iconColor: 'text-[#93ccff]',
  },
];

export const SocialSidebar: React.FC<SocialSidebarProps> = ({ onCursorChange }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 p-2 rounded-2xl glass-card bg-[#080d1a]/90 border border-[#93ccff]/30 backdrop-blur-xl"
    >
      <div className="w-full text-center pb-2 border-b border-[#93ccff]/20">
        <span className="text-[10px] font-mono text-[#93ccff]/80 uppercase tracking-widest block font-bold">
          Links
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {PROFILES.map((profile) => {
          const Icon = profile.icon;
          return (
            <a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                onCursorChange('hover', profile.name);
              }}
              onMouseLeave={() => onCursorChange('default')}
              className={`group relative p-2.5 rounded-xl border border-[#93ccff]/20 bg-[#93ccff]/5 text-zinc-300 transition-all duration-300 ${profile.color}`}
              title={`${profile.name} (${profile.stat})`}
            >
              <Icon className="w-5 h-5 text-[#93ccff] transition-transform duration-200 group-hover:scale-110" />

              {/* Floating Tooltip */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#080d1a] border border-[#93ccff]/40 text-white text-xs font-mono font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 flex items-center gap-2">
                <span className={profile.iconColor}>{profile.name}</span>
                <span className="text-[10px] text-[#93ccff]/70">({profile.stat})</span>
                <ExternalLink className="w-3 h-3 text-[#93ccff]/60" />
              </div>
            </a>
          );
        })}
      </div>

      <div className="w-full pt-2 border-t border-[#93ccff]/20 text-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#93ccff] animate-ping mx-auto" />
      </div>
    </motion.aside>
  );
};
