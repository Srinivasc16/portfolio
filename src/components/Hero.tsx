import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send, Sparkles, Code2, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CookieShape } from './CookieShape';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onCursorChange: (variant: any, text?: string) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onCursorChange, onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto min-h-[85vh] flex items-center">
      {/* Ambient lighting */}
      <div className="absolute top-1/4 left-5 sm:left-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#93ccff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-5 sm:right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#93ccff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">

        {/* Left Column: Greeting & Content */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          {/* Status Cookie Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-mono font-semibold text-[#93ccff] border border-[#93ccff]/30 bg-[#93ccff]/10"
          >
            <div className="w-5 h-5 bg-[#93ccff] material-cookie flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#080d1a] animate-pulse" />
            </div>
            <span>SOFTWARE & AI ENGINEER • HYDERABAD</span>
          </motion.div>

          {/* Revamped Name Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] break-words">
              Srinivas <span className="text-[#93ccff] inline-block">Chundi</span>
            </h1>
          </motion.div>

          {/* Role with Material 3 Scalloped Cookie Cursor */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2.5 text-lg sm:text-2xl font-bold text-slate-200 font-mono"
          >
            <span className="text-[#93ccff] font-extrabold">{PERSONAL_INFO.role}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-slate-300 font-normal">{PERSONAL_INFO.subRole}</span>
            <span className="w-3.5 h-7 bg-[#93ccff] material-cookie animate-pulse inline-block shrink-0" />
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
          >
            {/* View Projects Button */}
            <button
              onClick={() => {
                onNavigate('projects');
              }}
              onMouseEnter={() => {
                onCursorChange('magnetic');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#93ccff] hover:bg-[#b0dcff] text-[#080d1a] font-extrabold text-base transition-all flex items-center justify-center gap-2.5 active:scale-95 group min-h-[48px]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Contact Me Button */}
            <button
              onClick={() => {
                onNavigate('contact');
              }}
              onMouseEnter={() => {
                onCursorChange('hover');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl border-2 border-[#93ccff]/60 text-[#93ccff] hover:bg-[#93ccff]/10 font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <Send className="w-5 h-5 text-[#93ccff]" />
              <span>Contact Me</span>
            </button>

            {/* Resume CTA */}
            <button
              onClick={() => {
                onOpenResume();
              }}
              onMouseEnter={() => {
                onCursorChange('hover');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-card border border-[#93ccff]/30 text-zinc-200 hover:text-white hover:border-[#93ccff] font-semibold text-base transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-5 h-5 text-[#93ccff]" />
              <span>Resume</span>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-[#93ccff]/20 max-w-xl"
          >
            <div className="p-2 sm:p-0">
              <div className="text-xl sm:text-3xl font-extrabold text-white font-mono">{PERSONAL_INFO.cgpa}</div>
              <div className="text-[10px] sm:text-sm text-[#93ccff]/80 font-semibold uppercase tracking-wider mt-1">B.Tech CGPA</div>
            </div>
            <div className="p-2 sm:p-0">
              <div className="text-xl sm:text-3xl font-extrabold text-[#93ccff] font-mono">{PERSONAL_INFO.dsaSolved}</div>
              <div className="text-[10px] sm:text-sm text-[#93ccff]/80 font-semibold uppercase tracking-wider mt-1">LeetCode</div>
            </div>
            <div className="p-2 sm:p-0">
              <div className="text-xl sm:text-3xl font-extrabold text-[#93ccff] font-mono">{PERSONAL_INFO.codechefRating}</div>
              <div className="text-[10px] sm:text-sm text-[#93ccff]/80 font-semibold uppercase tracking-wider mt-1">CodeChef</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Srinivas Chundi Profile Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden border border-[#93ccff]/30 bg-[#080d1a] group"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#080d1a] flex items-center justify-center">
              <img
                src="/profile.jpeg"
                alt="Srinivas Chundi"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Material 3 Scalloped Cookie Floating Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 p-3 rounded-2xl bg-[#080d1a]/90 backdrop-blur-md border border-[#93ccff]/30 flex items-center gap-3 shadow-lg z-10">
                <div className="w-10 h-10 bg-[#93ccff] material-cookie flex items-center justify-center text-[#080d1a] shrink-0">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold font-mono">Srinivas Chundi</div>
                  <div className="text-[#93ccff] text-[10px] font-mono font-semibold">Software & AI Engineer</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
