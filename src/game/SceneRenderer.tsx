import { useEffect, type RefObject } from "react";
import { SCENE, PATH_BOUNDS, MOVING_PATH, GAME } from "../data/game";

export function useSceneRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  onPathBounds?: (left: number, right: number) => void,
  startedRef?: RefObject<boolean>,
  distanceRef?: RefObject<number>,
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

      const isPortrait = h > w;
      const pathH =
        h *
        (isPortrait
          ? SCENE.PATH_HEIGHT_SCALE_PORTRAIT
          : SCENE.PATH_HEIGHT_SCALE_LANDSCAPE);
      const offsetY = isPortrait
        ? SCENE.PATH_OFFSET_Y_PORTRAIT
        : SCENE.PATH_OFFSET_Y_LANDSCAPE;
      const scale = (h / SCENE.IMG_H) * SCENE.PATH_SCALE;
      const scaledW = SCENE.IMG_W * scale;
      const pathW = w > scaledW ? scaledW * 1.2 : scaledW;
      const offsetX = (w - pathW) / 2 + SCENE.PATH_OFFSET_X;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(sky, 0, 0, w, h);
      ctx.drawImage(path, offsetX, offsetY, pathW, pathH);

      const pathVisualLeft =
        offsetX +
        pathW *
          (isPortrait ? PATH_BOUNDS.PORTRAIT_LEFT : PATH_BOUNDS.LANDSCAPE_LEFT);
      const pathVisualRight =
        offsetX +
        pathW *
          (isPortrait
            ? PATH_BOUNDS.PORTRAIT_RIGHT
            : PATH_BOUNDS.LANDSCAPE_RIGHT);
      onPathBounds?.(
        Math.max(0, (pathVisualLeft / w) * 100),
        Math.min(100, (pathVisualRight / w) * 100),
      );

      if (movingPath.complete && movingPath.naturalWidth > 0) {
        const col = frame % MOVING_PATH.TOTAL_FRAMES;
        ctx.drawImage(
          movingPath,
          col * MOVING_PATH.FRAME_W,
          0,
          MOVING_PATH.FRAME_W,
          MOVING_PATH.FRAME_H,
          offsetX,
          offsetY,
          pathW,
          pathH,
        );
      }
    }

    function loop() {
      resize();
      if (startedRef?.current) {
        const progress = Math.min(
          (distanceRef?.current ?? 0) / GAME.MAX_DISTANCE,
          1,
        );
        const fps =
          MOVING_PATH.FPS_START +
          progress * (MOVING_PATH.FPS_END - MOVING_PATH.FPS_START);
        const ticksPerFrame = Math.round(60 / fps);
        tick++;
        if (tick > ticksPerFrame) {
          tick = 0;
          frame = (frame + 1) % MOVING_PATH.TOTAL_FRAMES;
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

    return () => cancelAnimationFrame(animFrame);
  }, []);
}
