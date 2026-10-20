import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

/* ==========================================================================
   CASE STUDY DEDICATED PAGE
   An editorial case study layout inspired by Jithin RP's project deep dives.
   ========================================================================== */

export default function CaseStudyPage({ project, allProjects, onBack, onSelectProject }) {
  // Scroll to top on project switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Find next project
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="j-case-study-view" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
      {/* Sticky Case Study Top Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(8, 8, 10, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--line)',
          padding: '1rem clamp(1rem, 4vw, 3rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <button
          onClick={onBack}
          className="j-btn-outline"
          style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', display: 'none', md: { display: 'inline' } }}>
            Project {project.index} of 0{allProjects.length}
          </span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="j-btn-outline"
              style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem' }}
            >
              <Code2 size={14} />
              <span>Source</span>
            </a>
          )}
        </div>
      </header>

      {/* Main Case Study Content Container */}
      <main className="j-container" style={{ paddingBlock: 'clamp(3rem, 6vw, 6rem)' }}>
        {/* Project Header */}
        <section style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {project.category}
            </span>
            <span style={{ color: 'var(--muted-2)' }}>•</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: 'var(--muted)' }}>
              Case Study {project.index}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.75rem',
              color: '#f8fafc'
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              maxWidth: '840px',
              fontWeight: 400,
              marginBottom: '3rem'
            }}
          >
            {project.summary}
          </p>

          {/* Project Metadata Matrix (Jithin-style Data Grid) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              background: '#0d0d10',
              border: '1px solid var(--line)',
              borderRadius: 'var(--rounded-lg)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)'
            }}
          >
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Role
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                {project.role}
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Timeline
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                {project.timeline} ({project.period})
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Status
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#34d399', fontWeight: 600 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }} />
                {project.status}
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Core Technologies
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--ink)' }}>
                {project.technologies.slice(0, 4).join(', ')}
              </span>
            </div>
          </div>
        </section>

        {/* Section 01: Context & Problem Statement */}
        <section style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 320px) 1fr', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                01 // Analysis
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
                Context & Challenge
              </h2>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1.25rem' }}>
                {project.problemStatement}
              </p>
              <p>
                In production environments, deploying heavy deep-learning transformers often introduces excessive latency and infrastructure overhead for basic validation, whereas naive n-gram lookups fail on subtle synthetic paraphrasing. The objective was to systematically evaluate where statistical classifiers excel and where deep contextual models become indispensable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Architecture Pipeline (Visual Schematic) */}
        <section style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              02 // System Design
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
              Technical Architecture & Pipeline
            </h2>
          </div>

          {/* Interactive Pipeline Diagram */}
          <div
            style={{
              background: '#09090c',
              border: '1px solid var(--line)',
              borderRadius: 'var(--rounded-lg)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              marginBottom: '2.5rem'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', position: 'relative' }}>
              {project.architecture.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#121217',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--rounded-md)',
                    padding: '1.5rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>
                      PHASE 0{idx + 1}
                    </span>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.6 }}>
                      {step}
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={13} color="#34d399" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted)' }}>Verified Pipeline</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 03: Approach & Engineering Decisions */}
        <section style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 320px) 1fr', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                03 // Methodology
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
                Engineering Strategy
              </h2>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                {project.approach}
              </p>

              {/* Technologies Grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                {project.technologies.map(t => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      background: '#141418',
                      border: '1px solid var(--line)',
                      color: 'var(--ink)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--rounded-full)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Benchmark Evaluation & Observations */}
        <section style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              04 // Evaluation
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
              Comparative Benchmark Findings
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {project.evaluation.map((ev, idx) => (
              <div
                key={idx}
                style={{
                  background: '#0d0d10',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--rounded-lg)',
                  padding: '1.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <BarChart3 size={18} color="var(--accent)" />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                    {ev.metric}
                  </h3>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: 1.65 }}>
                  {ev.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: Practical Limitations & Learnings */}
        <section style={{ borderTop: '1px solid var(--line)', paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 320px) 1fr', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                05 // Reflection
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
                Key Takeaways & Boundaries
              </h2>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1.25rem' }}>
                As generative language models continue to evolve with fine-tuned human RLHF and stylistic randomness, statistical heuristics must be continuously calibrated. The project demonstrated that no single model is universally superior: combining high-throughput linear classifiers for initial screening with deep contextual transformers for ambiguous boundaries yields the most reliable operational balance.
              </p>
            </div>
          </div>
        </section>

        {/* Next Project Teaser Card (Jithin Style) */}
        <section
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            marginTop: '2rem'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-2)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Next Selected Work
          </span>

          <div
            onClick={() => onSelectProject(nextProject)}
            style={{
              background: '#0d0d10',
              border: '1px solid var(--line)',
              borderRadius: 'var(--rounded-lg)',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
              transition: 'border-color var(--transition-base), transform var(--transition-base)'
            }}
            className="j-next-project-card"
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Project {nextProject.index} // {nextProject.category}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
                {nextProject.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
                {nextProject.summary}
              </p>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--accent)'
              }}
            >
              <span>Explore Case Study</span>
              <ArrowRight size={20} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button
              onClick={onBack}
              className="j-btn-outline"
              style={{ fontSize: '0.875rem', padding: '0.65rem 1.75rem' }}
            >
              <ArrowLeft size={16} />
              <span>Return to Portfolio</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
