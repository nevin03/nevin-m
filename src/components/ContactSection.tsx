'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon } from '@/components/BrandIcons';
import { PORTFOLIO_DATA } from '@/data/portfolio';

const STAMP_QUOTES = [
  "who else if not us?",
  "Be Delusional;"
];

export const ContactSection: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [stampQuote, setStampQuote] = useState<string>("who else if not us?");
  const [isStampHovered, setIsStampHovered] = useState(false);

  useEffect(() => {
    // Pick randomly between the 2 exact quotes on every refresh
    const randomIdx = Math.floor(Math.random() * STAMP_QUOTES.length);
    setStampQuote(STAMP_QUOTES[randomIdx]);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: '5rem 0' }}>
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
          02 // CONTACT & TRANSMISSION
        </div>

        <div
          className="contact-grid"
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '3rem',
          }}
        >
          {/* Left Column: Contact Channels */}
          <div className="contact-text-col">
            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              Get in Touch
            </h3>

            <p style={{ color: 'var(--fg-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Available for executive leadership, product advisory, and frontend engineering roles.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Gmail Box */}
              <div
                style={{
                  border: '1px solid var(--border-light)',
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    GMAIL
                  </div>
                  <a
                    href={`mailto:${personal.email}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--fg-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    {personal.email}
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="btn-minimal-outline"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* LinkedIn Link Box */}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: '1px solid var(--border-light)',
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'var(--fg-primary)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <LinkedinIcon size={20} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', textTransform: 'uppercase' }}>
                      LINKEDIN PROFILE
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      Nevin M on LinkedIn
                    </div>
                  </div>
                </div>

                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Postage Stamp Inked Portrait with Refined Contrast Hover */}
          <div className="contact-stamp-col">
            <div
              onMouseEnter={() => setIsStampHovered(true)}
              onMouseLeave={() => setIsStampHovered(false)}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '290px',
                aspectRatio: '4 / 5',
                padding: '12px',
                background: 'var(--bg-primary)',
                border: isStampHovered ? '2px solid var(--fg-primary)' : '2px dashed var(--fg-primary)',
                boxShadow: isStampHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 12px 30px rgba(0,0,0,0.08)',
                transform: isStampHovered ? 'rotate(0deg) scale(1.04)' : 'rotate(-3deg)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
            >
              {/* Inner Stamp Border */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  background: '#ffffff',
                }}
              >
                <Image
                  src="/portrait_v3.png"
                  alt="Nevin M - Inked Postage Stamp"
                  fill
                  sizes="290px"
                  style={{
                    objectFit: 'cover',
                    filter: isStampHovered ? 'contrast(160%) brightness(98%)' : 'contrast(110%)',
                    transition: 'all 0.3s ease',
                  }}
                  priority
                />
              </div>

              {/* Dynamic Quote Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-14px',
                  right: '-8px',
                  background: 'var(--fg-primary)',
                  color: 'var(--bg-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.75rem',
                  letterSpacing: '0.04em',
                  border: '1px solid var(--bg-primary)',
                  maxWidth: '240px',
                  textAlign: 'right',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                }}
              >
                &ldquo;{stampQuote}&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
