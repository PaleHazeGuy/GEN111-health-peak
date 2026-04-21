import { useEffect, useRef, useState } from "react";
import {
  useSceneRenderer,
  setupInputHandler,
  setupTouchHandler,
} from "../game/index";

export default function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const distanceRef = useRef(0);
  const [pathLeft, setPathLeft] = useState(20);
  const [pathRight, setPathRight] = useState(80);
  const [spriteX, setSpriteX] = useState(50);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.padding = "0";
    return () => {
      document.body.style.overflow = "";
      document.body.style.padding = "16px";
    };
  }, []);

  useEffect(() => {
    const cleanupKey = setupInputHandler(
      canvasRef,
      (dx) =>
        setSpriteX((x) => Math.min(pathRight, Math.max(pathLeft, x + dx))),
      () => {
        startedRef.current = true;
      },
    );
    const cleanupTouch = setupTouchHandler(
      canvasRef,
      (dx) =>
        setSpriteX((x) => Math.min(pathRight, Math.max(pathLeft, x + dx))),
      () => {
        startedRef.current = true;
      },
    );
    return () => {
      cleanupKey();
      cleanupTouch();
    };
  }, [pathLeft, pathRight]);

  useSceneRenderer(
    canvasRef,
    (left, right) => {
      setPathLeft(left);
      setPathRight(right);
    },
    startedRef,
    distanceRef,
  );

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className="absolute w-4 h-4 bg-red-500 rounded-full"
        style={{
          left: `${spriteX}%`,
          bottom: "10%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="absolute bottom-4 left-4 text-white text-xs font-mono bg-black/40 px-2 py-1 rounded">
        x: {spriteX.toFixed(1)}% | path: {pathLeft.toFixed(1)}% —{" "}
        {pathRight.toFixed(1)}%
      </div>
    </div>
  );
}
