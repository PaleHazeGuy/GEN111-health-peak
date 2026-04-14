import { HEALTH_TIPS, WIN_TIPS, LOSE_TIPS } from "../data/tips";
import { QUIZ_QUESTIONS } from "../data/questions";
//import { KNOWLEDGE_QUESTIONS } from "../data/knowledgeQuestions";

export const en = {
  title: {
    name1: "Health",
    name2: "Peak",
    eyebrow: "Health Campaign GEN111",
    start: "Start",
  },
  
  about: {
    title: "Title",
    body: "Body",
    buttontext: "About this project"
  },

  quiz: {
    questions: QUIZ_QUESTIONS,
    next: "Next",
    finish: "Finish",
  },
  
  components: {
    back: "Back"
  },
  
  tips: HEALTH_TIPS,
  winTips: WIN_TIPS,
  loseTips: LOSE_TIPS,
};

export type Locale = typeof en
