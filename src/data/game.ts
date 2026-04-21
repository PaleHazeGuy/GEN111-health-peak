// To anyone who maintane this in the future, I've made this shit up cuz I done ilutstrate the shit as u seen in the git the code so fking ass.

// ─── Scene ───────────────────────────────────────────────
export const SCENE = {
  IMG_W: 3147,
  IMG_H: 2360,
  PATH_SCALE: 0.85,
  PATH_OFFSET_X: 6,
  PATH_HEIGHT_SCALE_PORTRAIT: 1.0,
  PATH_HEIGHT_SCALE_LANDSCAPE: 1.5,
  PATH_OFFSET_Y_PORTRAIT: 0, // y offset for path in portrait
  PATH_OFFSET_Y_LANDSCAPE: -125, // y offset for path in landscape
};

// ─── Path bounds ─────────────────────────────────────────
export const PATH_BOUNDS = {
  PORTRAIT_LEFT: 0.31,
  PORTRAIT_RIGHT: 0.67,
  LANDSCAPE_LEFT: 0.33,
  LANDSCAPE_RIGHT: 0.65,
};

// ─── Moving path animation ────────────────────────────────
export const MOVING_PATH = {
  FRAME_W: 500,
  FRAME_H: 375,
  TOTAL_FRAMES: 4,
  FPS_START: 1,
  FPS_END: 12,
};

// ─── Game loop ────────────────────────────────────────────
export const GAME = {
  MAX_DISTANCE: 2000,
  SPEED_START: 15, // m/s at start
  SPEED_END: 50, // m/s at end
};

// ─── Obstacles ────────────────────────────────────────────
export const OBSTACLES = {
  LANES: [35, 50, 65], // x positions in %
  SPAWN_INTERVAL: 2000, // ms between spawns
  SPEED: 0.3, // % per frame
  SIZE: 40, // collision radius px
  DAMAGE: 5, // health damage on hit
  TYPES: ["cone", "sign"] as const,
};

// ─── Sprite ───────────────────────────────────────────────
export const SPRITE = {
  SIZE_PORTRAIT: 0.4, // relative to canvas width
  SIZE_LANDSCAPE: 0.25, // relative to canvas height
  SIZE_MAX: 200, // max px
  BOTTOM_RATIO: 0.2, // bottom offset relative to sprite size
};

// ─── Input ────────────────────────────────────────────────
export const INPUT = {
  MOVE_AMOUNT: 5,
  TOUCH_SPEED_PORTRAIT: 1.5,
  TOUCH_SPEED_LANDSCAPE: 1.5,
  MOUSE_SPEED_PORTRAIT: 1.5,
  MOUSE_SPEED_LANDSCAPE: 1.5,
  KEY_BASE_PORTRAIT: 390,
  KEY_BASE_LANDSCAPE: 720,
};
