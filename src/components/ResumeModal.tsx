import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, Check, GraduationCap, Trophy, Code2, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, SKILL_CATEGORIES, EDUCATIONS, CODING_PROFILES, ACHIEVEMENTS, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCursorChange: (variant: any) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onCursorChange }) => {
  const [downloaded, setDownloaded] = React.useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setDownloaded(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 18;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > 280) {
          doc.addPage();
          y = 18;
        }
      };

      // Header Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(147, 204, 255); // #93ccff accent
      doc.text(PERSONAL_INFO.name.toUpperCase(), margin, y);
      y += 6;

      // Subtitle
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      doc.text(`${PERSONAL_INFO.role}  |  Hyderabad, India`, margin, y);
      y += 6;

      // Contact Line
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const contactStr = `Email: ${PERSONAL_INFO.email}   Phone: ${PERSONAL_INFO.phone}   GitHub: github.com/srinivasc16`;
      doc.text(contactStr, margin, y);
      y += 5;

      // Divider Line
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 7;

      // Helper Section Header
      const addSectionHeader = (title: string) => {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(147, 204, 255); // #93ccff
        doc.text(title.toUpperCase(), margin, y);
        y += 2;
        doc.setDrawColor(147, 204, 255);
        doc.setLineWidth(0.4);
        doc.line(margin, y, margin + 40, y);
        y += 5;
      };

      // Summary Section
      addSectionHeader('Professional Summary');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const bioLines = doc.splitTextToSize(PERSONAL_INFO.bio, contentWidth);
      checkPageBreak(bioLines.length * 4.5);
      doc.text(bioLines, margin, y);
      y += bioLines.length * 4.5 + 4;

      // Education Section
      addSectionHeader('Education');
      EDUCATIONS.forEach((edu) => {
        checkPageBreak(14);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(edu.degree, margin, y);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(147, 204, 255);
        doc.text(edu.score, pageWidth - margin, y, { align: 'right' });
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution} (${edu.period})`, margin, y);
        y += 5;

        if (edu.highlights) {
          edu.highlights.forEach((h) => {
            checkPageBreak(4.5);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(71, 85, 105);
            doc.text(`• ${h}`, margin + 3, y);
            y += 4;
          });
        }
        y += 2;
      });
      y += 2;

      // Technical Skills Section
      addSectionHeader('Technical Skills');
      SKILL_CATEGORIES.forEach((cat) => {
        checkPageBreak(6);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        const skillList = cat.skills.map((s) => s.name).join(', ');
        const skillLine = `${cat.category}: `;
        doc.text(skillLine, margin, y);
        const categoryWidth = doc.getTextWidth(skillLine);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        const splitSkills = doc.splitTextToSize(skillList, contentWidth - categoryWidth);
        doc.text(splitSkills, margin + categoryWidth, y);
        y += splitSkills.length * 4.5 + 1.5;
      });
      y += 2;

      // Projects Section
      addSectionHeader('Key Projects');
      PROJECTS.forEach((proj) => {
        checkPageBreak(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(proj.title, margin, y);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(147, 204, 255);
        doc.text(`[${proj.category}]`, pageWidth - margin, y, { align: 'right' });
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        const descLines = doc.splitTextToSize(proj.description, contentWidth);
        doc.text(descLines, margin, y);
        y += descLines.length * 4 + 1.5;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tech Stack: ${proj.techStack.join(' • ')}`, margin, y);
        y += 5.5;
      });

      // Coding Profiles Section
      addSectionHeader('Competitive Programming & Profiles');
      CODING_PROFILES.forEach((cp) => {
        checkPageBreak(5);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`• ${cp.platform}:`, margin + 2, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(147, 204, 255);
        doc.text(`${cp.stat} (${cp.detail})`, margin + 32, y);
        y += 4.5;
      });
      y += 2;

      // Achievements
      addSectionHeader('Achievements & Certifications');
      ACHIEVEMENTS.forEach((ach) => {
        checkPageBreak(5);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`• ${ach.title}`, margin + 2, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`— ${ach.issuer}`, margin + doc.getTextWidth(`• ${ach.title}`) + 4, y);
        y += 4.5;
      });

      doc.save('Srinivas_Chundi_Resume.pdf');
    } catch (e) {
      console.error('PDF generation error', e);
    }

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-3xl rounded-3xl glass-card border border-[#93ccff]/30 bg-[#080c14] p-6 sm:p-8 z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            onMouseEnter={() => onCursorChange('hover')}
            onMouseLeave={() => onCursorChange('default')}
            className="absolute top-6 right-6 p-2.5 rounded-full glass-pill text-zinc-400 hover:text-white hover:border-[#93ccff]/40 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 pr-12">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#93ccff]/10 text-[#93ccff] text-xs font-mono font-bold border border-[#93ccff]/30">
                <FileText className="w-3.5 h-3.5 text-[#93ccff]" />
                <span>OFFICIAL PDF RESUME</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{PERSONAL_INFO.name}</h2>
              <p className="text-xs text-[#93ccff]/80 font-mono">{PERSONAL_INFO.role} | Hyderabad, India</p>
            </div>

            <button
              onClick={handleDownloadPDF}
              onMouseEnter={() => onCursorChange('magnetic')}
              onMouseLeave={() => onCursorChange('default')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#93ccff] hover:bg-[#b0dcff] text-[#080d1a] font-extrabold text-xs transition-all active:scale-95 shrink-0"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-[#080d1a]" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#080d1a]" />
                  <span>Download PDF Resume</span>
                </>
              )}
            </button>
          </div>

          {/* Resume Preview Body */}
          <div className="py-6 space-y-6 text-xs text-zinc-300 max-h-[60vh] overflow-y-auto pr-2">
            {/* Contact info strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl bg-[#93ccff]/10 border border-[#93ccff]/20 font-mono text-zinc-300">
              <div>
                <span className="text-[#93ccff]/80 uppercase text-[10px] block font-bold">Email</span>
                <span className="text-white truncate block font-medium">{PERSONAL_INFO.email}</span>
              </div>
              <div>
                <span className="text-[#93ccff]/80 uppercase text-[10px] block font-bold">Phone</span>
                <span className="text-white font-medium">{PERSONAL_INFO.phone}</span>
              </div>
              <div>
                <span className="text-[#93ccff]/80 uppercase text-[10px] block font-bold">GitHub</span>
                <span className="text-white font-medium">srinivasc16</span>
              </div>
              <div>
                <span className="text-[#93ccff]/80 uppercase text-[10px] block font-bold">B.Tech CGPA</span>
                <span className="text-[#93ccff] font-extrabold">{PERSONAL_INFO.cgpa}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs text-[#93ccff] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span>Professional Summary</span>
              </h4>
              <p className="leading-relaxed text-zinc-300">{PERSONAL_INFO.bio}</p>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#93ccff] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#93ccff]" />
                <span>Education</span>
              </h4>
              <div className="space-y-2">
                {EDUCATIONS.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="text-white font-semibold text-xs">{edu.degree}</div>
                      <div className="text-[#93ccff]/80 font-mono text-[11px]">{edu.institution}</div>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span className="text-[#93ccff] font-bold block">{edu.score}</span>
                      <span className="text-zinc-500">{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#93ccff] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#93ccff]" />
                <span>Key Projects</span>
              </h4>
              <div className="space-y-2">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{proj.title}</span>
                      <span className="px-2 py-0.5 rounded bg-[#93ccff]/10 text-[#93ccff] text-[10px] font-mono border border-[#93ccff]/20 font-bold">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#93ccff]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coding Profiles & Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-mono text-xs text-[#93ccff] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#93ccff]" />
                  <span>Coding Profiles</span>
                </h4>
                {CODING_PROFILES.map((cp) => (
                  <div key={cp.platform} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-white font-medium">{cp.platform}</span>
                    <span className="font-mono text-[#93ccff] text-[11px] font-bold">{cp.stat}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs text-[#93ccff] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#93ccff]" />
                  <span>Key Achievements</span>
                </h4>
                {ACHIEVEMENTS.slice(0, 3).map((ach, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px]">
                    <span className="text-white font-medium block">{ach.title}</span>
                    <span className="text-[#93ccff]/80 text-[10px]">{ach.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
