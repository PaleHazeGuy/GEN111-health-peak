import { useEffect, useRef, useState } from "react";
import {
  useSceneRenderer,
  SwipeToStart,
  SpriteRenderer,
  HUD,
} from "../game/index";
import { useGame } from "../hooks/useGame";
import { computeStats } from "../utils/game";

export default function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const [spriteX, setSpriteX] = useState(50);
  const [distance, setDistance] = useState(0);
  const [pathLeft, setPathLeft] = useState(20);
  const [pathRight, setPathRight] = useState(80);
  const lastTouchX = useRef<number | null>(null);
  const { health, variant, avatar, pattern } = useGame();
  const maxHealth = computeStats(variant).health;
  const MOVE_AMOUNT = 5;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.padding = "0";
    return () => {
      document.body.style.overflow = "";
      document.body.style.padding = "16px";
    };
  }, []);

  useEffect(() => {
    setSpriteX((x) => Math.min(pathRight, Math.max(pathLeft, x)));
  }, [pathLeft, pathRight]);

  useEffect(() => {
    const held = new Set<string>();
    let animFrame: number;

    function loop() {
      if (held.has("ArrowLeft") || held.has("a")) {
        setSpriteX((x) => Math.max(pathLeft, x - MOVE_AMOUNT * 0.1));
      }
      if (held.has("ArrowRight") || held.has("d")) {
        setSpriteX((x) => Math.min(pathRight, x + MOVE_AMOUNT * 0.1));
      }
      animFrame = requestAnimationFrame(loop);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) {
        held.add(e.key);
        if (!started) setStarted(true);
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
  }, [started, pathLeft, pathRight]);

  function handleTouchStart(clientX: number) {
    lastTouchX.current = clientX;
  }

  function handleTouchMove(clientX: number) {
    if (lastTouchX.current === null) return;
    const dx = clientX - lastTouchX.current;
    lastTouchX.current = clientX;
    setSpriteX((x) => Math.min(pathRight, Math.max(pathLeft, x + dx * 0.1)));
    if (!started) setStarted(true);
  }

  function handleTouchEnd() {
    lastTouchX.current = null;
  }

  useSceneRenderer(canvasRef, (left, right) => {
    setPathLeft(left);
    setPathRight(right);
  });

  //useSceneAnimation(glCanvasRef);

  return (
    <div
      className="relative w-full h-full"
      onMouseDown={(e) => handleTouchStart(e.clientX)}
      onMouseMove={(e) => {
        if (lastTouchX.current !== null) handleTouchMove(e.clientX);
      }}
      onMouseUp={handleTouchEnd}
      onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas
        ref={glCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <SpriteRenderer
          avatar={avatar}
          pattern={pattern}
          variant={variant}
          x={spriteX}
          started={started}
        />
      </div>

      {!started && (
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <SwipeToStart
            onComplete={() => setStarted(true)}
            onSwipe={(dx) =>
              setSpriteX((x) =>
                Math.min(pathRight, Math.max(pathLeft, x + dx * 0.1)),
              )
            }
          />
        </div>
      )}

      {started && (
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <HUD health={health} maxHealth={maxHealth} distance={distance} />
        </div>
      )}
    </div>
  );
}
