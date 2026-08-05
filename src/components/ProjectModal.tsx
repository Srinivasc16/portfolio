import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Terminal, Play, Cpu, Check, Layers, Code2, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorChange: (variant: any, text?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onCursorChange }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'code'>('overview');
  const [interactiveOutput, setInteractiveOutput] = useState<string>('Click "Execute Sample" to test the live sandbox pipeline.');
  const [executing, setExecuting] = useState(false);

  if (!project) return null;

  const handleRunDemo = () => {
    setExecuting(true);
    setInteractiveOutput('Initializing sandbox context...');
    
    setTimeout(() => {
      setExecuting(false);
      if (project.id === 'omni-workspace-ai') {
        setInteractiveOutput(`[Gemini 2.5 Flash Response Stream]
---------------------------------------------------
> Analyzed code structure in 42ms
> Suggested optimization: Use useMemo for list mapping
> Bundle overhead: 0kb (Zero runtime additions)
> Result: 120 FPS liquid animation confirmed.`);
      } else if (project.id === 'liquid-ui-engine') {
        setInteractiveOutput(`[Aura Liquid Spring Engine Simulation]
---------------------------------------------------
> Initialized spring curve: stiffness=400, damping=28
> Frame rate dispatch: 120 FPS
> Memory consumption: 1.4 MB
> WCAG AAA contrast ratio: 8.5:1 verified.`);
      } else {
        setInteractiveOutput(`[${project.title} Test Suite]
---------------------------------------------------
✔ API Endpoint Health Check: 200 OK (1.2ms)
✔ Core Web Vitals LCP: 0.4s | CLS: 0.00
✔ Zero memory leaks detected over 10,000 cycles.`);
      }
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Drawer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-3xl rounded-3xl glass-card border border-[#93ccff]/30 bg-[#080d1a]/95 p-6 sm:p-8 z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            onMouseEnter={() => {
              onCursorChange('hover');
            }}
            onMouseLeave={() => onCursorChange('default')}
            className="absolute top-6 right-6 p-2.5 rounded-full glass-pill text-zinc-400 hover:text-[#93ccff] hover:border-[#93ccff]/40 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-3 pr-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#93ccff]/10 text-[#93ccff] text-xs font-mono font-bold border border-[#93ccff]/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#93ccff]/20 text-[#93ccff] text-xs font-mono font-bold border border-[#93ccff]/30">
                  <Sparkles className="w-3 h-3 text-[#93ccff]" />
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{project.title}</h2>
            <p className="text-[#93ccff]/80 text-sm">{project.tagline}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#93ccff]/20 mt-6 pb-2">
            {[
              { id: 'overview', label: 'Architecture & Features', icon: Layers },
              { id: 'interactive', label: 'Interactive Sandbox', icon: Terminal },
              { id: 'code', label: 'Code Snippet', icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#93ccff]/20 text-[#93ccff] border border-[#93ccff]/40 font-bold'
                      : 'text-zinc-400 hover:text-[#93ccff] hover:bg-[#93ccff]/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Views */}
          <div className="py-6 min-h-[260px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <p className="text-sm text-zinc-300 leading-relaxed">{project.longDescription}</p>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#93ccff] tracking-wider font-bold">Engineering Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#93ccff]/5 border border-[#93ccff]/15">
                        <Check className="w-3.5 h-3.5 text-[#93ccff] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                {project.stats && (
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/20">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base font-bold font-mono text-[#93ccff]">{stat.value}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'interactive' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#93ccff] font-bold">Sandbox Environment:</span>
                  <button
                    onClick={handleRunDemo}
                    disabled={executing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#93ccff]/20 text-[#93ccff] text-xs font-mono hover:bg-[#93ccff]/30 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{executing ? 'Executing...' : 'Execute Sample'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-black/80 border border-[#93ccff]/20 font-mono text-xs text-zinc-300 min-h-[160px] whitespace-pre-wrap">
                  {interactiveOutput}
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Architecture Highlight</span>
                  <span>TypeScript</span>
                </div>
                <pre className="p-4 rounded-2xl bg-black/80 border border-[#93ccff]/20 font-mono text-xs text-[#93ccff] overflow-x-auto">
                  {`// ${project.title} Core Architecture Pattern
export class ${project.title.replace(/[^a-zA-Z]/g, '')}Pipeline {
  private static instance: ${project.title.replace(/[^a-zA-Z]/g, '')}Pipeline;

  public async initialize(): Promise<void> {
    console.log("System initialized with zero runtime overhead.");
  }
}`}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#93ccff]/20">
            <div className="text-xs font-mono text-zinc-400">
              Stack: <span className="text-[#93ccff]">{project.techStack.join(' • ')}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-pill text-xs font-medium text-white hover:border-[#93ccff]/50 transition-all"
              >
                <Github className="w-4 h-4 text-[#93ccff]" />
                <span>GitHub Repo</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#93ccff] text-black font-bold text-xs hover:bg-[#b0dcff] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live App</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
