import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Screen, Variant, AvatarId, Pattern, Language } from "../types";
import { computeVariant, computeStats } from "../utils/game";

interface GameContextType {
  screen: Screen;
  setScreen: (s: Screen) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  quizAnswers: number[];
  quizScore: number;
  avatar: AvatarId;
  setAvatar: (a: AvatarId) => void;
  pattern: Pattern;
  setPattern: (p: Pattern) => void;
  variant: Variant;
  stamina: number;
  speed: number;
  health: number;
  lastDist: number;
  setLastDist: (d: number) => void;
  didWin: boolean;
  setDidWin: (w: boolean) => void;
  readMore: boolean;
  setReadMore: (r: boolean) => void;
  knowledgeAnswers: number[];
  setKnowledgeAnswers: (a: number[]) => void;
  highscore: number;
  saveHighscore: (dist: number) => boolean;
  finalizeQuiz: (ans: number[]) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("title");
  const [language, setLanguage] = useState<Language>("en");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [avatar, setAvatar] = useState<AvatarId>("cat");
  const [pattern, setPattern] = useState<Pattern>("pattern1");
  const [variant, setVariant] = useState<Variant>("average");
  const [stamina, setStamina] = useState(70);
  const [speed, setSpeed] = useState(5);
  const [health, setHealth] = useState(30);
  const [lastDist, setLastDist] = useState(0);
  const [didWin, setDidWin] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<number[]>([]);
  const [highscore, setHighscore] = useState(
    () => parseFloat(localStorage.getItem("hp_hs") || "0")
  );

  function saveHighscore(dist: number): boolean {
    if (dist > highscore) {
      setHighscore(dist);
      localStorage.setItem("hp_hs", String(dist));
      return true;
    }
    return false;
  }

  function finalizeQuiz(ans: number[]) {
    const total = ans.reduce((a, b) => a + b, 0);
    const v = computeVariant(total);
    const st = computeStats(v);
    setQuizAnswers(ans);
    setQuizScore(total);
    setVariant(v);
    setStamina(st.stamina);
    setSpeed(st.speed);
    setHealth(st.health);
  }

  function resetGame() {
    setScreen("title");
    setQuizAnswers([]);
    setQuizScore(0);
    setAvatar("cat");
    setPattern("pattern1");
    setVariant("average");
    setStamina(70);
    setSpeed(5);
    setHealth(30);
    setLastDist(0);
    setDidWin(false);
    setReadMore(false);
    setKnowledgeAnswers([]);
  }

  return (
    <GameContext.Provider value={{
      screen, setScreen,
      language, setLanguage,
      quizAnswers, quizScore,
      avatar, setAvatar,
      pattern, setPattern,
      variant, stamina, speed, health,
      lastDist, setLastDist,
      didWin, setDidWin,
      readMore, setReadMore,
      knowledgeAnswers, setKnowledgeAnswers,
      highscore, saveHighscore,
      finalizeQuiz, resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
