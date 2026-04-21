import { useEffect } from "react";
import type React from "react";

const IMG_W = 3147;
const IMG_H = 2360;
const FRAME_W = 500;
const FRAME_H = 375;
const TOTAL_FRAMES = 4;
const MAX_DISTANCE = 2000;

export function useSceneRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onPathBounds?: (left: number, right: number) => void,
  startedRef?: React.RefObject<boolean>,
  distanceRef?: React.RefObject<number>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sky = new Image();
    const path = new Image();
    const movingPath = new Image();
    sky.src = "/scenes/Sky.png";
    path.src = "/scenes/Path.png";
    movingPath.src = "/scenes/MovingPath.png";

    let loaded = 0;
    let frame = 0;
    let tick = 0;
    let animFrame: number;

    function resize() {
      if (!canvas) return;
      if (
        canvas.width === canvas.offsetWidth &&
        canvas.height === canvas.offsetHeight
      )
        return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const scale = (h / IMG_H) * 0.85;
      const scaledW = IMG_W * scale;
      const pathW = w > scaledW ? scaledW * 1.2 : scaledW;
      const offsetX = (w - pathW) / 2 + 6;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(sky, 0, 0, w, h);
      ctx.drawImage(path, offsetX, 0, pathW, h + 50);

      const isPortrait = h > w;
      const pathVisualLeft = offsetX + pathW * (isPortrait ? 0.36 : 0.33);
      const pathVisualRight = offsetX + pathW * (isPortrait ? 0.62 : 0.675);
      onPathBounds?.(
        Math.max(0, (pathVisualLeft / w) * 100),
        Math.min(100, (pathVisualRight / w) * 100),
      );

      if (movingPath.complete && movingPath.naturalWidth > 0) {
        const col = frame % TOTAL_FRAMES;
        ctx.drawImage(
          movingPath,
          col * FRAME_W,
          0,
          FRAME_W,
          FRAME_H,
          offsetX,
          0,
          pathW,
          h,
        );
      }
    }

    function loop() {
      resize();

      if (startedRef?.current) {
        const progress = Math.min(
          (distanceRef?.current ?? 0) / MAX_DISTANCE,
          1,
        );
        const fps = 1 + progress * 11; // 1fps at start → 12fps at end
        const ticksPerFrame = Math.round(60 / fps);

        tick++;
        if (tick > ticksPerFrame) {
          tick = 0;
          frame = (frame + 1) % TOTAL_FRAMES;
        }
      }

      draw();
      animFrame = requestAnimationFrame(loop);
    }

    function tryDraw() {
      loaded++;
      if (loaded === 3) {
        canvas!.width = canvas!.offsetWidth;
        canvas!.height = canvas!.offsetHeight;
        animFrame = requestAnimationFrame(loop);
      }
    }

    sky.onload = tryDraw;
    path.onload = tryDraw;
    movingPath.onload = tryDraw;
    if (sky.complete) tryDraw();
    if (path.complete) tryDraw();
    if (movingPath.complete) tryDraw();

    sky.onerror = () => console.log("sky failed");
    path.onerror = () => console.log("path failed");
    movingPath.onerror = () => console.log("movingPath failed");

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, []);
}
