import React, { useState, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Copy,
  Menu,
  X,
  Sliders,
  ArrowUp,
  Database,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { GlowCard } from "@/components/ui/spotlight-card";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

function LinkedInIcon({ size = 18, className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ==========================================================================
   PORTFOLIO DATA CONFIGURATION (Source of Truth: Uploaded Resume)
   ========================================================================== */

const CURRENT_YEAR = 2026;

const PERSONAL_INFO = {
  name: "Siddharth P",
  brand: "SIDDHARTH P",
  role: "AI & Data Science Specialist | ML Practitioner",
  tagline: "Turning Ideas Into Intelligent Systems.",
  heroSubtitle: "I'm Siddharth P, an AI & Data Science student at Hindustan Institute of Technology & Science, exploring machine learning, real-time AI detection systems, and practical web software.",
  location: "Chennai, India",
  email: "siddhrath27@gmail.com",
  phone: "9884986438",
  phoneDisplay: "+91 98849 86438",
  linkedin: "https://linkedin.com/in/siddharth-premnath-877056317",
  resumePath: "/resume.html",
  education: {
    degree: "B.Tech – Computer Science Engineering (AI & Data Science)",
    institution: "Hindustan Institute of Technology and Science, Chennai",
    period: "Jul 2023 – Present",
    expectedGraduation: "2027"
  }
};

const SERVICES_CAPABILITIES = [
  {
    number: "01.",
    title: "Machine Learning & NLP",
    icon: Brain,
    desc: "Comparative text classification pipelines exploring Logistic Regression, SVM, and contextual BERT transformer representations for deep textual provenance.",
    tech: ["BERT", "SVM", "Logistic Regression", "Text Classification", "Scikit-Learn"]
  },
  {
    number: "02.",
    title: "AI-Powered Web Interfaces",
    icon: Globe,
    desc: "Seamless integration of Python ML backends with responsive web user interfaces featuring live text processing and animated model confidence visualizations.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Live Input Processing"]
  },
  {
    number: "03.",
    title: "Data Science & Analysis",
    icon: Database,
    desc: "Data preparation, exploratory data analysis, feature engineering, and statistical modeling using Python scientific computing libraries.",
    tech: ["Python", "Data Science", "Data Analysis", "Feature Modeling"]
  },
  {
    number: "04.",
    title: "Knowledge Engineering",
    icon: Sliders,
    desc: "Centralized AI-driven student knowledge architectures with automated lecture notes generation, intelligent Q&A navigation, and profile tools.",
    tech: ["Centralized Repository", "Automated Notes Gen", "Intelligent Q&A"]
  }
];

const PROJECTS = [
  {
    id: "ai-text-detector",
    title: "AI Text vs Human Text Detection System",
    period: "Aug 2024 – 2025",
    status: "Completed",
    category: "NLP & Machine Learning",
    summary: "Developed a real-time text classification system exploring comparative model architectures (Logistic Regression, SVM, and BERT) paired with an interactive, responsive web interface for live input inference.",
    problemStatement: "The rapid emergence of large language models makes verifying text provenance essential for academic integrity, content authenticity, and technical documentation.",
    approach: "Explored and benchmarked multiple machine learning algorithms from classical statistical classifiers (Logistic Regression, Support Vector Machines) to contextual transformer representations (BERT) to understand the boundary between synthetic and human syntactical patterns.",
    implementationDetails: [
      "Developed a real-time system to classify AI-generated vs human-written text.",
      "Implemented Logistic Regression, SVM, and BERT models for detection accuracy.",
      "Integrated machine-learning backend with a responsive web interface.",
      "Added animation-based UI and live input processing features.",
      "Focused on detection accuracy and user experience."
    ],
    technologies: ["Python", "Logistic Regression", "SVM", "BERT", "Responsive UI", "Live Text Processing"],
    statusNote: "Completed project exploring model accuracy, loss convergence, and inference efficiency across synthetic and organic text corpuses."
  },
  {
    id: "luna-ai",
    title: "Luna — AI Personal Assistance",
    period: "Aug 2024 – Present",
    status: "In Progress",
    category: "AI Web Interface & Inference",
    summary: "An interactive AI application combining multi-model backend classification pipelines with responsive web UI, live text stream processing, and visualization features.",
    problemStatement: "Seamlessly bridging machine learning inference pipelines with an intuitive frontend that visualizes detection confidences without lag or complexity.",
    approach: "Coupled a backend ML pipeline with multiple models (Logistic Regression, SVM, BERT) to a responsive user interface designed for live text input and instant feedback.",
    implementationDetails: [
      "Developed an AI system to detect AI-generated vs human-written text in real time.",
      "Implemented multiple ML models including Logistic Regression, SVM, and BERT.",
      "Integrated backend ML pipeline with an interactive web interface.",
      "Designed responsive UI with live text input and visualization features.",
      "Focused on improving detection accuracy and user experience."
    ],
    technologies: ["Python", "BERT", "SVM", "Logistic Regression", "Responsive UI", "ML Pipeline"],
    statusNote: "In active development. Focus on refining model inference latency and user interface feedback."
  },
  {
    id: "ai-knowledge-vault",
    title: "AI Knowledge Vault",
    period: "Jan 2026 – Present",
    status: "In Progress",
    category: "Knowledge Engineering & Education Portal",
    summary: "A student-centric knowledge infrastructure engineered to centralize academic resources with automated notes generation, AI-powered question answering, and intelligent navigation.",
    problemStatement: "University students frequently navigate dispersed course notes, disorganized lecture summaries, and lack centralized tools for rapid contextual query resolution.",
    approach: "Architecting a modular platform integrating profile management, centralized repository indexing, and roadmap features for automated notes synthesis and AI Q&A navigation.",
    implementationDetails: [
      "Building a centralized AI-driven student knowledge portal.",
      "Developing automated notes generation and AI Q&A features.",
      "Integrating profile management and intelligent navigation tools."
    ],
    featuresBreakdown: [
      { name: "Centralized Knowledge Portal", status: "In Development" },
      { name: "Profile Management Tools", status: "In Development" },
      { name: "Intelligent Navigation Interface", status: "In Development" },
      { name: "Automated Notes Generation", status: "Planned Roadmap" },
      { name: "AI-Powered Question Answering (Q&A)", status: "Planned Roadmap" }
    ],
    technologies: ["AI Knowledge Architecture", "Student Profile Systems", "Automated Notes Gen", "Web Platform"],
    statusNote: "Currently in progress (started Jan 2026). Developing core repository and navigation components."
  }
];

const CERTIFICATIONS = [
  {
    title: "Python 101 for Data Science",
    issuer: "IBM",
    category: "Data Science & Python",
    description: "Foundational Python programming, data structures, data analysis libraries, and scientific computing principles."
  },
  {
    title: "Celonis AI Foundations",
    issuer: "Celonis",
    category: "AI & Process Intelligence",
    description: "Core principles of artificial intelligence, process intelligence, enterprise automation, and algorithmic workflows."
  },
  {
    title: "Google Cloud Digital Leader",
    issuer: "Google Cloud",
    category: "Cloud & Infrastructure",
    description: "Cloud computing fundamentals, infrastructure capabilities, data modernization, and enterprise cloud solutions."
  },
  {
    title: "TCS iON Career Edge — Young Professional",
    issuer: "Tata Consultancy Services (TCS iON)",
    category: "Professional & Business Skills",
    description: "Business communication, workplace agility, professional problem-solving, and foundational digital literacy."
  }
];

/* ==========================================================================
   NOVA BUTTON COMPONENT WITH SIGNATURE DUAL-TEXT HOVER SLIDE
   ========================================================================== */
function NovaButton({ children, hoverText, href, onClick, variant = "primary", className = "", ...props }) {
  const content = (
    <span className="ui-button-text-wrap">
      <span className="ui-button-text-default">{children}</span>
      <span className="ui-button-text-hover" aria-hidden="true">{hoverText || children}</span>
    </span>
  );

  const baseClass = `ui-button ${variant === "primary" ? "ui-button-primary" : "ui-button-outline"} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} {...props}>
      {content}
    </button>
  );
}

/* ==========================================================================
   HELPER SUBCOMPONENTS
   ========================================================================== */

function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3200);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--rounded-full)',
            background: 'var(--color-brand-dark)',
            color: 'var(--color-brand-light)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
            border: '1px solid var(--color-brand-accent)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} color="var(--color-brand-accent)" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectDetailModal({ project, isOpen, onClose }) {
  const modalHeadingId = useId();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="nova-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalHeadingId}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25 }}
        className="nova-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid rgba(22, 22, 22, 0.08)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="nova-project-category">{project.category}</span>
              <span className={`nova-status-tag ${project.status === "Completed" ? "completed" : "in-progress"}`}>
                {project.status === "Completed" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                <span>{project.status}</span>
              </span>
            </div>
            <h2 id={modalHeadingId} style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-on-surface)' }}>
              {project.title}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={13} />
              <span>Timeline: {project.period}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--rounded-full)',
              background: 'var(--color-surface-dim)',
              color: 'var(--color-on-surface)',
              border: '1px solid var(--color-outline-variant)'
            }}
            aria-label="Close modal dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-brand-accent)', marginBottom: '0.4rem' }}>
              Problem Statement
            </h4>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {project.problemStatement}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-brand-accent)', marginBottom: '0.4rem' }}>
              Methodology & Technical Approach
            </h4>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {project.approach}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-brand-accent)', marginBottom: '0.5rem' }}>
              Verified Implementation Points
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.implementationDetails.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-on-surface)' }}>
                  <span style={{ color: 'var(--color-brand-accent)', fontWeight: 700 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.featuresBreakdown && (
            <div>
              <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-brand-accent)', marginBottom: '0.5rem' }}>
                Architecture & Module Status
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {project.featuresBreakdown.map((f, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--rounded-md)',
                      background: 'var(--color-surface-dim)',
                      border: '1px solid var(--color-outline-variant)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{f.name}</span>
                    <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: f.status === "In Development" ? "var(--color-brand-accent)" : "var(--color-on-surface-variant)" }}>
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--color-brand-accent)', marginBottom: '0.5rem' }}>
              Technologies & Frameworks
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--rounded-full)',
                    background: 'var(--color-surface-dim)',
                    border: '1px solid var(--color-outline-variant)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-on-surface)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(22, 22, 22, 0.08)', paddingTop: '1.5rem', marginTop: '2rem' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)' }}>
            Siddharth P — AI & Data Science Engineering Portfolio
          </span>
          <NovaButton onClick={onClose} variant="primary">
            Close Details
          </NovaButton>
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT: NOVA ASTRO EDITORIAL PORTFOLIO
   ========================================================================== */

export default function App() {
  const [theme, setTheme] = useState("nova");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loaderKey, setLoaderKey] = useState(0);

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync data-theme on html element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "nova" ? "nova-dark" : "nova");
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`);
    }).catch(() => {
      showToast(`Copy failed, please copy manually.`);
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      showToast("Please provide both an email and message.");
      return;
    }
    const subject = encodeURIComponent(`Collaboration Inquiry from ${contactForm.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Siddharth,\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    showToast("Launching your email client to dispatch the message!");
  };

  return (
    <LoadingOverlay
      key={loaderKey}
      duration={2000}
      brandTitle="SIDDHARTH P."
      brandSubtitle="AI & DATA SCIENCE SPECIALIST"
    >
      <div className="min-h-screen flex flex-col">
        {/* ====================================================================
            NOVA TOP ANNOUNCEMENT BANNER
            ==================================================================== */}
        <div className="nova-top-banner">
          <div className="nova-container">
            <div className="nova-banner-inner">
              <span className="nova-banner-text">
                AI & Data Science Student at Hindustan Institute of Technology & Science, Chennai • Expected Graduation: 2027
              </span>
              <div className="nova-banner-links">
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setLoaderKey(k => k + 1);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: 0
                  }}
                  title="Replay Loading Intro"
                >
                  <span style={{ color: 'var(--color-brand-accent)' }}>↺</span> Replay Loader
                </button>
                <a href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
                <a href="#contact">
                  Start a Conversation →
                </a>
              </div>
            </div>
          </div>
        </div>

      {/* ====================================================================
          NAVIGATION (NOVA SITE HEADER)
          ==================================================================== */}
      <header className="nova-site-header">
        <div className="nova-container">
          <div className="nova-nav-inner">
            {/* Logo */}
            <a href="#hero" className="nova-site-logo">
              <span>{PERSONAL_INFO.brand}</span>
              <span className="nova-logo-dot" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="nova-nav-links-center">
              <a href="#skills" className="ui-nav-bar-link">Technical Skills</a>
              <a href="#projects" className="ui-nav-bar-link">Featured Projects</a>
              <a href="#education" className="ui-nav-bar-link">Education</a>
              <a href="#certifications" className="ui-nav-bar-link">Certifications</a>
              <a href="#contact" className="ui-nav-bar-link">Contact</a>
            </nav>

            {/* Right Action Stack */}
            <div className="nova-nav-right-actions">
              <span className="nova-coord-badge">
                <MapPin size={13} color="var(--color-brand-accent)" />
                CHENNAI / EN
              </span>

              {/* Theme Switcher Toggle */}
              <button
                onClick={toggleTheme}
                className="nova-theme-toggle"
                aria-label="Toggle visual theme"
                title={`Switch to ${theme === "nova" ? "Dark" : "Light"} theme`}
              >
                {theme === "nova" ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <NovaButton href="#contact" variant="primary" hoverText="Let's talk">
                Get in Touch
              </NovaButton>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="nova-hamburger-btn"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-outline-variant)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Technical Skills</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Featured Projects</a>
                <a href="#education" onClick={() => setMobileMenuOpen(false)}>Education</a>
                <a href="#certifications" onClick={() => setMobileMenuOpen(false)}>Certifications</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </nav>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <NovaButton href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer" variant="outline" style={{ flex: 1 }}>
                  Resume
                </NovaButton>
                <NovaButton href="#contact" onClick={() => setMobileMenuOpen(false)} variant="primary" style={{ flex: 1 }}>
                  Let's talk
                </NovaButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* ====================================================================
            HERO SECTION
            ==================================================================== */}
        <section id="hero" className="nova-section" style={{ paddingTop: '2.5rem', paddingBottom: '0' }}>
          <div className="nova-container">
            <div className="nova-hero-card">
              <div className="nova-hero-grid">
                <div className="nova-hero-text-col">
                  <div>
                    <span className="nova-accent-label">
                      AI & DATA SCIENCE / MACHINE LEARNING PRACTITIONER
                    </span>

                    <h1 className="nova-hero-heading">
                      Building intelligent systems for the{" "}
                      <span className="text-brand-accent">next era of AI</span>
                    </h1>

                    <p className="nova-hero-lead">
                      {PERSONAL_INFO.heroSubtitle}
                    </p>

                    <div className="nova-hero-cta-row">
                      <NovaButton href="#projects" variant="primary" hoverText="See Projects">
                        Explore Featured Projects
                      </NovaButton>
                      <NovaButton
                        href={PERSONAL_INFO.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        hoverText="Download PDF"
                      >
                        View Resume
                      </NovaButton>
                    </div>
                  </div>

                  <div className="nova-focus-ticker">
                    <span>SPECIALIZATION:</span>
                    <span className="tag">BERT</span>
                    <span>•</span>
                    <span className="tag">SVM</span>
                    <span>•</span>
                    <span className="tag">LOGISTIC REGRESSION</span>
                    <span>•</span>
                    <span className="tag">PYTHON</span>
                    <span>•</span>
                    <span className="tag">NLP</span>
                  </div>
                </div>
              </div>

              {/* Signature Nova Dark Stat Bar (3 Metrics) */}
              <div className="nova-hero-stats">
                <div className="nova-stat-item">
                  <strong className="nova-stat-num">2027</strong>
                  <span className="nova-stat-label">Expected Graduation Year</span>
                </div>
                <div className="nova-stat-item">
                  <strong className="nova-stat-num">4</strong>
                  <span className="nova-stat-label">Industry Certifications</span>
                </div>
                <div className="nova-stat-item">
                  <strong className="nova-stat-num">3</strong>
                  <span className="nova-stat-label">Core AI & ML Projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            TECHNICAL SKILLS
            ==================================================================== */}
        <section id="skills" className="nova-section">
          <div className="nova-container">
            <div className="nova-projects-intro">
              <div>
                <span className="nova-accent-label">CORE COMPETENCIES & METHODS</span>
                <h2 className="nova-section-title">Technical Skills</h2>
              </div>
              <p className="nova-lead" style={{ margin: 0 }}>
                End-to-end technical capabilities, from algorithmic exploration and model training to responsive web deployment.
              </p>
            </div>

            <div className="nova-services-grid">
              {SERVICES_CAPABILITIES.map((service) => {
                const Icon = service.icon;
                return (
                  <GlowCard
                    key={service.number}
                    customSize={true}
                    glowColor="orange"
                    className="nova-service-card"
                  >
                    <div>
                      <div className="nova-service-top-row">
                        <div className="nova-service-icon-box">
                          <Icon size={22} />
                        </div>
                        {/* Nova Dual Slide Arrow */}
                        <div className="nova-service-arrow">
                          <div className="nova-arrow-inner">
                            <span className="nova-arrow-1">↗</span>
                            <span className="nova-arrow-2">↗</span>
                          </div>
                        </div>
                      </div>

                      <span className="nova-service-number">{service.number}</span>
                      <h3 className="nova-service-title">{service.title}</h3>
                      <p className="nova-service-desc">{service.desc}</p>
                    </div>

                    <div className="nova-tech-pills-row">
                      {service.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--rounded-full)',
                            background: 'var(--color-surface-dim)',
                            fontSize: '0.725rem',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            FEATURED PROJECTS
            ==================================================================== */}
        <section id="projects" className="nova-section" style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(22, 22, 22, 0.06)', borderBottom: '1px solid rgba(22, 22, 22, 0.06)' }}>
          <div className="nova-container">
            <div className="nova-projects-intro">
              <div>
                <span className="nova-accent-label">PORTFOLIO // SELECTED WORK</span>
                <h2 className="nova-section-title">Featured Projects</h2>
              </div>
              <p className="nova-lead" style={{ margin: 0 }}>
                Practical AI systems combining rigorous model exploration, real-time inference, and responsive user interfaces.
              </p>
            </div>

            <div className="nova-projects-grid">
              {PROJECTS.map((project) => (
                <GlowCard
                  key={project.id}
                  customSize={true}
                  glowColor="blue"
                  className="nova-project-card"
                  onClick={() => setActiveProjectModal(project)}
                >
                  {/* Visual Stage */}
                  <div className="nova-project-visual-stage">
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem auto', borderRadius: 'var(--rounded-full)', background: 'rgba(185, 139, 110, 0.2)', border: '1px solid var(--color-brand-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-accent)' }}>
                        <Brain size={28} />
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {project.category}
                      </div>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="nova-project-content-block">
                    <div>
                      <div className="nova-project-meta-bar">
                        <span className="nova-project-category">{project.category}</span>
                        <span className={`nova-status-tag ${project.status === "Completed" ? "completed" : "in-progress"}`}>
                          {project.status === "Completed" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          <span>{project.status}</span>
                        </span>
                      </div>

                      <h3 className="nova-project-heading">{project.title}</h3>
                      <p className="nova-project-desc">{project.summary}</p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                        {project.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--rounded-full)',
                              background: 'var(--color-surface-container)',
                              fontSize: '0.725rem',
                              fontFamily: 'var(--font-mono)'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="nova-project-footer">
                      <span className="nova-project-cta-link">
                        <span>Explore Architecture</span>
                        <ArrowUpRight size={16} />
                      </span>

                      {/* Signature Nova Floating Arrow */}
                      <div className="nova-service-arrow">
                        <div className="nova-arrow-inner">
                          <span className="nova-arrow-1">↗</span>
                          <span className="nova-arrow-2">↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            EDUCATION
            ==================================================================== */}
        <section id="education" className="nova-section">
          <div className="nova-container">
            <div className="nova-projects-intro">
              <div>
                <span className="nova-accent-label">ACADEMIC BACKGROUND</span>
                <h2 className="nova-section-title">Education</h2>
              </div>
              <p className="nova-lead" style={{ margin: 0 }}>
                Formal academic training in computer science, machine learning architectures, and data engineering.
              </p>
            </div>

            <GlowCard customSize={true} glowColor="purple" className="nova-education-card" style={{ marginTop: '2.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--rounded-md)', background: 'var(--color-surface-container)', color: 'var(--color-brand-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-brand-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                      UNDERGRADUATE DEGREE
                    </span>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.25, color: 'var(--color-on-surface)' }}>
                      Hindustan Institute of Technology and Science, Chennai
                    </h3>
                  </div>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-accent)', marginBottom: '1rem' }}>
                  B.Tech – Computer Science Engineering (Artificial Intelligence & Data Science)
                </div>

                <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  Comprehensive coursework covering mathematical foundations of machine learning, neural networks, contextual transformers, data structures, and intelligent web systems.
                </p>

                <div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                    CORE COURSEWORK & DOMAINS:
                  </span>
                  <div className="nova-education-coursework">
                    {[
                      "Machine Learning",
                      "Artificial Intelligence",
                      "Natural Language Processing",
                      "Data Science with Python",
                      "BERT & Transformer Representations",
                      "Data Structures & Algorithms",
                      "Database Management",
                      "Statistical Inference"
                    ].map((c) => (
                      <span key={c} className="nova-education-badge">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--color-surface-dim)', borderRadius: 'var(--rounded-xl)', padding: '2rem', border: '1px solid rgba(22, 22, 22, 0.06)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '0.25rem' }}>STUDY DURATION</span>
                  <strong style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>Jul 2023 – Present</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '0.25rem' }}>EXPECTED GRADUATION</span>
                  <strong style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', color: 'var(--color-brand-accent)' }}>Class of 2027</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '0.25rem' }}>CAMPUS LOCATION</span>
                  <strong style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>Chennai, Tamil Nadu, India</strong>
                </div>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(22, 22, 22, 0.08)' }}>
                  <NovaButton href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer" variant="outline" hoverText="Open PDF" style={{ width: '100%', justifyContent: 'center' }}>
                    View Academic Record
                  </NovaButton>
                </div>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* ====================================================================
            CERTIFICATIONS
            ==================================================================== */}
        <section id="certifications" className="nova-section" style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(22, 22, 22, 0.06)', borderBottom: '1px solid rgba(22, 22, 22, 0.06)' }}>
          <div className="nova-container">
            <div className="nova-projects-intro">
              <div>
                <span className="nova-accent-label">PROFESSIONAL CREDENTIALS</span>
                <h2 className="nova-section-title">Certifications</h2>
              </div>
              <p className="nova-lead" style={{ margin: 0 }}>
                Industry-recognized credentials from globally established technology leaders in AI, Cloud, and Professional Excellence.
              </p>
            </div>

            <div className="nova-certs-grid">
              {CERTIFICATIONS.map((cert) => (
                <GlowCard key={cert.title} customSize={true} glowColor="green" className="nova-cert-tile">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--rounded-md)', background: 'var(--color-surface-container)', color: 'var(--color-brand-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={22} />
                      </div>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--rounded-full)', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        CREDENTIAL
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.25rem' }}>{cert.title}</h3>
                    <div style={{ fontSize: '0.825rem', fontFamily: 'var(--font-mono)', color: 'var(--color-brand-accent)', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {cert.issuer}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                      {cert.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(22, 22, 22, 0.08)', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)' }}>
                    {cert.category}
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CONTACT ("LET'S CONNECT & COLLABORATE")
            ==================================================================== */}
        <section id="contact" className="nova-section">
          <div className="nova-container">
            <div className="nova-contact-grid">
              {/* Left Column: Direct Coordinates */}
              <div>
                <span className="nova-accent-label">GET IN TOUCH</span>
                <h2 className="nova-section-title" style={{ fontSize: '2.5rem' }}>
                  Let's Connect & Collaborate
                </h2>
                <p className="nova-lead" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
                  Whether you're looking for an ML practitioner, research collaborator, or student engineer for your team, I'd love to connect.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Email */}
                  <div style={{ background: 'var(--color-surface)', padding: '1.25rem 1.5rem', borderRadius: 'var(--rounded-lg)', border: '1px solid rgba(22, 22, 22, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--rounded-md)', background: 'var(--color-surface-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-accent)' }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', display: 'block' }}>EMAIL</span>
                        <a href={`mailto:${PERSONAL_INFO.email}`} style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(PERSONAL_INFO.email, "Email")}
                      style={{ padding: '0.5rem', color: 'var(--color-on-surface-variant)' }}
                      title="Copy email address"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <div style={{ background: 'var(--color-surface)', padding: '1.25rem 1.5rem', borderRadius: 'var(--rounded-lg)', border: '1px solid rgba(22, 22, 22, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--rounded-md)', background: 'var(--color-surface-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-accent)' }}>
                        <LinkedInIcon size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', display: 'block' }}>LINKEDIN</span>
                        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          linkedin.com/in/siddharth-premnath
                        </a>
                      </div>
                    </div>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem', color: 'var(--color-on-surface-variant)' }}>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>

                  {/* Phone */}
                  <div style={{ background: 'var(--color-surface)', padding: '1.25rem 1.5rem', borderRadius: 'var(--rounded-lg)', border: '1px solid rgba(22, 22, 22, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--rounded-md)', background: 'var(--color-surface-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-accent)' }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)', display: 'block' }}>TELEPHONE</span>
                        <a href={`tel:${PERSONAL_INFO.phone}`} style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          {PERSONAL_INFO.phoneDisplay}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(PERSONAL_INFO.phone, "Phone number")}
                      style={{ padding: '0.5rem', color: 'var(--color-on-surface-variant)' }}
                      title="Copy phone"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Contact Form */}
              <div className="nova-contact-form-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(22, 22, 22, 0.08)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Start a project</h3>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-on-surface-variant)' }}>Direct mail dispatch</span>
                </div>

                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="nova-input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="nova-input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      Project / Collaboration Note *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell me about your project, team opportunity, or inquiry..."
                      className="nova-input-field"
                      style={{ resize: 'none' }}
                    />
                  </div>

                  {formSubmitted && (
                    <div style={{ padding: '0.85rem', borderRadius: 'var(--rounded-md)', background: 'rgba(16, 185, 129, 0.15)', color: '#047857', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} />
                      <span>Email draft prepared in your email client. Thank you for reaching out!</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <span style={{ fontSize: '0.725rem', color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                      * Direct link dispatch via mailto protocol.
                    </span>
                    <NovaButton type="submit" variant="primary" hoverText="Send Message">
                      Start a project
                    </NovaButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER
          ==================================================================== */}
      <footer className="nova-footer">
        <div className="nova-container">
          <div className="nova-footer-top">
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.18em', color: '#ffffff', marginBottom: '0.35rem' }}>
                SIDDHARTH P.
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem' }}>
                AI & Data Science engineering • Turning ideas into intelligent systems.
              </p>
            </div>

            <div className="nova-footer-links">
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#education">Education</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>
              <a href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer">Resume</a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#ffffff', fontWeight: 700 }}
                aria-label="Back to top"
              >
                <ArrowUp size={14} />
                <span>Top</span>
              </button>
            </div>
          </div>

          <div className="nova-footer-bottom">
            <div>
              © {CURRENT_YEAR} Siddharth P. All rights reserved.
            </div>
            <div>
              Designed with the authentic Nova aesthetic • AI & Data Science Portfolio
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        isOpen={Boolean(activeProjectModal)}
        onClose={() => setActiveProjectModal(null)}
      />

      {/* Interactive Toast */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </div>
  </LoadingOverlay>
  );
}
