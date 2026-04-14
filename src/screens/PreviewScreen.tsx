import { useGame } from "../hooks/useGame";
import { useLocale } from "../hooks/useLocale";
import {
  Button,
  StrokeFrame,
  SpriteImage,
  StatBar,
  About,
  Logo,
} from "../components";

export default function PreviewScreen() {
  const { setScreen, avatar, pattern, variant, stamina, speed, health } =
    useGame();
  const { t } = useLocale();

  return (
    <div className="flex flex-col w-full flex-1 p-6 gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t.preview.eyebrow}
        </p>
        <Logo size="sm" />
        <h1 className="font-fredoka text-2xl font-bold text-dark mt-1 leading-tight">
          {t.preview.heading}
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

      <div className="flex flex-col gap-2 bg-gray-50 rounded-2xl p-4">
        <StatBar
          label={t.preview.stamina}
          value={stamina}
          color="linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
        />
        <StatBar
          label={t.preview.speed}
          value={speed * 10}
          color="linear-gradient(135deg, #4ade80, #22d3ee)"
        />
        <StatBar
          label={t.preview.health}
          value={health}
          color="linear-gradient(135deg, #f178b6, #f97316)"
        />
      </div>

      <Button onClick={() => setScreen("game")}>{t.preview.start}</Button>
      <About />
    </div>
  );
}
