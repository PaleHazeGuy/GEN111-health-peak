import type { AvatarId, Pattern } from "../types";

export interface Avatar {
  id: AvatarId;
  name: string;
  description: string;
}

export const AVATARS: Avatar[] = [
  { id: "cat", name: "Cat", description: "N/A" },
  { id: "dog", name: "Dog", description: "N/A" },
  { id: "rabbit", name: "Rabbit", description: "N/A" },
  { id: "hamster", name: "Hamster", description: "N/A" },
];

export const PATTERNS: Record<AvatarId, Pattern[]> = {
  cat: ["pattern1", "pattern2", "pattern3", "pattern4"],
  dog: ["pattern1", "pattern2", "pattern3", "pattern4"],
  rabbit: ["pattern1", "pattern2", "pattern3", "pattern4"],
  hamster: ["pattern1", "pattern2", "pattern3", "pattern4"],
};

export const PATTERN_LABELS: Record<Pattern, string> = {
  pattern1: "Pattern 1",
  pattern2: "Pattern 2",
  pattern3: "Pattern 3",
  pattern4: "Pattern 4",
};

export function getSpritePath(
  avatar: AvatarId,
  variant: string,
  pattern: Pattern,
  state: "idle" | "walk"
): string {
  return `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_${state}.png`;
}
