import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  onCursorChange: (variant: any, text?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onCursorChange }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#93ccff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl glass-pill text-xs font-mono font-semibold text-[#93ccff] border border-[#93ccff]/30 bg-[#93ccff]/10">
            <Layers className="w-4 h-4 text-[#93ccff]" />
            <span>FEATURED WORKS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Projects
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Scalable full-stack systems, AI Chrome extensions, and interactive applications built with modern engineering standards.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => onCursorChange('project', 'VIEW')}
              onMouseLeave={() => onCursorChange('default')}
              onClick={() => {
                setActiveProject(project);
              }}
              className="group relative rounded-3xl glass-card spotlight-card p-7 sm:p-9 cursor-pointer flex flex-col justify-between space-y-8 border border-[#93ccff]/20 hover:border-[#93ccff] transition-all duration-300 bg-[#080d1a]/80"
            >
              {/* Top Section */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#93ccff]/10 border border-[#93ccff]/30 text-xs font-mono font-bold text-[#93ccff]">
                    {project.category}
                  </span>
                  <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-zinc-300 group-hover:text-black group-hover:bg-[#93ccff] transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 text-[#93ccff] group-hover:text-black" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#93ccff] transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom Section - Stats & Tech */}
              <div className="space-y-5 pt-5 border-t border-[#93ccff]/20">
                {project.stats && (
                  <div className="grid grid-cols-3 gap-3">
                    {project.stats.map((s, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#93ccff]/5 border border-[#93ccff]/20 text-center">
                        <div className="text-sm font-extrabold font-mono text-[#93ccff]">{s.value}</div>
                        <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-[#93ccff]/10 border border-[#93ccff]/20 text-xs font-mono font-semibold text-[#93ccff]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onCursorChange={onCursorChange}
      />
    </section>
  );
};
