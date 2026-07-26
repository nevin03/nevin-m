'use client';

import React, { useState } from 'react';
import { Terminal as TerminalIcon, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleTerminal, isTerminalOpen }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        <a
          href="#"
          className="font-signature"
          style={{
            fontSize: '1.75rem',
            color: 'var(--fg-primary)',
            textDecoration: 'none',
            lineHeight: 1,
          }}
        >
          Nevin M
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={onToggleTerminal}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <TerminalIcon size={14} />
            <span>CLI</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--fg-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
