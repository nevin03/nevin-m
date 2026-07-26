'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      style={{
        paddingTop: '160px',
        paddingBottom: '80px',
      }}
    >
      <div className="container">
        {/* Status Line */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}
        >
          // FULL STACK DEVELOPER & PRODUCT ENGINEER
        </div>

        {/* Signature Name Headline */}
        <h1
          className="font-signature"
          style={{
            fontSize: 'clamp(4rem, 9vw, 6.5rem)',
            lineHeight: 0.95,
            marginBottom: '1.25rem',
          }}
        >
          {personal.name}
        </h1>

        {/* Key Stats inline summary */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'var(--fg-secondary)',
            marginBottom: '1.75rem',
            display: 'flex',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <span>
            <strong>1.6+ Years</strong> Industrial Exp
          </span>
          <span>•</span>
          <span>Frontend Engineering, Product Strategy & Backend Development</span>
        </div>

        {/* Concise Description */}
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--fg-muted)',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '3rem',
          }}
        >
          {personal.bio}
        </p>

        {/* Minimal Actions & Status */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="#contact" className="btn-minimal">
            Get in Touch
          </a>

          <button onClick={onOpenTerminal} className="btn-minimal-outline">
            <Terminal size={15} />
            <span>CLI Mode</span>
          </button>

          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.65rem 1rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
            }}
          >
            <span className="green-pulse-dot" />
            <span style={{ color: 'var(--fg-secondary)', fontWeight: 500 }}>
              Status: Creating something beautiful
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
