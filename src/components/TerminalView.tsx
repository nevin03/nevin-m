'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

interface TerminalViewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <div style={{ color: 'var(--fg-primary)', fontWeight: 700 }}>
            NEVIN M // INTERACTIVE TERMINAL CLI v1.0.4
          </div>
          <div style={{ color: 'var(--fg-muted)', marginTop: '0.2rem' }}>
            Type <span style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>&apos;help&apos;</span> to see available developer commands.
          </div>
        </div>
      ),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const commands = [
    { cmd: 'help', desc: 'List all available terminal commands' },
    { cmd: 'whoami', desc: 'Display Nevin M core summary' },
    { cmd: 'about', desc: 'Overview of Frontend Engineering, Product Strategy & Backend Development' },
    { cmd: 'contact', desc: 'Get direct Gmail & LinkedIn info' },
    { cmd: 'clear', desc: 'Clear the terminal output' },
  ];

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();

    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: '0.5rem 0' }}>
            <div style={{ color: 'var(--fg-muted)', marginBottom: '0.25rem' }}>AVAILABLE COMMANDS:</div>
            {commands.map((cmd) => (
              <div key={cmd.cmd} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--fg-primary)', fontWeight: 700 }}>{cmd.cmd}</span>
                <span style={{ color: 'var(--fg-muted)' }}>{cmd.desc}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'whoami':
      case 'about':
        outputNode = (
          <div style={{ margin: '0.5rem 0', color: 'var(--fg-secondary)', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: 'var(--fg-primary)' }}>Nevin M — Human - live and let live,love regardlessly</div>
            <div>Industrial Experience: <span style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>1.6+ Years</span></div>
            <div style={{ marginTop: '0.5rem', color: 'var(--fg-muted)' }}>{PORTFOLIO_DATA.personal.bio}</div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div style={{ margin: '0.5rem 0', color: 'var(--fg-secondary)', fontSize: '0.85rem' }}>
            <div>Gmail: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} style={{ color: 'var(--fg-primary)', textDecoration: 'underline' }}>{PORTFOLIO_DATA.personal.email}</a></div>
            <div>LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg-primary)', textDecoration: 'underline' }}>{PORTFOLIO_DATA.personal.linkedin}</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div style={{ color: 'var(--fg-muted)', margin: '0.25rem 0' }}>
            Command not recognized: <span style={{ color: 'var(--fg-primary)' }}>&apos;{trimmed}&apos;</span>. Type <span style={{ color: 'var(--fg-primary)' }}>&apos;help&apos;</span> for commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: outputNode }]);
    setInputVal('');
  };

  const copyCLIOutput = () => {
    const textToCopy = history.map((h) => `> ${h.command}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--fg-primary)',
          width: '100%',
          maxWidth: isExpanded ? '1100px' : '780px',
          height: isExpanded ? '85vh' : '500px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-light)',
            padding: '0.6rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', fontWeight: 700 }}>
            <TerminalIcon size={16} />
            <span>nevin@portfolio:~ (zsh)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={copyCLIOutput}
              title="Copy session log"
              style={{ background: 'transparent', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ background: 'transparent', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--fg-primary)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => (
            <div key={index}>
              {item.command !== 'welcome' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--fg-muted)' }}>
                  <span style={{ color: 'var(--fg-primary)', fontWeight: 700 }}>nevin@portfolio:~$</span>
                  <span style={{ color: 'var(--fg-primary)' }}>{item.command}</span>
                </div>
              )}
              {item.output}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleCommand}
          style={{
            borderTop: '1px solid var(--border-light)',
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ color: 'var(--fg-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
            nevin@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'whoami', 'about', 'contact'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
            }}
          />
          <button
            type="submit"
            style={{ background: 'transparent', border: 'none', color: 'var(--fg-primary)', cursor: 'pointer' }}
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
