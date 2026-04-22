import { useEffect, useRef, useState } from "react";
import {
  useSceneRenderer,
  setupInputHandler,
  setupTouchHandler,
  useGameRenderer,
} from "../game/index";
import { useGame } from "../hooks/useGame";
import { computeStats } from "../utils/game";
import { GAME } from "../data/game";

export default function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const distanceRef = useRef(0);
  const spriteXRef = useRef(50);
  const pathLeftRef = useRef(20);
  const pathRightRef = useRef(80);
  const healthRef = useRef(0);
  const [pathLeft, setPathLeft] = useState(20);
  const [pathRight, setPathRight] = useState(80);
  const [displayX, setDisplayX] = useState(50);
  const [displayHealth, setDisplayHealth] = useState(0);
  const [displayDist, setDisplayDist] = useState(0);
  const { avatar, pattern, variant, health, setHealth } = useGame();
  const maxHealth = computeStats(variant).health;

  useEffect(() => {
    healthRef.current = health;
  }, [health]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.padding = "0";
    return () => {
      document.body.style.overflow = "";
      document.body.style.padding = "16px";
    };
  }, []);

  useEffect(() => {
    pathLeftRef.current = pathLeft;
    pathRightRef.current = pathRight;
  }, [pathLeft, pathRight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      spriteXRef.current = Math.min(
        pathRightRef.current,
        Math.max(pathLeftRef.current, spriteXRef.current),
      );
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // display + distance loop — single loop handles everything
  useEffect(() => {
    let animFrame: number;
    let last: number | null = null;
    let d = 0;

    function loop(ts: number) {
      // distance
      if (startedRef.current) {
        if (!last) last = ts;
        const dt = Math.min(ts - last, 50);
        const progress = d / GAME.MAX_DISTANCE;
        const speed =
          GAME.SPEED_START + progress * (GAME.SPEED_END - GAME.SPEED_START);
        d += speed * (dt / 1000);
        if (d >= GAME.MAX_DISTANCE) d = GAME.MAX_DISTANCE;
        distanceRef.current = Math.floor(d);
      }
      last = ts;

      // display
      setDisplayX(parseFloat(spriteXRef.current.toFixed(1)));
      setDisplayHealth(healthRef.current);
      setDisplayDist(distanceRef.current);

      animFrame = requestAnimationFrame(loop);
    }

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    function onStart() {
      startedRef.current = true;
    }

    const cleanupKey = setupInputHandler(
      canvasRef,
      (dx) => {
        spriteXRef.current = Math.min(
          pathRightRef.current,
          Math.max(pathLeftRef.current, spriteXRef.current + dx),
        );
      },
      onStart,
    );
    const cleanupTouch = setupTouchHandler(
      canvasRef,
      (dx) => {
        spriteXRef.current = Math.min(
          pathRightRef.current,
          Math.max(pathLeftRef.current, spriteXRef.current + dx),
        );
      },
      onStart,
    );
    return () => {
      cleanupKey();
      cleanupTouch();
    };
  }, []);

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
    pathLeftRef,
    pathRightRef,
    onHit: (damage) => {
      const newHealth = Math.max(0, healthRef.current - damage);
      setHealth(newHealth);
    },
  });

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas
        ref={gameCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* debug bar */}
      <div className="absolute bottom-4 left-4 text-white text-xs font-mono bg-black/60 px-3 py-2 rounded-xl z-20 flex flex-col gap-1">
        <span>x: {displayX}%</span>
        <span>
          path: {pathLeft.toFixed(1)}% — {pathRight.toFixed(1)}%
        </span>
        <span>dist: {displayDist}m</span>
        <span>
          hp: {displayHealth}/{maxHealth}
        </span>
      </div>
    </div>
  );
}
