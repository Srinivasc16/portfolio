import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Layers, Cpu, FileText, Mail, MousePointer } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  cursorEnabled: boolean;
  onToggleCursor: () => void;
  onCursorChange: (variant: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  cursorEnabled,
  onToggleCursor,
  onCursorChange,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'nav-overview',
      label: 'Jump to Overview / Hero',
      icon: Layers,
      category: 'Navigation',
      run: () => onNavigate('hero'),
    },
    {
      id: 'nav-projects',
      label: 'Jump to Selected Projects',
      icon: Layers,
      category: 'Navigation',
      run: () => onNavigate('projects'),
    },
    {
      id: 'nav-skills',
      label: 'View Technical Skills',
      icon: Cpu,
      category: 'Navigation',
      run: () => onNavigate('skills'),
    },
    {
      id: 'nav-contact',
      label: 'Send Direct Message',
      icon: Mail,
      category: 'Navigation',
      run: () => onNavigate('contact'),
    },
    {
      id: 'act-resume',
      label: 'Preview & Download PDF CV / Resume',
      icon: FileText,
      category: 'Actions',
      run: () => onOpenResume(),
    },
    {
      id: 'act-cursor',
      label: cursorEnabled ? 'Switch to Native Mouse Cursor' : 'Enable Custom Liquid Cursor',
      icon: MousePointer,
      category: 'Preferences',
      run: () => onToggleCursor(),
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative w-full max-w-xl rounded-3xl glass-card border border-[#93ccff]/30 bg-[#080d1a] p-4 z-10 overflow-hidden space-y-3"
        >
          {/* Input field */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-black/60 border border-[#93ccff]/20 text-white">
            <Search className="w-4 h-4 text-[#93ccff]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search actions, projects, or jump to section..."
              className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-zinc-500 font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-500 hover:text-[#93ccff]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1">
            {filteredActions.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-500">No matching commands found.</div>
            ) : (
              filteredActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.run();
                      onClose();
                    }}
                    onMouseEnter={() => onCursorChange('hover')}
                    onMouseLeave={() => onCursorChange('default')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl text-left hover:bg-[#93ccff]/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#93ccff]/10 border border-[#93ccff]/20 text-[#93ccff] group-hover:text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-[#93ccff]">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#93ccff] uppercase px-2 py-0.5 rounded-lg bg-[#93ccff]/10 border border-[#93ccff]/20">
                      {item.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
