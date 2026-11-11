import React, { useEffect, useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  MapPin,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Award,
  Check,
  Copy,
  FileText,
  Code2,
  Database,
  Server,
  Terminal,
  Cpu,
  Sparkles,
  Download,
  Phone,
  Send,
  Layers,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Printer,
  ChevronRight,
  Home,
  AlertTriangle,
  Compass,
  RotateCcw
} from 'lucide-react';
import './style.css';

// =============================================================================
// DATA COLLECTIONS
// =============================================================================

const PROJECTS = [
  {
    number: '01',
    id: 'polyarguminds',
    title: 'PolyArguMinds',
    category: 'fullstack',
    kind: 'Full-Stack · AI Platform',
    badge: 'Flagship Project',
    description:
      'A structured deliberation platform designed to foster critical reasoning. Generates contextual AI counter-arguments to help users explore multidimensional perspectives on complex topics.',
    longDescription:
      'Engineered to elevate online discourse beyond echo chambers. PolyArguMinds provides structured debate arenas, role-based topic moderation, AI-assisted rebuttal suggestions, and hierarchical argument trees that visually map thesis-antithesis evolutions.',
    stack: ['React', 'Spring Boot', 'MySQL', 'JWT', 'Docker', 'REST APIs'],
    note: 'JWT authentication · Role-based access · Deployed frontend & backend',
    highlights: [
      'Stateless JWT authentication with fine-grained role-based permissions (User/Admin/Debater)',
      'Relational schema in MySQL modeling tree-structured discussion threads and voting states',
      'Dockerized architecture ensuring uniform runtime environments across staging and production',
      'Responsive React frontend with smooth debate timeline visualizations'
    ],
    architecture: {
      client: 'React.js with custom hooks for stateful debate trees & live argument streaming',
      server: 'Java 17 & Spring Boot REST API layer with Spring Security & JPA/Hibernate',
      database: 'MySQL 8 with indexed foreign keys for sub-millisecond thread retrieval',
      security: 'BCrypt password encryption, HMAC-SHA256 signed JWT tokens, CORS protection',
      deployment: 'Multi-stage Docker containers for service packaging'
    },
    demoUrl: null,
    githubUrl: 'https://github.com/Daiyan66'
  },
  {
    number: '02',
    id: 'cyberthreat',
    title: 'AI Cyber Threat Detection Platform',
    category: 'security',
    kind: 'Cybersecurity · Analytics Dashboard',
    badge: 'Security & ML Concept',
    description:
      'A SOC analyst dashboard concept for monitoring suspicious network telemetry, categorizing incident severities, and managing triage investigation lifecycles.',
    longDescription:
      'Architected as an operational control center for security teams. Integrates simulated log telemetry streams, risk scoring based on anomalous behavior indicators, and structured workflows for incident mitigation and audit logging.',
    stack: ['React', 'Java', 'Spring Boot', 'MySQL', 'Chart UI'],
    note: 'Structured API contracts, telemetry modeling & real-time monitoring dashboard',
    highlights: [
      'Comprehensive RESTful API contracts engineered for high-throughput anomaly event payloads',
      'Dynamic incident triage board with state-machine workflow (New -> Investigating -> Resolved)',
      'Severity scoring categorization (Critical, High, Medium, Low) with automated prioritization',
      'Detailed audit history trails preserving investigator annotations and timeline records'
    ],
    architecture: {
      client: 'Modular React dashboard featuring real-time severity metrics and filter controls',
      server: 'Spring Boot application with decoupled service layers for incident calculations',
      database: 'Relational MySQL database tracking incident lifecycles and remediation notes',
      security: 'Role-based access separating tier-1 triage analysts from senior security engineers'
    },
    demoUrl: null,
    githubUrl: 'https://github.com/Daiyan66'
  },
  {
    number: '03',
    id: 'bgv',
    title: 'Employee Background Verification',
    category: 'internship',
    kind: 'Enterprise Web Application',
    badge: 'Industry Internship Project',
    description:
      'A secure enterprise verification portal built during my software development internship at Torus Solutions to digitize and automate multi-stage employee audit workflows.',
    longDescription:
      'Developed during a 400-hour professional internship. Replaced disjointed manual verification spreadsheets with an automated pipeline handling candidate document submissions, reviewer task assignments, and verified status issuance.',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Spring Security'],
    note: 'Built across backend services, relational data models & frontend integration',
    highlights: [
      'Engineered multi-stage verification pipeline with clear state transitions and status alerts',
      'Constructed role-tailored dashboards for HR auditors, verification reviewers, and candidates',
      'Optimized relational MySQL queries for rapid candidate dossier lookup and report extraction',
      'Collaborated closely with company mentors through Agile sprints and peer code reviews'
    ],
    architecture: {
      client: 'Responsive React single-page interface with real-time status indicators and file uploads',
      server: 'Spring Boot REST backend implementing transactional verification service methods',
      database: 'Normalized relational MySQL schema with comprehensive candidate audit logs',
      impact: 'Dramatically decreased candidate audit turnaround times and reduced manual tracking errors'
    },
    demoUrl: null,
    githubUrl: 'https://github.com/Daiyan66'
  }
];

const SKILL_CATEGORIES = [
  {
    id: 'backend',
    title: 'Backend & Systems',
    desc: 'Scalable services, secure authentication, and enterprise business logic',
    icon: Server,
    skills: [
      'Java (Core & Advanced)',
      'Spring Boot',
      'Spring Security',
      'RESTful API Design',
      'JWT Authentication',
      'Python',
      'FastAPI',
      'C Programming'
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend & Interfaces',
    desc: 'Modern, reactive user interfaces with clean component architectures',
    icon: Code2,
    skills: [
      'React.js',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 & Modern CSS3',
      'Responsive Web Design',
      'Vite & Tooling',
      'Component Architecture',
      'UI State Management'
    ]
  },
  {
    id: 'database',
    title: 'Databases & Storage',
    desc: 'Data modeling, schema normalization, and efficient data persistence',
    icon: Database,
    skills: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'SQLite',
      'Schema Normalization',
      'Relational Modeling',
      'Indexing & Optimization'
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Practices',
    desc: 'Reliable tooling, containerization, and disciplined engineering habits',
    icon: Cpu,
    skills: [
      'Docker & Containers',
      'Git & GitHub Version Control',
      'Postman API Testing',
      'Linux CLI Basics',
      'Object-Oriented Design (OOD)',
      'Agile / Scrum Fundamentals',
      'Clean Code Principles'
    ]
  }
];

const TIMELINE_DATA = [
  {
    period: 'JAN — APR 2024',
    badge: 'INDUSTRY INTERNSHIP · 400 HOURS',
    role: 'Software Development Intern',
    organization: 'Torus Solutions',
    location: 'Mysore, India',
    desc: 'Selected for a rigorous 400-hour development internship. Actively contributed to end-to-end full-stack development, delivering an enterprise-grade Employee Background Verification solution.',
    bullets: [
      'Architected Spring Boot REST API endpoints secured with JWT authentication and role-based permissions.',
      'Designed and normalized MySQL relational schemas for candidate document submissions and audit logs.',
      'Connected frontend React components with backend endpoints, ensuring consistent state management.',
      'Participated in code reviews, resolved edge-case validation bugs, and followed Agile development practices.'
    ]
  },
  {
    period: '2024 — 2027',
    badge: 'UNDERGRADUATE DEGREE · CGPA 8.73 / 10',
    role: 'B.Tech in Computer Science & Engineering',
    organization: 'The National Institute of Engineering (NIE)',
    location: 'Mysore, India',
    desc: 'Currently pursuing my Bachelor of Technology at one of Karnataka’s premier engineering institutions. Maintaining a strong academic record with a 8.73/10 CGPA.',
    bullets: [
      'Key Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems.',
      'Operating Systems, Computer Networks, Software Engineering Principles, and Web Technologies.',
      'Active participant in collegiate hackathons, technical symposia, and coding competitions.'
    ]
  },
  {
    period: '2021 — 2024',
    badge: 'DIPLOMA WITH DISTINCTION · 85.80%',
    role: 'Diploma in Computer Science & Engineering',
    organization: 'D. Dharmaprakasha Banumaiah’s Polytechnic',
    location: 'Mysore, India',
    desc: 'Graduated with Distinction (85.80%). Built a deep foundation in programming fundamentals, computational thinking, and hands-on systems development.',
    bullets: [
      'Extensive coursework in C, Java, Web Technologies, Database Systems, and Hardware Architectures.',
      'Represented the institution in regional tech competitions and served as a peer programming mentor.'
    ]
  },
  {
    period: '2021',
    badge: 'SECONDARY SCHOOL · 85.12%',
    role: 'SSLC (Secondary School Leaving Certificate)',
    organization: 'Regional International School',
    location: 'Mysore, India',
    desc: 'Completed secondary education with 85.12% aggregate score with distinction in Mathematics and Science.',
    bullets: []
  }
];

const MILESTONES = [
  {
    icon: Award,
    title: 'Hackathon Finalist — Tech Tatva 2025',
    sub: 'Earned top collegiate finalist honors at the Tech Tatva Hackathon 2025 for rapid full-stack application prototyping and robust architecture design under intense time constraints.'
  },
  {
    icon: Sparkles,
    title: 'NPTEL Certification: Big Data Computing',
    sub: 'Awarded national certification through NPTEL / Ministry of Education, India, mastering distributed computing concepts, big data pipelines, and scalable processing architectures.'
  },
  {
    icon: Cpu,
    title: 'NPTEL Certification: Health Promotion',
    sub: 'Completed specialized collegiate program on ergonomic health, lifestyle science, and wellness advocacy for students and software professionals.'
  }
];

const TERMINAL_SNIPPETS = {
  bio: {
    name: 'Mohammed Daiyan',
    headline: 'Full-Stack Developer & CSE Student',
    location: 'Mysore, Karnataka, India',
    institution: 'The National Institute of Engineering (NIE)',
    currentCGPA: '8.73 / 10.0',
    primaryFocus: ['Spring Boot Backend Services', 'React User Interfaces', 'Secure Web Architectures'],
    availability: 'Open for Summer/Fall Internships & Full-Time Roles'
  },
  skills: {
    languages: ['Java', 'JavaScript', 'Python', 'C'],
    frameworks: ['Spring Boot', 'Spring Security', 'React.js', 'FastAPI', 'Node.js'],
    databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
    tools: ['Docker', 'Git', 'GitHub', 'Postman', 'JWT']
  },
  philosophy: {
    approach: 'Code with clarity, design with empathy, architect for resilience.',
    learningHabit: 'Build hands-on prototypes to demystify complex systems.',
    backendStandard: 'Consistent RESTful contracts, strong typing, stateless security.',
    frontendStandard: 'Responsive, accessible, fast, and delightful to interact with.'
  },
  contact: {
    email: 'daiyan63633@gmail.com',
    phone: '+91 63633 09248',
    location: 'Mysore, India (GMT+5:30)',
    github: 'https://github.com/Daiyan66',
    linkedin: 'https://www.linkedin.com/in/md-daiyan/',
    resume: '/Daiyan-Resume.pdf'
  }
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('daiyan-theme');
    if (saved) return saved === 'abyss';
    return true; // Default to dark theme (abyss)
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('all');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeTermTab, setActiveTermTab] = useState('bio');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Page Load Water Wave Animation state
  const [loadingWave, setLoadingWave] = useState(true);

  // Client-side route detection & 404 endpoint handler
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const spaPath = params.get('p');
      if (spaPath) return spaPath;
      return window.location.pathname || '/';
    }
    return '/';
  });

  const normalizedPath = useMemo(() => {
    return currentPath.replace(/\/+$/, '') || '/';
  }, [currentPath]);

  const is404 = useMemo(() => {
    return normalizedPath !== '/' && normalizedPath !== '/index.html';
  }, [normalizedPath]);

  const navigate = (path) => {
    if (path.startsWith('/#')) {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 80);
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const spaPath = params.get('p');
      const newPath = spaPath || window.location.pathname || '/';
      setCurrentPath(newPath);
      if (newPath === '/' || newPath === '/index.html') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title dynamically based on route
  useEffect(() => {
    if (is404) {
      document.title = '404 · Page Not Found — Mohammed Daiyan | Portfolio';
    } else {
      document.title = 'Mohammed Daiyan | Portfolio';
    }
  }, [is404]);

  // Special direct routes for /resume or /cv
  useEffect(() => {
    if (normalizedPath === '/resume' || normalizedPath === '/cv') {
      window.open('/Daiyan-Resume.pdf', '_blank', 'noopener,noreferrer');
      navigate('/');
    }
  }, [normalizedPath]);

  useEffect(() => {
    // Safety fallback unmount after animation completes smoothly (0.8s delay + 1.25s duration = 2.05s)
    const timer = setTimeout(() => {
      setLoadingWave(false);
    }, 2250);
    return () => clearTimeout(timer);
  }, []);

  // Global interactive water ripple on click
  const handleWaterClick = (e) => {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    const ripple = document.createElement('span');
    ripple.className = 'water-click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 900);
  };

  // Contact form state
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Time in Mysore (IST)
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Theme synchronization
  useEffect(() => {
    const themeName = dark ? 'abyss' : 'caramellatte';
    document.documentElement.dataset.theme = themeName;
    localStorage.setItem('daiyan-theme', themeName);

    // Update browser theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', dark ? '#0c1e28' : '#faf5ed');
    }

    // Update browser tab favicon to match the active theme
    const faviconTag = document.getElementById('favicon-tag') || document.querySelector('link[rel="icon"]');
    if (faviconTag) {
      faviconTag.setAttribute('href', dark ? '/favicon-dark.svg' : '/favicon-light.svg');
    }
    const appleFaviconTag = document.getElementById('apple-favicon-tag') || document.querySelector('link[rel="apple-touch-icon"]');
    if (appleFaviconTag) {
      appleFaviconTag.setAttribute('href', dark ? '/favicon-dark.svg' : '/favicon-light.svg');
    }
  }, [dark]);

  // Keyboard navigation & modal body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
        setResumeModalOpen(false);
        setMenuOpen(false);
      }
    };

    if (activeProjectModal || resumeModalOpen) {
      document.body.style.overflow = 'hidden';
      if (resumeModalOpen) {
        document.body.classList.add('is-printing-resume');
      }
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('is-printing-resume');
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('is-printing-resume');
    };
  }, [activeProjectModal, resumeModalOpen]);

  // Reveal animations on scroll (re-attaches cleanly after 404 transitions and filter changes)
  useEffect(() => {
    if (is404) return;

    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );

      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        // If element is already in or near the viewport, immediately display
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 120 && rect.bottom > -120) {
          el.classList.add('is-visible');
        }
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 60);

    return () => clearTimeout(timeout);
  }, [projectFilter, is404]);

  // Active section scroll spy & back-to-top button
  useEffect(() => {
    if (is404) return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'work', 'skills', 'experience', 'about', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [is404]);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(
      () => showToast(`Copied ${label} to clipboard!`),
      () => showToast(`Failed to copy to clipboard`)
    );
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return PROJECTS;
    if (projectFilter === 'fullstack') return PROJECTS.filter((p) => p.category === 'fullstack');
    if (projectFilter === 'security') return PROJECTS.filter((p) => p.category === 'security' || p.category === 'ai');
    if (projectFilter === 'internship') return PROJECTS.filter((p) => p.category === 'internship');
    return PROJECTS;
  }, [projectFilter]);

  // Filtered skills
  const filteredSkillCategories = useMemo(() => {
    if (!skillSearchQuery.trim()) return SKILL_CATEGORIES;
    const query = skillSearchQuery.toLowerCase();
    return SKILL_CATEGORIES.map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) => s.toLowerCase().includes(query) || cat.title.toLowerCase().includes(query)
      )
    })).filter((cat) => cat.skills.length > 0);
  }, [skillSearchQuery]);

  // Open compact Gmail Compose popup window (Option 1)
  const openGmailPopup = (options = {}) => {
    const { subject = '', body = '' } = options;
    const baseUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com';
    const params = [];
    if (subject) params.push(`su=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    const finalUrl = params.length ? `${baseUrl}&${params.join('&')}` : baseUrl;

    const width = 680;
    const height = 700;
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;

    const left = Math.floor(screenWidth / 2 - width / 2) + dualScreenLeft;
    const top = Math.floor(screenHeight / 2 - height / 2) + dualScreenTop;

    try {
      const popup = window.open(
        finalUrl,
        'GmailComposePopup',
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no`
      );
      if (popup) {
        popup.focus();
        return;
      }
    } catch (e) {
      // Fallback if browser popup blocker interferes
    }
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      showToast('Please fill out all required fields');
      return;
    }
    openGmailPopup({
      subject: formState.subject || `Message from ${formState.name} via Portfolio`,
      body: `Hi Daiyan,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`
    });
    setFormSubmitted(true);
    showToast('Opened Gmail Compose window!');
  };

  const closeMenu = () => setMenuOpen(false);

  // If visiting an unknown endpoint or 404 route, render custom 404 UI
  if (is404) {
    return (
      <div className="not-found-container" onClick={handleWaterClick}>
        {/* Ambient background water currents */}
        <div className="ambient-water-currents" aria-hidden="true">
          <div className="water-stream stream-1" />
          <div className="water-stream stream-2" />
          <div className="water-stream stream-3" />
        </div>

        {/* Ambient glow orbs */}
        <div className="ambient-glow-top" />
        <div className="ambient-glow-left" />
        <div className="ambient-glow-right" />

        {/* 404 Navigation Header */}
        <header className="topbar-wrapper" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="topbar-inner">
            <a
              href="/"
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              <div className="brand-avatar-box">MD</div>
              <div>
                <span className="brand-name">Mohammed Daiyan</span>
                <span className="brand-sub">Portfolio</span>
              </div>
            </a>

            <div className="topbar-right">
              <button
                className="btn-theme-toggle"
                onClick={() => setDark(!dark)}
                aria-label="Toggle theme"
                title="Switch dark / light theme"
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate('/')}
                style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Home size={14} />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </header>

        {/* 404 Main Body */}
        <main className="not-found-main">
          <div className="not-found-card">
            <div className="not-found-badge">
              <span className="not-found-pulse-dot" />
              <AlertTriangle size={13} />
              <span>Error 404 · Signal Lost in the Abyss</span>
            </div>

            <div className="not-found-art">
              <div className="not-found-glitch-number">404</div>
            </div>

            <h1 className="not-found-heading">Submerged Beyond Reach</h1>

            <div className="not-found-endpoint-tag">
              <Terminal size={14} />
              <span>Cannot GET <code>{currentPath}</code></span>
            </div>

            <p className="not-found-description">
              The endpoint or route you navigated to doesn't exist, has been moved, or drifted below the surface.
              Don't worry—all main full-stack projects, architecture docs, and credentials are safe and ready to view.
            </p>

            <div className="not-found-actions">
              <button className="btn-primary" onClick={() => navigate('/')}>
                <Home size={16} />
                <span>Back to Portfolio</span>
              </button>
              <button className="btn-secondary" onClick={() => navigate('/#work')}>
                <Layers size={16} />
                <span>Explore Projects</span>
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  window.open('/Daiyan-Resume.pdf', '_blank', 'noopener,noreferrer');
                }}
              >
                <FileText size={16} />
                <span>View Resume</span>
              </button>
              <a
                className="btn-secondary"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openGmailPopup();
                }}
              >
                <Mail size={16} />
                <span>Contact Daiyan</span>
              </a>
            </div>

            {/* Direct Section Gateways */}
            <div className="not-found-jump-grid">
              <div className="not-found-jump-card" onClick={() => navigate('/#work')}>
                <div className="not-found-jump-num">01 // PROJECTS</div>
                <div className="not-found-jump-title">
                  <span>PolyArguMinds &amp; Threat AI</span>
                  <ArrowUpRight size={15} />
                </div>
                <div className="not-found-jump-desc">Flagship Spring Boot &amp; React full-stack apps</div>
              </div>

              <div className="not-found-jump-card" onClick={() => navigate('/#skills')}>
                <div className="not-found-jump-num">02 // ARSENAL</div>
                <div className="not-found-jump-title">
                  <span>Technical Skills</span>
                  <ArrowUpRight size={15} />
                </div>
                <div className="not-found-jump-desc">Java, Spring Boot, MySQL, Docker, React</div>
              </div>

              <div className="not-found-jump-card" onClick={() => navigate('/#experience')}>
                <div className="not-found-jump-num">03 // JOURNEY</div>
                <div className="not-found-jump-title">
                  <span>Experience &amp; NIE Mysore</span>
                  <ArrowUpRight size={15} />
                </div>
                <div className="not-found-jump-desc">Engineering milestones and collegiate records</div>
              </div>

              <div className="not-found-jump-card" onClick={() => navigate('/#contact')}>
                <div className="not-found-jump-num">04 // CONNECT</div>
                <div className="not-found-jump-title">
                  <span>Get in Touch</span>
                  <ArrowUpRight size={15} />
                </div>
                <div className="not-found-jump-desc">daiyan63633@gmail.com · Bengaluru / Mysore</div>
              </div>
            </div>
          </div>
        </main>

        {/* 404 Footer */}
        <footer className="site-footer" style={{ marginTop: 0 }}>
          <div className="footer-content" style={{ maxWidth: '880px', margin: '0 auto', width: '100%' }}>
            <div className="footer-left">
              <p className="footer-text">
                &copy; {new Date().getFullYear()} Mohammed Daiyan. All rights reserved.
              </p>
            </div>
            <div className="footer-socials">
              <a
                href="https://github.com/Daiyan66"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-daiyan/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Email"
                onClick={(e) => {
                  e.preventDefault();
                  openGmailPopup();
                }}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </footer>

        {/* Toast in 404 if needed */}
        {toastMessage && (
          <div className="toast-container" aria-live="polite">
            <div className="toast-pill">
              <Check size={14} style={{ color: 'var(--green-status)' }} />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`site-container ${loadingWave ? 'is-loading-wave' : ''}`} onClick={handleWaterClick}>
      {/* Liquid Water Wave Page-Load Intro Curtain */}
      {loadingWave && (
        <div
          className="water-wave-curtain"
          aria-hidden="true"
          onAnimationEnd={(e) => {
            if (e.animationName === 'waveCurtainRollUp') {
              setLoadingWave(false);
            }
          }}
        >
          <div className="curtain-body">
            <div className="water-drop-center">
              <div className="ripple-ring ring-1" />
              <div className="ripple-ring ring-2" />
              <div className="ripple-ring ring-3" />
              <div className="water-drop-core">
                <span>M</span>
                <span className="drop-accent">D</span>
              </div>
            </div>
          </div>
          <div className="wave-skirt-container">
            <svg className="wave-skirt-svg wave-skirt-back" viewBox="0 0 1440 180" preserveAspectRatio="none">
              <path d="M0,0 L1440,0 L1440,60 C1200,140 960,10 720,70 C480,130 240,10 0,60 Z" />
            </svg>
            <svg className="wave-skirt-svg wave-skirt-mid" viewBox="0 0 1440 180" preserveAspectRatio="none">
              <path d="M0,0 L1440,0 L1440,90 C1260,20 980,150 720,80 C460,10 180,150 0,80 Z" />
            </svg>
            <svg className="wave-skirt-svg wave-skirt-front" viewBox="0 0 1440 180" preserveAspectRatio="none">
              <path d="M0,0 L1440,0 L1440,110 C1180,160 920,40 720,100 C520,160 260,40 0,100 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Ambient background water currents */}
      <div className="ambient-water-currents" aria-hidden="true">
        <div className="water-stream stream-1" />
        <div className="water-stream stream-2" />
        <div className="water-stream stream-3" />
      </div>

      {/* Background ambient lighting for wide screens */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-left" />
      <div className="ambient-glow-right" />

      {/* Desktop Quick-Nav Side Rail for PC Screens */}
      <aside className="desktop-side-rail" aria-label="Quick section navigation">
        <div className="side-rail-track">
          {[
            { id: 'home', label: '01 Intro' },
            { id: 'work', label: '02 Projects' },
            { id: 'skills', label: '03 Skills' },
            { id: 'experience', label: '04 Experience' },
            { id: 'about', label: '05 About' },
            { id: 'contact', label: '06 Contact' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`side-rail-dot ${activeSection === item.id ? 'active' : ''}`}
              aria-label={item.label}
            >
              <span className="dot-circle" />
              <span className="dot-tooltip">{item.label}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* ================= TOPBAR NAVIGATION ================= */}
      <header className="topbar-wrapper wave-entry wave-delay-1">
        <div className="content-wrap">
          <div className="topbar">
            {/* Wordmark */}
            <div className="brand-wrap">
              <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Mohammed Daiyan home">
                MD<span>.</span>
              </a>
            </div>

            {/* Floating Nav Pills (Desktop) */}
            <nav className="nav-links-desktop" aria-label="Main navigation">
              <a className={`nav-link-item ${activeSection === 'home' ? 'active' : ''}`} href="#home">
                Intro
              </a>
              <a className={`nav-link-item ${activeSection === 'work' ? 'active' : ''}`} href="#work">
                Projects
              </a>
              <a className={`nav-link-item ${activeSection === 'skills' ? 'active' : ''}`} href="#skills">
                Skills
              </a>
              <a className={`nav-link-item ${activeSection === 'experience' ? 'active' : ''}`} href="#experience">
                Experience
              </a>
              <a className={`nav-link-item ${activeSection === 'about' ? 'active' : ''}`} href="#about">
                About
              </a>
              <a className={`nav-link-item ${activeSection === 'contact' ? 'active' : ''}`} href="#contact">
                Contact
              </a>
            </nav>

            {/* Topbar Actions */}
            <div className="topbar-actions">
              <a
                className="resume-btn-nav"
                href="/Daiyan-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Mohammed Daiyan's Resume in a new tab"
              >
                <FileText size={14} /> Resume <ArrowUpRight size={12} />
              </a>

              <button
                className="theme-toggle-btn"
                onClick={() => setDark(!dark)}
                aria-label={`Switch to ${dark ? 'warm light' : 'midnight dark'} mode`}
                title={`Switch to ${dark ? 'warm light' : 'midnight dark'} mode`}
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={closeMenu}>
            Home &amp; Overview
          </a>
          <a href="#work" onClick={closeMenu}>
            Featured Projects ({PROJECTS.length})
          </a>
          <a href="#skills" onClick={closeMenu}>
            Technical Skills
          </a>
          <a href="#experience" onClick={closeMenu}>
            Experience &amp; Education
          </a>
          <a href="#about" onClick={closeMenu}>
            About &amp; Developer CLI
          </a>
          <a href="#contact" onClick={closeMenu}>
            Get in Touch
          </a>
          <a
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
            href="/Daiyan-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <FileText size={15} /> Open Resume (PDF) <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main>
        {/* HERO SECTION */}
        <section className="hero-section" id="home">
          <div className="content-wrap">
            <div className="hero-grid">
              {/* Left Column: Copy & Actions */}
              <div className="hero-copy">
                <div className="hero-meta-badge wave-entry wave-delay-2">
                  <MapPin size={13} style={{ color: 'var(--accent)' }} />
                  <span>Mysore, India</span>
                  <span>·</span>
                  <span>IST {currentTime || 'GMT+5:30'}</span>
                </div>

                <h1 className="hero-title wave-entry wave-delay-3">
                  Mohammed <em>Daiyan</em>
                </h1>

                <p className="hero-subtitle wave-entry wave-delay-4">
                  Computer Science Student &amp; Full-Stack Software Developer
                </p>

                <p className="hero-description wave-entry wave-delay-5">
                  Final-year Computer Science &amp; Engineering undergraduate at{' '}
                  <strong>The National Institute of Engineering (NIE), Mysore</strong>. I specialize in designing
                  reliable backend microservices in <strong>Java &amp; Spring Boot</strong>, architecting robust relational
                  databases, and building clean, responsive user interfaces in <strong>React</strong>.
                </p>

                <div className="hero-actions wave-entry wave-delay-6">
                  <a className="btn-primary" href="#work">
                    Explore Projects <ArrowRight size={15} />
                  </a>

                  <a
                    className="btn-secondary"
                    href="/Daiyan-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Daiyan's Resume PDF in new tab"
                  >
                    <FileText size={15} /> Resume / CV <ArrowUpRight size={13} />
                  </a>

                  <div className="hero-social-links">
                    <a
                      className="social-icon-btn"
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Compose email in Gmail"
                      title="Open Gmail Compose to email Daiyan"
                      onClick={(e) => {
                        e.preventDefault();
                        openGmailPopup();
                      }}
                    >
                      <Mail size={16} />
                    </a>
                    <a
                      className="social-icon-btn"
                      href="https://github.com/Daiyan66"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub profile"
                      title="Visit GitHub profile"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      className="social-icon-btn"
                      href="https://www.linkedin.com/in/md-daiyan/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn profile"
                      title="Visit LinkedIn profile"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Avatar */}
              <div className="hero-visual wave-entry wave-delay-4">
                <div className="avatar-card-wrapper">
                  <div className="avatar-halo" />
                  <div className="avatar-frame">
                    <img
                      className="avatar-img"
                      src="/Daiyan.jpg"
                      alt="Mohammed Daiyan"
                      loading="eager"
                    />
                  </div>
                  <div className="avatar-chip chip-top">
                    <Sparkles size={13} style={{ color: 'var(--amber-accent)' }} />
                    <span>Spring Boot &amp; React</span>
                  </div>
                  <div className="avatar-chip chip-bottom">
                    <GraduationCap size={13} style={{ color: 'var(--accent)' }} />
                    <span>NIE Mysore '27</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Strip */}
            <div className="quick-stats-strip reveal wave-entry wave-delay-7">
              <div className="stat-item">
                <span className="stat-value">8.73</span>
                <span className="stat-label">B.Tech CGPA</span>
                <span className="stat-sub">The National Institute of Engineering</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">400+</span>
                <span className="stat-label">Internship Hours</span>
                <span className="stat-sub">Torus Solutions (Software Dev)</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Finalist</span>
                <span className="stat-label">Tech Tatva 2025</span>
                <span className="stat-sub">Collegiate Engineering Hackathon</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">85.8%</span>
                <span className="stat-label">Diploma Distinction</span>
                <span className="stat-sub">Computer Science &amp; Engineering</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="section-padding" id="work">
          <div className="content-wrap">
            <div className="section-header-row reveal">
              <div>
                <span className="eyebrow-tag">
                  <Layers size={13} /> PORTFOLIO OF WORK
                </span>
                <h2 className="section-title">
                  Featured <em>Projects</em>
                </h2>
                <p className="section-subtitle">
                  Production-style systems, full-stack web applications, and security platforms I've engineered.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="filter-tabs">
                <button
                  className={`filter-btn ${projectFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setProjectFilter('all')}
                >
                  All ({PROJECTS.length})
                </button>
                <button
                  className={`filter-btn ${projectFilter === 'fullstack' ? 'active' : ''}`}
                  onClick={() => setProjectFilter('fullstack')}
                >
                  Full-Stack
                </button>
                <button
                  className={`filter-btn ${projectFilter === 'security' ? 'active' : ''}`}
                  onClick={() => setProjectFilter('security')}
                >
                  AI &amp; Security
                </button>
                <button
                  className={`filter-btn ${projectFilter === 'internship' ? 'active' : ''}`}
                  onClick={() => setProjectFilter('internship')}
                >
                  Internship
                </button>
              </div>
            </div>

            {/* Project Cards Stack */}
            <div className="projects-stack">
              {filteredProjects.map((project) => (
                <article className="project-card reveal" key={project.number}>
                  {/* Left Index */}
                  <div className="project-index">{project.number}</div>

                  {/* Middle Main Info */}
                  <div className="project-body">
                    <div className="project-badge-row">
                      <span className="project-type-badge">{project.kind}</span>
                      <span style={{ color: 'var(--border-strong)', fontSize: '12px' }}>·</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{project.badge}</span>
                    </div>

                    <h3 className="project-name">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="tech-tag-cloud">
                      {project.stack.map((t) => (
                        <span className="tech-pill" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side Highlights & Action */}
                  <div className="project-side-details">
                    <div className="project-highlights-box">
                      <div className="highlights-title">
                        <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} /> Key Highlights
                      </div>
                      <p className="highlights-text">{project.note}</p>
                    </div>

                    <div className="project-action-bar">
                      <button
                        className="view-details-btn"
                        onClick={() => setActiveProjectModal(project)}
                      >
                        Deep Dive &amp; Architecture <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION (BENTO GRID) */}
        <section className="section-padding" id="skills">
          <div className="content-wrap">
            <div className="section-header-row reveal">
              <div>
                <span className="eyebrow-tag">
                  <Cpu size={13} /> TECHNICAL ARSENAL
                </span>
                <h2 className="section-title">
                  Skills &amp; <em>Technologies</em>
                </h2>
                <p className="section-subtitle">
                  Technologies, frameworks, databases, and paradigms I reach for to build reliable software.
                </p>
              </div>

              {/* Instant Search Bar */}
              <div style={{ position: 'relative', width: 'min(280px, 100%)' }}>
                <input
                  type="text"
                  placeholder="Filter skills (e.g. Spring, React)..."
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '12px', paddingRight: '28px' }}
                />
                {skillSearchQuery && (
                  <button
                    onClick={() => setSkillSearchQuery('')}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Bento Grid */}
            <div className="skills-bento-grid">
              {filteredSkillCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div className="bento-card reveal" key={cat.id}>
                    <div className="bento-card-header">
                      <div className="bento-icon-box">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className="bento-card-title">{cat.title}</h3>
                        <p className="bento-card-desc">{cat.desc}</p>
                      </div>
                    </div>

                    <div className="skills-chip-list">
                      {cat.skills.map((skill) => (
                        <div className="skill-chip" key={skill}>
                          <span className="skill-bullet" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Engineering Practices Ribbon */}
            <div className="practices-ribbon reveal">
              <span className="practices-title">
                <CheckCircle2 size={14} /> Core Engineering Competencies
              </span>
              <div className="practices-list">
                <span className="practices-item">✓ Object-Oriented Design (OOP)</span>
                <span className="practices-item">✓ RESTful API Architecture</span>
                <span className="practices-item">✓ Relational Data Modeling</span>
                <span className="practices-item">✓ Role-Based Access Control</span>
                <span className="practices-item">✓ Component-Driven UI</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section className="section-padding" id="experience">
          <div className="content-wrap">
            <div className="section-header-row reveal">
              <div>
                <span className="eyebrow-tag">
                  <Briefcase size={13} /> CAREER &amp; ACADEMICS
                </span>
                <h2 className="section-title">
                  Experience &amp; <em>Education</em>
                </h2>
                <p className="section-subtitle">
                  Hands-on professional internship, undergraduate engineering studies, and verified academic distinctions.
                </p>
              </div>
            </div>

            {/* Timeline Cards */}
            <div className="timeline-container">
              {TIMELINE_DATA.map((item, idx) => (
                <article className="timeline-card reveal" key={idx}>
                  <div className="timeline-meta-col">
                    <span className="timeline-badge">{item.badge}</span>
                    <span className="timeline-period">{item.period}</span>
                  </div>

                  <div className="timeline-main-col">
                    <h3 className="timeline-role-title">{item.role}</h3>
                    <div className="timeline-org">
                      {item.organization} <span>·</span> {item.location}
                    </div>
                    <p className="timeline-description">{item.desc}</p>

                    {item.bullets.length > 0 && (
                      <ul className="timeline-bullets">
                        {item.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Milestones & Hackathons Showcase */}
            <div className="section-header-row reveal" style={{ marginTop: '54px', marginBottom: '20px' }}>
              <div>
                <span className="eyebrow-tag">
                  <Award size={13} /> HONORS &amp; CERTIFICATIONS
                </span>
                <h3 className="section-title" style={{ fontSize: '24px' }}>
                  Milestones &amp; <em>Accolades</em>
                </h3>
              </div>
            </div>

            <div className="milestones-grid">
              {MILESTONES.map((m, i) => {
                const MIcon = m.icon;
                return (
                  <div className="milestone-card reveal" key={i}>
                    <div className="milestone-icon">
                      <MIcon size={20} />
                    </div>
                    <h4 className="milestone-heading">{m.title}</h4>
                    <p className="milestone-sub">{m.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT & INTERACTIVE CLI TERMINAL */}
        <section className="section-padding" id="about">
          <div className="content-wrap">
            <div className="section-header-row reveal">
              <div>
                <span className="eyebrow-tag">
                  <Terminal size={13} /> BEHIND THE CODE
                </span>
                <h2 className="section-title">
                  Learning by <em>Building</em>
                </h2>
              </div>
            </div>

            <div className="about-layout">
              {/* Left Column: Narrative */}
              <div className="about-prose reveal">
                <p className="lead-paragraph">
                  I believe the deepest way to master software engineering is to design real systems, confront architecture bottlenecks, and write code that solves practical problems.
                </p>
                <p>
                  My engineering journey began during my diploma studies, where I discovered a passion for clean logic and relational data. Today at NIE Mysore, I balance academic excellence (8.73 CGPA) with hands-on development in the Java/Spring Boot and React ecosystems.
                </p>
                <p>
                  During my internship at Torus Solutions, I learned how to build enterprise workflows with clean REST contracts, handle asynchronous verification states, and collaborate within engineering teams.
                </p>
                <p>
                  When I’m not building software, I explore application security, investigate emerging AI toolchains, and study system design patterns.
                </p>
              </div>

              {/* Right Column: Interactive Developer Terminal */}
              <div className="terminal-window reveal">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="t-dot t-red" />
                    <span className="t-dot t-yellow" />
                    <span className="t-dot t-green" />
                  </div>
                  <div className="terminal-tab-bar">
                    {Object.keys(TERMINAL_SNIPPETS).map((tab) => (
                      <button
                        key={tab}
                        className={`t-tab-btn ${activeTermTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTermTab(tab)}
                      >
                        daiyan.{tab}()
                      </button>
                    ))}
                  </div>
                </div>

                <div className="terminal-body">
                  <div className="term-cmd-prompt">
                    <span>daiyan@portfolio:~$</span>
                    <span>cat daiyan.{activeTermTab}.json</span>
                    <span className="term-cursor" />
                  </div>

                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {JSON.stringify(TERMINAL_SNIPPETS[activeTermTab], null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="section-padding" id="contact">
          <div className="content-wrap">
            <div className="section-header-row reveal">
              <div>
                <span className="eyebrow-tag">
                  <Mail size={13} /> REACH OUT
                </span>
                <h2 className="section-title">
                  Let's Connect &amp; <em>Collaborate</em>
                </h2>
                <p className="section-subtitle">
                  Whether you have an internship opportunity, full-time engineering opening, or just want to discuss software architecture—my inbox is always open.
                </p>
              </div>
            </div>

            <div className="contact-grid">
              {/* Left Column: Direct Contact Info */}
              <div className="contact-card-direct reveal">
                {/* Email card */}
                <div className="contact-method-card">
                  <div className="method-info">
                    <div className="method-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="method-title">Direct Email (Gmail)</div>
                      <a
                        className="method-value"
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Click to open Gmail Compose window"
                        onClick={(e) => {
                          e.preventDefault();
                          openGmailPopup();
                        }}
                      >
                        daiyan63633@gmail.com <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      </a>
                    </div>
                  </div>
                  <button
                    className="copy-pill-btn"
                    onClick={() => copyToClipboard('daiyan63633@gmail.com', 'Email')}
                    title="Copy email to clipboard"
                  >
                    <Copy size={13} /> Copy
                  </button>
                </div>

                {/* Phone card */}
                <div className="contact-method-card">
                  <div className="method-info">
                    <div className="method-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="method-title">Phone / WhatsApp</div>
                      <a className="method-value" href="tel:+916363309248">
                        +91 63633 09248
                      </a>
                    </div>
                  </div>
                  <button
                    className="copy-pill-btn"
                    onClick={() => copyToClipboard('+916363309248', 'Phone')}
                    title="Copy phone number"
                  >
                    <Copy size={13} /> Copy
                  </button>
                </div>

                {/* Location card */}
                <div className="contact-method-card">
                  <div className="method-info">
                    <div className="method-icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="method-title">Based In</div>
                      <p className="method-value">Mysore, Karnataka, India</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    GMT+5:30 (IST)
                  </span>
                </div>

                {/* Social Profiles */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <a
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    href="https://github.com/Daiyan66"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={15} /> GitHub Profile <ArrowUpRight size={13} />
                  </a>
                  <a
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    href="https://www.linkedin.com/in/md-daiyan/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Quick Message */}
              <div className="contact-form-card reveal">
                <h3 className="form-title">Send a Direct Message</h3>
                <p className="form-sub">
                  Fill in your details below to compose an instant message directly to my inbox.
                </p>

                {formSubmitted ? (
                  <div style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--accent-soft)', borderRadius: '12px' }}>
                    <CheckCircle2 size={36} style={{ color: 'var(--accent)', margin: '0 auto 12px' }} />
                    <h4 style={{ margin: '0 0 6px', color: 'var(--text-primary)' }}>Message Client Dispatched!</h4>
                    <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Thank you! Your email client has been prepared with your message.
                    </p>
                    <button className="btn-secondary" onClick={() => setFormSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleFormSubmit}>
                    <div className="form-row-dual">
                      <div className="form-group">
                        <label className="form-label">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Smith"
                          className="form-input"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Your Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. alex@company.com"
                          className="form-input"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Internship Opportunity / Collaboration"
                        className="form-input"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea
                        required
                        placeholder="Write your note, project inquiry, or interview invite here..."
                        className="form-textarea"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="form-submit-btn">
                      <Send size={15} /> Send Message via Email
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="content-wrap">
          <div className="footer-content">
            <div className="footer-copy">
              <strong>Mohammed Daiyan</strong> · Computer Science &amp; Engineering, NIE Mysore © {new Date().getFullYear()}
            </div>

            <div className="footer-links">
              <a
                href="https://github.com/Daiyan66"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-icon-btn"
                style={{ width: '34px', height: '34px' }}
                title="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-daiyan/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-icon-btn"
                style={{ width: '34px', height: '34px' }}
                title="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email (Compose in Gmail)"
                className="social-icon-btn"
                style={{ width: '34px', height: '34px' }}
                title="Compose email in Gmail"
                onClick={(e) => {
                  e.preventDefault();
                  openGmailPopup();
                }}
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= PROJECT DEEP-DIVE MODAL ================= */}
      {activeProjectModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProjectModal(null);
          }}
        >
          <div className="modal-container" role="dialog" aria-modal="true">
            <button
              className="modal-close-btn"
              onClick={() => setActiveProjectModal(null)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="modal-header-meta">
              <span className="project-type-badge">{activeProjectModal.kind}</span>
              <span style={{ color: 'var(--border-strong)' }}>·</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {activeProjectModal.badge}
              </span>
            </div>

            <h2 className="modal-title">{activeProjectModal.title}</h2>
            <p className="modal-subtitle">{activeProjectModal.longDescription}</p>

            {/* Architecture breakdown */}
            <div className="modal-section-block">
              <div className="modal-section-title">System Architecture Overview</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {Object.entries(activeProjectModal.architecture).map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-line)'
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '10.5px',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: '4px'
                      }}
                    >
                      {key}
                    </span>
                    <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="modal-section-block">
              <div className="modal-section-title">Key Engineering Highlights</div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                {activeProjectModal.highlights.map((h, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack pills */}
            <div className="modal-section-block" style={{ borderBottom: 'none', marginBottom: '16px' }}>
              <div className="modal-section-title">Technologies Used</div>
              <div className="tech-tag-cloud">
                {activeProjectModal.stack.map((t) => (
                  <span className="tech-pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <a
                className="btn-primary"
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} /> View on GitHub <ArrowUpRight size={13} />
              </a>
              <button className="btn-secondary" onClick={() => setActiveProjectModal(null)}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RESUME / CV MODAL ================= */}
      {resumeModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setResumeModalOpen(false);
          }}
        >
          <div className="modal-container" style={{ width: 'min(800px, 100%)' }} role="dialog" aria-modal="true">
            <button
              className="modal-close-btn"
              onClick={() => setResumeModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Resume Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', borderBottom: '2px solid var(--border-line)', paddingBottom: '18px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', margin: '0 0 4px', color: 'var(--text-primary)' }}>
                  Mohammed Daiyan
                </h2>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  Computer Science &amp; Engineering Student · Full-Stack Developer
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Mysore, Karnataka, India · +91 63633 09248 ·{' '}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=daiyan63633@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                    title="Open Gmail Compose window"
                    onClick={(e) => {
                      e.preventDefault();
                      openGmailPopup();
                    }}
                  >
                    daiyan63633@gmail.com
                  </a>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '7px 12px' }}
                  href="/Daiyan-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open actual PDF in new tab"
                >
                  <FileText size={14} /> Open PDF <ArrowUpRight size={13} />
                </a>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '12px', padding: '7px 12px' }}
                  onClick={() => window.print()}
                  title="Print or save as PDF"
                >
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>

            {/* Resume Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Education */}
              <div>
                <div className="modal-section-title">Education</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                        The National Institute of Engineering (NIE), Mysore
                      </strong>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <div>2024 — 2027</div>
                      <strong style={{ color: 'var(--accent)' }}>CGPA: 8.73 / 10</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                        D. Dharmaprakasha Banumaiah’s Polytechnic, Mysore
                      </strong>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        Diploma in Computer Science &amp; Engineering
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <div>2021 — 2024</div>
                      <strong style={{ color: 'var(--accent)' }}>Distinction (85.80%)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="modal-section-title">Work Experience</div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                      Software Development Intern — Torus Solutions
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Jan 2024 — Apr 2024 (400 Hours)</span>
                  </div>
                  <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '12.5px', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                    <li>Engineered an Employee Background Verification web application using Spring Boot and React.</li>
                    <li>Developed secured REST APIs with Spring Security, JWT token validation, and role-based permissions.</li>
                    <li>Designed normalized MySQL database tables with optimized foreign keys and relational schemas.</li>
                  </ul>
                </div>
              </div>

              {/* Key Projects */}
              <div>
                <div className="modal-section-title">Key Projects</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>
                        PolyArguMinds (Full-Stack · AI Discussion Platform)
                      </strong>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                        React, Spring Boot, MySQL, Docker, JWT
                      </span>
                    </div>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Structured debate platform featuring AI-generated counter-arguments, relational discussion trees, and containerized deployment.
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>
                        AI Cyber Threat Detection Platform
                      </strong>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                        React, Java, Spring Boot, MySQL
                      </span>
                    </div>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      SOC monitoring dashboard concept with anomaly severity classifications and incident resolution tracking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="modal-section-title">Technical Skills</div>
                <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  <strong>Languages:</strong> Java, JavaScript, Python, C <br />
                  <strong>Frameworks &amp; Libraries:</strong> Spring Boot, React.js, Spring Security, Node.js, FastAPI, Tailwind CSS <br />
                  <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB, SQLite <br />
                  <strong>Tools &amp; DevOps:</strong> Docker, Git, GitHub, Postman, Linux CLI, JWT Authentication
                </p>
              </div>

              {/* Honors & Certifications */}
              <div>
                <div className="modal-section-title">Honors &amp; Certifications</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  <li><strong>Finalist:</strong> Tech Tatva Hackathon 2025 (Top collegiate engineering teams)</li>
                  <li><strong>Certified:</strong> NPTEL Big Data Computing (Ministry of Education / IITs)</li>
                  <li><strong>Certified:</strong> NPTEL Health Promotion for College Students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="toast-container" aria-live="polite">
          <div className="toast-pill">
            <Check size={14} style={{ color: 'var(--green-status)' }} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ================= BACK TO TOP BUTTON ================= */}
      <button
        className={`back-to-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Scroll to top"
      >
        <ArrowRight size={18} style={{ transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
