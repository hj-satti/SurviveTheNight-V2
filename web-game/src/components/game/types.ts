// Survive the Night - Type Definitions
// Parallel and Distributed Computing Lab Project

export interface Vec2 {
  x: number;
  y: number;
}

export interface FoxState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  health: number;
  maxHealth: number;
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

export interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'ground' | 'floating' | 'bridge';
  hasGap?: boolean;
  gapX?: number;
  gapW?: number;
}

export interface Hazard {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'spike' | 'thorns' | 'crystal' | 'lightning' | 'shadow';
  zone: number;
}

export interface OverheadObstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'branch' | 'stalactite' | 'cloud' | 'darkbeam';
  zone: number;
}

export interface Enemy {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  type: 'slime' | 'bat' | 'golem' | 'shadow';
  health: number;
  maxHealth: number;
  zone: number;
  expression: string;
  dead: boolean;
  deathTimer: number;
  patrolLeft: number;
  patrolRight: number;
}

export interface Collectible {
  x: number;
  y: number;
  type: 'berry' | 'firefly' | 'potato' | 'shield' | 'speed' | 'secret';
  collected: boolean;
  bobPhase: number;
}

export interface Boss {
  x: number;
  y: number;
  w: number;
  h: number;
  health: number;
  maxHealth: number;
  phase: number;
  attackTimer: number;
  vx: number;
  vy: number;
  expression: string;
  isActive: boolean;
  isDead: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface Popup {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

export type GamePhase = 'title' | 'playing' | 'gameover' | 'victory' | 'credits';

export type ZoneType = 0 | 1 | 2 | 3;

export interface ZoneConfig {
  bg1: string;
  bg2: string;
  ground: string;
  accent: string;
}

export interface GameState {
  phase: GamePhase;
  fox: FoxState;
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
