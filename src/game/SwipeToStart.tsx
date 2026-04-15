import { useEffect, useRef } from "react";
import { useLocale } from "../hooks/useLocale";
import { Logo } from "../components";

interface SwipeToStartProps {
  onComplete: () => void;
  onSwipe?: (dx: number) => void;
}

export function SwipeToStart({ onComplete, onSwipe }: SwipeToStartProps) {
  const startX = useRef<number | null>(null);
  const lastX = useRef<number | null>(null);
  const { t } = useLocale();
  const THRESHOLD = 150;

  function handleStart(clientX: number) {
    startX.current = clientX;
    lastX.current = clientX;
  }

  function handleMove(clientX: number) {
    if (startX.current === null) return;
    const diff = clientX - startX.current;
    const dx = clientX - (lastX.current ?? clientX);
    lastX.current = clientX;
    onSwipe?.(dx);
    if (Math.abs(diff) >= THRESHOLD) {
      startX.current = null;
      onComplete();
    }
  }

  function handleEnd() {
    startX.current = null;
    lastX.current = null;
  }

  useEffect(() => {
    const held = new Set<string>();
    let animFrame: number;

    function loop() {
      if (held.has("ArrowLeft") || held.has("a")) onSwipe?.(-3);
      if (held.has("ArrowRight") || held.has("d")) onSwipe?.(3);
      animFrame = requestAnimationFrame(loop);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) {
        held.add(e.key);
        onComplete();
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      held.delete(e.key);
    }

    animFrame = requestAnimationFrame(loop);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 select-none cursor-grab"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <div>
        <Logo size="lg" />
        <h1 className="font-fredoka text-2xl font-bold text-white mt-1 leading-tight drop-shadow-lg">
          {t.preview.heading}
        </h1>
      </div>
      <p className="font-fredoka text-white text-2xl font-bold drop-shadow-lg text-center select-none">
        ← {t.preview.start} →
      </p>
    </div>
  );
}
