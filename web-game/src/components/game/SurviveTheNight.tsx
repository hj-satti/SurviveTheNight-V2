'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

// ============================================================
// SOUND ENGINE - AudioContext oscillator-based sound effects
// ============================================================
class SoundEngine {
  private ctx: AudioContext | null = null;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playJump() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playDoubleJump() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playCollect() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playHit() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playAttack() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playSlide() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(20, ctx.currentTime);
      lfoGain.gain.setValueAtTime(50, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      lfo.start(ctx.currentTime);
      osc.start(ctx.currentTime);
      lfo.stop(ctx.currentTime + 0.4);
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  playBossMusic() {
    try {
      const ctx = this.getCtx();
      const notes = [200, 200, 150, 250, 200];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.2);
        osc.stop(ctx.currentTime + i * 0.2 + 0.18);
      });
    } catch (e) {}
  }

  playGameOver() {
    try {
      const ctx = this.getCtx();
      const notes = [400, 350, 300, 200, 150];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.25);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.25 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.25);
        osc.stop(ctx.currentTime + i * 0.25 + 0.3);
      });
    } catch (e) {}
  }

  playVictory() {
    try {
      const ctx = this.getCtx();
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.3);
      });
    } catch (e) {}
  }

  playPotato() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(600, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  playSecret() {
    try {
      const ctx = this.getCtx();
      const notes = [523, 659, 784, 880, 1047, 1175, 1319, 1568];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.15);
      });
    } catch (e) {}
  }
}

// ============================================================
// GAME CONSTANTS
// ============================================================
const CANVAS_W = 800;
const CANVAS_H = 500;
const GRAVITY = 0.45;
const FOX_W = 36;
const FOX_H = 44;
const FOX_DUCK_H = 24;
const JUMP_FORCE = -11;
const DOUBLE_JUMP_FORCE = -9.5;
const MOVE_SPEED = 3.8;
const HIFSA_SPEED_BOOST = 7;
const ATTACK_RANGE = 55;
const ATTACK_COOLDOWN = 400;

// Phase zone thresholds (x position in world)
const ZONE_THRESHOLDS = [0, 3000, 6500, 10500];
const ZONE_NAMES = ['Enchanted Forest', 'Crystal Cave', 'Storm Peaks', 'Shadow Realm'];
const ZONE_COLORS = [
  { bg1: '#1a3a1a', bg2: '#0d260d', ground: '#2d5a1e', accent: '#4ade80' },    // Forest
  { bg1: '#2a1a3a', bg2: '#1a0d2e', ground: '#3d2d5a', accent: '#f0abfc' },    // Crystal Cave (pink/teal)
  { bg1: '#1a2a3a', bg2: '#0d1a2e', ground: '#2d3d5a', accent: '#7dd3fc' },    // Storm Peaks
  { bg1: '#1a0d1a', bg2: '#0d000d', ground: '#2d1a2d', accent: '#a855f7' },    // Shadow Realm
];

// Game over messages
const GAME_OVER_MESSAGES = [
  "RIP little guy",
  "Your fox has left the chat",
  "The night was too dark...",
  "Fox.exe has stopped working",
  "You almost survived! ...almost",
  "The spiky things won this time",
  "Looks like fox needed more potatoes",
  "Game Over? More like Game Oof-er",
  "The fox is in a better place now",
  "That was... a choice",
];

// Random tips
const RANDOM_TIPS = [
  "Tip: Don't touch the spiky things",
  "Tip: The fox is orange because Aliza likes oranges",
  "Tip: This game was made at 3am",
  "Tip: Potatoes are always the answer",
  "Tip: The double jump is floaty on purpose... probably",
  "Tip: Duck! No really, press DOWN",
  "Tip: Enemies look silly but they bite",
  "Tip: If you find a secret room, don't tell anyone",
  "Tip: Hifsa's Speed Boost is OP and we know it",
  "Tip: Aliza's Shield is mint green because aesthetics",
  "Tip: Ayesha made the boss angry for a reason",
];

// ============================================================
// TYPE DEFINITIONS
// ============================================================
interface Vec2 { x: number; y: number; }

interface Fox {
  x: number; y: number;
  vx: number; vy: number;
  w: number; h: number;
  health: number; maxHealth: number;
  onGround: boolean;
  isDucking: boolean;
  isAttacking: boolean;
  attackTimer: number;
  lastAttackTime: number;
  jumpsLeft: number;
  facingRight: boolean;
  hasShield: boolean;
  shieldTimer: number;
  hasSpeedBoost: boolean;
  speedBoostTimer: number;
  eyesWide: boolean;
  tripping: boolean;
  tripTimer: number;
  invincible: number;
  combo: number;
  comboTimer: number;
  score: number;
  isDead: boolean;
}

interface Platform {
  x: number; y: number; w: number; h: number;
  type: 'ground' | 'floating' | 'bridge';
  hasGap?: boolean;
  gapX?: number;
  gapW?: number;
}

interface Hazard {
  x: number; y: number; w: number; h: number;
  type: 'spike' | 'thorns' | 'crystal' | 'lightning' | 'shadow';
  zone: number;
}

interface OverheadObstacle {
  x: number; y: number; w: number; h: number;
  type: 'branch' | 'stalactite' | 'cloud' | 'darkbeam';
  zone: number;
}

interface Enemy {
  x: number; y: number; w: number; h: number;
  vx: number;
  type: 'slime' | 'bat' | 'golem' | 'shadow';
  health: number; maxHealth: number;
  zone: number;
  expression: string;
  dead: boolean;
  deathTimer: number;
  patrolLeft: number;
  patrolRight: number;
}

interface Collectible {
  x: number; y: number;
  type: 'berry' | 'firefly' | 'potato' | 'shield' | 'speed' | 'secret';
  collected: boolean;
  bobPhase: number;
}

interface Boss {
  x: number; y: number; w: number; h: number;
  health: number; maxHealth: number;
  phase: number;
  attackTimer: number;
  vx: number; vy: number;
  expression: string;
  isActive: boolean;
  isDead: boolean;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number;
  color: string; size: number;
}

interface Popup {
  x: number; y: number; text: string; color: string;
  life: number; maxLife: number;
}

interface GameState {
  phase: 'title' | 'playing' | 'gameover' | 'victory' | 'credits';
  fox: Fox;
  camera: Vec2;
  worldWidth: number;
  platforms: Platform[];
  hazards: Hazard[];
  overheads: OverheadObstacle[];
  enemies: Enemy[];
  collectibles: Collectible[];
  boss: Boss;
  particles: Particle[];
  popups: Popup[];
  currentZone: number;
  tipIndex: number;
  tipTimer: number;
  showTip: boolean;
  currentTip: string;
  bossTriggered: boolean;
  secretFound: boolean;
  gameTime: number;
  shakeTimer: number;
  shakeIntensity: number;
  gameOverMessage: string;
  wasThisSupposedToHappen: boolean;
  wasThisTimer: number;
  secretRoomX: number;
  creditsScroll: number;
}

// ============================================================
// WORLD GENERATION
// ============================================================
function generateWorld(): Omit<GameState, 'phase' | 'fox' | 'camera' | 'particles' | 'popups' | 'currentZone' | 'tipIndex' | 'tipTimer' | 'showTip' | 'currentTip' | 'bossTriggered' | 'secretFound' | 'gameTime' | 'shakeTimer' | 'shakeIntensity' | 'gameOverMessage' | 'wasThisSupposedToHappen' | 'wasThisTimer' | 'secretRoomX' | 'creditsScroll'> {
  const worldWidth = 14000;
  const platforms: Platform[] = [];
  const hazards: Hazard[] = [];
  const overheads: OverheadObstacle[] = [];
  const enemies: Enemy[] = [];
  const collectibles: Collectible[] = [];

  // Ground with gaps per zone
  let x = 0;
  while (x < worldWidth) {
    const zone = x < 3000 ? 0 : x < 6500 ? 1 : x < 10500 ? 2 : 3;
    const segW = 120 + Math.random() * 200;

    // 25% chance of a gap after zone 0
    const hasGap = zone > 0 && Math.random() < 0.25;
    if (hasGap) {
      const gapW = 60 + Math.random() * 50;
      // Platform ends before gap
      platforms.push({ x, y: 420, w: segW, h: 80, type: 'ground' });
      x += segW + gapW;
      continue;
    }

    platforms.push({ x, y: 420, w: segW, h: 80, type: 'ground' });
    x += segW;
  }

  // Floating platforms per zone
  for (let fx = 400; fx < worldWidth; fx += 200 + Math.random() * 300) {
    const zone = fx < 3000 ? 0 : fx < 6500 ? 1 : fx < 10500 ? 2 : 3;
    const py = 280 + Math.random() * 100;
    platforms.push({ x: fx, y: py, w: 80 + Math.random() * 60, h: 16, type: 'floating' });
  }

  // Hazards (spiky and obvious!)
  for (let hx = 500; hx < worldWidth; hx += 250 + Math.random() * 400) {
    const zone = hx < 3000 ? 0 : hx < 6500 ? 1 : hx < 10500 ? 2 : 3;
    const hazardTypes: Hazard['type'][] = ['spike', 'thorns', 'crystal', 'lightning', 'shadow'];
    hazards.push({
      x: hx, y: 395, w: 28, h: 28,
      type: hazardTypes[zone],
      zone,
    });
  }

  // Overhead obstacles (need to duck!)
  for (let ox = 600; ox < worldWidth; ox += 350 + Math.random() * 500) {
    const zone = ox < 3000 ? 0 : ox < 6500 ? 1 : ox < 10500 ? 2 : 3;
    const types: OverheadObstacle['type'][] = ['branch', 'stalactite', 'cloud', 'darkbeam'];
    overheads.push({
      x: ox, y: 370, w: 70 + Math.random() * 50, h: 50,
      type: types[zone], zone,
    });
  }

  // Enemies per zone
  for (let ex = 600; ex < worldWidth - 1500; ex += 300 + Math.random() * 500) {
    const zone = ex < 3000 ? 0 : ex < 6500 ? 1 : ex < 10500 ? 2 : 3;
    const types: Enemy['type'][] = ['slime', 'bat', 'golem', 'shadow'];
    const hp = [2, 3, 4, 5][zone];
    const expressions = [':P', 'o.o', '>_<', 'X_X'];
    enemies.push({
      x: ex, y: 390, w: 32, h: 30,
      vx: (0.5 + Math.random() * 1) * (Math.random() < 0.5 ? 1 : -1),
      type: types[zone],
      health: hp, maxHealth: hp,
      zone,
      expression: expressions[zone],
      dead: false, deathTimer: 0,
      patrolLeft: ex - 80,
      patrolRight: ex + 80,
    });
  }

  // Collectibles
  for (let cx = 300; cx < worldWidth; cx += 150 + Math.random() * 250) {
    const r = Math.random();
    let type: Collectible['type'] = 'berry';
    if (r < 0.05) type = 'potato';
    else if (r < 0.08) type = 'shield';
    else if (r < 0.11) type = 'speed';
    else if (r < 0.13) type = 'secret';
    else if (r < 0.35) type = 'firefly';

    const cy = type === 'firefly' ? 200 + Math.random() * 150 : 350 + Math.random() * 50;
    collectibles.push({ x: cx, y: cy, type, collected: false, bobPhase: Math.random() * Math.PI * 2 });
  }

  // Boss at the end
  const boss: Boss = {
    x: worldWidth - 500, y: 300, w: 80, h: 80,
    health: 20, maxHealth: 20,
    phase: 0, attackTimer: 0,
    vx: 1.5, vy: 0,
    expression: '>:) Hahaha!',
    isActive: false, isDead: false,
  };

  const secretRoomX = 2200 + Math.random() * 400;

  return { worldWidth, platforms, hazards, overheads, enemies, collectibles, boss, secretRoomX };
}

// ============================================================
// MAIN GAME COMPONENT
// ============================================================
export default function SurviveTheNight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const soundRef = useRef<SoundEngine>(new SoundEngine());
  const animFrameRef = useRef<number>(0);
  const [screenState, setScreenState] = useState<'title' | 'playing' | 'gameover' | 'victory' | 'credits'>('title');

  const initGame = useCallback((): GameState => {
    const world = generateWorld();
    return {
      ...world,
      phase: 'playing',
      fox: {
        x: 100, y: 370, vx: 0, vy: 0,
        w: FOX_W, h: FOX_H,
        health: 10, maxHealth: 10,
        onGround: false, isDucking: false,
        isAttacking: false, attackTimer: 0,
        lastAttackTime: 0,
        jumpsLeft: 2,
        facingRight: true,
        hasShield: false, shieldTimer: 0,
        hasSpeedBoost: false, speedBoostTimer: 0,
        eyesWide: false, tripping: false, tripTimer: 0,
        invincible: 0, combo: 0, comboTimer: 0,
        score: 0, isDead: false,
      },
      camera: { x: 0, y: 0 },
      particles: [],
      popups: [],
      currentZone: 0,
      tipIndex: Math.floor(Math.random() * RANDOM_TIPS.length),
      tipTimer: 300,
      showTip: false,
      currentTip: RANDOM_TIPS[0],
      bossTriggered: false,
      secretFound: false,
      gameTime: 0,
      shakeTimer: 0,
      shakeIntensity: 0,
      gameOverMessage: GAME_OVER_MESSAGES[Math.floor(Math.random() * GAME_OVER_MESSAGES.length)],
      wasThisSupposedToHappen: false,
      wasThisTimer: 0,
      creditsScroll: 0,
    };
  }, []);

  // ---- INPUT HANDLING ----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());

      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        const gs = gameStateRef.current;
        if (!gs || gs.phase !== 'playing') return;
        const fox = gs.fox;

        if (fox.jumpsLeft > 0) {
          if (fox.onGround || fox.jumpsLeft === 2) {
            fox.vy = JUMP_FORCE;
            fox.onGround = false;
            fox.jumpsLeft--;
            soundRef.current.playJump();
          } else {
            // Floaty double jump!
            fox.vy = DOUBLE_JUMP_FORCE;
            fox.jumpsLeft--;
            soundRef.current.playDoubleJump();
          }
        }
      }

      // Attack with X or J
      if (e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'j') {
        const gs = gameStateRef.current;
        if (!gs || gs.phase !== 'playing') return;
        const now = Date.now();
        if (now - gs.fox.lastAttackTime > ATTACK_COOLDOWN) {
          gs.fox.isAttacking = true;
          gs.fox.attackTimer = 12;
          gs.fox.lastAttackTime = now;
          soundRef.current.playAttack();
        }
      }

      // Enter to start
      if (e.key === 'Enter') {
        const gs = gameStateRef.current;
        if (!gs || gs.phase === 'title') {
          gameStateRef.current = initGame();
          setScreenState('playing');
        } else if (gs.phase === 'gameover' || gs.phase === 'victory') {
          gameStateRef.current = initGame();
          setScreenState('playing');
        } else if (gs.phase === 'credits') {
          gameStateRef.current!.phase = 'title';
          setScreenState('title');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [initGame]);

  // ---- MOBILE TOUCH HANDLERS ----
  const handleMobileAction = useCallback((action: string) => {
    const gs = gameStateRef.current;
    if (!gs || gs.phase !== 'playing') return;
    const fox = gs.fox;

    switch (action) {
      case 'left':
        keysRef.current.add('arrowleft');
        break;
      case 'left-up':
        keysRef.current.delete('arrowleft');
        break;
      case 'right':
        keysRef.current.add('arrowright');
        break;
      case 'right-up':
        keysRef.current.delete('arrowright');
        break;
      case 'jump':
        if (fox.jumpsLeft > 0) {
          if (fox.onGround || fox.jumpsLeft === 2) {
            fox.vy = JUMP_FORCE;
            fox.onGround = false;
            fox.jumpsLeft--;
            soundRef.current.playJump();
          } else {
            fox.vy = DOUBLE_JUMP_FORCE;
            fox.jumpsLeft--;
            soundRef.current.playDoubleJump();
          }
        }
        break;
      case 'duck':
        keysRef.current.add('arrowdown');
        break;
      case 'duck-up':
        keysRef.current.delete('arrowdown');
        break;
      case 'attack': {
        const now = Date.now();
        if (now - fox.lastAttackTime > ATTACK_COOLDOWN) {
          fox.isAttacking = true;
          fox.attackTimer = 12;
          fox.lastAttackTime = now;
          soundRef.current.playAttack();
        }
        break;
      }
    }
  }, []);

  // ---- GAME LOOP ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const gameLoop = () => {
      const gs = gameStateRef.current;

      if (!gs) {
        // Draw title screen
        drawTitle(ctx);
        animFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (gs.phase === 'playing') {
        updateGame(gs);
      }

      render(ctx, gs);
      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ---- UPDATE LOGIC ----
  function updateGame(gs: GameState) {
    const fox = gs.fox;
    const keys = keysRef.current;
    gs.gameTime++;

    // Zone detection
    const newZone = fox.x < 3000 ? 0 : fox.x < 6500 ? 1 : fox.x < 10500 ? 2 : 3;
    if (newZone !== gs.currentZone) {
      gs.currentZone = newZone;
      gs.showTip = true;
      gs.currentTip = RANDOM_TIPS[gs.tipIndex % RANDOM_TIPS.length];
      gs.tipIndex++;
      gs.tipTimer = 240;
    }

    // Random tip timer
    if (gs.showTip) {
      gs.tipTimer--;
      if (gs.tipTimer <= 0) gs.showTip = false;
    }

    // 1% chance per second of tripping
    if (!fox.tripping && Math.random() < 0.0017) {
      fox.tripping = true;
      fox.tripTimer = 40;
    }
    if (fox.tripping) {
      fox.tripTimer--;
      if (fox.tripTimer <= 0) fox.tripping = false;
    }

    // === MOVEMENT (controlled - press to move, release to stop) ===
    fox.vx = 0;
    fox.isDucking = keys.has('arrowdown') || keys.has('s');
    fox.h = fox.isDucking ? FOX_DUCK_H : FOX_H;

    if (!fox.tripping) {
      const speed = fox.hasSpeedBoost ? HIFSA_SPEED_BOOST : MOVE_SPEED;
      if (keys.has('arrowleft') || keys.has('a')) {
        fox.vx = -speed;
        fox.facingRight = false;
      }
      if (keys.has('arrowright') || keys.has('d')) {
        fox.vx = speed;
        fox.facingRight = true;
      }
    } else {
      // Tripping - random slight movement
      fox.vx = (Math.random() - 0.5) * 2;
    }

    // Apply gravity
    fox.vy += GRAVITY;
    if (fox.vy > 15) fox.vy = 15; // terminal velocity

    // Move fox
    fox.x += fox.vx;
    fox.y += fox.vy;

    // Platform collision
    fox.onGround = false;
    for (const plat of gs.platforms) {
      // Check gap in ground
      if (plat.type === 'ground' && plat.hasGap) continue;

      // Simple AABB collision - only land on top
      if (fox.x + fox.w > plat.x && fox.x < plat.x + plat.w) {
        if (fox.y + fox.h >= plat.y && fox.y + fox.h <= plat.y + plat.h + fox.vy + 2 && fox.vy >= 0) {
          fox.y = plat.y - fox.h;
          fox.vy = 0;
          fox.onGround = true;
          fox.jumpsLeft = 2;
        }
      }
    }

    // Fall off the world
    if (fox.y > CANVAS_H + 100) {
      fox.health = 0;
      fox.isDead = true;
    }

    // Screen shake when off screen
    if (fox.y < -50 || fox.x < gs.camera.x - 100) {
      gs.shakeTimer = 10;
      gs.shakeIntensity = 3;
    }

    // Attack timer
    if (fox.attackTimer > 0) {
      fox.attackTimer--;
      if (fox.attackTimer <= 0) fox.isAttacking = false;
    }

    // Invincibility frames
    if (fox.invincible > 0) fox.invincible--;

    // Shield timer
    if (fox.hasShield) {
      fox.shieldTimer--;
      if (fox.shieldTimer <= 0) fox.hasShield = false;
    }

    // Speed boost timer
    if (fox.hasSpeedBoost) {
      fox.speedBoostTimer--;
      if (fox.speedBoostTimer <= 0) fox.hasSpeedBoost = false;
    }

    // Combo timer
    if (fox.comboTimer > 0) {
      fox.comboTimer--;
      if (fox.comboTimer <= 0) fox.combo = 0;
    }

    // === HAZARD COLLISION ===
    fox.eyesWide = false;
    for (const haz of gs.hazards) {
      if (fox.invincible > 0) break;
      const dist = Math.abs((fox.x + fox.w / 2) - (haz.x + haz.w / 2));
      // Eyes go wide when near hazard
      if (dist < 100) fox.eyesWide = true;
      if (dist < 60) fox.eyesWide = true; // extra wide

      // Collision
      if (fox.x + fox.w > haz.x + 4 && fox.x < haz.x + haz.w - 4 &&
          fox.y + fox.h > haz.y + 4 && fox.y < haz.y + haz.h - 4) {
        if (fox.hasShield) {
          fox.hasShield = false;
          fox.shieldTimer = 0;
          addPopup(gs, fox.x, fox.y - 20, 'Shield broke!', '#4ade80');
        } else {
          fox.health -= 1;
          fox.invincible = 60;
          gs.shakeTimer = 8;
          gs.shakeIntensity = 4;
          soundRef.current.playHit();
          addPopup(gs, fox.x, fox.y - 20, '-1 HP', '#ff4444');
        }
      }
    }

    // === OVERHEAD OBSTACLE COLLISION (must duck!) ===
    for (const oh of gs.overheads) {
      if (fox.invincible > 0) break;
      // Only hurts if fox is NOT ducking
      if (!fox.isDucking) {
        if (fox.x + fox.w > oh.x + 4 && fox.x < oh.x + oh.w - 4 &&
            fox.y < oh.y + oh.h && fox.y + FOX_H > oh.y) {
          if (fox.hasShield) {
            fox.hasShield = false;
            fox.shieldTimer = 0;
            addPopup(gs, fox.x, fox.y - 20, 'Shield broke!', '#4ade80');
          } else {
            fox.health -= 1;
            fox.invincible = 60;
            gs.shakeTimer = 8;
            gs.shakeIntensity = 4;
            soundRef.current.playHit();
            addPopup(gs, fox.x, fox.y - 20, 'DUCK next time!', '#ff4444');
          }
        }
      }
    }

    // === ENEMY LOGIC ===
    for (const en of gs.enemies) {
      if (en.dead) {
        en.deathTimer--;
        continue;
      }

      // Patrol
      en.x += en.vx;
      if (en.x <= en.patrolLeft || en.x >= en.patrolRight) {
        en.vx = -en.vx;
      }

      // Attack collision
      if (fox.isAttacking && fox.attackTimer > 6) {
        const atkX = fox.facingRight ? fox.x + fox.w : fox.x - ATTACK_RANGE;
        if (atkX < en.x + en.w && atkX + ATTACK_RANGE > en.x &&
            fox.y < en.y + en.h && fox.y + fox.h > en.y) {
          en.health--;
          if (en.health <= 0) {
            en.dead = true;
            en.deathTimer = 30;
            en.expression = 'X_X';
            fox.combo++;
            fox.comboTimer = 120;
            fox.score += 50 * fox.combo;
            const comboColors = ['#4ade80', '#facc15', '#fb923c', '#f87171', '#a78bfa', '#f472b6'];
            const comboText = fox.combo > 1 ? `${fox.combo}x COMBO!` : '+50';
            addPopup(gs, en.x, en.y - 20, comboText, comboColors[Math.min(fox.combo - 1, comboColors.length - 1)]);
            if (fox.combo >= 3) soundRef.current.playSecret(); // fun sound for combos
            // Death particles
            for (let i = 0; i < 8; i++) {
              gs.particles.push({
                x: en.x + en.w / 2, y: en.y + en.h / 2,
                vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 - 2,
                life: 30, maxLife: 30,
                color: ZONE_COLORS[en.zone].accent, size: 4,
              });
            }
          } else {
            en.expression = '>_<';
            addPopup(gs, en.x, en.y - 10, 'HIT!', '#facc15');
          }
        }
      }

      // Enemy hurts fox
      if (!en.dead && fox.invincible <= 0) {
        if (fox.x + fox.w > en.x + 4 && fox.x < en.x + en.w - 4 &&
            fox.y + fox.h > en.y + 4 && fox.y < en.y + en.h - 4) {
          if (fox.hasShield) {
            fox.hasShield = false;
            fox.shieldTimer = 0;
            addPopup(gs, fox.x, fox.y - 20, 'Shield broke!', '#4ade80');
          } else {
            fox.health -= 1;
            fox.invincible = 60;
            gs.shakeTimer = 8;
            gs.shakeIntensity = 4;
            soundRef.current.playHit();
            addPopup(gs, fox.x, fox.y - 20, 'Ouch!', '#ff4444');
          }
        }
      }
    }

    // === BOSS LOGIC ===
    if (!gs.bossTriggered && fox.x > gs.worldWidth - 1500) {
      gs.bossTriggered = true;
      gs.boss.isActive = true;
      soundRef.current.playBossMusic();
      addPopup(gs, fox.x, 100, 'BOSS FIGHT!', '#ff0066');
    }

    if (gs.boss.isActive && !gs.boss.isDead) {
      const boss = gs.boss;
      boss.attackTimer++;

      // Boss movement
      boss.x += boss.vx;
      if (boss.x < gs.worldWidth - 600 || boss.x > gs.worldWidth - 100) {
        boss.vx = -boss.vx;
      }

      // Boss attacks
      if (boss.attackTimer % 90 === 0) {
        // Shoot projectile
        gs.particles.push({
          x: boss.x, y: boss.y + boss.h / 2,
          vx: -3 - Math.random() * 2, vy: (Math.random() - 0.5) * 2,
          life: 120, maxLife: 120,
          color: '#ff0066', size: 8,
        });
      }

      // Boss phase changes
      if (boss.health <= boss.maxHealth * 0.5 && boss.phase === 0) {
        boss.phase = 1;
        boss.vx = 2.5;
        boss.expression = '>:)) RAAAHHH!';
        addPopup(gs, boss.x, boss.y - 30, 'Boss is ANGRY!', '#ff0066');
      }

      // Fox attacks boss
      if (fox.isAttacking && fox.attackTimer > 6) {
        const atkX = fox.facingRight ? fox.x + fox.w : fox.x - ATTACK_RANGE;
        if (atkX < boss.x + boss.w && atkX + ATTACK_RANGE > boss.x &&
            fox.y < boss.y + boss.h && fox.y + fox.h > boss.y) {
          boss.health--;
          fox.score += 100;
          addPopup(gs, boss.x + boss.w / 2, boss.y - 20, 'BOOM!', '#facc15');

          if (boss.health <= 0) {
            boss.isDead = true;
            boss.expression = 'x_x';
            soundRef.current.playVictory();
            // Victory particles
            for (let i = 0; i < 30; i++) {
              gs.particles.push({
                x: boss.x + boss.w / 2, y: boss.y + boss.h / 2,
                vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8 - 3,
                life: 60, maxLife: 60,
                color: ['#ff0066', '#facc15', '#4ade80', '#7dd3fc', '#a78bfa'][Math.floor(Math.random() * 5)],
                size: 3 + Math.random() * 5,
              });
            }
            // Trigger victory after delay
            setTimeout(() => {
              if (gameStateRef.current) {
                gameStateRef.current.phase = 'credits';
                setScreenState('credits');
              }
            }, 2000);
          }
        }
      }

      // Boss hurts fox (contact)
      if (fox.invincible <= 0 &&
          fox.x + fox.w > boss.x + 8 && fox.x < boss.x + boss.w - 8 &&
          fox.y + fox.h > boss.y + 8 && fox.y < boss.y + boss.h - 8) {
        if (fox.hasShield) {
          fox.hasShield = false;
          fox.shieldTimer = 0;
        } else {
          fox.health -= 2;
          fox.invincible = 90;
          gs.shakeTimer = 15;
          gs.shakeIntensity = 6;
          soundRef.current.playHit();
          addPopup(gs, fox.x, fox.y - 20, '-2 HP!', '#ff4444');
        }
      }

      // Boss projectile hits fox
      gs.particles = gs.particles.filter(p => {
        if (p.color === '#ff0066' && p.size >= 6) {
          if (fox.invincible <= 0 &&
              fox.x + fox.w > p.x - 4 && fox.x < p.x + 4 &&
              fox.y + fox.h > p.y - 4 && fox.y < p.y + 4) {
            if (fox.hasShield) {
              fox.hasShield = false;
              fox.shieldTimer = 0;
              return false;
            }
            fox.health -= 1;
            fox.invincible = 60;
            soundRef.current.playHit();
            addPopup(gs, fox.x, fox.y - 20, '-1 HP', '#ff4444');
            return false;
          }
        }
        return true;
      });
    }

    // === COLLECTIBLES ===
    for (const col of gs.collectibles) {
      if (col.collected) continue;
      col.bobPhase += 0.05;

      const dist = Math.hypot((fox.x + fox.w / 2) - col.x, (fox.y + fox.h / 2) - col.y);
      if (dist < 30) {
        col.collected = true;
        switch (col.type) {
          case 'berry':
            fox.score += 10;
            soundRef.current.playCollect();
            addPopup(gs, col.x, col.y - 10, '+10', '#4ade80');
            break;
          case 'firefly':
            fox.score += 25;
            soundRef.current.playCollect();
            addPopup(gs, col.x, col.y - 10, '+25', '#facc15');
            break;
          case 'potato':
            fox.score += 100;
            soundRef.current.playPotato();
            addPopup(gs, col.x, col.y - 15, '+1 FOUND A POTATO... nice', '#facc15');
            // Small health restore
            fox.health = Math.min(fox.health + 1, fox.maxHealth);
            break;
          case 'shield':
            fox.hasShield = true;
            fox.shieldTimer = 600; // 10 seconds
            soundRef.current.playCollect();
            addPopup(gs, col.x, col.y - 15, "Aliza's Shield!", '#6ee7b7');
            addPopup(gs, col.x, col.y - 35, "(minty fresh protection)", '#86efac');
            break;
          case 'speed':
            fox.hasSpeedBoost = true;
            fox.speedBoostTimer = 480; // 8 seconds
            soundRef.current.playCollect();
            addPopup(gs, col.x, col.y - 15, "Hifsa's Speed Boost!", '#fb923c');
            addPopup(gs, col.x, col.y - 35, "(she's fast at coding too)", '#fdba74');
            addPopup(gs, col.x, col.y - 55, "(Actually Hifsa is too lazy yet", '#f97316');
            addPopup(gs, col.x, col.y - 75, "she can complete everything at", '#ea580c');
            addPopup(gs, col.x, col.y - 95, "the last moment haha)", '#c2410c');
            break;
          case 'secret':
            gs.secretFound = true;
            soundRef.current.playSecret();
            addPopup(gs, col.x, col.y - 20, 'you found the secret!!', '#f0abfc');
            fox.score += 500;
            break;
        }
      }
    }

    // === CAMERA ===
    const targetCamX = fox.x - CANVAS_W / 3;
    gs.camera.x += (targetCamX - gs.camera.x) * 0.08;
    gs.camera.x = Math.max(0, Math.min(gs.camera.x, gs.worldWidth - CANVAS_W));

    // === PARTICLES ===
    gs.particles = gs.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life--;
      return p.life > 0;
    });

    // Zone ambient particles
    if (gs.gameTime % 8 === 0) {
      const zc = ZONE_COLORS[gs.currentZone];
      if (gs.currentZone === 0) {
        // Fireflies - neon yellow
        gs.particles.push({
          x: gs.camera.x + Math.random() * CANVAS_W,
          y: 200 + Math.random() * 200,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          life: 60 + Math.random() * 60, maxLife: 120,
          color: '#ccff00', size: 3,
        });
      } else if (gs.currentZone === 1) {
        // Crystal sparkles
        gs.particles.push({
          x: gs.camera.x + Math.random() * CANVAS_W,
          y: 150 + Math.random() * 250,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.5 - Math.random() * 0.5,
          life: 40 + Math.random() * 40, maxLife: 80,
          color: Math.random() < 0.5 ? '#f0abfc' : '#5eead4', size: 2,
        });
      } else if (gs.currentZone === 2) {
        // Rain
        gs.particles.push({
          x: gs.camera.x + Math.random() * CANVAS_W,
          y: 0,
          vx: -1, vy: 5 + Math.random() * 3,
          life: 60, maxLife: 60,
          color: '#7dd3fc', size: 1,
        });
      } else {
        // Shadow wisps
        gs.particles.push({
          x: gs.camera.x + Math.random() * CANVAS_W,
          y: 300 + Math.random() * 100,
          vx: (Math.random() - 0.5) * 1,
          vy: -0.8 - Math.random() * 0.5,
          life: 50 + Math.random() * 50, maxLife: 100,
          color: '#a855f7', size: 3,
        });
      }
    }

    // === POPUPS ===
    gs.popups = gs.popups.filter(p => {
      p.y -= 0.8;
      p.life--;
      return p.life > 0;
    });

    // === SCREEN SHAKE ===
    if (gs.shakeTimer > 0) gs.shakeTimer--;

    // === CHECK DEATH ===
    if (fox.health <= 0 && !fox.isDead) {
      fox.isDead = true;
      fox.health = 0;
      soundRef.current.playGameOver();
      // Random "was this supposed to happen?" chance
      if (Math.random() < 0.15) {
        gs.wasThisSupposedToHappen = true;
        gs.wasThisTimer = 180;
      }
      setTimeout(() => {
        if (gameStateRef.current) {
          gameStateRef.current.phase = 'gameover';
          gameStateRef.current.gameOverMessage = GAME_OVER_MESSAGES[Math.floor(Math.random() * GAME_OVER_MESSAGES.length)];
          setScreenState('gameover');
        }
      }, 1500);
    }

    // Keep fox in world bounds horizontally
    fox.x = Math.max(0, fox.x);
  }

  function addPopup(gs: GameState, x: number, y: number, text: string, color: string) {
    gs.popups.push({ x, y, text, color, life: 80, maxLife: 80 });
  }

  // ============================================================
  // RENDERING
  // ============================================================
  function render(ctx: CanvasRenderingContext2D, gs: GameState) {
    ctx.save();

    // Screen shake
    let shakeX = 0, shakeY = 0;
    if (gs.shakeTimer > 0) {
      shakeX = (Math.random() - 0.5) * gs.shakeIntensity * 2;
      shakeY = (Math.random() - 0.5) * gs.shakeIntensity * 2;
    }
    ctx.translate(shakeX, shakeY);

    const cam = gs.camera;
    const zone = gs.currentZone;
    const zc = ZONE_COLORS[zone];

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bgGrad.addColorStop(0, zc.bg1);
    bgGrad.addColorStop(1, zc.bg2);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Parallax background elements
    drawBackground(ctx, gs, cam, zone);

    ctx.save();
    ctx.translate(-cam.x, 0);

    // Draw platforms
    for (const plat of gs.platforms) {
      if (plat.x + plat.w < cam.x - 50 || plat.x > cam.x + CANVAS_W + 50) continue;
      drawPlatform(ctx, plat, zone, zc);
    }

    // Draw hazards (spiky and obvious!)
    for (const haz of gs.hazards) {
      if (haz.x + haz.w < cam.x - 50 || haz.x > cam.x + CANVAS_W + 50) continue;
      drawHazard(ctx, haz);
    }

    // Draw overhead obstacles
    for (const oh of gs.overheads) {
      if (oh.x + oh.w < cam.x - 50 || oh.x > cam.x + CANVAS_W + 50) continue;
      drawOverhead(ctx, oh);
    }

    // Draw collectibles
    for (const col of gs.collectibles) {
      if (col.collected) continue;
      if (col.x < cam.x - 50 || col.x > cam.x + CANVAS_W + 50) continue;
      drawCollectible(ctx, col, gs.gameTime);
    }

    // Draw enemies
    for (const en of gs.enemies) {
      if (en.x + en.w < cam.x - 50 || en.x > cam.x + CANVAS_W + 50) continue;
      if (en.dead && en.deathTimer <= 0) continue;
      drawEnemy(ctx, en, gs.gameTime);
    }

    // Draw boss
    if (gs.boss.isActive && !gs.boss.isDead) {
      drawBoss(ctx, gs.boss, gs.gameTime);
    }
    if (gs.boss.isDead) {
      drawBossDead(ctx, gs.boss, gs.gameTime);
    }

    // Draw fox
    drawFox(ctx, gs.fox, gs.gameTime);

    // Draw attack effect
    if (gs.fox.isAttacking && gs.fox.attackTimer > 4) {
      const atkX = gs.fox.facingRight ? gs.fox.x + gs.fox.w : gs.fox.x - ATTACK_RANGE;
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const sx = atkX + Math.random() * ATTACK_RANGE;
        const sy = gs.fox.y + Math.random() * gs.fox.h;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (gs.fox.facingRight ? 15 : -15), sy + (Math.random() - 0.5) * 10);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Draw particles
    for (const p of gs.particles) {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      if (p.size <= 2) {
        // Small particles are circles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    }

    // Draw popups
    for (const p of gs.popups) {
      ctx.globalAlpha = Math.min(1, p.life / (p.maxLife * 0.3));
      ctx.fillStyle = p.color;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.text, p.x, p.y);
      ctx.globalAlpha = 1;
    }

    // Hidden initials on a tree (forest zone)
    if (zone === 0) {
      const treeX = gs.secretRoomX;
      if (Math.abs(gs.fox.x - treeX) < 60) {
        ctx.fillStyle = '#8B4513';
        ctx.font = '10px monospace';
        ctx.globalAlpha = 0.6;
        ctx.fillText('HJ', treeX + 5, 408);
        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();

    // HUD
    drawHUD(ctx, gs);

    // Tip
    if (gs.showTip) {
      ctx.globalAlpha = Math.min(1, gs.tipTimer / 30);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      const tipW = ctx.measureText(gs.currentTip).width + 40;
      ctx.fillRect(CANVAS_W / 2 - tipW / 2, CANVAS_H - 45, tipW, 30);
      ctx.fillStyle = '#facc15';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(gs.currentTip, CANVAS_W / 2, CANVAS_H - 26);
      ctx.globalAlpha = 1;
    }

    // "WAS THIS SUPPOSED TO HAPPEN??" popup
    if (gs.wasThisSupposedToHappen && gs.wasThisTimer > 0) {
      gs.wasThisTimer--;
      ctx.fillStyle = 'rgba(255,0,0,0.15)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.globalAlpha = Math.min(1, gs.wasThisTimer / 30);
      ctx.fillText('WAS THIS SUPPOSED TO HAPPEN??', CANVAS_W / 2, CANVAS_H / 2);
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  // ---- BACKGROUND PER ZONE ----
  function drawBackground(ctx: CanvasRenderingContext2D, gs: GameState, cam: Vec2, zone: number) {
    ctx.save();
    const parallax = 0.2;

    if (zone === 0) {
      // Forest - trees, moon
      drawMoon(ctx, 600 - cam.x * parallax * 0.5, 60, 35);
      // Background trees
      for (let i = 0; i < 15; i++) {
        const tx = i * 200 - (cam.x * parallax) % 200;
        drawTree(ctx, tx, 250, 0.6);
      }
    } else if (zone === 1) {
      // Crystal Cave - crystals on ceiling
      drawCrystals(ctx, cam, parallax);
    } else if (zone === 2) {
      // Storm - dark clouds, occasional lightning
      drawStormClouds(ctx, cam, parallax, gs.gameTime);
    } else {
      // Shadow Realm - floating eyes, dark mist
      drawShadowBg(ctx, cam, parallax, gs.gameTime);
    }
    ctx.restore();
  }

  function drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ZONE_COLORS[0].bg1;
    ctx.beginPath();
    ctx.arc(x + 10, y - 5, r * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.fillStyle = '#1a3a1a';
    ctx.globalAlpha = 0.5;
    // Trunk
    ctx.fillRect(x + 15 * scale, y, 10 * scale, 170);
    // Canopy
    ctx.beginPath();
    ctx.arc(x + 20 * scale, y, 30 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawCrystals(ctx: CanvasRenderingContext2D, cam: Vec2, parallax: number) {
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 20; i++) {
      const cx = i * 150 - (cam.x * parallax) % 150;
      const cy = 30 + Math.sin(i) * 20;
      ctx.fillStyle = i % 2 === 0 ? '#f0abfc' : '#5eead4';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - 8, cy + 30);
      ctx.lineTo(cx + 8, cy + 30);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawStormClouds(ctx: CanvasRenderingContext2D, cam: Vec2, parallax: number, time: number) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#374151';
    for (let i = 0; i < 8; i++) {
      const cx = i * 200 - (cam.x * parallax) % 200;
      ctx.beginPath();
      ctx.arc(cx, 40 + Math.sin(i + time * 0.01) * 10, 50, 0, Math.PI * 2);
      ctx.fill();
    }
    // Lightning flash
    if (Math.random() < 0.005) {
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }
    ctx.globalAlpha = 1;
  }

  function drawShadowBg(ctx: CanvasRenderingContext2D, cam: Vec2, parallax: number, time: number) {
    ctx.globalAlpha = 0.2;
    // Floating eyes
    for (let i = 0; i < 6; i++) {
      const ex = i * 250 - (cam.x * parallax) % 250 + Math.sin(time * 0.02 + i) * 20;
      const ey = 100 + Math.cos(time * 0.015 + i * 2) * 30;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(ex, ey, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex + 12, ey, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // ---- PLATFORM DRAWING ----
  function drawPlatform(ctx: CanvasRenderingContext2D, plat: Platform, zone: number, zc: typeof ZONE_COLORS[0]) {
    if (plat.type === 'ground') {
      // Ground with grass/crystal/snow/shadow top
      ctx.fillStyle = zc.ground;
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

      // Top decoration
      const topColors = ['#4ade80', '#5eead4', '#e2e8f0', '#a855f7'];
      ctx.fillStyle = topColors[zone];
      ctx.fillRect(plat.x, plat.y, plat.w, 4);

      // Grass tufts / crystal shards / etc
      ctx.fillStyle = topColors[zone];
      for (let gx = plat.x + 10; gx < plat.x + plat.w - 10; gx += 20) {
        if (zone === 0) {
          // Grass
          ctx.fillRect(gx, plat.y - 6, 2, 6);
          ctx.fillRect(gx + 5, plat.y - 4, 2, 4);
        } else if (zone === 1) {
          // Small crystals
          ctx.beginPath();
          ctx.moveTo(gx, plat.y);
          ctx.lineTo(gx - 3, plat.y - 8);
          ctx.lineTo(gx + 3, plat.y - 8);
          ctx.closePath();
          ctx.fill();
        } else if (zone === 2) {
          // Snow lumps
          ctx.beginPath();
          ctx.arc(gx, plat.y, 5, Math.PI, 0);
          ctx.fill();
        } else {
          // Shadow wisps
          ctx.fillRect(gx, plat.y - 3, 3, 3);
        }
      }
    } else {
      // Floating platform
      ctx.fillStyle = zc.ground;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.fillStyle = ZONE_COLORS[zone].accent;
      ctx.fillRect(plat.x, plat.y, plat.w, 3);
      ctx.globalAlpha = 1;
    }
  }

  // ---- HAZARD DRAWING (obviously dangerous!) ----
  function drawHazard(ctx: CanvasRenderingContext2D, haz: Hazard) {
    const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 0.8;

    // Glow effect
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 8;

    switch (haz.type) {
      case 'spike':
        // Red/orange spikes - very obvious
        ctx.fillStyle = `rgba(255, 68, 68, ${pulse})`;
        for (let sx = haz.x; sx < haz.x + haz.w; sx += 8) {
          ctx.beginPath();
          ctx.moveTo(sx, haz.y + haz.h);
          ctx.lineTo(sx + 4, haz.y);
          ctx.lineTo(sx + 8, haz.y + haz.h);
          ctx.closePath();
          ctx.fill();
        }
        // Warning symbol
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('!', haz.x + haz.w / 2, haz.y - 3);
        break;
      case 'thorns':
        // Purple thorny vines
        ctx.fillStyle = `rgba(168, 85, 247, ${pulse})`;
        ctx.beginPath();
        for (let tx = haz.x; tx < haz.x + haz.w; tx += 6) {
          const th = 5 + Math.sin(tx * 0.5) * 8;
          ctx.moveTo(tx, haz.y + haz.h);
          ctx.lineTo(tx + 3, haz.y + haz.h - th);
          ctx.lineTo(tx + 6, haz.y + haz.h);
        }
        ctx.fill();
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('!', haz.x + haz.w / 2, haz.y - 3);
        break;
      case 'crystal':
        // Glowing pink crystals
        ctx.fillStyle = `rgba(240, 171, 252, ${pulse})`;
        for (let cx = haz.x; cx < haz.x + haz.w; cx += 10) {
          ctx.beginPath();
          ctx.moveTo(cx, haz.y + haz.h);
          ctx.lineTo(cx + 3, haz.y);
          ctx.lineTo(cx + 7, haz.y + haz.h * 0.4);
          ctx.lineTo(cx + 10, haz.y + haz.h);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('!', haz.x + haz.w / 2, haz.y - 3);
        break;
      case 'lightning':
        // Electric crackle
        ctx.strokeStyle = `rgba(250, 204, 21, ${pulse})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(haz.x + haz.w / 2, haz.y);
        let lx = haz.x + haz.w / 2;
        let ly = haz.y;
        for (let i = 0; i < 5; i++) {
          lx += (Math.random() - 0.5) * 10;
          ly += haz.h / 5;
          ctx.lineTo(lx, ly);
        }
        ctx.stroke();
        // Spark
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(haz.x + haz.w / 2, haz.y + haz.h / 2, 3, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'shadow':
        // Dark shadow blob
        ctx.fillStyle = `rgba(88, 28, 135, ${pulse})`;
        ctx.beginPath();
        ctx.arc(haz.x + haz.w / 2, haz.y + haz.h / 2, haz.w / 2, 0, Math.PI * 2);
        ctx.fill();
        // Red eyes
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(haz.x + haz.w / 2 - 5, haz.y + haz.h / 2 - 2, 2, 0, Math.PI * 2);
        ctx.arc(haz.x + haz.w / 2 + 5, haz.y + haz.h / 2 - 2, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    ctx.shadowBlur = 0;
  }

  // ---- OVERHEAD OBSTACLES ----
  function drawOverhead(ctx: CanvasRenderingContext2D, oh: OverheadObstacle) {
    const wobble = Math.sin(Date.now() * 0.003) * 2;
    ctx.globalAlpha = 0.85;

    switch (oh.type) {
      case 'branch':
        ctx.fillStyle = '#5c3a1e';
        ctx.fillRect(oh.x, oh.y, oh.w, oh.h);
        // Leaves
        ctx.fillStyle = '#166534';
        ctx.beginPath();
        ctx.arc(oh.x + 10, oh.y, 12, 0, Math.PI * 2);
        ctx.arc(oh.x + oh.w - 10, oh.y, 12, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'stalactite':
        ctx.fillStyle = '#7dd3fc';
        for (let sx = oh.x; sx < oh.x + oh.w; sx += 12) {
          ctx.beginPath();
          ctx.moveTo(sx, oh.y);
          ctx.lineTo(sx + 6, oh.y + oh.h + wobble);
          ctx.lineTo(sx + 12, oh.y);
          ctx.closePath();
          ctx.fill();
        }
        break;
      case 'cloud':
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(oh.x + oh.w / 2, oh.y + 10, 25, 0, Math.PI * 2);
        ctx.arc(oh.x + oh.w / 2 - 20, oh.y + 15, 18, 0, Math.PI * 2);
        ctx.arc(oh.x + oh.w / 2 + 20, oh.y + 15, 18, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'darkbeam':
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(oh.x, oh.y, oh.w, oh.h);
        // Purple glow
        ctx.shadowColor = '#7c3aed';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 1;
        ctx.strokeRect(oh.x, oh.y, oh.w, oh.h);
        ctx.shadowBlur = 0;
        break;
    }

    // "DUCK!" hint near overhead
    const fox = gameStateRef.current?.fox;
    if (fox && Math.abs(fox.x - oh.x) < 80 && !fox.isDucking) {
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DUCK!', oh.x + oh.w / 2, oh.y - 10);
    }

    ctx.globalAlpha = 1;
  }

  // ---- COLLECTIBLES ----
  function drawCollectible(ctx: CanvasRenderingContext2D, col: Collectible, time: number) {
    const bob = Math.sin(col.bobPhase) * 4;
    ctx.save();
    ctx.translate(col.x, col.y + bob);

    switch (col.type) {
      case 'berry':
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(-2, -9, 4, 4);
        break;
      case 'firefly':
        ctx.fillStyle = '#ccff00'; // Neon yellow!
        ctx.shadowColor = '#ccff00';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
      case 'potato':
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#92400e';
        ctx.fillRect(-1, -3, 2, 2);
        ctx.fillRect(3, 0, 2, 2);
        break;
      case 'shield':
        // Mint green shield
        ctx.fillStyle = '#6ee7b7';
        ctx.shadowColor = '#6ee7b7';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, -4);
        ctx.lineTo(10, 4);
        ctx.lineTo(0, 12);
        ctx.lineTo(-10, 4);
        ctx.lineTo(-10, -4);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('A', 0, 3);
        break;
      case 'speed':
        ctx.fillStyle = '#fb923c';
        ctx.shadowColor = '#fb923c';
        ctx.shadowBlur = 8;
        // Lightning bolt shape
        ctx.beginPath();
        ctx.moveTo(2, -10);
        ctx.lineTo(-5, 1);
        ctx.lineTo(0, 1);
        ctx.lineTo(-2, 10);
        ctx.lineTo(5, -1);
        ctx.lineTo(0, -1);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
      case 'secret':
        ctx.fillStyle = '#f0abfc';
        ctx.shadowColor = '#f0abfc';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        // Star shape
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const r = i === 0 ? 0 : 8;
          const method = i === 0 ? 'moveTo' : 'lineTo';
          ctx[method](Math.cos(angle) * r, Math.sin(angle) * r);
          const angle2 = angle + (2 * Math.PI) / 5;
          ctx.lineTo(Math.cos(angle2) * 4, Math.sin(angle2) * 4);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
    }
    ctx.restore();
  }

  // ---- ENEMIES ----
  function drawEnemy(ctx: CanvasRenderingContext2D, en: Enemy, time: number) {
    if (en.dead) {
      ctx.globalAlpha = en.deathTimer / 30;
    }

    const bounce = Math.sin(time * 0.1) * 2;

    switch (en.type) {
      case 'slime':
        // Green slime blob
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.ellipse(en.x + en.w / 2, en.y + en.h - 5 + bounce, en.w / 2, en.h / 2 + 3, 0, 0, Math.PI * 2);
        ctx.fill();
        // Face
        ctx.fillStyle = '#000';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(en.expression, en.x + en.w / 2, en.y + en.h / 2 + bounce);
        break;
      case 'bat':
        // Purple bat
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(en.x + 8, en.y + 8, 16, 14);
        // Wings
        const wingUp = Math.sin(time * 0.2) * 5;
        ctx.beginPath();
        ctx.moveTo(en.x + 8, en.y + 12);
        ctx.lineTo(en.x - 5, en.y + 5 + wingUp);
        ctx.lineTo(en.x + 5, en.y + 15);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(en.x + 24, en.y + 12);
        ctx.lineTo(en.x + 37, en.y + 5 + wingUp);
        ctx.lineTo(en.x + 27, en.y + 15);
        ctx.closePath();
        ctx.fill();
        // Face
        ctx.fillStyle = '#fff';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(en.expression, en.x + en.w / 2, en.y + 20);
        break;
      case 'golem':
        // Gray rocky golem
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(en.x + 4, en.y + 4, en.w - 8, en.h - 4);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(en.x + 6, en.y + 2, en.w - 12, 8);
        // Face
        ctx.fillStyle = '#facc15';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(en.expression, en.x + en.w / 2, en.y + en.h / 2 + 5);
        break;
      case 'shadow':
        // Dark shadow creature
        ctx.fillStyle = 'rgba(88, 28, 135, 0.8)';
        ctx.beginPath();
        ctx.ellipse(en.x + en.w / 2, en.y + en.h / 2 + bounce, en.w / 2, en.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Glowing eyes
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(en.x + en.w / 2 - 5, en.y + en.h / 2 - 3, 3, 0, Math.PI * 2);
        ctx.arc(en.x + en.w / 2 + 5, en.y + en.h / 2 - 3, 3, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    // Health bar for enemies with > 1 hp
    if (en.maxHealth > 1 && !en.dead) {
      ctx.fillStyle = '#333';
      ctx.fillRect(en.x, en.y - 8, en.w, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(en.x, en.y - 8, en.w * (en.health / en.maxHealth), 4);
    }

    ctx.globalAlpha = 1;
  }

  // ---- BOSS ----
  function drawBoss(ctx: CanvasRenderingContext2D, boss: Boss, time: number) {
    const shake = boss.phase === 1 ? Math.sin(time * 0.3) * 2 : 0;
    ctx.save();
    ctx.translate(shake, 0);

    // Hot pink boss health bar
    ctx.fillStyle = '#333';
    ctx.fillRect(CANVAS_W / 2 - 150 - gameStateRef.current!.camera.x + boss.x - 100, 30, 300, 16);
    ctx.fillStyle = '#ff0066'; // HOT PINK
    ctx.fillRect(CANVAS_W / 2 - 150 - gameStateRef.current!.camera.x + boss.x - 100, 30, 300 * (boss.health / boss.maxHealth), 16);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SHADOW KING', boss.x + boss.w / 2, 42);

    // Boss body
    ctx.fillStyle = boss.phase === 0 ? '#4a1a6b' : '#6b1a4a';
    ctx.fillRect(boss.x, boss.y, boss.w, boss.h);

    // Crown
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(boss.x + 10, boss.y);
    ctx.lineTo(boss.x + 15, boss.y - 15);
    ctx.lineTo(boss.x + 25, boss.y - 5);
    ctx.lineTo(boss.x + 35, boss.y - 18);
    ctx.lineTo(boss.x + 45, boss.y - 5);
    ctx.lineTo(boss.x + 55, boss.y - 15);
    ctx.lineTo(boss.x + 65, boss.y);
    ctx.closePath();
    ctx.fill();

    // Eyes
    const eyeGlow = boss.phase === 1 ? '#ff0000' : '#ff4488';
    ctx.fillStyle = eyeGlow;
    ctx.beginPath();
    ctx.arc(boss.x + 25, boss.y + 25, 8, 0, Math.PI * 2);
    ctx.arc(boss.x + 55, boss.y + 25, 8, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(boss.x + 25, boss.y + 25, 4, 0, Math.PI * 2);
    ctx.arc(boss.x + 55, boss.y + 25, 4, 0, Math.PI * 2);
    ctx.fill();

    // Mouth/expression
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(boss.expression, boss.x + boss.w / 2, boss.y + boss.h - 5);

    ctx.restore();
  }

  function drawBossDead(ctx: CanvasRenderingContext2D, boss: Boss, time: number) {
    ctx.globalAlpha = 0.5 + Math.sin(time * 0.1) * 0.2;
    ctx.fillStyle = '#4a1a6b';
    ctx.fillRect(boss.x + 5, boss.y + 30, boss.w - 10, boss.h - 30);
    ctx.fillStyle = '#888';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('x_x', boss.x + boss.w / 2, boss.y + boss.h / 2 + 10);
    ctx.globalAlpha = 1;
  }

  // ---- FOX DRAWING ----
  function drawFox(ctx: CanvasRenderingContext2D, fox: Fox, time: number) {
    ctx.save();
    ctx.translate(fox.x + fox.w / 2, fox.y + fox.h / 2);
    if (!fox.facingRight) ctx.scale(-1, 1);

    // Invincibility flash
    if (fox.invincible > 0 && Math.floor(fox.invincible / 4) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Trip wobble
    if (fox.tripping) {
      ctx.rotate(Math.sin(time * 0.5) * 0.2);
    }

    const halfW = fox.w / 2;
    const halfH = fox.h / 2;

    // Shield aura (mint green!)
    if (fox.hasShield) {
      ctx.strokeStyle = '#6ee7b7';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#6ee7b7';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, halfW + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Speed boost trail
    if (fox.hasSpeedBoost) {
      ctx.fillStyle = 'rgba(251, 146, 60, 0.3)';
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(-fox.facingRight * i * 8, 0, halfW - i * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Body
    ctx.fillStyle = '#f97316';
    if (fox.isDucking) {
      // Ducking - flattened
      ctx.fillRect(-halfW, -4, fox.w, fox.h / 2 + 4);
      // Tail flat
      ctx.fillStyle = '#fb923c';
      ctx.beginPath();
      ctx.ellipse(-halfW - 5, 4, 10, 5, 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Normal body
      ctx.beginPath();
      ctx.ellipse(0, 4, halfW, halfH - 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.ellipse(2, 8, halfW - 8, halfH - 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.fillStyle = '#fb923c';
      const tailWag = Math.sin(time * 0.15) * 0.3;
      ctx.beginPath();
      ctx.ellipse(-halfW - 5, -2, 12, 6, tailWag - 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(-halfW - 10, -4, 5, 3, tailWag - 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Head
    ctx.fillStyle = '#f97316';
    const headY = fox.isDucking ? -8 : -halfH + 2;
    ctx.beginPath();
    ctx.arc(4, headY, 10, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(-2, headY - 8);
    ctx.lineTo(-6, headY - 18);
    ctx.lineTo(3, headY - 8);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(6, headY - 8);
    ctx.lineTo(10, headY - 18);
    ctx.lineTo(14, headY - 8);
    ctx.closePath();
    ctx.fill();

    // Inner ears
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(-1, headY - 9);
    ctx.lineTo(-4, headY - 15);
    ctx.lineTo(2, headY - 9);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(7, headY - 9);
    ctx.lineTo(9, headY - 15);
    ctx.lineTo(13, headY - 9);
    ctx.closePath();
    ctx.fill();

    // Eyes
    if (fox.eyesWide) {
      // O_O wide eyes near obstacles!
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, headY - 1, 4, 0, Math.PI * 2);
      ctx.arc(9, headY - 1, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, headY - 1, 2, 0, Math.PI * 2);
      ctx.arc(9, headY - 1, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Normal cute eyes
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, headY - 1, 2, 0, Math.PI * 2);
      ctx.arc(9, headY - 1, 2, 0, Math.PI * 2);
      ctx.fill();
      // Eye shine
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(1, headY - 2, 1, 0, Math.PI * 2);
      ctx.arc(10, headY - 2, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nose
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(6, headY + 3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Trip animation - tongue out
    if (fox.tripping) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(8, headY + 7, 3, 5, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ---- HUD ----
  function drawHUD(ctx: CanvasRenderingContext2D, gs: GameState) {
    const fox = gs.fox;

    // Health bar
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(10, 10, 160, 22);
    ctx.fillStyle = fox.health > 3 ? '#4ade80' : fox.health > 1 ? '#facc15' : '#ef4444';
    ctx.fillRect(12, 12, 156 * (fox.health / fox.maxHealth), 18);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`HP: ${fox.health}/${fox.maxHealth}`, 16, 26);

    // Score
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${fox.score}`, CANVAS_W - 10, 26);

    // Zone name
    const zc = ZONE_COLORS[gs.currentZone];
    ctx.fillStyle = zc.accent;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(ZONE_NAMES[gs.currentZone], CANVAS_W / 2, 26);

    // Zone progress bar
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(CANVAS_W / 2 - 100, 30, 200, 6);
    const progress = Math.min(1, fox.x / gs.worldWidth);
    ctx.fillStyle = zc.accent;
    ctx.fillRect(CANVAS_W / 2 - 100, 30, 200 * progress, 6);

    // Active power-ups
    let puY = 40;
    if (fox.hasShield) {
      ctx.fillStyle = '#6ee7b7';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Shield: ${Math.ceil(fox.shieldTimer / 60)}s`, 12, puY + 12);
      puY += 16;
    }
    if (fox.hasSpeedBoost) {
      ctx.fillStyle = '#fb923c';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Speed: ${Math.ceil(fox.speedBoostTimer / 60)}s`, 12, puY + 12);
      puY += 16;
    }

    // Combo display
    if (fox.combo > 1) {
      const comboColors = ['#4ade80', '#facc15', '#fb923c', '#f87171', '#a78bfa', '#f472b6'];
      ctx.fillStyle = comboColors[Math.min(fox.combo - 2, comboColors.length - 1)];
      ctx.font = `bold ${18 + fox.combo * 2}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(`${fox.combo}x COMBO!`, CANVAS_W / 2, 60);
    }

    // Controls hint (fades after a few seconds)
    if (gs.gameTime < 300) {
      ctx.globalAlpha = Math.max(0, 1 - gs.gameTime / 300);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(CANVAS_W / 2 - 180, CANVAS_H - 80, 360, 65);
      ctx.fillStyle = '#fff';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Arrow Keys / WASD: Move & Jump', CANVAS_W / 2, CANVAS_H - 62);
      ctx.fillText('DOWN: Duck | X/J: Attack', CANVAS_W / 2, CANVAS_H - 48);
      ctx.fillText('Double Jump enabled! (floaty~)', CANVAS_W / 2, CANVAS_H - 34);
      ctx.fillText('Press arrows to move, release to stop', CANVAS_W / 2, CANVAS_H - 20);
      ctx.globalAlpha = 1;
    }
  }

  // ---- TITLE SCREEN ----
  function drawTitle(ctx: CanvasRenderingContext2D) {
    // Dark gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    grad.addColorStop(0, '#0d1a0d');
    grad.addColorStop(1, '#1a0d2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Stars
    const time = Date.now() * 0.001;
    for (let i = 0; i < 50; i++) {
      const sx = (i * 137.5 + time * 10) % CANVAS_W;
      const sy = (i * 97.3) % (CANVAS_H - 100);
      ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(time + i) * 0.2})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Fireflies
    for (let i = 0; i < 8; i++) {
      const fx = 100 + i * 90 + Math.sin(time * 0.8 + i * 2) * 30;
      const fy = 200 + Math.cos(time * 0.5 + i * 1.5) * 50;
      ctx.fillStyle = '#ccff00';
      ctx.shadowColor = '#ccff00';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(fx, fy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Title
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 42px monospace';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 20;
    ctx.fillText('SURVIVE THE NIGHT', CANVAS_W / 2, 140);
    ctx.shadowBlur = 0;

    // Subtitle
    ctx.fillStyle = '#facc15';
    ctx.font = '18px monospace';
    ctx.fillText('A Fox Platformer Adventure', CANVAS_W / 2, 175);

    // Team names
    ctx.fillStyle = '#4ade80';
    ctx.font = '14px monospace';
    ctx.fillText('Made by Hifsa, Ayesha & Aliza', CANVAS_W / 2, 210);

    // Fox illustration
    ctx.save();
    ctx.translate(CANVAS_W / 2, 290);
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.ellipse(0, 10, 30, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(12, -10, 14, 0, Math.PI * 2);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.moveTo(5, -20);
    ctx.lineTo(0, -35);
    ctx.lineTo(12, -22);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(15, -20);
    ctx.lineTo(22, -35);
    ctx.lineTo(25, -22);
    ctx.closePath();
    ctx.fill();
    // Eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(8, -12, 3, 0, Math.PI * 2);
    ctx.arc(18, -12, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(9, -13, 1.5, 0, Math.PI * 2);
    ctx.arc(19, -13, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Nose
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(15, -7, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Tail
    ctx.fillStyle = '#fb923c';
    ctx.beginPath();
    ctx.ellipse(-30, 5, 18, 8, -0.5 + Math.sin(time * 2) * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(-38, 2, 8, 4, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Start prompt
    const blink = Math.sin(time * 3) > 0;
    if (blink) {
      ctx.fillStyle = '#fff';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Press ENTER to Start', CANVAS_W / 2, 380);
    }

    // Tips at bottom
    const tipIdx = Math.floor(time / 4) % RANDOM_TIPS.length;
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '11px monospace';
    ctx.fillText(RANDOM_TIPS[tipIdx], CANVAS_W / 2, CANVAS_H - 20);

    // Course info
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px monospace';
    ctx.fillText('Parallel and Distributed Computing Lab Project', CANVAS_W / 2, CANVAS_H - 5);
  }

  // ---- GAME OVER SCREEN ----
  function drawGameOver(ctx: CanvasRenderingContext2D, gs: GameState) {
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Game over text
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', CANVAS_W / 2, 150);

    // Random message
    ctx.fillStyle = '#facc15';
    ctx.font = '18px monospace';
    ctx.fillText(gs.gameOverMessage, CANVAS_W / 2, 200);

    // Score
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.fillText(`Final Score: ${gs.fox.score}`, CANVAS_W / 2, 260);

    // Zone reached
    ctx.fillStyle = ZONE_COLORS[gs.currentZone].accent;
    ctx.fillText(`Reached: ${ZONE_NAMES[gs.currentZone]}`, CANVAS_W / 2, 290);

    // Tips
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '12px monospace';
    ctx.fillText(RANDOM_TIPS[Math.floor(Date.now() / 3000) % RANDOM_TIPS.length], CANVAS_W / 2, 340);

    // Restart
    const blink = Math.sin(Date.now() * 0.003) > 0;
    if (blink) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '16px monospace';
      ctx.fillText('Press ENTER to Try Again', CANVAS_W / 2, 400);
    }
  }

  // ---- CREDITS SCREEN ----
  function drawCredits(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#0d1a0d';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Victory!
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('YOU SURVIVED THE NIGHT!', CANVAS_W / 2, 80);

    // Stars
    const time = Date.now() * 0.001;
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = ['#ff0066', '#facc15', '#4ade80', '#7dd3fc', '#a78bfa', '#f472b6'][i % 6];
      const sx = 100 + i * 22 + Math.sin(time + i) * 5;
      const sy = 110 + Math.sin(time * 2 + i * 0.5) * 8;
      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Team credits with silly job titles
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('THE TEAM', CANVAS_W / 2, 170);

    const credits = [
      { name: 'Hifsa Jabeen Satti', title: 'Chief Speed Coder & Last-Minute Wizard' },
      { name: 'Ayesha Khan', title: 'Boss Angerer & Chaos Coordinator' },
      { name: 'Aliza Ali', title: 'Mint Shield Defender & Orange Enthusiast' },
    ];

    credits.forEach((c, i) => {
      const bounce = Math.sin(time * 2 + i * 1.5) * 3;
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(c.name, CANVAS_W / 2, 220 + i * 55 + bounce);
      ctx.fillStyle = '#a3a3a3';
      ctx.font = '12px monospace';
      ctx.fillText(c.title, CANVAS_W / 2, 240 + i * 55 + bounce);
    });

    // Personal messages
    ctx.fillStyle = '#6ee7b7';
    ctx.font = '13px monospace';
    ctx.fillText("Hifsa's Speed Boost: she's fast at coding too", CANVAS_W / 2, 400);
    ctx.fillText("(Actually Hifsa is too lazy yet she can complete", CANVAS_W / 2, 418);
    ctx.fillText("everything at the last moment haha)", CANVAS_W / 2, 436);

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('THANKS FOR PLAYING!', CANVAS_W / 2, 475);

    // Back to title
    const blink = Math.sin(time * 3) > 0;
    if (blink) {
      ctx.fillStyle = '#fff';
      ctx.font = '12px monospace';
      ctx.fillText('Press ENTER to return to title', CANVAS_W / 2, CANVAS_H - 10);
    }
  }

  // ---- RENDER ROUTER ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const renderLoop = () => {
      const gs = gameStateRef.current;

      if (!gs) {
        drawTitle(ctx);
      } else if (gs.phase === 'gameover') {
        drawGameOver(ctx, gs);
      } else if (gs.phase === 'credits') {
        drawCredits(ctx);
      }
      // 'playing' is handled in the game loop

      requestAnimationFrame(renderLoop);
    };

    const id = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(id);
  }, [screenState]);

  // ---- CLICK TO START ----
  const handleCanvasClick = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs || gs.phase === 'title') {
      gameStateRef.current = initGame();
      setScreenState('playing');
    } else if (gs.phase === 'gameover' || gs.phase === 'victory') {
      gameStateRef.current = initGame();
      setScreenState('playing');
    } else if (gs.phase === 'credits') {
      gameStateRef.current = null;
      setScreenState('title');
    }
  }, [initGame]);

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={handleCanvasClick}
        className="border-2 border-orange-500 rounded-lg cursor-pointer"
        style={{ imageRendering: 'pixelated', maxWidth: '100%', height: 'auto' }}
      />

      {/* Mobile Controls */}
      <div className="flex flex-wrap justify-center gap-2 md:hidden">
        <div className="flex gap-1">
          <button
            onTouchStart={() => handleMobileAction('left')}
            onTouchEnd={() => handleMobileAction('left-up')}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg active:bg-gray-600 text-xl select-none"
          >
            ←
          </button>
          <button
            onTouchStart={() => handleMobileAction('right')}
            onTouchEnd={() => handleMobileAction('right-up')}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg active:bg-gray-600 text-xl select-none"
          >
            →
          </button>
        </div>
        <div className="flex gap-1">
          <button
            onTouchStart={() => handleMobileAction('jump')}
            className="bg-orange-600 text-white px-4 py-3 rounded-lg active:bg-orange-400 text-sm font-bold select-none"
          >
            JUMP
          </button>
          <button
            onTouchStart={() => handleMobileAction('duck')}
            onTouchEnd={() => handleMobileAction('duck-up')}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg active:bg-gray-500 text-sm font-bold select-none"
          >
            DUCK
          </button>
          <button
            onTouchStart={() => handleMobileAction('attack')}
            className="bg-red-700 text-white px-4 py-3 rounded-lg active:bg-red-500 text-sm font-bold select-none"
          >
            ATK
          </button>
        </div>
      </div>

      {/* Desktop Controls Info */}
      <div className="hidden md:block text-center text-gray-400 text-xs">
        <span className="text-orange-400">Arrow Keys / WASD</span>: Move & Jump |
        <span className="text-yellow-400"> DOWN</span>: Duck |
        <span className="text-red-400"> X/J</span>: Attack |
        <span className="text-blue-400"> Double Jump</span>: Yes, it&apos;s floaty~
      </div>
    </div>
  );
}
