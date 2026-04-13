import type { Variant, HealthTip } from "../types";

export const HEALTH_TIPS: Record<Variant, HealthTip[]> = {
  fat: [
    { desc: "tip อ้วน 1", url: "https://google.com" },
    { desc: "tip อ้วน 2", url: "https://google.com" },
    { desc: "tip อ้วน 3", url: "https://google.com" },
  ],
  average: [
    { desc: "tip ปกติ 1", url: "https://google.com" },
    { desc: "tip ปกติ 2", url: "https://google.com" },
    { desc: "tip ปกติ 3", url: "https://google.com" },
  ],
  skinny: [
    { desc: "tip ผอม 1", url: "https://google.com" },
    { desc: "tip ผอม 2", url: "https://google.com" },
    { desc: "tip ผอม 3", url: "https://google.com" },
  ],
};

export const WIN_TIPS: string[] = [
  "tip ชนะ 1",
  "tip ชนะ 2",
  "tip ชนะ 3",
];

export const LOSE_TIPS: string[] = [
  "tip เเพ้ 1",
  "tip เเพ้ 2",
];
