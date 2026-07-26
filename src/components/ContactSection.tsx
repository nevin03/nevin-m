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
  const [isFalling, setIsFalling] = useState(false);
  const [isStampFallen, setIsStampFallen] = useState(false);
  const [isSlamming, setIsSlamming] = useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isCanvasFading, setIsCanvasFading] = useState(false);
  const startPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const fadeCanvasTimerRef = React.useRef<NodeJS.Timeout | null>(null);
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
    if (fadeCanvasTimerRef.current) clearTimeout(fadeCanvasTimerRef.current);

    // Clear drawn items from canvas immediately when stamp is applied
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasMoved(false);
    setIsCanvasFading(false);

    setIsSlamming(true);
    setIsStampFallen(false);
    setIsFalling(false);
    setTimeout(() => {
      setIsSlamming(false);
    }, 650);
  };

  const scheduleAutoSlam = () => {
    if (autoRestoreTimerRef.current) clearTimeout(autoRestoreTimerRef.current);
    autoRestoreTimerRef.current = setTimeout(() => {
      triggerStampSlam();
    }, 5000);
  };

  const handleStampClick = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isFalling || isStampFallen || isSlamming) return;
    setIsFalling(true);
    setTimeout(() => {
      setIsStampFallen(true);
      setIsFalling(false);
      scheduleAutoSlam();
    }, 550);
  };

  const handleRestoreStamp = () => {
    triggerStampSlam();
    setHasMoved(false);
    setIsCanvasFading(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const lastPosRef = React.useRef<{ x: number; y: number } | null>(null);

  const startDrawing = (clientX: number, clientY: number) => {
    if (!isStampFallen) return;

    setIsDrawing(true);
    setHasMoved(false);
    setIsCanvasFading(false);
    if (fadeCanvasTimerRef.current) clearTimeout(fadeCanvasTimerRef.current);

    startPosRef.current = { x: clientX, y: clientY };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    lastPosRef.current = {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isDrawing || !isStampFallen || !lastPosRef.current) return;

    if (startPosRef.current) {
      const dist = Math.hypot(clientX - startPosRef.current.x, clientY - startPosRef.current.y);
      if (dist > 4) {
        setHasMoved(true);
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentX = (clientX - rect.left) * scaleX;
    const currentY = (clientY - rect.top) * scaleY;
    const prevX = lastPosRef.current.x;
    const prevY = lastPosRef.current.y;

    // PASS 1: Subtle Wet Liquid Base Edge (No Glow)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();

    // PASS 2: Opaque Crisp Liquid White Ink Core (No Glow)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();

    lastPosRef.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (hasMoved) {
      if (isStampFallen) {
        scheduleAutoSlam();
      }
      // 2 seconds after drawing stops, fade out and clear canvas
      if (fadeCanvasTimerRef.current) clearTimeout(fadeCanvasTimerRef.current);
      fadeCanvasTimerRef.current = setTimeout(() => {
        setIsCanvasFading(true);
        setTimeout(() => {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          setIsCanvasFading(false);
          setHasMoved(false);
        }, 600);
      }, 2000);
    } else {
      // Single tap without drag
      if (isStampFallen) {
        handleRestoreStamp();
      } else {
        handleStampClick();
      }
    }
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
            {/* Dramatic Wet Black Ink Splash with Glossy White Sheen */}
            <svg
              viewBox="0 0 500 500"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isStampHovered
                  ? 'translate(-50%, -50%) scale(1.15) rotate(-3deg)'
                  : 'translate(-50%, -50%) scale(1.05) rotate(-7deg)',
                width: '100%',
                maxWidth: '380px',
                height: 'auto',
                aspectRatio: '1',
                pointerEvents: 'none',
                zIndex: 0,
                filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.25))',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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

            {/* Stamp Card (Tap to Tumble Down) */}
            <div
              onClick={!isStampFallen ? handleStampClick : undefined}
              onTouchEnd={!isStampFallen ? handleStampClick : undefined}
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

            {/* Universal Freehand Drawing Canvas Overlay (Spans entire stamp + ink splash backdrop) */}
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              onMouseDown={(e) => startDrawing(e.clientX, e.clientY)}
              onMouseMove={(e) => draw(e.clientX, e.clientY)}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={(e) => {
                if (e.touches[0]) startDrawing(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) draw(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={stopDrawing}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '420px',
                height: '100%',
                maxHeight: '420px',
                zIndex: 10,
                cursor: 'crosshair',
                touchAction: 'none',
                pointerEvents: isStampFallen ? 'auto' : 'none',
                opacity: isCanvasFading ? 0 : 1,
                transition: 'opacity 0.6s ease',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
