import { useEffect, useRef, useState } from "react";
import { useSceneRenderer } from "../game/SceneRenderer";
import { Button } from "../components";

export default function GameScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const distanceRef = useRef(0);
  const [pathLeft, setPathLeft] = useState(20);
  const [pathRight, setPathRight] = useState(80);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.padding = "0";
    return () => {
      document.body.style.overflow = "";
      document.body.style.padding = "16px";
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

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute bottom-4 right-4 z-10">
        <Button
          onClick={() => {
            startedRef.current = true;
          }}
        >
          Start
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 text-white text-xs bg-black/40 px-2 py-1">
        path: {pathLeft.toFixed(1)}% — {pathRight.toFixed(1)}%
      </div>
    </div>
  );
}

