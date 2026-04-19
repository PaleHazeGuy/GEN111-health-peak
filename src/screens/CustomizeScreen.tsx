import { useState, useRef } from "react";
import { useGame } from "../hooks/useGame";
import { useLocale } from "../hooks/useLocale";
import {
  Button,
  StrokeFrame,
  SpriteImage,
  About,
  ImageFrame,
  Logo,
} from "../components";
import type { AvatarId, Pattern } from "../types";

const AVATARS: AvatarId[] = ["cat", "dog", "rabbit", "hamster"];
const PATTERNS: Pattern[] = ["pattern1", "pattern2", "pattern3", "pattern4"];

export default function CustomizeScreen() {
  const { setScreen, avatar, setAvatar, pattern, setPattern, variant } =
    useGame();
  const { t } = useLocale();
  const [pops, setPops] = useState<number[]>([]);
  const popCounter = useRef(0);

  function triggerPop() {
    const id = ++popCounter.current;
    setPops((p) => [...p, id]);
    setTimeout(() => {
      setPops((p) => p.filter((k) => k !== id));
    }, 440);
  }

  function handleSetAvatar(a: AvatarId) {
    if (a === avatar) return;
    triggerPop();
    setTimeout(() => setAvatar(a), 150);
  }

  function handleSetPattern(p: Pattern) {
    if (p === pattern) return;
    triggerPop();
    setTimeout(() => setPattern(p), 150);
  }

  return (
    <div className="flex flex-col w-full flex-1 p-6 gap-4 select-none">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t.customize.eyebrow}
        </p>
        <Logo size="sm" />
        <h1 className="font-fredoka text-2xl font-bold text-dark mt-1 leading-tight">
          {t.customize.heading}
        </h1>
      </div>

      <div className="relative flex-1 flex items-center justify-center min-h-[200px]">
        <StrokeFrame size={325}>
          <SpriteImage
            src={`/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_idle.png`}
            displayW={250}
            displayH={250}
            className="relative z-10"
          />
        </StrokeFrame>

        {pops.map((id) => (
          <SpriteImage
            key={id}
            src="/visuals/pop.png"
            config={{
              frameW: 411,
              frameH: 424,
              totalFrames: 5,
              cols: 5,
              fps: 4,
              offsetX: 0,
              offsetY: 0,
              drawW: 100,
              drawH: 100,
              scale: 1,
            }}
            displayW={350}
            displayH={350}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] z-20 pointer-events-none"
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {t.customize.avatarLabel}
        </p>
        <div className="flex gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => handleSetAvatar(a)}
              className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 border-2 cursor-pointer transition-all duration-200
                ${
                  avatar === a
                    ? "border-transparent text-white bg-gradient-to-br from-primary to-secondary"
                    : "border-gray-200 bg-white text-dark hover:border-primary/50"
                }`}
            >
              <ImageFrame
                src={`/images/icons/customization/${a}.png`}
                alt={a}
                size={64}
              />
              <span className="text-xs font-semibold capitalize text-inherit">
                {a}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {t.customize.patternLabel}
        </p>
        <div className="flex gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p}
              onClick={() => handleSetPattern(p)}
              className={`relative w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-200 overflow-hidden
                ${
                  pattern === p
                    ? "border-primary scale-110"
                    : "border-gray-200 hover:border-primary/50"
                }`}
            >
              <ImageFrame
                src={`/images/icons/customization/${avatar}_${p}.png`}
                alt={p}
                className="w-full h-full object-cover absolute inset-0"
              />
            </button>
          ))}
        </div>
      </div>

      <Button onClick={() => setScreen("game")}>{t.customize.next}</Button>
      <About />
    </div>
  );
}
