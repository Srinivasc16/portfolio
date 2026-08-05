import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Layout, Server, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsProps {
  onCursorChange: (variant: any) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onCursorChange }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#93ccff]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#93ccff]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#93ccff]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#93ccff]" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="space-y-3 mb-12 text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl glass-pill text-xs font-mono font-semibold text-[#93ccff] border border-[#93ccff]/30 bg-[#93ccff]/10">
          <Cpu className="w-4 h-4 text-[#93ccff]" />
          <span>CORE PROFICIENCIES</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Technical Skills
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Full stack programming languages, modern frameworks, data structures, algorithms, and developer tooling.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((categoryGroup, catIdx) => (
          <motion.div
            key={categoryGroup.category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIdx * 0.1 }}
            className="rounded-3xl glass-card p-7 space-y-6 border border-[#93ccff]/30 bg-[#080d1a]/80"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#93ccff]/20">
              <div className="p-3 rounded-2xl bg-[#93ccff]/10 border border-[#93ccff]/20">
                {getCategoryIcon(categoryGroup.iconName)}
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">{categoryGroup.category}</h3>
            </div>

            {/* Skill Cards */}
            <div className="space-y-4">
              {categoryGroup.skills.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => {
                    onCursorChange('hover');
                  }}
                  onMouseLeave={() => onCursorChange('default')}
                  className="p-3.5 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/15 hover:border-[#93ccff]/50 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-white">
                    <span className="flex items-center gap-2">
                      {skill.highlight && <Sparkles className="w-3.5 h-3.5 text-[#93ccff] shrink-0" />}
                      <span>{skill.name}</span>
                    </span>
                    <span className="font-mono text-xs text-[#93ccff] font-bold">{skill.level}%</span>
                  </div>

                  {/* Meter bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-[#93ccff]/20">
                    <div
                      style={{ width: `${skill.level}%` }}
                      className="h-full rounded-full bg-[#93ccff]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
