//Knowledge checking shit like when done reading health fact and press next

import type { QuizQuestion } from "../types";

export const KNOWLEDGE_QUESTIONS: QuizQuestion[] = [
  {
    q: "Question 1",
    opts: [
      { icon: "", text: "Incorrect Answer", val: 0 },
      { icon: "", text: "Incorrect Answer", val: 0 },
      { icon: "", text: "Correct Answer", val: 1 },
      { icon: "", text: "Incorrect Answer", val: 0 },
    ],
  },
  {
    q: "Question 2",
    opts: [
      { icon: "", text: "Correct Answer", val: 1 },
      { icon: "", text: "Correct Answer", val: 1 },
      { icon: "", text: "Incorrect Answer", val: 0 },
      { icon: "", text: "Incorrect Answer", val: 0 },
    ],
  },
  {
    q: "Question 3",
    opts: [
      { icon: "", text: "Incorrect Answer", val: 0 },
      { icon: "", text: "Incorrect Answer", val: 0 },
      { icon: "", text: "Incorrect Answer", val: 0 },
      { icon: "", text: "Correct Answer", val: 1 },
    ],
  },
];
