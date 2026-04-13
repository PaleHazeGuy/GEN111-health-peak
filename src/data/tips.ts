import type { Variant, HealthTip } from "../types";

export const HEALTH_TIPS: Record<Variant, HealthTip[]> = {
  fat: [
    { desc: "Fat tip 1", url: "https://google.com" },
    { desc: "Fat tip 2", url: "https://google.com" },
    { desc: "Fat tip 3", url: "https://google.com" },
  ],
  average: [
    { desc: "Average tip 1", url: "https://google.com" },
    { desc: "Average tip 2", url: "https://google.com" },
    { desc: "Average tip 3", url: "https://google.com" },
  ],
  skinny: [
    { desc: "Skinny tip 1", url: "https://google.com" },
    { desc: "Skinny tip 2", url: "https://google.com" },
    { desc: "Skinny tip 3", url: "https://google.com" },
  ],
};

export const WIN_TIPS: string[] = [
  "Win tip 1",
  "Win tip 2",
  "Win tip 3",
];

export const LOSE_TIPS: string[] = [
  "Lose tip 1",
  "Lose tip 2",
];
