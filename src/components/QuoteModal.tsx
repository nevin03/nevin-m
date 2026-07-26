'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const QUOTES = [
  "The code that works tomorrow begins with the mistakes you make today",
  "Every successful app was once a folder full of bugs",
  "When nothing compiles, remember: persistence always does.",
  "Behind every smooth user experience are countless moments when someone chose to try again.",
  "Success isn't built on perfect days; it's built on the days you refused to quit.",
  "Every challenge you solve today becomes your confidence tomorrow.",
  "Great things take time."
];

const SMILEYS = [":)", ";-}", "ツ", ":-D", "(^◡^)"];

export const QuoteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [currentSmiley, setCurrentSmiley] = useState<string>(':)');

  useEffect(() => {
    // Pick a random quote and smiley on every page load/refresh
    const randomQuoteIdx = Math.floor(Math.random() * QUOTES.length);
    const randomSmileyIdx = Math.floor(Math.random() * SMILEYS.length);

    setCurrentQuote(QUOTES[randomQuoteIdx]);
    setCurrentSmiley(SMILEYS[randomSmileyIdx]);
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--fg-primary)',
          maxWidth: '540px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        }}
        className="animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close quote modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--fg-primary)',
            cursor: 'pointer',
            padding: '0.25rem',
          }}
        >
          <X size={20} />
        </button>

        {/* AN Badge with background reversal in dark mode */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--fg-primary)',
            color: 'var(--bg-primary)',
            padding: '0.3rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}
        >
          <span>AN</span>
          <span style={{ fontSize: '0.85rem' }}>
            {currentSmiley}
          </span>
        </div>

        {/* Quote Content */}
        <blockquote
          style={{
            fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
            fontWeight: 600,
            lineHeight: 1.5,
            color: 'var(--fg-primary)',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
          }}
        >
          &ldquo;{currentQuote}&rdquo;
        </blockquote>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            onClick={() => setIsOpen(false)}
            className="btn-minimal"
          >
            <span>Welcome In &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
