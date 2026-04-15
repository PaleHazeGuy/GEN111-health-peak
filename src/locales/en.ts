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
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",

    buttontext: "About this project",
  },

  quiz: {
    header: "Test",
    eyebrow: "Health Quiz",
    questions: QUIZ_QUESTIONS,
    next: "Next",
    finish: "Finish",
  },

  customize: {
    eyebrow: "avatar customization",
    heading: "Customize your avatar",
    avatarLabel: "Select your avatar",
    patternLabel: "Select the pattern of your avatar",
    next: "Next",
  },

  preview: {
    start: "Swipe to Play",
    heading: "Ready to Climb?",
    stamina: "Stamina",
    health: "Health",
    speed: "Speed",
  },

  components: {
    back: "Back",
  },

  tips: HEALTH_TIPS,
  winTips: WIN_TIPS,
  loseTips: LOSE_TIPS,
};

export type Locale = typeof en;
