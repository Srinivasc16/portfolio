import { Project, Experience, SkillCategory, TerminalCommand, Education, CodingProfile, Achievement } from '../types';

export const PERSONAL_INFO = {
  name: 'Srinivas Chundi',
  firstName: 'Srinivas',
  lastName: 'Chundi',
  role: 'Software & AI Engineer',
  subRole: 'Java, Python & React Full-Stack Developer',
  tagline: 'Computer Science Undergraduate | Solved 400+ DSA Problems | 4-Star CodeChef',
  bio: 'Computer Science undergraduate with a strong foundation in data structures, algorithms, and software development. Solved 400+ LeetCode problems and achieved a 4-Star CodeChef rating, with hands-on experience building full-stack applications using Java, Python, React, Spring Boot, and FastAPI.',
  email: 'srinivaschundi0@gmail.com',
  phone: '+91 80966 92970',
  github: 'https://github.com/srinivasc16',
  linkedin: 'https://linkedin.com/in/srinivaschundi',
  leetcode: 'https://leetcode.com/srinivaschundi',
  codechef: 'https://www.codechef.com/users/srinivaschundi',
  codeforces: 'https://codeforces.com/profile/srinivaschundi',
  location: 'Hyderabad, India',
  cgpa: '9.26 / 10.0',
  dsaSolved: '400+ Solved',
  codechefRating: '4-Star (4★)',
};

export const PROJECTS: Project[] = [
  {
    id: 'hintmate-ai',
    title: 'HintMate',
    tagline: 'AI-Assisted Competitive Programming Chrome Extension',
    category: 'AI Integration',
    description: 'Chrome extension providing progressive AI-generated hints for programming problems without directly revealing solutions.',
    longDescription: 'Built a Chrome extension that provides progressive AI-generated hints for programming problems instead of directly revealing solutions. Developed REST APIs using Spring Boot and integrated the Groq API for contextual problem analysis and fast hint generation. Implemented asynchronous API communication and state handling to provide a responsive workflow across supported coding platforms.',
    features: [
      'Progressive AI-generated hints without revealing full solutions',
      'Spring Boot REST APIs integrated with Groq API for instant analysis',
      'Asynchronous API communication & state handling on coding platforms',
      'Non-intrusive React UI overlay on competitive programming platforms'
    ],
    techStack: ['React.js', 'Java', 'Spring Boot', 'REST APIs', 'Groq API'],
    githubUrl: 'https://github.com/srinivasc16/hintmate-chrome-extension',
    liveUrl: 'https://github.com/srinivasc16/hintmate-chrome-extension',
    stats: [
      { label: 'Timeframe', value: 'May - Jul 2025' },
      { label: 'Platform', value: 'Chrome Extension' },
      { label: 'AI Model', value: 'Groq API' }
    ],
    featured: true,
    demoType: 'interactive-ui',
    demoConfig: {
      initialCode: `// Groq API Integration for Contextual Problem Analysis
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateProgressiveHint(problemStatement, userCode) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "Provide a progressive hint without spoiling the full solution algorithm." },
      { role: "user", content: \`Problem: \${problemStatement}\\nAttempt: \${userCode}\` }
    ],
    model: "mixtral-8x7b-32768",
  });
  return completion.choices[0]?.message?.content;
}`
    }
  },
  {
    id: 'ai-data-analyzer',
    title: 'AI Data Analyzer',
    tagline: 'Full-Stack Data Analysis and Visualization Platform',
    category: 'Full-Stack',
    description: 'Enables users to upload datasets, analyze data, and explore results through dynamic interactive visualizations.',
    longDescription: 'Developed a full-stack platform that enables users to upload datasets, analyze data, and explore results through interactive visualizations. Built FastAPI endpoints for dataset processing and communication between the React frontend, Python services, and database. Designed reusable React components and structured data flows for dynamically generated analytical results.',
    features: [
      'Automated dataset upload and processing pipeline via FastAPI',
      'Interactive data exploration with reusable React visual components',
      'Structured data flows between Python analytics services and MySQL database',
      'Awarded 2nd place at Department Project Expo'
    ],
    techStack: ['React.js', 'FastAPI', 'Python', 'MySQL'],
    githubUrl: 'https://github.com/srinivasc16/ai-data-analyzer',
    liveUrl: 'https://github.com/srinivasc16/ai-data-analyzer',
    stats: [
      { label: 'Recognition', value: '2nd Place Expo' },
      { label: 'Backend', value: 'FastAPI' },
      { label: 'Database', value: 'MySQL' }
    ],
    featured: true,
    demoType: 'dashboard'
  },
  {
    id: 'ai-info-retriever',
    title: 'AI Information Retriever',
    tagline: 'Semantic Web Content Retrieval and Q&A System',
    category: 'AI Integration',
    description: 'Crawls user-provided webpages, extracts relevant content, and indexes it for natural-language search & Q&A using FAISS and RAG.',
    longDescription: 'Built a system that crawls user-provided webpages, extracts relevant content, and indexes it for natural-language search and Q&A. Implemented semantic retrieval using FAISS and developed an application to retrieve relevant context before generating answers. Integrated FastAPI, BeautifulSoup, and LLM APIs into an end-to-end retrieval and question-answering workflow.',
    features: [
      'Web crawler and text extractor built with BeautifulSoup',
      'FAISS vector index for fast semantic search and context retrieval',
      'LangChain RAG pipeline integrating LLM APIs for precise answers',
      'FastAPI backend service powering real-time Q&A workflows'
    ],
    techStack: ['Python', 'FastAPI', 'BeautifulSoup', 'LangChain', 'FAISS', 'RAG'],
    githubUrl: 'https://github.com/srinivasc16/ai-information-retriever',
    liveUrl: 'https://github.com/srinivasc16/ai-information-retriever',
    stats: [
      { label: 'Vector Engine', value: 'FAISS' },
      { label: 'RAG Pipeline', value: 'LangChain' },
      { label: 'Scraper', value: 'BeautifulSoup' }
    ],
    featured: true,
    demoType: 'code-sandbox',
    demoConfig: {
      initialCode: `from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA

def create_rag_pipeline(documents, llm_model):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(documents, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    return RetrievalQA.from_chain_type(llm=llm_model, retriever=retriever)`
    }
  },
  {
    id: 'meet-the-space',
    title: 'Meet the Space',
    tagline: 'Interactive Space Education Platform',
    category: 'UI/UX Craft',
    description: 'Interactive space education platform built with Canvas API animations and responsive browser-based motion.',
    longDescription: 'Developed an interactive space education platform using reusable React components, responsive layouts, and browser-based animations. Implemented Canvas API animations and optimized rendering behavior for smooth interactive experiences across different screen sizes.',
    features: [
      'Custom Canvas API particle physics rendering for space visuals',
      'Optimized rendering loops ensuring 60 FPS performance',
      'Responsive React layout with interactive educational modules'
    ],
    techStack: ['React.js', 'JavaScript', 'Canvas API', 'Spring Boot'],
    githubUrl: 'https://github.com/srinivasc16/meet-the-space',
    liveUrl: 'https://github.com/srinivasc16/meet-the-space',
    stats: [
      { label: 'Timeframe', value: 'Jan - Mar 2025' },
      { label: 'Graphics', value: 'Canvas API' },
      { label: 'Backend', value: 'Spring Boot' }
    ],
    featured: false,
    demoType: 'interactive-ui'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend & UI Engineering',
    iconName: 'Layout',
    skills: [
      { name: 'React.js', level: 96, experienceYears: '3+ yrs', description: 'Component state architecture, custom hooks, reusable design systems', highlight: true },
      { name: 'JavaScript (ES6+) & TypeScript', level: 94, experienceYears: '3+ yrs', description: 'Async pipelines, DOM optimization, type safety', highlight: true },
      { name: 'Tailwind CSS & Framer Motion', level: 95, experienceYears: '3+ yrs', description: 'Glassmorphism, spring physics, responsive design', highlight: true },
      { name: 'Canvas API & Web Graphics', level: 88, experienceYears: '2+ yrs', description: '2D contexts, particle physics loops, interactive visualizers' },
      { name: 'Chrome Extension APIs', level: 90, experienceYears: '2+ yrs', description: 'Content scripts, background workers, overlay interfaces', highlight: true }
    ]
  },
  {
    category: 'Backend & Systems',
    iconName: 'Server',
    skills: [
      { name: 'Spring Boot & Java', level: 90, experienceYears: '2+ yrs', description: 'REST APIs, dependency injection, microservices', highlight: true },
      { name: 'FastAPI & Python', level: 92, experienceYears: '2+ yrs', description: 'Async endpoints, Pydantic validation, AI server integrations', highlight: true },
      { name: 'MySQL & PostgreSQL', level: 88, experienceYears: '2+ yrs', description: 'Relational database schema design, indexing, SQL queries' },
      { name: 'REST APIs & Web Security', level: 92, experienceYears: '3+ yrs', description: 'CORS, API proxies, rate limiting, token security' }
    ]
  },
  {
    category: 'AI / ML & Vector Search',
    iconName: 'Cpu',
    skills: [
      { name: 'LangChain & RAG Pipelines', level: 92, experienceYears: '2+ yrs', description: 'Document loaders, chunking strategies, contextual search', highlight: true },
      { name: 'FAISS Vector Search', level: 90, experienceYears: '2+ yrs', description: 'Semantic vector similarity, index optimization', highlight: true },
      { name: 'OpenAI & Groq APIs', level: 94, experienceYears: '2+ yrs', description: 'Prompt engineering, structured output, streaming responses' },
      { name: 'BeautifulSoup & Web Scraping', level: 88, experienceYears: '2+ yrs', description: 'DOM parsing, content indexing, automated data extraction' }
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science & Information Technology',
    institution: 'MLR Institute of Technology, Hyderabad',
    period: 'Nov 2023 — June 2027',
    location: 'Hyderabad, Telangana',
    score: 'CGPA: 9.26 / 10.0',
    highlights: [
      'Academic Excellence: Maintained a strong 9.26 CGPA in CS & IT core curriculum.',
      '1st Place in CodeX Coding Competition out of 120+ student participants.',
      '2nd Place in Department Project Expo for AI Data Analyzer platform.'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Intermediate Education (MPC)',
    institution: 'Narayana Junior College',
    period: '2021 — 2023',
    location: 'Telangana, India',
    score: 'Score: 87%',
    highlights: [
      'Focused on Mathematics, Physics, and Chemistry (MPC).',
      'Developed strong analytical and mathematical problem-solving skills.'
    ]
  },
  {
    id: 'edu-3',
    degree: 'Secondary School Education (SSC)',
    institution: 'Secondary Board of Education',
    period: '2020 — 2021',
    location: 'Telangana, India',
    score: 'Score: 76%',
    highlights: [
      'Completed secondary education with distinction in Mathematics and Science.'
    ]
  }
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    platform: 'LeetCode',
    stat: '400+ Solved',
    detail: 'Solved 400+ DSA problems spanning Arrays, Graphs, Trees & Dynamic Programming',
    badge: '400+ Solved',
    icon: 'Code2',
    url: 'https://leetcode.com/srinivaschundi'
  },
  {
    platform: 'CodeChef',
    stat: '4★ Rating',
    detail: 'Consistently ranked in top percentiles in monthly competitive contests',
    badge: '4★ Rated',
    icon: 'Trophy',
    url: 'https://www.codechef.com/users/srinivaschundi'
  },
  {
    platform: 'Codeforces',
    stat: 'Active Rated',
    detail: 'Rated algorithmic problem-solver competing in Div2/Div3 contests',
    badge: 'Active Rated',
    icon: 'Terminal',
    url: 'https://codeforces.com/profile/srinivaschundi'
  },
  {
    platform: 'GitHub',
    stat: 'Open Source',
    detail: 'Full-stack AI applications, Spring Boot backends, and React extensions',
    badge: 'srinivasc16',
    icon: 'Github',
    url: 'https://github.com/srinivasc16'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: '1st Place Winner — CodeX Coding Competition',
    issuer: 'MLR Institute of Technology',
    description: 'Secured top position among 120+ participants in time-critical algorithmic contest.',
    type: 'Award'
  },
  {
    title: '2nd Place Winner — Department Project Expo',
    issuer: 'Department of CS & IT',
    description: 'Awarded 2nd position for presenting the full-stack AI Data Analyzer platform.',
    type: 'Award'
  },
  {
    title: 'Google Solution Challenge Certificate',
    issuer: 'Google Developer Student Clubs',
    description: 'Recognized for developing impactful web solutions targeting UN Sustainable Goals.',
    type: 'Honor'
  },
  {
    title: 'Certified in Java & Python',
    issuer: 'HackerRank',
    description: 'Verified proficiency in core object-oriented programming and data structures.',
    type: 'Certification'
  },
  {
    title: 'Cisco Certifications: Python & Networking',
    issuer: 'Cisco Networking Academy',
    description: 'Completed certifications in Python Essentials, Data Analytics, and Computer Networking.',
    type: 'Certification'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Frontend & AI Full-Stack Developer',
    company: 'Independent & Project Engineering',
    period: '2024 — Present',
    location: 'Hyderabad, India',
    description: 'Designing and building AI-driven Chrome extensions, full-stack analytics dashboards, and RAG retrieval pipelines.',
    highlights: [
      'Built HintMate AI extension delivering guided coding hints using React and Spring Boot proxy.',
      'Developed AI Data Analyzer converting unstructured datasets into dynamic React charts with FastAPI.',
      'Engineered LangChain + FAISS semantic search retrieval system for context-aware Q&A.'
    ],
    skills: ['React.js', 'Spring Boot', 'FastAPI', 'Python', 'LangChain', 'FAISS', 'Groq API', 'Tailwind CSS'],
    current: true,
  }
];

export const TERMINAL_COMMANDS: Record<string, TerminalCommand> = {
  help: {
    command: 'help',
    description: 'List available terminal commands',
    output: [
      'Available commands:',
      '  bio        - Display Srinivas Chundi bio & education',
      '  skills     - View top technical skills (React, Spring Boot, AI)',
      '  projects   - Display portfolio projects (HintMate, Data Analyzer, etc.)',
      '  dsa        - View competitive programming & LeetCode stats',
      '  education  - Academic record & achievements',
      '  contact    - Get email & phone details',
      '  clear      - Clear terminal screen'
    ]
  },
  bio: {
    command: 'bio',
    description: 'Display bio & role info',
    output: [
      'NAME: Srinivas Chundi',
      'ROLE: Frontend & Full-Stack Developer',
      'EDUCATION: B.Tech CS & IT @ MLR Institute of Technology (CGPA: 9.26)',
      'LOCATION: Hyderabad, India',
      'EMAIL: srinivaschundi0@gmail.com',
      'PHONE: +91 80966 92970',
      'GITHUB: https://github.com/srinivasc16',
      'LINKEDIN: https://linkedin.com/in/srinivaschundi'
    ]
  },
  skills: {
    command: 'skills',
    description: 'List technical proficiencies',
    output: [
      'CORE SKILLS & PROFICIENCIES:',
      ' [████████████████████] 96%  React.js & JavaScript (ES6+)',
      ' [███████████████████ ] 95%  Tailwind CSS & Framer Motion',
      ' [██████████████████  ] 92%  FastAPI & LangChain / RAG',
      ' [██████████████████  ] 90%  Spring Boot & Java',
      ' [██████████████████  ] 90%  FAISS & OpenAI / Groq APIs',
      ' [█████████████████   ] 88%  MySQL, PostgreSQL & Canvas API'
    ]
  },
  projects: {
    command: 'projects',
    description: 'Show projects overview',
    output: [
      'PROJECTS:',
      ' 1. HintMate               [AI Ext]  - Chrome Ext + Spring Boot + Groq API',
      ' 2. AI Data Analyzer       [Fullstack] - React + FastAPI + MySQL (2nd Place Expo)',
      ' 3. AI Information Retriever[AI/RAG] - LangChain + FAISS + OpenAI API',
      ' 4. Meet the Space         [Canvas UI] - Custom Canvas 2D Particle Engine'
    ]
  },
  dsa: {
    command: 'dsa',
    description: 'Competitive programming record',
    output: [
      'COMPETITIVE PROGRAMMING & DSA:',
      ' • LeetCode: 400+ Problems Solved (Arrays, Graphs, DP, Trees)',
      ' • CodeChef: 4 Star Rated',
      ' • Codeforces: Active Rated Contestant',
      ' • CodeX Competition: 1st Place Winner (120+ participants)'
    ]
  },
  education: {
    command: 'education',
    description: 'Academic qualification',
    output: [
      'EDUCATION:',
      ' • B.Tech CS & IT - MLR Institute of Technology (Nov 2023 — June 2027) | CGPA: 9.26',
      ' • Intermediate (MPC) - Narayana Junior College (2021 — 2023) | 87%',
      ' • SSC Board - Secondary Education (2020 — 2021) | 76%'
    ]
  },
  contact: {
    command: 'contact',
    description: 'Get direct contact details',
    output: [
      'CONTACT INFORMATION:',
      ' Email:    srinivaschundi0@gmail.com',
      ' Phone:    +91 80966 92970',
      ' Location: Hyderabad, India',
      ' GitHub:   https://github.com/srinivasc16',
      ' LinkedIn: https://linkedin.com/in/srinivaschundi'
    ]
  }
};
