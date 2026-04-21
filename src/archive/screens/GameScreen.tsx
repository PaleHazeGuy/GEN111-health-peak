import { useEffect, useRef, useState } from "react";
import {
  useSceneRenderer,
  useGameRenderer,
  SwipeToStart,
  HUD,
} from "../game/index";
import { useGame } from "../hooks/useGame";
import { computeStats } from "../utils/game";

const MAX_DISTANCE = 2000;

export default function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  const [spriteX, setSpriteX] = useState(50);
  const spriteXRef = useRef(50);
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(0);
  const [pathLeft, setPathLeft] = useState(20);
  const [pathRight, setPathRight] = useState(80);
  const lastTouchX = useRef<number | null>(null);
  const obstaclesRef = useRef<
    { id: number; x: number; y: number; type: string }[]
  >([]);
  const {
    health,
    variant,
    avatar,
    pattern,
    setScreen,
    setDidWin,
    setLastDist,
  } = useGame();
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
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    spriteXRef.current = spriteX;
  }, [spriteX]);

  useEffect(() => {
    distanceRef.current = distance;
  }, [distance]);

  useEffect(() => {
    setSpriteX((x) => Math.min(pathRight, Math.max(pathLeft, x)));
  }, [pathLeft, pathRight]);

  useEffect(() => {
    if (!started) return;

    let d = 0;
    let animFrame: number;
    let last: number | null = null;

    function loop(ts: number) {
      if (!last) last = ts;
      const dt = Math.min(ts - last, 50);
      last = ts;

      const progress = d / MAX_DISTANCE;
      const speed = 15 + progress * 35;

      d += speed * (dt / 1000);

      if (d >= MAX_DISTANCE) {
        setDistance(MAX_DISTANCE);
        setDidWin(true);
        setLastDist(MAX_DISTANCE);
        setScreen("result");
        return;
      }

      setDistance(Math.floor(d));
      animFrame = requestAnimationFrame(loop);
    }

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [started]);

  function getSpeed() {
    const canvas = canvasRef.current;
    if (!canvas) return 0.5;
    const isPortrait = canvas.offsetHeight > canvas.offsetWidth;
    const base = isPortrait ? 390 : 720;
    return (base / canvas.offsetWidth) * MOVE_AMOUNT * 0.1;
  }

  useEffect(() => {
    const held = new Set<string>();
    let animFrame: number;

    function loop() {
      if (held.has("ArrowLeft") || held.has("a")) {
        setSpriteX((x) => Math.max(pathLeft, x - getSpeed()));
      }
      if (held.has("ArrowRight") || held.has("d")) {
        setSpriteX((x) => Math.min(pathRight, x + getSpeed()));
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
    const canvas = canvasRef.current;
    const w = canvas?.offsetWidth ?? 390;
    const isPortrait = (canvas?.offsetHeight ?? 720) > w;
    setSpriteX((x) =>
      Math.min(
        pathRight,
        Math.max(pathLeft, x + (dx / w) * 100 * (isPortrait ? 1.5 : 1.5)),
      ),
    );
    if (!started) setStarted(true);
  }

  function handleTouchEnd() {
    lastTouchX.current = null;
  }

  useSceneRenderer(
    canvasRef,
    (left, right) => {
      setPathLeft(left);
      setPathRight(right);
    },
    startedRef,
    distanceRef,
  );

  useGameRenderer(gameCanvasRef, {
    avatar,
    pattern,
    variant,
    spriteXRef,
    startedRef,
    obstaclesRef,
  });

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
        ref={gameCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {!started && (
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <SwipeToStart
            onComplete={() => setStarted(true)}
            onSwipe={(dx) => {
              const canvas = canvasRef.current;
              const w = canvas?.offsetWidth ?? 390;
              const isPortrait = (canvas?.offsetHeight ?? 720) > w;
              setSpriteX((x) =>
                Math.min(
                  pathRight,
                  Math.max(
                    pathLeft,
                    x + (dx / w) * 100 * (isPortrait ? 0.5 : 0.15),
                  ),
                ),
              );
            }}
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
