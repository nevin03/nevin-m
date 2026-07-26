'use client';

import React, { useState } from 'react';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolio';

export const ProjectsShowcase: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '2rem',
          }}
        >
          02 // SELECTED PROJECTS
        </div>

        {/* Minimal Projects List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                borderTop: '1px solid var(--border-light)',
                padding: '2rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'inline', marginRight: '0.75rem' }}>
                    {project.title}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
                    [{project.category}]
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
                  {project.year}
                </div>
              </div>

              <p style={{ color: 'var(--fg-secondary)', fontSize: '0.95rem', maxWidth: '800px', lineHeight: 1.6 }}>
                {project.description}
              </p>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--fg-primary)',
                  fontWeight: 600,
                }}
              >
                ⚡ {project.metrics}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="link-ultra"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Architecture Spec
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ultra"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>Code</span>
                    <GithubIcon size={13} />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ultra"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
          <div style={{ borderBottom: '1px solid var(--border-light)' }} />
        </div>
      </div>

      {/* Architecture Spec Modal */}
      {activeModalProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setActiveModalProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--fg-primary)',
              maxWidth: '600px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--fg-primary)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '0.5rem' }}>
              // TECHNICAL SPECIFICATION
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {activeModalProject.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
              {activeModalProject.description}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Key Technical Points:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeModalProject.architecturePoints.map((pt, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)', display: 'flex', gap: '0.5rem' }}>
                    <Check size={15} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => setActiveModalProject(null)} className="btn-minimal">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
