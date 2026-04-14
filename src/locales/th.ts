// Thai shit so ass I hate this shit

import { HEALTH_TIPS, WIN_TIPS, LOSE_TIPS } from "../data/tips.th";
import { QUIZ_QUESTIONS } from "../data/questions.th";
//import { KNOWLEDGE_QUESTIONS } from "../data/knowledgeQuestions.th";

export const th = {
  title: {
    name1: "Health",
    name2: "Peak",
    eyebrow: "Health Campaign GEN111",
    start: "เริ่ม",
  },

  about: {
    title: "Title",
    body: "Body",
    buttontext: "เกี่ยวกับโปรเจกต์นี้",
  },

  quiz: {
    header: "Test",
    eyebrow: "คําถามสุขภาพ",
    questions: QUIZ_QUESTIONS,
    next: "ต่อไป",
    finish: "เสร็จสิ้น",
  },

  customize: {
    eyebrow: "เลือกสัตว์เลี้ยงของคุณ!",
    heading: "มาแต่งตัวกัน!!",
    avatarLabel: "เลือกสัตว์เลี้ยงของคุณ!",
    patternLabel: "เลือกลายสัตว์เลี้ยงของคุณ!",
    next: "ต่อไป",
  },

  components: {
    back: "ย้อนกลับ",
  },

  tips: HEALTH_TIPS,
  winTips: WIN_TIPS,
  loseTips: LOSE_TIPS,
};

export type Locale = typeof th;
