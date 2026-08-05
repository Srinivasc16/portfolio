import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Check, Github, Linkedin, MessageSquare, Copy, MapPin, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  onCursorChange: (variant: any) => void;
}

export const Contact: React.FC<ContactProps> = ({ onCursorChange }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('sending');

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
      <div className="space-y-3 mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl glass-pill text-xs font-mono font-semibold text-[#93ccff] border border-[#93ccff]/30 bg-[#93ccff]/10">
          <MessageSquare className="w-4 h-4 text-[#93ccff]" />
          <span>INITIATE CONTACT</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Let's Build Something Exceptional
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Open to software engineering opportunities, internships, AI projects, and full-stack web application roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Direct Info & Social Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-card p-8 space-y-5 border border-[#93ccff]/30 bg-[#080d1a]/80">
            <h3 className="text-xl font-extrabold text-white tracking-tight">Direct Channels</h3>

            <div className="space-y-4">
              {/* Email item */}
              <button
                onClick={copyEmail}
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/20 hover:border-[#93ccff] transition-all text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#93ccff]/10 text-[#93ccff] border border-[#93ccff]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#93ccff]/80 font-mono font-bold uppercase block">Email Address</span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#93ccff] transition-colors">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>
                {emailCopied ? (
                  <Check className="w-5 h-5 text-[#93ccff] shrink-0" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-500 group-hover:text-[#93ccff] shrink-0 transition-colors" />
                )}
              </button>

              {/* Phone item */}
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/20 hover:border-[#93ccff] transition-all text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#93ccff]/10 text-[#93ccff] border border-[#93ccff]/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#93ccff]/80 font-mono font-bold uppercase block">Phone</span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#93ccff] transition-colors">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/20 hover:border-[#93ccff] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#93ccff]/10 text-[#93ccff] border border-[#93ccff]/20">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#93ccff]/80 font-mono font-bold uppercase block">LinkedIn Profile</span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#93ccff] transition-colors">
                      linkedin.com/in/srinivaschundi
                    </span>
                  </div>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  onCursorChange('hover');
                }}
                onMouseLeave={() => onCursorChange('default')}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/20 hover:border-[#93ccff] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#93ccff]/10 text-[#93ccff] border border-[#93ccff]/20">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#93ccff]/80 font-mono font-bold uppercase block">GitHub Profile</span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#93ccff] transition-colors">
                      github.com/srinivasc16
                    </span>
                  </div>
                </div>
              </a>

              {/* Location Badge */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#93ccff]/5 border border-[#93ccff]/20">
                <div className="p-3 rounded-xl bg-[#93ccff]/10 text-[#93ccff] border border-[#93ccff]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#93ccff]/80 font-mono font-bold uppercase block">Location</span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Glass Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl glass-card p-8 sm:p-10 space-y-6 border border-[#93ccff]/30 bg-[#080d1a]/80"
          >
            <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-between">
              <span>Send Direct Message</span>
              <span className="text-xs font-mono text-[#93ccff]/80 font-semibold">24h Response Time</span>
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold text-[#93ccff] uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Recruiter / Collaborator"
                  className="w-full px-5 py-3.5 rounded-2xl bg-black/70 border border-[#93ccff]/20 text-white text-sm focus:outline-none focus:border-[#93ccff] transition-colors placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#93ccff] uppercase mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-5 py-3.5 rounded-2xl bg-black/70 border border-[#93ccff]/20 text-white text-sm focus:outline-none focus:border-[#93ccff] transition-colors placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#93ccff] uppercase mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire about project collaboration, hiring, or technical discussion..."
                  className="w-full px-5 py-3.5 rounded-2xl bg-black/70 border border-[#93ccff]/20 text-white text-sm focus:outline-none focus:border-[#93ccff] transition-colors placeholder-zinc-500 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              onMouseEnter={() => {
                onCursorChange('magnetic');
              }}
              onMouseLeave={() => onCursorChange('default')}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-[#93ccff] hover:bg-[#b0dcff] text-[#080d1a] font-extrabold text-base transition-all active:scale-95 disabled:opacity-50"
            >
              {status === 'sending' ? (
                <span>Dispatching message...</span>
              ) : status === 'sent' ? (
                <>
                  <Check className="w-5 h-5 text-[#080d1a]" />
                  <span className="text-[#080d1a] font-bold">Message Dispatched!</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
