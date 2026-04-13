//PlaceHolder
// Low = Fat, Mid = Average, High = Thin

import type { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "Question 1 (4 choice answer)",
    opts: [
      { icon: "", text: "Value 1", val: 1 },
      { icon: "", text: "Value 2", val: 2 },
      { icon: "", text: "Value 3", val: 3 },
      { icon: "", text: "Value 2", val: 2 },
    ],
  },
  {
    q: "Question 2 (3 choice answer)",
    opts: [
      { icon: "", text: "Value 1", val: 1 },
      { icon: "", text: "Value 2", val: 2 },
      { icon: "", text: "Value 3", val: 3 },
    ],
  },
  {
    q: "Question 3 (2 choice answer)",
    opts: [
      { icon: "", text: "Value 1", val: 1 },
      { icon: "", text: "Value 2", val: 2 },
    ],
  },
];
