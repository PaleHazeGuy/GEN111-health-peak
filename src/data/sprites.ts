import type { AvatarId, Variant } from "../types";

export interface SpriteConfig {
  frameW: number;
  frameH: number;
  totalFrames: number;
  cols: number;
  fps: number;
  offsetX: number;
  offsetY: number;
  drawW: number;
  drawH: number;
  scale: number;
}

export interface AvatarSpriteConfig {
  idle: SpriteConfig;
  walk: SpriteConfig;
}

const AVERAGE_CONFIGS: Record<AvatarId, AvatarSpriteConfig> = {
  cat: {
    idle: {
      frameW: 300,
      frameH: 300,
      totalFrames: 1,
      cols: 1,
      fps: 1,
      offsetX: -6,
      offsetY: 2.5,
      drawW: 100,
      drawH: 100,
      scale: 1.3,
    },
    walk: {
      frameW: 228,
      frameH: 236,
      totalFrames: 3,
      cols: 3,
      fps: 3,
      offsetX: 0,
      offsetY: 0,
      drawW: 100,
      drawH: 100,
      scale: 1,
    },
  },
  dog: {
    idle: {
      frameW: 300,
      frameH: 300,
      totalFrames: 1,
      cols: 1,
      fps: 1,
      offsetX: -2.5,
      offsetY: 2,
      drawW: 100,
      drawH: 100,
      scale: 1.25,
    },
    walk: {
      frameW: 247,
      frameH: 194,
      totalFrames: 3,
      cols: 3,
      fps: 3,
      offsetX: 6.1,
      offsetY: 8,
      drawW: 100,
      drawH: 90,
      scale: 0.9,
    },
  },
  rabbit: {
    idle: {
      frameW: 320,
      frameH: 320,
      totalFrames: 1,
      cols: 1,
      fps: 1,
      offsetX: 10,
      offsetY: 4,
      drawW: 100,
      drawH: 100,
      scale: 1.5,
    },
    walk: {
      frameW: 169,
      frameH: 191,
      totalFrames: 3,
      cols: 3,
      fps: 3,
      offsetX: 3,
      offsetY: 10,
      drawW: 100,
      drawH: 100,
      scale: 0.8,
    },
  },
  hamster: {
    idle: {
      frameW: 300,
      frameH: 300,
      totalFrames: 1,
      cols: 1,
      fps: 1,
      offsetX: 5,
      offsetY: 5,
      drawW: 100,
      drawH: 100,
      scale: 1.25,
    },
    walk: {
      frameW: 94,
      frameH: 94,
      totalFrames: 3,
      cols: 3,
      fps: 3,
      offsetX: 3,
      offsetY: 27,
      drawW: 100,
      drawH: 100,
      scale: 0.4,
    },
  },
};

const FAT_CONFIGS: Record<AvatarId, AvatarSpriteConfig> = AVERAGE_CONFIGS;
const SKINNY_CONFIGS: Record<AvatarId, AvatarSpriteConfig> = AVERAGE_CONFIGS;

export const SPRITE_CONFIGS: Record<
  Variant,
  Record<AvatarId, AvatarSpriteConfig>
> = {
  average: AVERAGE_CONFIGS,
  fat: FAT_CONFIGS,
  skinny: SKINNY_CONFIGS,
};

export function getSpriteConfig(
  avatar: AvatarId,
  variant: Variant,
  state: "idle" | "walk",
): SpriteConfig {
  return SPRITE_CONFIGS[variant][avatar][state];
}
