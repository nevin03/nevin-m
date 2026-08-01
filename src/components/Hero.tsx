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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          
          {/* Left Column: Hero Content */}
          <div style={{ flex: '1 1 500px', maxWidth: '680px' }}>
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
             // Builder
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
              <span>Product Developer | Frontend Engineer</span>
            </div>

            {/* Concise Description */}
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--fg-muted)',
                maxWidth: '680px',
                lineHeight: 1.6,
                marginBottom: '3rem',
                whiteSpace: 'pre-line',
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

          {/* Right Column: Minimal Visual Element */}
          <div
            className="hero-visual-right"
            style={{
              flex: '1 1 300px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              opacity: 0.5,
              pointerEvents: 'none',
              padding: '2rem 0'
            }}
          >
            <div style={{ position: 'relative', width: '280px', height: '280px' }}>
              <svg width="100%" height="100%" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Thin outer circles */}
                <circle cx="140" cy="140" r="130" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="140" cy="140" r="90" stroke="var(--border-light)" strokeWidth="1" />
                
                {/* Crosshairs */}
                <line x1="140" y1="0" x2="140" y2="280" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="0" y1="140" x2="280" y2="140" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="2 4" />
                
                {/* Inner rotating geometric shapes */}
                <g className="spin-slow" style={{ transformOrigin: '140px 140px' }}>
                  <rect x="90" y="90" width="100" height="100" stroke="var(--fg-muted)" strokeWidth="1" fill="none" />
                  <circle cx="140" cy="140" r="50" stroke="var(--fg-muted)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                  {/* Small decorative nodes */}
                  <circle cx="90" cy="90" r="3" fill="var(--fg-muted)" />
                  <circle cx="190" cy="90" r="3" fill="var(--fg-muted)" />
                  <circle cx="90" cy="190" r="3" fill="var(--fg-muted)" />
                  <circle cx="190" cy="190" r="3" fill="var(--fg-muted)" />
                </g>
                
                {/* Center dot */}
                <circle cx="140" cy="140" r="4" fill="var(--fg-primary)" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
