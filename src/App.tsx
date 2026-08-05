import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { SocialSidebar } from './components/SocialSidebar';
import { Footer } from './components/Footer';
import { CursorVariant } from './types';
import { soundFx } from './utils/sound';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState('');
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Handle active section scrolling observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCursorChange = (variant: CursorVariant, text: string = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCursor = () => {
    setCursorEnabled(!cursorEnabled);
  };

  return (
    <div className="relative min-h-screen bg-[#06080e] text-zinc-100 font-sans selection:bg-[#93ccff]/30 selection:text-[#93ccff] overflow-x-hidden">
      {/* Custom Liquid Motion Cursor */}
      <CustomCursor
        variant={cursorVariant}
        cursorText={cursorText}
        enabled={cursorEnabled}
      />

      {/* Persistent Floating Social & Coding Sidebar */}
      <SocialSidebar onCursorChange={handleCursorChange} />

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cursorEnabled={cursorEnabled}
        onToggleCursor={toggleCursor}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onCursorChange={handleCursorChange}
      />

      {/* Main Portfolio Content */}
      <main className="relative z-10 space-y-12">
        <Hero
          onNavigate={handleNavigate}
          onCursorChange={handleCursorChange}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <Projects
          onCursorChange={handleCursorChange}
        />

        <Skills
          onCursorChange={handleCursorChange}
        />

        <Experience
          onCursorChange={handleCursorChange}
        />

        <Contact
          onCursorChange={handleCursorChange}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onCursorChange={handleCursorChange}
      />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenResume={() => setResumeModalOpen(true)}
        cursorEnabled={cursorEnabled}
        onToggleCursor={toggleCursor}
        onCursorChange={handleCursorChange}
      />

      {/* Resume Digital Preview Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onCursorChange={handleCursorChange}
      />
    </div>
  );
}
