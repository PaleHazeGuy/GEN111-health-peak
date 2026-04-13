//Knowledge checking shit like when done reading health fact and press next

import type { QuizQuestion } from "../types";

export const KNOWLEDGE_QUESTIONS: QuizQuestion[] = [
  {
    q: "คําถาม 1",
    opts: [
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
      { icon: "", text: "คําตอบที่ถูกต้อง", val: 1 },
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
    ],
  },
  {
    q: "คําถาม 2",
    opts: [
      { icon: "", text: "คําตอบที่ถูกต้อง", val: 1 },
      { icon: "", text: "คําตอบที่ถูกต้อง", val: 1 },
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
    ],
  },
  {
    q: "คําถาม 3",
    opts: [
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
      { icon: "", text: "คําตอบที่ผิด", val: 0 },
      { icon: "", text: "คําตอบที่ถูกต้อง", val: 1 },
    ],
  },
];
