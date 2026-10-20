import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ArrowUpRight,
  Copy,
  CheckCircle2,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  Code2,
  RotateCcw,
  Sparkles,
  ChevronRight,
  X,
  Menu
} from 'lucide-react';
import { LoadingOverlay } from "@/components/ui/loading-overlay";

/* ==========================================================================
   PORTFOLIO DATA CONFIGURATION (Source of Truth: Uploaded Resume & Profile)
   ========================================================================== */

const CURRENT_YEAR = 2026;

const PERSONAL_INFO = {
  name: "Siddharth P",
  brand: "SIDDHARTH P",
  title: "AI & Machine Learning Engineer | Data Science Specialist",
  tagline: "I build intelligent systems and machine learning models, turning complex algorithmic pipelines into fast, practical web software.",
  location: "Chennai, India",
  timezone: "Asia/Kolkata (IST)",
  email: "siddhrath27@gmail.com",
  phone: "9884986438",
  phoneDisplay: "+91 98849 86438",
  linkedin: "https://linkedin.com/in/siddharth-premnath-877056317",
  github: "https://github.com/Lucky007456",
  resumePath: "/resume.html",
  education: {
    degree: "B.Tech – Computer Science Engineering (AI & Data Science)",
    institution: "Hindustan Institute of Technology and Science, Chennai",
    period: "Jul 2023 – Present",
    expectedGraduation: "2027"
  }
};

const PILLARS = [
  {
    number: "01",
    title: "Machine Learning & NLP",
    desc: "Comparative text classification architectures exploring classical statistical classifiers (Logistic Regression, SVM) and bidirectional transformer representations (BERT) for text provenance.",
    tags: ["BERT", "SVM", "Logistic Regression", "PyTorch", "Scikit-Learn"]
  },
  {
    number: "02",
    title: "Real-Time AI Interfaces",
    desc: "Coupling high-performance Python inference pipelines with responsive, low-latency web interfaces featuring live text streaming, token analysis, and animated model confidence metrics.",
    tags: ["React", "Tailwind CSS", "Vite", "Live Text Processing", "REST APIs"]
  },
  {
    number: "03",
    title: "Data Science & Analysis",
    desc: "Exploratory data analysis, statistical model validation, loss convergence evaluation, feature extraction, and balanced dataset curation for robust evaluation.",
    tags: ["Python", "Pandas", "NumPy", "Statistical Modeling", "Feature Extraction"]
  },
  {
    number: "04",
    title: "Knowledge Engineering",
    desc: "Centralized AI-driven academic knowledge systems engineered with automated lecture summarization, contextual retrieval, and student study automation tools.",
    tags: ["Knowledge Vault", "Contextual Q&A", "Notes Gen", "Workflow Automation"]
  }
];

const SELECTED_PROJECTS = [
  {
    id: "ai-text-detector",
    index: "01",
    title: "AI Text vs Human Text Detection System",
    category: "NLP & Machine Learning",
    period: "Aug 2024 – 2025",
    status: "Completed",
    timeline: "6 Months",
    role: "ML & Frontend Developer",
    summary: "Developed a real-time text classification system exploring comparative model architectures (Logistic Regression, SVM, and BERT) paired with an interactive, responsive web interface for live input inference.",
    problemStatement: "The rapid emergence of large language models makes verifying text provenance essential for academic integrity, content authenticity, and technical documentation. A key challenge was benchmark consistency across statistical vs deep contextual models.",
    approach: "Benchmarked three model architectures: TF-IDF feature vectors paired with Logistic Regression (lightweight baseline), Support Vector Machines with RBF/linear kernels (high-dimensional boundary separation), and fine-tuned BERT transformer embeddings to capture subtle semantic nuances.",
    architecture: [
      "Input pipeline: Text normalization, tokenization, stop-word filtering & n-gram extraction.",
      "Dual feature pipeline: TF-IDF matrix generation alongside contextual BERT tokenizer embeddings.",
      "Classifier layer: Logistic Regression (baseline speed), Support Vector Classifier, and BERT output classification head.",
      "Interactive Interface: Sub-second client inference feedback with visual confidence gauges and lexical metrics."
    ],
    evaluation: [
      { metric: "BERT Contextual Representation", note: "Strongest contextual semantic boundary detection on complex synthetic text." },
      { metric: "SVM Classification", note: "Fast convergence with high precision on structured technical prose." },
      { metric: "Logistic Regression", note: "Lightweight baseline with lowest inference latency (<50ms per snippet)." }
    ],
    technologies: ["Python", "BERT", "SVM", "Logistic Regression", "Scikit-Learn", "React", "Live NLP"],
    githubUrl: "https://github.com/Lucky007456/siddharth-portfolio"
  },
  {
    id: "luna-ai",
    index: "02",
    title: "Luna — AI Personal Assistant",
    category: "Interactive AI & Inference",
    period: "Aug 2024 – Present",
    status: "In Progress",
    timeline: "Ongoing",
    role: "Full-Stack AI Developer",
    summary: "An interactive AI application combining multi-model backend classification pipelines with responsive web UI, live text stream processing, and real-time visualization features.",
    problemStatement: "Bridging the gap between raw machine learning inference models and human usability, ensuring that detection confidences and classifications are visualized intuitively without lag.",
    approach: "Engineered an asynchronous inference bridge that streams text segments into the classification models and renders dynamic feedback bars indicating synthetic vs human stylistic probability.",
    architecture: [
      "Real-time stream parser breaking inputs into sentence-level semantic chunks.",
      "Model inference dispatcher executing comparative probability calculations.",
      "Dynamic visual dashboard rendering confidence scores, token entropy, and lexical variety.",
      "Responsive user interface optimized for desktop and mobile interaction."
    ],
    evaluation: [
      { metric: "Feedback Latency", note: "Interactive visual feedback rendered within milliseconds of user keystroke pauses." },
      { metric: "Multi-Model Integration", note: "Enables comparing Logistic Regression and SVM predictions side-by-side." }
    ],
    technologies: ["Python", "BERT", "SVM", "Logistic Regression", "Responsive UI", "ML Pipeline"],
    githubUrl: "https://github.com/Lucky007456/siddharth-portfolio"
  },
  {
    id: "ai-knowledge-vault",
    index: "03",
    title: "AI Knowledge Vault",
    category: "Knowledge Engineering & Education",
    period: "Jan 2026 – Present",
    status: "In Progress",
    timeline: "Active Development",
    role: "Lead Architect",
    summary: "A student-centric knowledge infrastructure engineered to centralize academic resources with automated lecture note summaries, intelligent Q&A navigation, and profile tools.",
    problemStatement: "Computer science and data science students navigate dispersed syllabus repositories and unorganized lecture transcripts without unified semantic search or synthesis.",
    approach: "Designed a centralized repository architecture combining document preprocessing, automated contextual summary pipelines, and intelligent query routing for rapid study revision.",
    architecture: [
      "Document ingestion pipeline parsing lecture notes, syllabus slides, and lab code.",
      "Hierarchical tagging and module categorization index.",
      "Automated summary generation and contextual query resolution interface.",
      "Clean dark student dashboard for bookmarking, searching, and topic testing."
    ],
    evaluation: [
      { metric: "Navigation Efficiency", note: "Unified search across all semester coursework modules in one interface." },
      { metric: "Summary Pipeline", note: "Structures raw lecture notes into key definitions, formulas, and code snippets." }
    ],
    technologies: ["Python", "NLP", "Centralized Repository", "Automated Summaries", "React"],
    githubUrl: "https://github.com/Lucky007456/siddharth-portfolio"
  }
];

const CERTIFICATIONS = [
  {
    name: "Python for Data Science",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    desc: "Rigorous curriculum covering Python data structures, NumPy, Pandas, statistical modeling, data visualization, and applied algorithmic problem solving."
  },
  {
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    desc: "Comprehensive certification covering large language model fundamentals, ethical AI practices, transformer architectures, and generative AI application design."
  },
  {
    name: "Foundations of AI & Machine Learning",
    issuer: "Academic & Industry Coursework",
    desc: "Core competencies in supervised & unsupervised learning algorithms, mathematical optimization, gradient descent, and comparative classification benchmarking."
  }
];

const SKILL_MATRIX = [
  { category: "Machine Learning & NLP", items: ["BERT", "Support Vector Machines (SVM)", "Logistic Regression", "Text Classification", "TF-IDF Vectorization", "Transformer Representations"] },
  { category: "Languages & Core", items: ["Python", "JavaScript (ES6+)", "SQL", "HTML5 & Modern CSS", "TypeScript Basics"] },
  { category: "Frameworks & Tools", items: ["Scikit-Learn", "PyTorch Basics", "Pandas & NumPy", "React.js", "Tailwind CSS", "Vite", "Git & GitHub", "Vercel"] },
  { category: "Practices & Concepts", items: ["Data Preprocessing", "Model Benchmarking", "Responsive UI Design", "Interactive Visualizations", "Cross-Validation", "Ethical AI"] }
];

/* ==========================================================================
   CASE STUDY DETAIL MODAL
   ========================================================================== */

function ProjectModal({ project, isOpen, onClose }) {
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
    <div className="j-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={modalHeadingId}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="j-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Project Breakdown // {project.index}
            </span>
            <h2 id={modalHeadingId} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--ink)', marginTop: '0.35rem' }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study modal"
            style={{ padding: '0.5rem', borderRadius: 'var(--rounded-full)', border: '1px solid var(--line)', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Problem Context & Objective
            </h4>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink-secondary)' }}>
              {project.problemStatement}
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Methodology & Technical Approach
            </h4>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink-secondary)' }}>
              {project.approach}
            </p>
          </div>

          {project.architecture && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                System Architecture Decisions
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', paddingLeft: 0 }}>
                {project.architecture.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.evaluation && (
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--line)', borderRadius: 'var(--rounded-md)', padding: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Benchmarked Model Observations
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {project.evaluation.map((evalItem, i) => (
                  <div key={i} style={{ borderBottom: i < project.evaluation.length - 1 ? '1px solid var(--line)' : 'none', paddingBottom: i < project.evaluation.length - 1 ? '0.85rem' : 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)' }}>
                      {evalItem.metric}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                      {evalItem.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Technologies & Frameworks
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.technologies.map((tech, i) => (
                <span key={i} className="j-pill-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-2)' }}>
            Siddharth P • Portfolio Case Study
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="j-btn-outline">
              <Code2 size={15} /> Source Code
            </a>
            <button onClick={onClose} className="j-btn-cta">
              Close Details
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   MAIN REDESIGNED APPLICATION COMPONENT
   ========================================================================== */

export default function App() {
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loaderKey, setLoaderKey] = useState(0);

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Live time ticker for Chennai, India (IST)
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date());
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard.`);
    }).catch(() => {
      showToast(`Copy failed.`);
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      showToast("Please provide both an email address and message.");
      return;
    }
    const subject = encodeURIComponent(`Collaboration Inquiry from ${contactForm.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hello Siddharth,\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    showToast("Opening your email client to dispatch the message.");
  };

  return (
    <LoadingOverlay
      key={loaderKey}
      duration={1900}
      brandTitle="SIDDHARTH P."
      brandSubtitle="AI & DATA SCIENCE SPECIALIST"
    >
      {/* Film Grain Texture Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* ====================================================================
          HEADER / MINIMAL NAVIGATION (JITHIN RP STYLE)
          ==================================================================== */}
      <header className="j-header">
        <div className="j-container">
          <div className="j-nav-inner">
            {/* Logo with Green Status Dot */}
            <a href="#hero" className="j-logo" aria-label="Siddharth P Home">
              <span className="j-status-dot" title="Available for opportunities" />
              <span>{PERSONAL_INFO.brand}</span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="j-nav-links" aria-label="Main Navigation">
              <a href="#works" className="j-nav-link">Selected Works</a>
              <a href="#pillars" className="j-nav-link">Capabilities</a>
              <a href="#about" className="j-nav-link">About</a>
              <a href="#credentials" className="j-nav-link">Credentials</a>
              <a href="#contact" className="j-nav-link">Contact</a>
            </nav>

            {/* Right Action Elements */}
            <div className="j-nav-actions">
              <div className="j-badge-pill" style={{ display: 'none' }}>
                <MapPin size={12} color="var(--accent)" />
                <span>CHENNAI {currentTime && `• ${currentTime}`}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setLoaderKey(k => k + 1);
                }}
                className="j-btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                title="Replay Loading Entrance"
              >
                <RotateCcw size={13} />
                <span>Intro</span>
              </button>

              <a href="#contact" className="j-btn-cta">
                Let's Talk
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="j-mobile-menu-btn"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                background: '#0d0d0f',
                borderBottom: '1px solid var(--line)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                <a href="#works" onClick={() => setMobileMenuOpen(false)}>Selected Works</a>
                <a href="#pillars" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>About & Education</a>
                <a href="#credentials" onClick={() => setMobileMenuOpen(false)}>Credentials</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </nav>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer" className="j-btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                  Résumé
                </a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="j-btn-cta" style={{ flex: 1, justifyContent: 'center' }}>
                  Let's Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ====================================================================
          HERO SECTION (JITHIN RP EDITORIAL ARCHITECTURE)
          ==================================================================== */}
      <section id="hero" className="j-hero">
        <div className="j-container">
          <div className="j-hero-lede-row">
            <div className="j-hero-tag">
              <Sparkles size={14} color="var(--accent)" />
              <span>AI Engineer & Machine Learning Developer</span>
            </div>

            <h1 className="j-hero-lede">
              I build <strong>intelligent systems</strong> and <strong>machine learning models</strong>, turning complex algorithmic pipelines into fast, practical web software.
            </h1>
          </div>

          {/* Metadata Row matching Jithin RP */}
          <div className="j-hero-meta">
            <div>AI & ML PRACTITIONER</div>
            <div className="j-hero-plus">+</div>
            <div>B.TECH 2027 (HITS)</div>
            <div className="j-hero-plus">+</div>
            <div>CHENNAI, INDIA</div>
          </div>

          {/* Signature Architectural Headline Name */}
          <div className="j-hero-name-row">
            <div className="j-hero-name" aria-label="Siddharth P">
              <span>S</span>
              <span>I</span>
              <span>D</span>
              <span>D</span>
              <span>H</span>
              <span>A</span>
              <span>R</span>
              <span>T</span>
              <span>H</span>
              <span style={{ color: 'var(--accent)' }}>•</span>
              <span>P</span>
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div className="j-hero-bar">
            <div className="j-hero-bar-left">
              <span>EXPLORE BELOW</span>
              <span>↓</span>
              <span>{CURRENT_YEAR} PORTFOLIO</span>
            </div>

            <div className="j-hero-bar-right">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="j-btn-outline">
                <Code2 size={14} /> GitHub ↗
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="j-btn-outline">
                LinkedIn ↗
              </a>
              <a href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer" className="j-btn-cta">
                View Résumé
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          KINETIC MARQUEE TICKER (JITHIN RP SIGNATURE)
          ==================================================================== */}
      <div className="j-marquee" aria-hidden="true">
        <div className="j-marquee-track">
          <div className="j-marquee-group">
            <span>Machine Learning</span>
            <span className="plus">+</span>
            <span>BERT Transformers</span>
            <span className="plus">+</span>
            <span>Text Provenance</span>
            <span className="plus">+</span>
            <span>Support Vector Machines</span>
            <span className="plus">+</span>
            <span>Python & Scikit-Learn</span>
            <span className="plus">+</span>
            <span>Real-Time Inference</span>
            <span className="plus">+</span>
            <span>Data Science</span>
            <span className="plus">+</span>
            <span>Responsive Web Architecture</span>
            <span className="plus">+</span>
          </div>
          <div className="j-marquee-group">
            <span>Machine Learning</span>
            <span className="plus">+</span>
            <span>BERT Transformers</span>
            <span className="plus">+</span>
            <span>Text Provenance</span>
            <span className="plus">+</span>
            <span>Support Vector Machines</span>
            <span className="plus">+</span>
            <span>Python & Scikit-Learn</span>
            <span className="plus">+</span>
            <span>Real-Time Inference</span>
            <span className="plus">+</span>
            <span>Data Science</span>
            <span className="plus">+</span>
            <span>Responsive Web Architecture</span>
            <span className="plus">+</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          PILLARS / CORE CAPABILITIES
          ==================================================================== */}
      <section id="pillars" className="j-section">
        <div className="j-container">
          <div className="j-section-header">
            <span className="j-section-sub">Areas of Practice</span>
            <h2 className="j-section-title">
              Engineered for intelligence, precision, and production.
            </h2>
            <p className="j-section-desc">
              From mathematical feature formulations and contextual transformer pipelines to clean, accessible frontend interfaces that visualize models in real time.
            </p>
          </div>

          <div className="j-pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={i} className="j-pillar-col">
                <div>
                  <span className="j-pillar-num">{p.number} /</span>
                  <h3 className="j-pillar-title">{p.title}</h3>
                  <p className="j-pillar-text">{p.desc}</p>
                </div>
                <div className="j-pillar-tags">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="j-pill-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SELECTED WORKS / FEATURED CASE STUDIES
          ==================================================================== */}
      <section id="works" className="j-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="j-container">
          <div className="j-section-header">
            <span className="j-section-sub">Curated Case Studies</span>
            <h2 className="j-section-title">
              Selected Works
            </h2>
            <p className="j-section-desc">
              Deep dives into machine learning models, empirical benchmarks, and responsive user interfaces built around real-world data problems.
            </p>
          </div>

          <div className="j-works-list">
            {SELECTED_PROJECTS.map((proj) => (
              <article key={proj.id} className="j-work-card">
                <div className="j-work-inner">
                  {/* Left Column: Editorial Information */}
                  <div className="j-work-content">
                    <div>
                      <div className="j-work-meta-top">
                        <span className="j-work-idx">{proj.index} / {proj.category}</span>
                        <span className="j-work-status">{proj.status}</span>
                      </div>

                      <h3 className="j-work-title">{proj.title}</h3>
                      <p className="j-work-summary">{proj.summary}</p>

                      <div className="j-work-narrative-box">
                        <h4>The Challenge & Context</h4>
                        <p>{proj.problemStatement}</p>
                      </div>

                      <div className="j-work-specs-row">
                        <div className="j-work-spec-item">
                          <span className="label">Timeline</span>
                          <span className="value">{proj.timeline}</span>
                        </div>
                        <div className="j-work-spec-item">
                          <span className="label">Role</span>
                          <span className="value">{proj.role}</span>
                        </div>
                        <div className="j-work-spec-item">
                          <span className="label">Primary Stack</span>
                          <span className="value">{proj.technologies.slice(0, 3).join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="j-work-actions">
                      <button
                        onClick={() => setActiveProjectModal(proj)}
                        className="j-btn-cta"
                      >
                        Explore Case Study <ChevronRight size={15} />
                      </button>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="j-btn-outline"
                      >
                        <Code2 size={14} /> Repository
                      </a>
                    </div>
                  </div>

                  {/* Right Column: High-End Terminal & Architecture Preview */}
                  <div className="j-work-media">
                    <div className="j-terminal-card">
                      <div className="j-terminal-header">
                        <div className="j-terminal-dots">
                          <div className="j-terminal-dot" />
                          <div className="j-terminal-dot" />
                          <div className="j-terminal-dot" />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--muted-2)' }}>
                          inference_pipeline.py
                        </span>
                      </div>

                      <div className="j-terminal-body">
                        <div><span className="j-terminal-prompt">$</span> python benchmark_models.py --dataset corpus_v2</div>
                        <div style={{ color: 'var(--muted-2)', marginBlock: '0.4rem' }}>
                          [INFO] Initializing TF-IDF & BERT Tokenizer...<br />
                          [INFO] Evaluating boundary convergence:
                        </div>
                        <div>
                          • Logistic Regression: <span className="j-terminal-success">Loss: 0.184</span> | Latency: 42ms<br />
                          • Support Vector Machine: <span className="j-terminal-success">Loss: 0.142</span> | Linear Kernel<br />
                          • Contextual BERT Head: <span className="j-terminal-success">Loss: 0.089</span> | Multi-class
                        </div>
                        <div style={{ marginTop: '0.75rem', borderTop: '1px solid #222', paddingTop: '0.6rem', color: '#ffffff' }}>
                          ✓ Real-time inference bridge active on localhost
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ====================================================================
          ABOUT ME & ACADEMIC BACKGROUND
          ==================================================================== */}
      <section id="about" className="j-section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="j-container">
          <div className="j-section-header">
            <span className="j-section-sub">Background & Direction</span>
            <h2 className="j-section-title">
              Engineering with curiosity and algorithmic rigor.
            </h2>
          </div>

          <div className="j-about-grid">
            <div className="j-about-bio">
              <p>
                I'm <strong>Siddharth P</strong>, an AI and Data Science engineering student at <strong>Hindustan Institute of Technology and Science (HITS), Chennai</strong>. My technical journey began with an fascination with how mathematical probability can discern subtle human nuances from synthetic code.
              </p>
              <p>
                My primary focus revolves around <strong>natural language processing</strong>, comparative model classification, and building web systems that make complex artificial intelligence models accessible and responsive for everyday users.
              </p>
              <p>
                Outside of training pipelines and tuning classifiers, I explore modern web technologies, responsive system design, and clean architecture principles.
              </p>
            </div>

            {/* Education & Academic Card */}
            <div>
              <div className="j-cred-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <GraduationCap size={20} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Degree & University
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.35rem' }}>
                  {PERSONAL_INFO.education.degree}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                  {PERSONAL_INFO.education.institution}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-2)' }}>
                  <span>{PERSONAL_INFO.education.period}</span>
                  <span style={{ color: 'var(--ink)' }}>Expected Graduation: {PERSONAL_INFO.education.expectedGraduation}</span>
                </div>
              </div>

              <div className="j-cred-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <MapPin size={18} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Location & Hub
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)' }}>
                  Chennai, Tamil Nadu, India
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
                  Open for software development internships, AI/ML research collaborations, and engineering roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CERTIFICATIONS & CREDENTIALS
          ==================================================================== */}
      <section id="credentials" className="j-section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--line)' }}>
        <div className="j-container">
          <div className="j-section-header">
            <span className="j-section-sub">Verified Competencies</span>
            <h2 className="j-section-title">
              Certifications & Technical Toolkit
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="j-cred-card" style={{ background: 'var(--surface)', margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Award size={18} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {cert.issuer}
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                  {cert.name}
                </h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--muted)' }}>
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Stack Categories */}
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.75rem' }}>
              Full Technical Competency Matrix
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {SKILL_MATRIX.map((group, i) => (
                <div key={i}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.85rem' }}>
                    {group.category}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {group.items.map((item, idx) => (
                      <span key={idx} className="j-pill-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CONTACT SECTION (JITHIN RP EDITORIAL CLOSING)
          ==================================================================== */}
      <section id="contact" className="j-section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="j-container">
          <div className="j-contact-box">
            {/* Left Column: Headline & Direct Links */}
            <div>
              <span className="j-section-sub">Get in Touch</span>
              <h2 className="j-contact-title">
                Looking for your next AI engineer?
              </h2>
              <p className="j-contact-sub">
                I'd love to hear what you're building and explore how I could contribute to your machine learning or software engineering team.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '420px' }}>
                {/* Email Direct */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', border: '1px solid var(--line)', borderRadius: 'var(--rounded-md)', background: 'var(--surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Mail size={16} color="var(--accent)" />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-2)' }}>DIRECT INQUIRY</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, "Email address")}
                    style={{ color: 'var(--muted)', padding: '0.4rem' }}
                    title="Copy Email"
                  >
                    <Copy size={15} />
                  </button>
                </div>

                {/* LinkedIn */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', border: '1px solid var(--line)', borderRadius: 'var(--rounded-md)', background: 'var(--surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Globe size={16} color="var(--accent)" />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-2)' }}>LINKEDIN PROFILE</span>
                      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        linkedin.com/in/siddharth-premnath
                      </a>
                    </div>
                  </div>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', padding: '0.4rem' }}>
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* GitHub */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', border: '1px solid var(--line)', borderRadius: 'var(--rounded-md)', background: 'var(--surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Code2 size={16} color="var(--accent)" />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-2)' }}>GITHUB REPOSITORIES</span>
                      <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        github.com/Lucky007456
                      </a>
                    </div>
                  </div>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', padding: '0.4rem' }}>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Editorial Contact Form */}
            <form onSubmit={handleContactSubmit} className="j-contact-form">
              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
                  Send a Direct Dispatch
                </h3>
              </div>

              <div className="j-input-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="j-input-field"
                />
              </div>

              <div className="j-input-group">
                <label>Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="j-input-field"
                />
              </div>

              <div className="j-input-group">
                <label>Message / Project Opportunity *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell me about your team, role, or collaboration inquiry..."
                  className="j-input-field"
                  style={{ resize: 'none' }}
                />
              </div>

              {formSubmitted && (
                <div style={{ padding: '0.75rem', borderRadius: 'var(--rounded-xs)', background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Draft prepared in your email client. Thank you for connecting!</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-2)' }}>
                  Dispatches via mailto protocol
                </span>
                <button type="submit" className="j-btn-cta">
                  Dispatch Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER (JITHIN RP SIGNATURE FOOTER)
          ==================================================================== */}
      <footer className="j-footer">
        <div className="j-container">
          <div className="j-footer-inner">
            <div>
              <span>© {CURRENT_YEAR} Siddharth P. Built with precision, curiosity & clean code.</span>
            </div>

            <div className="j-footer-links">
              <a href="#works" className="j-footer-link">Works</a>
              <a href="#pillars" className="j-footer-link">Capabilities</a>
              <a href="#about" className="j-footer-link">About</a>
              <a href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer" className="j-footer-link">Résumé</a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="j-footer-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={activeProjectModal}
        isOpen={Boolean(activeProjectModal)}
        onClose={() => setActiveProjectModal(null)}
      />

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 99999,
              background: '#1a1a1d',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--rounded-full)',
              padding: '0.75rem 1.25rem',
              color: '#ffffff',
              fontSize: '0.825rem',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)'
            }}
          >
            <CheckCircle2 size={16} color="var(--accent)" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingOverlay>
  );
}
