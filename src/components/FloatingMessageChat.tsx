'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, X } from 'lucide-react';

export const FloatingMessageChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Message Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open message from Nevin"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 90,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--fg-primary)',
          color: 'var(--bg-primary)',
          border: '1px solid var(--fg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          transition: 'all 0.25s ease',
        }}
        className="chat-float-btn"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Message Card Drawer (Read-Only Message) */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.75rem',
            zIndex: 95,
            width: 'calc(100vw - 3.5rem)',
            maxWidth: '360px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--fg-primary)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          className="animate-fade-in"
        >
          {/* Card Header */}
          <div
            style={{
              padding: '0.85rem 1.25rem',
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid var(--fg-primary)',
                }}
              >
                <Image src="/portrait_v3.png" alt="Nevin M" fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                  Nevin M
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-muted)' }}>
                  Human - live and let live,love regardlessly
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Message Body */}
          <div
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                padding: '1rem 1.1rem',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--fg-primary)',
              }}
            >
              <p style={{ fontWeight: 500 }}>
                &ldquo;One day, i&apos;ll be gone, but the code i wrote may still be running somewhere on the internet. Isn&apos;t that beautiful&rdquo;
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--fg-muted)',
                  marginTop: '0.75rem',
                  textAlign: 'right',
                }}
              >
                Nevin M
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
