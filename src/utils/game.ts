import type { Variant, AvatarId, Pattern, GameStats } from "../types";

export function computeVariant(score: number): Variant {
  if (score <= 4) return "fat";
  if (score <= 7) return "average";
  return "skinny";
}

export function computeStats(variant: Variant): GameStats {
  const map: Record<Variant, GameStats> = {
    fat:     { stamina: 85, speed: 3, health: 40},
    average: { stamina: 70, speed: 5, health: 30},
    skinny:  { stamina: 55, speed: 8, health: 20},
  };
  return map[variant];
}

export function getSpritePath(
  avatar: AvatarId,
  variant: Variant,
  pattern: Pattern,
  state: "idle" | "walk"
): string {
  return `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_${state}.png`;
}
