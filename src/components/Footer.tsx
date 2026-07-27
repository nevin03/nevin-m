'use client';

import React, { useState, useEffect } from 'react';

interface FooterProps {
  onOpenDinoGame?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDinoGame }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--border-light)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: 'var(--fg-muted)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
        }}
      >
        <div>NEVIN M © {new Date().getFullYear()}</div>

        {/* Center Dino Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={onOpenDinoGame}
            title="Play CLI Dino Runner Game"
            aria-label="Play CLI Dino Runner Game"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              padding: '0.4rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            }}
            className="dino-btn-hover"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              {/* T-Rex Dino pixel shape */}
              <path d="M13 2h7v2h-2v2h4v2h2v6h-2v-2h-2v2h-2v-2h-2v4h2v2h-2v2h-2v-2h-2v2H8v-4H6v-2H4v-2H2V8h2V6h2V4h7V2zm5 4h2V4h-2v2z" />
            </svg>
            <span>DINO CLI</span>
          </button>
        </div>

        <div>LOCAL TIME: {timeStr || '19:07 IST'}</div>
      </div>
    </footer>
  );
};

