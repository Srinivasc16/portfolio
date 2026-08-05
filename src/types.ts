export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'UI/UX Craft' | 'Systems & APIs' | 'AI Integration';
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
  featured: boolean;
  demoType: 'interactive-ui' | 'code-sandbox' | 'dashboard' | 'terminal';
  demoConfig?: {
    initialCode?: string;
    sampleData?: Record<string, any>;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
  highlights?: string[];
}

export interface CodingProfile {
  platform: string;
  stat: string;
  detail: string;
  badge: string;
  icon: string;
  url?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  description: string;
  type: 'Award' | 'Certification' | 'Honor';
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0-100
    experienceYears: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}

export type CursorVariant = 'default' | 'hover' | 'project' | 'magnetic' | 'text' | 'hidden';

export interface SoundSettings {
  enabled: boolean;
  volume: number;
}
