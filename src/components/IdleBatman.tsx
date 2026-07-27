'use client';

import React, { useEffect, useState, useRef } from 'react';

interface IdleBatmanProps {
  isActive: boolean;
}

export const IdleBatman: React.FC<IdleBatmanProps> = ({ isActive }) => {
  const [showBatman, setShowBatman] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowBatman(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowBatman(false);
    }
  }, [isActive]);

  if (!isActive && !showBatman) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '8%',
        zIndex: 999,
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        transform: showBatman ? 'translateY(0)' : 'translateY(120%)',
        opacity: showBatman ? 1 : 0,
      }}
      title="Justice never sleeps (Batman idle easter egg 🦇)"
    >
      {/* Speech Bubble / Bat Signal */}
      <div
        style={{
          marginBottom: '6px',
          background: 'var(--fg-primary)',
          color: 'var(--bg-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        <span>I&apos;M BATMAN</span>
        <span style={{ fontSize: '0.75rem' }}>🦇</span>
      </div>

      {/* Vector Batman Character with Flanking Flying Bats */}
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          filter: 'drop-shadow(0 -4px 10px rgba(0,0,0,0.4))',
          transition: 'transform 0.2s ease',
        }}
        className="batman-hover-rise"
      >
        {/* Left Flying Bat */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '-38px',
            pointerEvents: 'none',
          }}
          className="bat-flying-left"
        >
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="15" cy="10" rx="3" ry="4" fill="var(--fg-primary)" />
            <polygon points="13,7 14,3 15,7" fill="var(--fg-primary)" />
            <polygon points="15,7 16,3 17,7" fill="var(--fg-primary)" />
            {/* Left Wing Flapping */}
            <path d="M12 9 C 8 1, 1 4, 0 10 C 4 11, 8 15, 12 11 Z" fill="var(--fg-primary)" className="bat-wing-anim-left" />
            {/* Right Wing Flapping */}
            <path d="M18 9 C 22 1, 29 4, 30 10 C 26 11, 22 15, 18 11 Z" fill="var(--fg-primary)" className="bat-wing-anim-right" />
          </svg>
        </div>

        {/* Right Flying Bat */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-38px',
            pointerEvents: 'none',
          }}
          className="bat-flying-right"
        >
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="15" cy="10" rx="3" ry="4" fill="var(--fg-primary)" />
            <polygon points="13,7 14,3 15,7" fill="var(--fg-primary)" />
            <polygon points="15,7 16,3 17,7" fill="var(--fg-primary)" />
            {/* Left Wing Flapping */}
            <path d="M12 9 C 8 1, 1 4, 0 10 C 4 11, 8 15, 12 11 Z" fill="var(--fg-primary)" className="bat-wing-anim-left" />
            {/* Right Wing Flapping */}
            <path d="M18 9 C 22 1, 29 4, 30 10 C 26 11, 22 15, 18 11 Z" fill="var(--fg-primary)" className="bat-wing-anim-right" />
          </svg>
        </div>

        <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grappling Line going up */}
          <line x1="24" y1="0" x2="24" y2="12" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* Bat Cowl Ears */}
          <path d="M14 16 L12 4 L18 12 Z" fill="#0F172A" />
          <path d="M34 16 L36 4 L30 12 Z" fill="#0F172A" />

          {/* Bat Head */}
          <path d="M14 14 C14 8, 34 8, 34 14 L34 26 C34 30, 14 30, 14 26 Z" fill="#1E293B" />
          {/* Cowl Face Mask shadow */}
          <path d="M16 16 H32 V24 H16 Z" fill="#0F172A" />

          {/* Glowing White Bat Lenses Eyes */}
          <polygon points="17,18 22,20 18,22" fill="#FFFFFF" />
          <polygon points="31,18 26,20 30,22" fill="#FFFFFF" />

          {/* Chin / Jaw */}
          <path d="M19 24 H29 V27 H19 Z" fill="#FDBA74" />

          {/* Draped Bat Cape (Flutter animation class) */}
          <path
            d="M8 28 C 4 36, 2 54, 6 64 L 14 58 L 24 64 L 34 58 L 42 64 C 46 54, 44 36, 40 28 Z"
            fill="#0F172A"
            className="bat-cape"
          />

          {/* Armor Chest Torso */}
          <rect x="16" y="27" width="16" height="22" rx="3" fill="#334155" />

          {/* Yellow Bat Symbol Oval */}
          <ellipse cx="24" cy="35" rx="6" ry="4" fill="#EAB308" />
          {/* Bat silhouette inside logo */}
          <path d="M21 35 C 21 33, 23 34, 24 33 C 25 34, 27 33, 27 35 C 26 36, 25 36, 24 37 C 23 36, 22 36, 21 35 Z" fill="#0F172A" />

          {/* Yellow Utility Belt */}
          <rect x="14" y="48" width="20" height="4" rx="1" fill="#EAB308" />
          <rect x="22" y="47" width="4" height="6" rx="1" fill="#CA8A04" />
          <rect x="16" y="49" width="3" height="2" fill="#9A3412" />
          <rect x="29" y="49" width="3" height="2" fill="#9A3412" />

          {/* Boots */}
          <rect x="16" y="52" width="6" height="12" fill="#0F172A" />
          <rect x="26" y="52" width="6" height="12" fill="#0F172A" />
        </svg>
      </div>
    </div>
  );
};
