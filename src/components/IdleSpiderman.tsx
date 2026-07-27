'use client';

import React, { useEffect, useState, useRef } from 'react';

export const IdleSpiderman: React.FC = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [showWeb, setShowWeb] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const IDLE_DELAY = 5500; // 5.5 seconds idle threshold

  useEffect(() => {
    const handleActivity = () => {
      // Hide spiderman when active
      setIsIdle(false);
      setShowWeb(false);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // Set new idle timer
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        // Small delay for web drop animation
        setTimeout(() => setShowWeb(true), 100);
      }, IDLE_DELAY);
    };

    // Events to monitor for activity
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    events.forEach((evt) => window.addEventListener(evt, handleActivity));

    // Start initial timer
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
      setTimeout(() => setShowWeb(true), 100);
    }, IDLE_DELAY);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
    };
  }, []);

  if (!isIdle) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: '10%',
        zIndex: 999,
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transformOrigin: 'top center',
        animation: 'spideySwing 3.5s ease-in-out infinite alternate',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        transform: showWeb ? 'translateY(0)' : 'translateY(-140px)',
        opacity: showWeb ? 1 : 0,
      }}
      title="Hey there! (Spider-Man idle easter egg 🕷️)"
    >
      {/* Web Line hanging down from top edge */}
      <div
        style={{
          width: '2px',
          height: '110px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(220,220,220,0.6))',
          boxShadow: '0 0 4px rgba(255,255,255,0.6)',
          position: 'relative',
        }}
      >
        {/* Tiny web nodes/details along line */}
        <div style={{ position: 'absolute', top: '30px', left: '-2px', width: '6px', height: '1px', background: 'rgba(255,255,255,0.7)' }} />
        <div style={{ position: 'absolute', top: '70px', left: '-2px', width: '6px', height: '1px', background: 'rgba(255,255,255,0.7)' }} />
      </div>

      {/* Hanging Upside-down Spider-Man SVG & Flanking Spiders */}
      <div
        style={{
          position: 'relative',
          marginTop: '-4px',
          cursor: 'pointer',
          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
          transition: 'transform 0.2s ease',
        }}
        className="spidey-hover-shake"
      >
        {/* Left Flanking Spider */}
        <div
          style={{
            position: 'absolute',
            top: '-70px',
            left: '-36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
          className="spider-left-bounce"
        >
          {/* Left Web Line */}
          <div style={{ width: '1px', height: '70px', background: 'rgba(255,255,255,0.6)' }} />
          {/* Left Spider SVG */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="4" fill="var(--fg-primary)" />
            <circle cx="11" cy="6" r="2.5" fill="var(--fg-primary)" />
            {/* Eyes */}
            <circle cx="10" cy="5" r="0.75" fill="#ffffff" />
            <circle cx="12" cy="5" r="0.75" fill="#ffffff" />
            {/* Legs */}
            <path d="M7 8 L2 6 M7 11 L1 11 M7 13 L2 15 M7 15 L3 19" stroke="var(--fg-primary)" strokeWidth="1.2" strokeLinecap="round" className="spider-legs-anim" />
            <path d="M15 8 L20 6 M15 11 L21 11 M15 13 L20 15 M15 15 L19 19" stroke="var(--fg-primary)" strokeWidth="1.2" strokeLinecap="round" className="spider-legs-anim" />
          </svg>
        </div>

        {/* Right Flanking Spider */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
          className="spider-right-bounce"
        >
          {/* Right Web Line */}
          <div style={{ width: '1px', height: '55px', background: 'rgba(255,255,255,0.6)' }} />
          {/* Right Spider SVG */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="4" fill="var(--fg-primary)" />
            <circle cx="11" cy="6" r="2.5" fill="var(--fg-primary)" />
            {/* Eyes */}
            <circle cx="10" cy="5" r="0.75" fill="#ffffff" />
            <circle cx="12" cy="5" r="0.75" fill="#ffffff" />
            {/* Legs */}
            <path d="M7 8 L2 6 M7 11 L1 11 M7 13 L2 15 M7 15 L3 19" stroke="var(--fg-primary)" strokeWidth="1.2" strokeLinecap="round" className="spider-legs-anim" />
            <path d="M15 8 L20 6 M15 11 L21 11 M15 13 L20 15 M15 15 L19 19" stroke="var(--fg-primary)" strokeWidth="1.2" strokeLinecap="round" className="spider-legs-anim" />
          </svg>
        </div>

        <svg width="44" height="58" viewBox="0 0 44 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hands grasping web line at top */}
          <ellipse cx="22" cy="3" rx="4" ry="3" fill="#E11D48" />
          <ellipse cx="22" cy="3" rx="2" ry="1.5" fill="#0F172A" />

          {/* Upside Down Web Strand to hands */}
          <line x1="22" y1="0" x2="22" y2="4" stroke="#ffffff" strokeWidth="2" />

          {/* Upside Down Legs (bent up) */}
          {/* Left Leg */}
          <path d="M22 6 L14 14 L12 24" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 24 L18 26" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />

          {/* Right Leg */}
          <path d="M22 6 L30 14 L32 24" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 24 L26 26" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />

          {/* Body/Torso */}
          <rect x="15" y="24" width="14" height="16" rx="4" fill="#E11D48" />
          {/* Blue side torso accents */}
          <path d="M15 28 C 17 28, 17 36, 15 38" fill="#1E40AF" />
          <path d="M29 28 C 27 28, 27 36, 29 38" fill="#1E40AF" />

          {/* Spider Symbol on chest */}
          <path d="M22 30 L22 34 M20 31 L24 33 M20 33 L24 31" stroke="#09090B" strokeWidth="1.5" strokeLinecap="round" />

          {/* Arms hanging folded */}
          <path d="M15 26 L9 32 L15 36" stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29 26 L35 32 L29 36" stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Head (Upside down at bottom) */}
          <circle cx="22" cy="46" r="10" fill="#E11D48" />

          {/* Web Lines on Mask */}
          <path d="M22 36 L22 56 M12 46 L32 46" stroke="#9F1239" strokeWidth="1" opacity="0.6" />
          <path d="M15 39 L29 53 M15 53 L29 39" stroke="#9F1239" strokeWidth="1" opacity="0.4" />

          {/* Large Iconic Spidey Eyes (Angled & Expressive) */}
          {/* Left Eye */}
          <path d="M14 43 C 14 40, 20 44, 20 47 C 20 48, 15 47, 14 43 Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="1.5" />
          {/* Right Eye */}
          <path d="M30 43 C 30 40, 24 44, 24 47 C 24 48, 29 47, 30 43 Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="1.5" />
        </svg>

        {/* Speech Bubble / Web indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '-22px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--fg-primary)',
            color: 'var(--bg-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          THWIP! 🕸️
        </div>
      </div>
    </div>
  );
};
