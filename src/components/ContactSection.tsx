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

const SCREEN_SPLASH_DROPS = [
  // 5 Mobile & Desktop Drops (Visible on both mobile & desktop)
  { top: '10%', left: '26%', size: 22, duration: 2.2, delay: 0,   rotate: 'rotate(25deg)',   borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%', isMobile: true },
  { top: '28%', left: '12%', size: 24, duration: 2.0, delay: 30,  rotate: 'rotate(80deg)',   borderRadius: '35% 65% 60% 40% / 40% 60% 40% 60%', isMobile: true },
  { top: '18%', left: '78%', size: 18, duration: 2.6, delay: 100, rotate: 'rotate(-15deg)',  borderRadius: '55% 45% 75% 25% / 35% 65% 35% 65%', isMobile: true },
  { top: '58%', left: '20%', size: 16, duration: 3.0, delay: 200, rotate: 'rotate(35deg)',   borderRadius: '30% 70% 65% 35% / 55% 35% 65% 45%', isMobile: true },
  { top: '52%', left: '74%', size: 24, duration: 2.1, delay: 40,  rotate: 'rotate(-105deg)', borderRadius: '50% 50% 70% 30% / 30% 70% 30% 70%', isMobile: true },

  // Desktop Only Extra Drops (Hidden on mobile <768px to keep mobile clean)
  { top: '6%',  left: '66%', size: 18, duration: 2.8, delay: 60,  rotate: 'rotate(-45deg)',  borderRadius: '60% 40% 30% 70% / 50% 30% 70% 50%', isMobile: false },
  { top: '44%', left: '36%', size: 15, duration: 3.2, delay: 150, rotate: 'rotate(110deg)',  borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%', isMobile: false },
  { top: '14%', left: '46%', size: 22, duration: 2.3, delay: 80,  rotate: 'rotate(-70deg)',  borderRadius: '65% 35% 45% 55% / 45% 55% 45% 55%', isMobile: false },
  { top: '4%',  left: '38%', size: 13, duration: 3.5, delay: 250, rotate: 'rotate(150deg)',  borderRadius: '45% 55% 35% 65% / 65% 35% 65% 35%', isMobile: false },
  { top: '70%', left: '48%', size: 14, duration: 3.3, delay: 220, rotate: 'rotate(-85deg)',  borderRadius: '70% 30% 50% 50% / 50% 50% 30% 70%', isMobile: false },
  { top: '36%', left: '91%', size: 11, duration: 3.6, delay: 280, rotate: 'rotate(60deg)',   borderRadius: '35% 65% 40% 60% / 60% 40% 60% 40%', isMobile: false },
  { top: '64%', left: '85%', size: 28, duration: 1.8, delay: 0,   rotate: 'rotate(-30deg)',  borderRadius: '48% 52% 68% 32% / 38% 62% 38% 62%', isMobile: false },
];

export const ContactSection: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [stampQuote, setStampQuote] = useState<string>("who else if not us?");
  const [isStampHovered, setIsStampHovered] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [isStampFallen, setIsStampFallen] = useState(false);
  const [isSlamming, setIsSlamming] = useState(false);

  const autoRestoreTimerRef = React.useRef<NodeJS.Timeout | null>(null);

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

  const triggerStampSlam = () => {
    if (autoRestoreTimerRef.current) clearTimeout(autoRestoreTimerRef.current);
    setIsSlamming(true);
    setIsStampFallen(false);
    setIsFalling(false);
    setTimeout(() => {
      setIsSlamming(false);
    }, 3500);
  };

  const scheduleAutoSlam = () => {
    if (autoRestoreTimerRef.current) clearTimeout(autoRestoreTimerRef.current);
    autoRestoreTimerRef.current = setTimeout(() => {
      triggerStampSlam();
    }, 5000);
  };

  const longPressTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isTouchDeviceRef = React.useRef(false);

  const triggerStampFall = () => {
    if (isFalling || isStampFallen || isSlamming) return;
    setIsFalling(true);
    setTimeout(() => {
      setIsStampFallen(true);
      setIsFalling(false);
      scheduleAutoSlam();
    }, 550);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (isTouchDeviceRef.current) return;
    e.stopPropagation();
    triggerStampFall();
  };

  const handleTouchStart = () => {
    isTouchDeviceRef.current = true;
    if (isFalling || isStampFallen || isSlamming) return;

    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    // Touch and hold threshold: 450ms long press required on mobile
    longPressTimerRef.current = setTimeout(() => {
      triggerStampFall();
    }, 450);
  };

  const handleTouchEndOrMove = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  return (
    <>
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

          {/* Right Column: Postage Stamp Inked Portrait with Ink Splash Backdrop */}
          <div
            className="contact-stamp-col"
            style={{
              position: 'relative',
              padding: '1rem 0',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dramatic Wet Black Ink Splash with Glossy White Sheen & Dynamic Fluid Movement */}
            <svg
              viewBox="0 0 500 500"
              className={isSlamming ? 'ink-splash-impact' : ''}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isSlamming
                  ? 'translate(-50%, -50%) scale(1.05) rotate(-7deg)'
                  : isStampFallen || isFalling
                  ? 'translate(-50%, -50%) scale(0.72) rotate(-10deg)'
                  : isStampHovered
                  ? 'translate(-50%, -50%) scale(1.15) rotate(-3deg)'
                  : 'translate(-50%, -50%) scale(1.05) rotate(-7deg)',
                width: '100%',
                maxWidth: '380px',
                height: 'auto',
                aspectRatio: '1',
                pointerEvents: 'none',
                zIndex: 0,
                filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.25))',
                transition: isSlamming ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              aria-hidden="true"
            >
              <defs>
                {/* Specular White Glossy Gradient */}
                <linearGradient id="inkGlossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* Wet Deep Black Ink Gradient */}
                <radialGradient id="wetBlackInk" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#1c1c1c" />
                  <stop offset="70%" stopColor="#0a0a0a" />
                  <stop offset="100%" stopColor="#000000" />
                </radialGradient>
              </defs>

              {/* MAIN SOLID WET BLACK INK SPLASH BODY */}
              <g fill="url(#wetBlackInk)">
                {/* Large Central Organic Wet Blot */}
                <path d="M250,70 C330,45 400,105 425,180 C450,255 470,330 415,395 C360,460 270,490 190,470 C110,450 45,385 35,305 C25,225 75,145 150,90 C185,65 210,75 250,70 Z" />

                {/* Explosive Directional Ink Splatters & Sprays */}
                <path d="M390,120 C450,70 485,95 470,150 C450,185 415,170 390,120 Z" />
                <path d="M110,390 C65,440 35,420 50,370 C75,340 115,360 110,390 Z" />
                <path d="M170,40 C205,0 240,10 220,50 C195,70 160,55 170,40 Z" />
                <path d="M410,290 C465,315 490,290 475,340 C445,365 420,335 410,290 Z" />
                <path d="M70,170 C20,135 10,165 25,200 C50,215 75,190 70,170 Z" />

                {/* Scattered Paint Droplets (Varied Sizes) */}
                <circle cx="455" cy="220" r="14" />
                <circle cx="480" cy="250" r="8" />
                <circle cx="440" cy="285" r="11" />
                <circle cx="465" cy="315" r="6" />

                <circle cx="45" cy="140" r="15" />
                <circle cx="20" cy="170" r="9" />
                <circle cx="10" cy="200" r="5" />

                <circle cx="130" cy="460" r="12" />
                <circle cx="160" cy="485" r="7" />
                <circle cx="95" cy="445" r="9" />

                <circle cx="340" cy="465" r="13" />
                <circle cx="370" cy="440" r="7" />
                <circle cx="280" cy="30" r="10" />
                <circle cx="310" cy="20" r="6" />
              </g>

              {/* Dynamic Falling Liquid Ink Droplets when Stamp Slams */}
              {isSlamming && (
                <g fill="url(#wetBlackInk)">
                  <circle cx="250" cy="465" r="9" className="ink-drip-falling" style={{ animationDelay: '0ms' }} />
                  <circle cx="200" cy="450" r="6" className="ink-drip-falling" style={{ animationDelay: '60ms' }} />
                  <circle cx="300" cy="455" r="7" className="ink-drip-falling" style={{ animationDelay: '120ms' }} />
                  <circle cx="240" cy="480" r="5" className="ink-drip-falling" style={{ animationDelay: '180ms' }} />
                </g>
              )}

              {/* GLOSSY WHITE LIQUID HIGHLIGHTS / REFLECTIONS */}
              <g fill="none" stroke="url(#inkGlossGrad)" strokeLinecap="round">
                {/* Curving wet highlights along top contour of splash */}
                <path d="M165,100 C215,75 295,70 365,115" strokeWidth="11" opacity="0.85" />
                <path d="M140,120 C180,100 240,95 290,115" strokeWidth="4" opacity="0.6" />
                <path d="M395,140 C435,100 460,115 450,145" strokeWidth="6" opacity="0.75" />
                <path d="M80,185 C45,155 30,175 40,195" strokeWidth="6" opacity="0.7" />
                <path d="M185,55 C205,25 225,30 215,55" strokeWidth="5" opacity="0.8" />

                {/* Glossy sheen contours on main splash curves */}
                <path d="M100,280 C80,340 120,410 180,445" strokeWidth="8" opacity="0.45" />
                <path d="M350,220 C380,270 390,340 360,400" strokeWidth="7" opacity="0.4" />
              </g>

              {/* Glossy White Specular Dots on Wet Splatter Droplets */}
              <g fill="#ffffff">
                <ellipse cx="451" cy="216" rx="4" ry="2" transform="rotate(-30 451 216)" opacity="0.85" />
                <ellipse cx="437" cy="282" rx="3" ry="1.5" transform="rotate(-30 437 282)" opacity="0.75" />
                <ellipse cx="41" cy="136" rx="4" ry="2" transform="rotate(-30 41 136)" opacity="0.9" />
                <ellipse cx="126" cy="456" rx="3.5" ry="1.8" transform="rotate(-30 126 456)" opacity="0.85" />
                <ellipse cx="336" cy="461" rx="4" ry="2" transform="rotate(-30 336 461)" opacity="0.85" />
                <ellipse cx="277" cy="27" rx="3" ry="1.5" transform="rotate(-30 277 27)" opacity="0.8" />
              </g>
            </svg>

            {/* Stamp Card (Touch & Hold on Mobile / Click on Desktop to Tumble) */}
            <div
              onClick={!isStampFallen ? handleDesktopClick : undefined}
              onTouchStart={!isStampFallen ? handleTouchStart : undefined}
              onTouchEnd={handleTouchEndOrMove}
              onTouchMove={handleTouchEndOrMove}
              onTouchCancel={handleTouchEndOrMove}
              onContextMenu={(e) => e.preventDefault()}
              onMouseEnter={() => setIsStampHovered(true)}
              onMouseLeave={() => setIsStampHovered(false)}
              className={isFalling ? 'stamp-falling' : isSlamming ? 'stamp-slamming' : ''}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '290px',
                aspectRatio: '4 / 5',
                padding: '12px',
                background: 'var(--bg-primary)',
                border: isStampHovered ? '2px solid var(--fg-primary)' : '2px dashed var(--fg-primary)',
                boxShadow: isStampHovered ? '0 25px 50px rgba(0,0,0,0.2)' : '0 12px 30px rgba(0,0,0,0.1)',
                transform: isStampHovered ? 'rotate(0deg) scale(1.04)' : 'rotate(-3deg)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: isStampFallen ? 'default' : 'pointer',
                opacity: isStampFallen && !isSlamming ? 0 : 1,
                pointerEvents: isStampFallen && !isSlamming ? 'none' : 'auto',
                visibility: isStampFallen && !isSlamming ? 'hidden' : 'visible',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
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
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    objectFit: 'cover',
                    filter: isStampHovered ? 'contrast(160%) brightness(98%)' : 'contrast(110%)',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
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

            {/* Universal Freehand Drawing Canvas Overlay (Spans entire stamp + ink splash backdrop) */}
          </div>
        </div>
      </div>
    </section>

    {/* Screen Ink Splatter: Irregular Scattered Non-Circular Splash onto Screen -> Hold -> Drip to Bottom */}
    {isSlamming && (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
        {SCREEN_SPLASH_DROPS.map((drop, idx) => (
          <div
            key={idx}
            className={`screen-splash-drop ${!drop.isMobile ? 'desktop-only-drop' : ''}`}
            style={{
              top: drop.top,
              left: drop.left,
              width: `${drop.size}px`,
              height: `${drop.size * 1.35}px`,
              borderRadius: drop.borderRadius,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}ms`,
              '--burst-rotate': drop.rotate,
            } as React.CSSProperties}
          />
        ))}
      </div>
    )}
    </>
  );
};
