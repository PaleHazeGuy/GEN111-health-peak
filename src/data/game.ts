// To anyone who maintane this in the future, I've made this shit up cuz I done ilutstrate the shit as u seen in the git the code so fking ass.

// ─── Scene ───────────────────────────────────────────────
export const SCENE = {
  IMG_W: 3147,
  IMG_H: 2360,
  PATH_SCALE: 0.85,
  PATH_OFFSET_X: 6,
  PATH_HEIGHT_EXTRA: 50,
  PATH_HEIGHT_SCALE_PORTRAIT: 1.0,
  PATH_HEIGHT_SCALE_LANDSCAPE: 1.5,
  PATH_OFFSET_Y_PORTRAIT: 0,
  PATH_OFFSET_Y_LANDSCAPE: -125,
};

// ─── Path bounds ─────────────────────────────────────────
export const PATH_BOUNDS = {
  PORTRAIT_LEFT: 0.36,
  PORTRAIT_RIGHT: 0.62,
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
  SPEED_START: 15,
  SPEED_END: 50,
};

// ─── Obstacles ────────────────────────────────────────────
export const OBSTACLES = {
  SPAWN_INTERVAL: 2000,
  DAMAGE: 5,
  TYPES: ["Cone", "Construction", "Construction_2"] as const,
  SPECIAL_TYPES: ["Boulder", "Hole"] as const,

  PORTRAIT: {
    LEFT_START_X: 40,
    LEFT_START_Y: 44,
    LEFT_END_X: 15,
    LEFT_END_Y: 110,
    MID_START_X: 50,
    MID_START_Y: 44,
    MID_END_X: 50,
    MID_END_Y: 110,
    RIGHT_START_X: 59,
    RIGHT_START_Y: 44,
    RIGHT_END_X: 85,
    RIGHT_END_Y: 110,
    START_SCALE: 0.5,
    END_SCALE: 1.4,
    COLLISION_SIZE: 40,
    SPEED: 0.3,
  },

  LANDSCAPE: {
    LEFT_START_X: 48,
    LEFT_START_Y: 50,
    LEFT_END_X: 33,
    LEFT_END_Y: 95,
    MID_START_X: 50,
    MID_START_Y: 50,
    MID_END_X: 50,
    MID_END_Y: 95,
    RIGHT_START_X: 52,
    RIGHT_START_Y: 50,
    RIGHT_END_X: 67,
    RIGHT_END_Y: 95,
    START_SCALE: 0.1,
    END_SCALE: 1.0,
    COLLISION_SIZE: 40,
    SPEED: 0.3,
  },
};

// ─── Sprite ───────────────────────────────────────────────
export const SPRITE = {
  SIZE_PORTRAIT: 0.35,
  SIZE_LANDSCAPE: 0.225,
  SIZE_MAX: 150,
  BOTTOM_RATIO: 0.2,
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
