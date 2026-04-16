import { useEffect } from "react";
import type React from "react";

const IMG_W = 3147;
const IMG_H = 2360;

export function useSceneRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onPathBounds?: (left: number, right: number) => void,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sky = new Image();
    const path = new Image();
    sky.src = "/scenes/Sky.png";
    path.src = "/scenes/Path.png";

    let loaded = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      const scale = (h / IMG_H) * 0.85;
      const scaledW = IMG_W * scale;
      const pathW = w > scaledW ? scaledW * 1.2 : scaledW;
      const offsetX = (w - pathW) / 2 + 6;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(sky, 0, 0, w, h);
      ctx.drawImage(path, offsetX, 0, pathW, h);

      const pathVisualLeft = offsetX + pathW * 0.32;
      const pathVisualRight = offsetX + pathW * 0.675;
      onPathBounds?.(
        Math.max(0, (pathVisualLeft / w) * 100),
        Math.min(100, (pathVisualRight / w) * 100),
      );
    }

    function tryDraw() {
      loaded++;
      if (loaded === 2) {
        resize();
        draw();
      }
    }

    sky.onload = tryDraw;
    path.onload = tryDraw;
    if (sky.complete) tryDraw();
    if (path.complete) tryDraw();

    sky.onerror = () => console.log("sky failed");
    path.onerror = () => console.log("path failed");

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);
    window.addEventListener("resize", () => {
      resize();
      draw();
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", () => {
        resize();
        draw();
      });
    };
  }, []);
}
