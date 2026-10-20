import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

/* ==========================================================================
   NEURAL RUNNER // SYNAPSE PROTOCOL
   A high-performance Canvas 2D arcade runner for Siddharth P's portfolio.
   Runs at 60 FPS using requestAnimationFrame with Web Audio synthesis.
   ========================================================================== */

export default function NeuralGame({ onExit }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // React State for HUD & UI Overlays
  const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing' | 'paused' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('sidd_runner_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [tokensCollected, setTokensCollected] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [multiplier, setMultiplier] = useState(1);

  // Audio Context Ref
  const audioCtxRef = useRef(null);

  // Game Engine Internal State (persists across frames without re-rendering)
  const engineRef = useRef({
    animId: null,
    lastTime: 0,
    width: 800,
    height: 600,
    dpr: 1,
    keys: {},
    touchX: null,
    player: {
      x: 400,
      y: 500,
      targetX: 400,
      vx: 0,
      width: 28,
      height: 38,
      speed: 460,
      trail: [],
      invulnerable: 0
    },
    obstacles: [],
    tokens: [],
    particles: [],
    speed: 300,
    baseSpeed: 300,
    distance: 0,
    score: 0,
    combo: 0,
    spawnTimer: 0,
    tokenTimer: 0,
    shake: 0
  });

  // Simple Synthesized Web Audio Sound Generator
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'token') {
        // High crystalline chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'powerup') {
        // Dual arpeggio
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'hit') {
        // Low distorted crunch
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // AudioContext policy fallback
    }
  }, [soundEnabled]);

  // Resize canvas to match display size exactly with DPR scaling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    const eng = engineRef.current;
    eng.width = rect.width;
    eng.height = rect.height;
    eng.dpr = dpr;

    if (eng.player.x > eng.width) {
      eng.player.x = eng.width / 2;
      eng.player.targetX = eng.width / 2;
    }
    eng.player.y = eng.height - 90;
  }, []);

  // Spawn dynamic obstacle
  const spawnObstacle = (eng) => {
    const lanes = 5;
    const laneWidth = eng.width / lanes;
    const lane = Math.floor(Math.random() * lanes);
    const x = lane * laneWidth + laneWidth / 2;
    const type = Math.random() > 0.6 ? 'wall' : 'cube';
    const width = type === 'wall' ? laneWidth * 0.9 : 32;
    const height = type === 'wall' ? 18 : 32;

    eng.obstacles.push({
      x,
      y: -50,
      width,
      height,
      type,
      color: type === 'wall' ? '#ef4444' : '#f43f5e',
      speed: eng.speed * (0.95 + Math.random() * 0.2)
    });
  };

  // Spawn collectible synapse token
  const spawnToken = (eng) => {
    const lanes = 5;
    const laneWidth = eng.width / lanes;
    const lane = Math.floor(Math.random() * lanes);
    const x = lane * laneWidth + laneWidth / 2;

    eng.tokens.push({
      x,
      y: -30,
      radius: 12,
      rotation: 0,
      special: Math.random() > 0.85,
      speed: eng.speed
    });
  };

  // Create spark burst particles
  const createSparks = (eng, x, y, color, count = 14) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const spd = 60 + Math.random() * 180;
      eng.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 1.0,
        decay: 1.6 + Math.random() * 1.5,
        color,
        size: 2 + Math.random() * 2.5
      });
    }
  };

  // Start / Reset Game
  const startGame = () => {
    const eng = engineRef.current;
    eng.obstacles = [];
    eng.tokens = [];
    eng.particles = [];
    eng.speed = eng.baseSpeed;
    eng.distance = 0;
    eng.score = 0;
    eng.combo = 0;
    eng.player.x = eng.width / 2;
    eng.player.targetX = eng.width / 2;
    eng.player.vx = 0;
    eng.player.trail = [];
    eng.player.invulnerable = 1.2;
    eng.lastTime = performance.now();
    eng.shake = 0;

    setScore(0);
    setTokensCollected(0);
    setMultiplier(1);
    setGameState('playing');
  };

  // Main 60 FPS Game Loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (engineRef.current.animId) {
        cancelAnimationFrame(engineRef.current.animId);
        engineRef.current.animId = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const eng = engineRef.current;
    eng.lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - eng.lastTime) / 1000, 0.1);
      eng.lastTime = currentTime;

      // 1. UPDATE GAME STATE
      eng.distance += eng.speed * dt;
      eng.score += Math.floor(eng.speed * dt * 0.1 * (1 + eng.combo * 0.2));
      setScore(eng.score);

      // Increase speed gradually with distance
      eng.speed = eng.baseSpeed + Math.min(eng.distance * 0.05, 350);

      // Camera Shake decay
      if (eng.shake > 0) {
        eng.shake = Math.max(0, eng.shake - dt * 25);
      }

      // Player Movement: Keyboard & Touch
      let moveDir = 0;
      if (eng.keys['ArrowLeft'] || eng.keys['KeyA']) moveDir -= 1;
      if (eng.keys['ArrowRight'] || eng.keys['KeyD']) moveDir += 1;

      if (moveDir !== 0) {
        eng.player.targetX += moveDir * eng.player.speed * dt;
      } else if (eng.touchX !== null) {
        eng.player.targetX = eng.touchX;
      }

      // Constrain player target to bounds
      const margin = 32;
      eng.player.targetX = Math.max(margin, Math.min(eng.width - margin, eng.player.targetX));

      // Smooth lerp to target
      eng.player.x += (eng.player.targetX - eng.player.x) * 14 * dt;

      // Update Player trail
      eng.player.trail.unshift({ x: eng.player.x, y: eng.player.y });
      if (eng.player.trail.length > 8) eng.player.trail.pop();

      if (eng.player.invulnerable > 0) {
        eng.player.invulnerable = Math.max(0, eng.player.invulnerable - dt);
      }

      // Spawn Timers
      eng.spawnTimer += dt;
      const spawnInterval = Math.max(0.65, 1.4 - (eng.speed - eng.baseSpeed) * 0.002);
      if (eng.spawnTimer > spawnInterval) {
        eng.spawnTimer = 0;
        spawnObstacle(eng);
      }

      eng.tokenTimer += dt;
      if (eng.tokenTimer > 1.2) {
        eng.tokenTimer = 0;
        spawnToken(eng);
      }

      // Update Obstacles
      for (let i = eng.obstacles.length - 1; i >= 0; i--) {
        const obs = eng.obstacles[i];
        obs.y += obs.speed * dt;

        // Collision Check
        if (eng.player.invulnerable <= 0) {
          const hitX = Math.abs(eng.player.x - obs.x) < (obs.width / 2 + eng.player.width / 2 - 4);
          const hitY = Math.abs(eng.player.y - obs.y) < (obs.height / 2 + eng.player.height / 2 - 4);
          if (hitX && hitY) {
            playSound('hit');
            eng.shake = 12;
            createSparks(eng, eng.player.x, eng.player.y, '#ef4444', 24);
            setGameState('gameover');

            if (eng.score > highScore) {
              setHighScore(eng.score);
              try {
                localStorage.setItem('sidd_runner_highscore', eng.score.toString());
              } catch {
                // ignore
              }
            }
            return;
          }
        }

        if (obs.y > eng.height + 100) {
          eng.obstacles.splice(i, 1);
        }
      }

      // Update Tokens
      for (let i = eng.tokens.length - 1; i >= 0; i--) {
        const tok = eng.tokens[i];
        tok.y += tok.speed * dt;
        tok.rotation += dt * 3.5;

        // Collision Check
        const dist = Math.hypot(eng.player.x - tok.x, eng.player.y - tok.y);
        if (dist < tok.radius + eng.player.width / 2 + 6) {
          eng.tokens.splice(i, 1);
          eng.combo += 1;
          const pts = tok.special ? 350 : 100;
          eng.score += pts * Math.min(eng.combo, 5);
          setScore(eng.score);
          setTokensCollected(c => c + 1);
          setMultiplier(Math.min(eng.combo, 5));
          playSound(tok.special ? 'powerup' : 'token');
          createSparks(eng, tok.x, tok.y, tok.special ? '#f59e0b' : '#38bdf8', tok.special ? 18 : 12);
          continue;
        }

        if (tok.y > eng.height + 50) {
          eng.tokens.splice(i, 1);
          eng.combo = Math.max(0, eng.combo - 1);
          setMultiplier(Math.max(1, eng.combo));
        }
      }

      // Update Particles
      for (let i = eng.particles.length - 1; i >= 0; i--) {
        const p = eng.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0) {
          eng.particles.splice(i, 1);
        }
      }

      // 2. RENDER SCENE
      ctx.save();
      ctx.scale(eng.dpr, eng.dpr);

      // Camera Shake
      if (eng.shake > 0) {
        const sx = (Math.random() - 0.5) * eng.shake;
        const sy = (Math.random() - 0.5) * eng.shake;
        ctx.translate(sx, sy);
      }

      // Clear Canvas Background (Pure Deep Obsidian Black)
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, eng.width, eng.height);

      // Draw Perspective Neural Grid Tunnel
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;

      const lanes = 5;
      const laneWidth = eng.width / lanes;
      for (let l = 1; l < lanes; l++) {
        ctx.beginPath();
        ctx.moveTo(l * laneWidth, 0);
        ctx.lineTo(l * laneWidth, eng.height);
        ctx.stroke();
      }

      // Moving Horizontal Latency Lines
      const gridOffset = (eng.distance * 0.8) % 60;
      for (let y = gridOffset; y < eng.height; y += 60) {
        const alpha = Math.min(y / eng.height, 0.08);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(eng.width, y);
        ctx.stroke();
      }

      // Draw Collectible Tokens (Glowing Diamonds)
      eng.tokens.forEach(tok => {
        ctx.save();
        ctx.translate(tok.x, tok.y);
        ctx.rotate(tok.rotation);

        const color = tok.special ? '#f59e0b' : '#38bdf8';
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(0, -tok.radius);
        ctx.lineTo(tok.radius, 0);
        ctx.lineTo(0, tok.radius);
        ctx.lineTo(-tok.radius, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw Obstacles (Corrupt Vector Cubes / Latency Barriers)
      eng.obstacles.forEach(obs => {
        ctx.save();
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = 12;

        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x - obs.width / 2, obs.y - obs.height / 2, obs.width, obs.height);

        // Core warning highlight
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x - obs.width / 4, obs.y - 2, obs.width / 2, 4);

        ctx.restore();
      });

      // Draw Particles
      eng.particles.forEach(p => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Player Thruster Trail
      eng.player.trail.forEach((pos, idx) => {
        const factor = 1 - idx / eng.player.trail.length;
        ctx.fillStyle = `rgba(56, 189, 248, ${factor * 0.35})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y + 12 + idx * 3, eng.player.width * 0.3 * factor, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Player Probe
      const isBlinking = eng.player.invulnerable > 0 && Math.floor(currentTime / 70) % 2 === 0;
      if (!isBlinking) {
        ctx.save();
        ctx.translate(eng.player.x, eng.player.y);

        // Jet engine glow
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 16;

        // Diamond Fuselage
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(0, -eng.player.height / 2);
        ctx.lineTo(eng.player.width / 2, eng.player.height / 2);
        ctx.lineTo(0, eng.player.height / 3);
        ctx.lineTo(-eng.player.width / 2, eng.player.height / 2);
        ctx.closePath();
        ctx.fill();

        // Inner Cockpit Core
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();

      // Next Frame
      eng.animId = requestAnimationFrame(loop);
    };

    eng.animId = requestAnimationFrame(loop);

    return () => {
      if (eng.animId) {
        cancelAnimationFrame(eng.animId);
        eng.animId = null;
      }
    };
  }, [gameState, highScore, playSound]);

  // Handle Keyboard & Touch Event Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'KeyP') {
        e.preventDefault();
        setGameState(st => {
          if (st === 'playing') return 'paused';
          if (st === 'paused') return 'playing';
          return st;
        });
        return;
      }
      if (e.code === 'KeyR' && (gameState === 'gameover' || gameState === 'paused')) {
        startGame();
        return;
      }
      if (e.code === 'Escape') {
        onExit();
        return;
      }
      engineRef.current.keys[e.code] = true;
    };

    const handleKeyUp = (e) => {
      engineRef.current.keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [gameState, handleResize, onExit]);

  // Touch and Mouse Move Drag Handlers
  const handlePointerMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    engineRef.current.touchX = clientX - rect.left;
  };

  const handlePointerEnd = () => {
    engineRef.current.touchX = null;
  };

  return (
    <div
      ref={containerRef}
      className="neural-game-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#08080a',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)'
      }}
      onMouseMove={gameState === 'playing' ? handlePointerMove : undefined}
      onTouchMove={gameState === 'playing' ? handlePointerMove : undefined}
      onTouchEnd={handlePointerEnd}
    >
      {/* Top Header & HUD */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(8,8,10,0.95), transparent)',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onExit}
            className="j-btn-outline"
            style={{ fontSize: '0.8125rem', padding: '0.45rem 0.9rem' }}
            title="Exit to Portfolio (ESC)"
          >
            <ArrowLeft size={14} />
            <span>Portfolio</span>
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Subsystem Probe
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              SYNAPSE RUNNER
            </span>
          </div>
        </div>

        {/* Live HUD Scores */}
        {gameState === 'playing' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.675rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>
                Score
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                {score}
              </span>
            </div>
            {multiplier > 1 && (
              <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '4px', padding: '0.2rem 0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)' }}>
                  {multiplier}x COMBO
                </span>
              </div>
            )}
            <div style={{ textAlign: 'right', display: 'none', md: { display: 'block' } }}>
              <span style={{ fontSize: '0.675rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>
                Tokens
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
                {tokensCollected}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="j-btn-outline"
            style={{ padding: '0.45rem' }}
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          {gameState === 'playing' && (
            <button
              onClick={() => setGameState('paused')}
              className="j-btn-outline"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem' }}
              title="Pause (Space)"
            >
              <Pause size={14} />
              <span>Pause</span>
            </button>
          )}
        </div>
      </header>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {/* START SCREEN OVERLAY */}
      {gameState === 'menu' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8, 8, 10, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '90%',
              background: '#0f0f13',
              border: '1px solid var(--line)',
              borderRadius: 'var(--rounded-lg)',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              Interactive Arcade // Siddharth P
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem', lineHeight: 1.15 }}>
              SYNAPSE RUNNER
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Guide the neural probe through high-dimensional feature space. Harvest clean weights and bypass corrupt latency spikes.
            </p>

            <div
              style={{
                background: '#08080a',
                border: '1px solid var(--line)',
                borderRadius: 'var(--rounded-sm)',
                padding: '1.25rem',
                marginBottom: '2rem',
                textAlign: 'left',
                fontSize: '0.8125rem',
                color: 'var(--muted)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--ink)' }}>Controls:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>Arrow Keys / [A] [D] / Drag</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--ink)' }}>Pause / Resume:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>[Space] or [P]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ink)' }}>High Score:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>{highScore}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={startGame}
                className="j-btn-cta"
                style={{ padding: '0.85rem 2.25rem', fontSize: '1rem' }}
              >
                <Play size={18} />
                <span>Launch Protocol</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAUSE SCREEN OVERLAY */}
      {gameState === 'paused' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8, 8, 10, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
          }}
        >
          <div
            style={{
              maxWidth: '380px',
              width: '90%',
              background: '#0f0f13',
              border: '1px solid var(--line)',
              borderRadius: 'var(--rounded-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
              TRANSMISSION PAUSED
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              Current Score: <strong style={{ color: 'var(--ink)' }}>{score}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => setGameState('playing')}
                className="j-btn-cta"
                style={{ justifyContent: 'center', padding: '0.75rem' }}
              >
                <Play size={16} />
                <span>Resume (Space)</span>
              </button>
              <button
                onClick={startGame}
                className="j-btn-outline"
                style={{ justifyContent: 'center', padding: '0.75rem' }}
              >
                <RotateCcw size={16} />
                <span>Restart Session</span>
              </button>
              <button
                onClick={onExit}
                className="j-btn-outline"
                style={{ justifyContent: 'center', padding: '0.75rem' }}
              >
                <ArrowLeft size={16} />
                <span>Exit to Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER SCREEN OVERLAY */}
      {gameState === 'gameover' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8, 8, 10, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
          }}
        >
          <div
            style={{
              maxWidth: '440px',
              width: '90%',
              background: '#0f0f13',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--rounded-lg)',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.15)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f87171', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Anomaly Detected // Session Terminated
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.5rem' }}>
              LATENCY BREACH
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                background: '#08080a',
                border: '1px solid var(--line)',
                borderRadius: 'var(--rounded-sm)',
                padding: '1.25rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Final Score
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                  {score}
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  High Score
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                  {highScore}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={startGame}
                className="j-btn-cta"
                style={{ flex: 1, justifyContent: 'center', padding: '0.8rem' }}
              >
                <RotateCcw size={16} />
                <span>Retry (R)</span>
              </button>
              <button
                onClick={onExit}
                className="j-btn-outline"
                style={{ flex: 1, justifyContent: 'center', padding: '0.8rem' }}
              >
                <ArrowLeft size={16} />
                <span>Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* On-screen touch buttons for mobile */}
      {gameState === 'playing' && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: '2rem',
            pointerEvents: 'none'
          }}
        >
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              engineRef.current.keys['ArrowLeft'] = true;
            }}
            onTouchEnd={() => {
              engineRef.current.keys['ArrowLeft'] = false;
            }}
            className="j-btn-outline"
            style={{ pointerEvents: 'auto', width: '56px', height: '56px', borderRadius: '50%', justifyContent: 'center', opacity: 0.7 }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              engineRef.current.keys['ArrowRight'] = true;
            }}
            onTouchEnd={() => {
              engineRef.current.keys['ArrowRight'] = false;
            }}
            className="j-btn-outline"
            style={{ pointerEvents: 'auto', width: '56px', height: '56px', borderRadius: '50%', justifyContent: 'center', opacity: 0.7 }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
