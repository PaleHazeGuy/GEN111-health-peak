export type Screen =
  | "title"
  | "quiz"
  | "customize"
  | "stats"
  | "game"
  | "result"
  | "knowledgeQuiz"
  | "submit";

export type Variant = "average" | "fat" | "skinny";

export type AvatarId = "cat" | "dog" | "rabbit" | "hamster";

export type Pattern = "pattern1" | "pattern2" | "pattern3" | "pattern4";

export type SpriteState = "idle" | "walk";

export interface QuizOption {
  icon: string;
  text: string;
  val: number;
}

export interface QuizQuestion {
  q: string;
  opts: QuizOption[];
}

export interface HealthTip {
  desc: string;
  url: string;
}

export interface GameStats {
  health : number;
  stamina: number;
  speed: number;
}

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "rock" | "bush" | "tree";
}

export interface EngineGameState {
  px: number;
  py: number;
  pw: number;
  stam: number;
  maxStam: number;
  spd: number;
  dist: number;
  maxDist: number;
  scroll: number;
  obs: Obstacle[];
  obsT: number;
  frame: number;
  W: number;
  H: number;
  avatar: AvatarId;
  variant: Variant;
  pattern: Pattern;
  isWalking: boolean;
}

export interface SubmitData {
  avatar: AvatarId;
  variant: Variant;
  pattern: Pattern;
  quizAnswers: number[];
  quizScore: number;
  gameDist: number;
  didWin: boolean;
  readMore: boolean;
  knowledgeAnswers: number[];
  timestamp: string;
}
