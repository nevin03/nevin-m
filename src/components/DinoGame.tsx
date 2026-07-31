'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Trophy, Play } from 'lucide-react';

interface DinoGameProps {
  onExit?: () => void;
}

export const DinoGame: React.FC<DinoGameProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // References for game loop state to prevent re-render lags
  const stateRef = useRef({
    gameState: 'START' as 'START' | 'PLAYING' | 'GAMEOVER',
    score: 0,
    highScore: 0,
    speed: 5,
    frameCount: 0,
    dino: {
      x: 40,
      y: 110,
      width: 24,
      height: 28,
      velocityY: 0,
      isJumping: false,
      isDucking: false,
      groundY: 110,
    },
    obstacles: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      type: 'cactus' | 'bird';
    }>,
    clouds: [] as Array<{ x: number; y: number; speed: number }>,
  });

  // Load High Score on mount
  useEffect(() => {
    try {
      const savedHI = localStorage.getItem('dino_high_score');
      if (savedHI) {
        const val = parseInt(savedHI, 10);
        if (!isNaN(val)) {
          setHighScore(val);
          stateRef.current.highScore = val;
        }
      }
    } catch {
      // localStorage fallback
    }
  }, []);

  const startGame = () => {
    stateRef.current.gameState = 'PLAYING';
    stateRef.current.score = 0;
    stateRef.current.speed = 5;
    stateRef.current.frameCount = 0;
    stateRef.current.obstacles = [];
    stateRef.current.dino.y = 110;
    stateRef.current.dino.velocityY = 0;
    stateRef.current.dino.isJumping = false;
    stateRef.current.dino.isDucking = false;
    setGameState('PLAYING');
    setScore(0);
  };

  const jump = () => {
    const { dino, gameState } = stateRef.current;
    if (gameState === 'START' || gameState === 'GAMEOVER') {
      startGame();
      return;
    }
    if (!dino.isJumping) {
      dino.velocityY = -10.5;
      dino.isJumping = true;
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
      } else if (e.code === 'ArrowDown') {
        stateRef.current.dino.isDucking = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.code === 'ArrowDown') {
        stateRef.current.dino.isDucking = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
    };
  }, []);

  // Initialize Clouds
  useEffect(() => {
    const clouds = [];
    for (let i = 0; i < 4; i++) {
      clouds.push({
        x: Math.random() * 600,
        y: 20 + Math.random() * 40,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    stateRef.current.clouds = clouds;
  }, []);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const state = stateRef.current;
      const { dino, obstacles, clouds } = state;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fetch primary text color from Computed Style for theme responsiveness
      const primaryColor = getComputedStyle(canvas).getPropertyValue('--fg-primary').trim() || '#ffffff';
      const mutedColor = getComputedStyle(canvas).getPropertyValue('--fg-muted').trim() || '#888888';

      ctx.fillStyle = primaryColor;
      ctx.strokeStyle = primaryColor;

      // 1. Draw Clouds
      clouds.forEach((cloud) => {
        if (state.gameState === 'PLAYING') {
          cloud.x -= cloud.speed;
          if (cloud.x < -40) cloud.x = canvas.width + Math.random() * 50;
        }
        ctx.fillStyle = mutedColor;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, 8, 0, Math.PI * 2);
        ctx.arc(cloud.x + 8, cloud.y - 4, 10, 0, Math.PI * 2);
        ctx.arc(cloud.x + 18, cloud.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Ground Line
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 138);
      ctx.lineTo(canvas.width, 138);
      ctx.stroke();

      // Ground bump dots
      ctx.fillStyle = mutedColor;
      for (let i = 0; i < canvas.width; i += 35) {
        const bumpX = (i - (state.frameCount * state.speed) % 35 + canvas.width) % canvas.width;
        ctx.fillRect(bumpX, 142, 4, 2);
        ctx.fillRect(bumpX + 15, 145, 2, 2);
      }

      // Update Game state if PLAYING
      if (state.gameState === 'PLAYING') {
        state.frameCount++;

        // Increase score
        if (state.frameCount % 5 === 0) {
          state.score += 1;
          setScore(state.score);
          if (state.score > state.highScore) {
            state.highScore = state.score;
            setHighScore(state.score);
            try {
              localStorage.setItem('dino_high_score', state.score.toString());
            } catch {
              // ignore storage errors
            }
          }
        }

        // Slowly increase speed
        if (state.frameCount % 300 === 0 && state.speed < 12) {
          state.speed += 0.5;
        }

        // Update Dino Physics
        if (dino.isJumping) {
          dino.y += dino.velocityY;
          dino.velocityY += 0.55; // gravity

          if (dino.y >= dino.groundY) {
            dino.y = dino.groundY;
            dino.isJumping = false;
            dino.velocityY = 0;
          }
        }

        // Adjust Dino Height when ducking
        const actualHeight = dino.isDucking && !dino.isJumping ? 16 : 28;
        const actualY = dino.isDucking && !dino.isJumping ? dino.groundY + 12 : dino.y;

        // Spawn Obstacles
        if (state.frameCount % Math.max(60, 120 - Math.floor(state.speed * 4)) === 0) {
          const isBird = state.score > 150 && Math.random() < 0.35;
          if (isBird) {
            const flyHigh = Math.random() < 0.5;
            obstacles.push({
              x: canvas.width,
              y: flyHigh ? 80 : 110,
              width: 22,
              height: 16,
              type: 'bird',
            });
          } else {
            const height = 24 + Math.floor(Math.random() * 12);
            obstacles.push({
              x: canvas.width,
              y: 138 - height,
              width: 14 + Math.floor(Math.random() * 12),
              height: height,
              type: 'cactus',
            });
          }
        }

        // Move and draw obstacles + Collision detection
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.x -= state.speed;

          // Draw Obstacle
          ctx.fillStyle = primaryColor;
          if (obs.type === 'cactus') {
            // Retro Cactus Shape
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            // Cactus arms
            if (obs.width >= 18) {
              ctx.fillRect(obs.x - 3, obs.y + 6, 3, 8);
              ctx.fillRect(obs.x + obs.width, obs.y + 4, 3, 8);
            }
          } else {
            // Pterodactyl Bird Shape
            const wingOffset = Math.sin(state.frameCount * 0.2) > 0 ? 0 : 6;
            ctx.fillRect(obs.x, obs.y + wingOffset, obs.width, 8);
            ctx.fillRect(obs.x + 4, obs.y - 4 + wingOffset, 8, 12);
          }

          // Check Collision
          const dinoBox = {
            x: dino.x + 4,
            y: actualY + 2,
            width: dino.width - 6,
            height: actualHeight - 4,
          };

          if (
            dinoBox.x < obs.x + obs.width &&
            dinoBox.x + dinoBox.width > obs.x &&
            dinoBox.y < obs.y + obs.height &&
            dinoBox.y + dinoBox.height > obs.y
          ) {
            // GAME OVER!
            state.gameState = 'GAMEOVER';
            setGameState('GAMEOVER');
            if (state.score > state.highScore) {
              state.highScore = state.score;
              setHighScore(state.score);
              try {
                localStorage.setItem('dino_high_score', state.score.toString());
              } catch {
                // ignore
              }
            }
          }

          // Remove offscreen
          if (obs.x + obs.width < -10) {
            obstacles.splice(i, 1);
          }
        }
      } else {
        // Draw stationary obstacles during START / GAMEOVER
        obstacles.forEach((obs) => {
          ctx.fillStyle = primaryColor;
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
      }

      // 3. Draw Dino Pixel Art
      ctx.fillStyle = primaryColor;
      const currentY = dino.isDucking && !dino.isJumping ? dino.groundY + 12 : dino.y;

      if (dino.isDucking && !dino.isJumping) {
        // Ducking Dino shape
        ctx.fillRect(dino.x, currentY, 32, 14);
        ctx.fillRect(dino.x + 24, currentY - 4, 10, 8); // Head forward
        // Eye (punched out)
        ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--bg-primary').trim() || '#000';
        ctx.fillRect(dino.x + 28, currentY - 2, 2, 2);
        ctx.fillStyle = primaryColor;
        // Legs
        const legToggle = Math.floor(state.frameCount / 4) % 2 === 0;
        ctx.fillRect(dino.x + 6, currentY + 14, 4, legToggle ? 4 : 2);
        ctx.fillRect(dino.x + 18, currentY + 14, 4, legToggle ? 2 : 4);
      } else {
        // Normal Standing / Running Dino
        // Body
        ctx.fillRect(dino.x + 6, currentY + 8, 16, 14);
        // Head
        ctx.fillRect(dino.x + 12, currentY, 14, 10);
        // Eye (punched out)
        ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--bg-primary').trim() || '#000';
        ctx.fillRect(dino.x + 18, currentY + 2, 2, 2);
        ctx.fillStyle = primaryColor;
        // Snout & Tail
        ctx.fillRect(dino.x + 24, currentY + 4, 4, 4); // snout
        ctx.fillRect(dino.x, currentY + 10, 6, 6); // tail
        // Small Arm
        ctx.fillRect(dino.x + 18, currentY + 12, 4, 2);

        // Legs (animated when running)
        if (state.gameState === 'PLAYING' && !dino.isJumping) {
          const legToggle = Math.floor(state.frameCount / 5) % 2 === 0;
          ctx.fillRect(dino.x + 8, currentY + 22, 4, legToggle ? 6 : 3);
          ctx.fillRect(dino.x + 16, currentY + 22, 4, legToggle ? 3 : 6);
        } else {
          ctx.fillRect(dino.x + 8, currentY + 22, 4, 6);
          ctx.fillRect(dino.x + 16, currentY + 22, 4, 6);
        }
      }

      // Loop request
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        borderRadius: '6px',
        padding: '1rem',
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        jump();
      }}
    >
      {/* Top HUD: Score & High Score */}
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--fg-primary)',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--fg-muted)' }}>DINO RUNNER</span>
          <span style={{ fontSize: '0.75rem', background: 'var(--border-light)', padding: '0.1rem 0.4rem', borderRadius: '3px', color: 'var(--fg-secondary)' }}>
            CLI ARCADE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--fg-muted)' }}>
            <Trophy size={14} style={{ color: '#eab308' }} />
            <span>HI</span>
            <span style={{ color: 'var(--fg-primary)' }}>{String(highScore).padStart(5, '0')}</span>
          </div>

          <div>
            <span>SCORE </span>
            <span style={{ color: 'var(--fg-primary)' }}>{String(score).padStart(5, '0')}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        width={640}
        height={160}
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-light)',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      />

      {/* Overlay Screens */}
      {gameState === 'START' && (
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            background: 'var(--bg-primary)',
            border: '1px solid var(--fg-primary)',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
          }}
          onClick={startGame}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--fg-primary)', marginBottom: '0.25rem' }}>
            <Play size={16} /> Press SPACE or Click to Start
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
            Controls: [SPACE / UP] Jump | [DOWN] Duck
          </div>
        </div>
      )}

      {gameState === 'GAMEOVER' && (
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            background: 'var(--bg-primary)',
            border: '1px solid var(--fg-primary)',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
          }}
          onClick={startGame}
        >
          <div style={{ fontWeight: 800, color: 'var(--fg-primary)', fontSize: '1rem', marginBottom: '0.25rem' }}>
            G A M E   O V E R
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
            <RotateCcw size={14} /> Click or Press SPACE to Restart
          </div>
        </div>
      )}

      {/* Footer hint */}
      <div
        style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--fg-muted)',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '640px',
        }}
      >
        <span>Type &apos;clear&apos; to exit game view</span>
        <span>High Score saved in localStorage</span>
      </div>
    </div>
  );
};
