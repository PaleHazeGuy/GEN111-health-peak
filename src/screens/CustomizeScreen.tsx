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

  return (
    <div className="flex flex-col w-full flex-1 p-6 gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t.customize.eyebrow}
        </p>
        <Logo size="sm" />
        <h1 className="font-fredoka text-2xl font-bold text-dark mt-1 leading-tight">
          {t.customize.heading}
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[200px]">
        <StrokeFrame size={325}>
          <SpriteImage
            size={300}
            config={{
              src: `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_idle.png`,
              frameSize: 300,
              totalFrames: 0,
              fps: 60,
            }}
          />
        </StrokeFrame>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {t.customize.avatarLabel}
        </p>
        <div className="flex gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
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
                size={32}
              />
              <span className="text-xs font-semibold capitalize text-inherit">
                {a}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {t.customize.patternLabel}
        </p>
        <div className="flex gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p}
              onClick={() => setPattern(p)}
              className={`flex-1 h-16 rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden relative
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

      <Button onClick={() => setScreen("preview")}>{t.customize.next}</Button>
      <About />
    </div>
  );
}
