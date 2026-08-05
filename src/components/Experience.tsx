import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Trophy, Code2, Calendar, CheckCircle2, ExternalLink, Terminal, Github } from 'lucide-react';
import { EDUCATIONS, CODING_PROFILES, ACHIEVEMENTS } from '../data/portfolioData';

interface ExperienceProps {
  onCursorChange: (variant: any) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onCursorChange }) => {
  const [activeSection, setActiveSection] = useState<'all' | 'education' | 'coding' | 'achievements'>('all');

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative space-y-20">
      
      {/* Top Filter Pills for Quick Jump */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#93ccff]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl glass-pill text-xs font-mono font-semibold text-[#93ccff] border border-[#93ccff]/30 bg-[#93ccff]/10">
            <GraduationCap className="w-4 h-4 text-[#93ccff]" />
            <span>ACADEMIC & COMPETITIVE RECORD</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mt-3">
            Credentials & Achievements
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl glass-pill bg-[#080d1a]/80 border border-[#93ccff]/30">
          {[
            { id: 'all', label: 'Show All' },
            { id: 'education', label: 'Education' },
            { id: 'coding', label: 'Profiles' },
            { id: 'achievements', label: 'Achievements' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as any);
                }}
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 z-10 ${
                  isActive ? 'text-[#080d1a] font-extrabold' : 'text-zinc-400 hover:text-[#93ccff]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSectionFilter"
                    className="absolute inset-0 rounded-xl bg-[#93ccff] border border-[#93ccff]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. SEPARATE SECTION: Education */}
      {(activeSection === 'all' || activeSection === 'education') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#93ccff]/10 border border-[#93ccff]/30 text-[#93ccff]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">Education</h3>
              <p className="text-sm text-[#93ccff]/80 font-mono">Academic Qualifications & Honors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EDUCATIONS.map((edu) => (
              <motion.div
                key={edu.id}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className="rounded-3xl glass-card p-8 space-y-5 border border-[#93ccff]/30 bg-[#080d1a]/80 hover:border-[#93ccff] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-[#93ccff]/20 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white leading-snug">{edu.degree}</h4>
                      <div className="text-[#93ccff] font-semibold text-sm font-mono mt-1">{edu.institution}</div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#93ccff]/10 text-[#93ccff] text-xs font-mono font-bold border border-[#93ccff]/30 shrink-0">
                      {edu.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#93ccff]/80">
                    <Calendar className="w-4 h-4 text-[#93ccff]" />
                    <span>{edu.period}</span>
                  </div>

                  {edu.highlights && (
                    <div className="space-y-2.5 pt-2">
                      {edu.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#93ccff] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. SEPARATE SECTION: Profiles */}
      {(activeSection === 'all' || activeSection === 'coding') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-8 pt-6"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#93ccff]/10 border border-[#93ccff]/30 text-[#93ccff]">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">Profiles</h3>
              <p className="text-sm text-[#93ccff]/80 font-mono">Algorithms & Competitive Rankings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CODING_PROFILES.map((profile) => (
              <motion.div
                key={profile.platform}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className="rounded-3xl glass-card p-6 space-y-5 border border-[#93ccff]/30 bg-[#080d1a]/80 hover:border-[#93ccff] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#93ccff]/10 border border-[#93ccff]/20 text-[#93ccff]">
                      {profile.platform === 'LeetCode' && <Code2 className="w-6 h-6 text-[#93ccff]" />}
                      {profile.platform === 'CodeChef' && <Trophy className="w-6 h-6 text-[#93ccff]" />}
                      {profile.platform === 'Codeforces' && <Terminal className="w-6 h-6 text-[#93ccff]" />}
                      {profile.platform === 'GitHub' && <Github className="w-6 h-6 text-[#93ccff]" />}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#93ccff]/10 text-[#93ccff] text-xs font-mono font-bold border border-[#93ccff]/30">
                      {profile.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white">{profile.platform}</h4>
                    <p className="text-2xl font-mono font-black text-[#93ccff] mt-1">
                      {profile.stat}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{profile.detail}</p>
                </div>

                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-mono font-semibold text-[#93ccff] hover:text-white pt-4 border-t border-[#93ccff]/20 transition-colors"
                >
                  <span>Redirect to Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 3. SEPARATE SECTION: Achievements */}
      {(activeSection === 'all' || activeSection === 'achievements') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-8 pt-6"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#93ccff]/10 border border-[#93ccff]/30 text-[#93ccff]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">Achievements</h3>
              <p className="text-sm text-[#93ccff]/80 font-mono">Hackathons, Honors & Certifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className="rounded-3xl glass-card p-7 space-y-4 border border-[#93ccff]/30 bg-[#080d1a]/80 hover:border-[#93ccff] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border bg-[#93ccff]/10 text-[#93ccff] border-[#93ccff]/30">
                    {item.type}
                  </span>
                  <span className="text-xs text-[#93ccff]/80 font-mono font-semibold">{item.issuer}</span>
                </div>
                <h4 className="text-xl font-bold text-white leading-snug">{item.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </section>
  );
};
