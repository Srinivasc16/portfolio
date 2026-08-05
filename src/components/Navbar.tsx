import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MousePointer, Command, FileText, ChevronDown,
  ExternalLink, Code2, Trophy, Terminal, Github, Linkedin, Menu, X,
  User, Layers, Cpu, GraduationCap, MessageSquare, Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  cursorEnabled: boolean;
  onToggleCursor: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onCursorChange: (variant: any) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Overview', icon: User },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'experience', label: 'Credentials', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

const CODING_LINKS = [
  {
    name: 'LeetCode',
    stat: '400+ Solved',
    url: PERSONAL_INFO.leetcode,
    icon: Code2,
    highlight: true
  },
  {
    name: 'CodeChef',
    stat: '4★ Rating',
    url: PERSONAL_INFO.codechef,
    icon: Trophy,
  },
  {
    name: 'Codeforces',
    stat: 'Active Rated',
    url: PERSONAL_INFO.codeforces,
    icon: Terminal,
  },
  {
    name: 'GitHub',
    stat: 'srinivasc16',
    url: PERSONAL_INFO.github,
    icon: Github,
  },
  {
    name: 'LinkedIn',
    stat: 'Connect',
    url: PERSONAL_INFO.linkedin,
    icon: Linkedin,
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  cursorEnabled,
  onToggleCursor,
  onOpenCommandPalette,
  onOpenResume,
  onCursorChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 sm:py-5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand logo pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => {
                onNavigate('hero');
              }}
              onMouseEnter={() => {
                onCursorChange('magnetic');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-2xl glass-pill border border-[#93ccff]/30 bg-[#080d1a]/80 text-xs sm:text-sm font-bold tracking-tight hover:border-[#93ccff] transition-all group active:scale-95 min-h-[44px]"
            >
              <div className="w-3.5 h-3.5 bg-[#93ccff] rounded-md flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 bg-[#080d1a] rounded-full" />
              </div>
              <span className="text-white group-hover:text-[#93ccff] transition-colors whitespace-nowrap">
                Srinivas Chundi
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation Dock Menu */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full glass-pill bg-[#080d1a]/90 border border-[#93ccff]/25 pointer-events-auto"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                  }}
                  onMouseEnter={() => {
                    onCursorChange('hover');
                  }}
                  onMouseLeave={() => onCursorChange('default')}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors z-10 min-h-[38px] ${
                    isActive ? 'text-[#080d1a] font-extrabold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-[#93ccff] border border-[#93ccff]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-[#080d1a]' : 'text-[#93ccff]'}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}

            {/* Profiles Dropdown (Desktop) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                }}
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[38px] ${
                  dropdownOpen
                    ? 'bg-[#93ccff]/30 border border-[#93ccff]/50 text-white'
                    : 'text-zinc-300 hover:text-white hover:bg-[#93ccff]/10'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-[#93ccff]" />
                <span>Profiles</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 text-[#93ccff] ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Popup */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl glass-card bg-[#080d1a]/95 border border-[#93ccff]/30 p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-mono text-[#93ccff]/80 uppercase tracking-wider border-b border-[#93ccff]/20 mb-1 font-bold">
                      Profiles & Platforms
                    </div>

                    <div className="space-y-0.5">
                      {CODING_LINKS.map((link) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setDropdownOpen(false);
                            }}
                            onMouseEnter={() => {
                              onCursorChange('hover');
                            }}
                            onMouseLeave={() => onCursorChange('default')}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#93ccff]/10 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-1.5 rounded-lg bg-[#93ccff]/10 border border-[#93ccff]/20 text-[#93ccff]">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white group-hover:text-[#93ccff] transition-colors flex items-center gap-1">
                                  <span>{link.name}</span>
                                  {link.highlight && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#93ccff] animate-pulse" />
                                  )}
                                </div>
                                <div className="text-[10px] text-zinc-400 font-mono">{link.stat}</div>
                              </div>
                            </div>
                            <ExternalLink className="w-3 h-3 text-[#93ccff]/60 group-hover:text-[#93ccff] transition-colors" />
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

          {/* Action Controls & Mobile Menu Trigger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto"
          >
            {/* Command palette button */}
            <button
              onClick={() => {
                onOpenCommandPalette();
              }}
              onMouseEnter={() => {
                onCursorChange('hover');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="flex items-center justify-center p-2.5 sm:px-3 sm:py-2 rounded-2xl glass-pill border border-[#93ccff]/20 bg-[#080d1a]/80 text-xs text-zinc-300 hover:text-[#93ccff] hover:border-[#93ccff]/40 transition-all min-h-[44px] min-w-[44px]"
              title="Command Palette (Cmd+K)"
            >
              <Command className="w-4 h-4 text-[#93ccff]" />
              <span className="hidden lg:inline text-[11px] font-mono text-[#93ccff]/80 ml-1">⌘K</span>
            </button>

            {/* Custom Cursor Toggle (Desktop only) */}
            <button
              onClick={() => {
                onToggleCursor();
              }}
              onMouseEnter={() => {
                onCursorChange('hover');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className={`hidden md:flex p-2.5 rounded-2xl glass-pill text-xs transition-all min-h-[44px] min-w-[44px] items-center justify-center ${
                cursorEnabled ? 'text-[#93ccff] border-[#93ccff]/40 bg-[#93ccff]/10' : 'text-zinc-500'
              }`}
              title={cursorEnabled ? 'Custom Liquid Cursor Active' : 'Native Cursor Active'}
            >
              <MousePointer className="w-4 h-4" />
            </button>

            {/* Resume Preview CTA */}
            <button
              onClick={() => {
                onOpenResume();
              }}
              onMouseEnter={() => {
                onCursorChange('magnetic');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-[#93ccff] hover:bg-[#b0dcff] text-[#080d1a] font-extrabold text-xs transition-all active:scale-95 min-h-[44px]"
            >
              <FileText className="w-3.5 h-3.5 text-[#080d1a]" />
              <span className="hidden xs:inline">Resume</span>
            </button>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden flex items-center justify-center p-2.5 rounded-2xl glass-pill text-white bg-[#080d1a]/90 border border-[#93ccff]/30 min-h-[44px] min-w-[44px] active:scale-95"
              aria-label="Toggle Mobile Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#93ccff]" /> : <Menu className="w-5 h-5 text-[#93ccff]" />}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pt-24 px-4 pb-8 bg-[#06080e]/95 backdrop-blur-2xl md:hidden overflow-y-auto flex flex-col justify-between"
          >
            <div className="space-y-6 max-w-md mx-auto w-full">
              {/* Navigation Sections */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#93ccff] uppercase tracking-widest px-3 mb-2 font-bold">
                  Navigation Sections
                </div>
                {NAV_ITEMS.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const stepNumber = index + 1;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#93ccff] text-[#080d1a] border-[#93ccff]'
                          : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 flex items-center justify-center text-xs font-mono font-black ${
                          isActive ? 'bg-[#080d1a] text-[#93ccff] rounded-lg' : 'bg-[#93ccff]/20 text-[#93ccff] rounded-lg'
                        }`}>
                          {stepNumber}
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              {/* Profiles Section on Mobile */}
              <div className="space-y-2 pt-2 border-t border-[#93ccff]/20">
                <div className="text-[10px] font-mono text-[#93ccff] uppercase tracking-widest px-3 mb-2 font-bold flex items-center justify-between">
                  <span>Profiles & Coding Accounts</span>
                  <Sparkles className="w-3 h-3 text-[#93ccff]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CODING_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080d1a] border border-[#93ccff]/20 text-white text-xs font-semibold hover:border-[#93ccff] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-[#93ccff]/10 text-[#93ccff]`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1">
                              <span>{link.name}</span>
                            </div>
                            <div className="text-[10px] text-zinc-400 font-mono">{link.stat}</div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#93ccff]/60" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="pt-6 border-t border-[#93ccff]/20 max-w-md mx-auto w-full text-center">
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#93ccff] text-[#080d1a] font-extrabold text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Open Digital Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mobile Bottom Tab Bar with Material Shapes */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden w-[92%] max-w-md pointer-events-auto">
        <div className="flex items-center justify-around p-2 rounded-3xl glass-card bg-[#080d1a]/95 border border-[#93ccff]/30 backdrop-blur-2xl">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const stepNumber = index + 1;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all relative ${
                  isActive ? 'text-[#080d1a] font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileBottomTab"
                    className="absolute inset-0 rounded-2xl bg-[#93ccff]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <div className={`relative z-10 w-6 h-6 flex items-center justify-center font-mono text-[10px] font-black ${
                  isActive ? 'bg-[#080d1a] text-[#93ccff] rounded-lg' : ''
                }`}>
                  {isActive ? stepNumber : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[9px] font-mono mt-0.5 relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
