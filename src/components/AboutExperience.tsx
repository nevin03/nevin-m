'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export const AboutExperience: React.FC = () => {
  const { aboutMe, personal } = PORTFOLIO_DATA;

  return (
    <section id="about" style={{ padding: '4rem 0' }}>
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
          01 // ABOUT ME
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem' }}>
          {/* Status Tag Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 0.85rem',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginBottom: '1.5rem',
            }}
          >
            <span className="pulse-dot" />
            <span style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>
              Status: Creating something beautiful
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            {aboutMe.title}
          </h2>

          <p style={{ fontSize: '1.1rem', color: 'var(--fg-secondary)', maxWidth: '750px', lineHeight: 1.6, marginBottom: '3rem' }}>
            {personal.bio}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2.5rem',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '2rem',
            }}
          >
            {aboutMe.pillars.map((pillar, idx) => (
              <div key={idx}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg-muted)', marginBottom: '0.5rem' }}>
                  0{idx + 1}.
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
