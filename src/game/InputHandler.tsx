import { type RefObject } from "react";
import { INPUT } from "../data/game";

export function setupInputHandler(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  onSpriteMove: (dx: number) => void,
  onStart: () => void,
) {
  const held = new Set<string>();
  let animFrame: number;

  function getSpeed() {
    const canvas = canvasRef.current;
    if (!canvas) return 0.5;
    const isPortrait = canvas.offsetHeight > canvas.offsetWidth;
    const base = isPortrait
      ? INPUT.KEY_BASE_PORTRAIT
      : INPUT.KEY_BASE_LANDSCAPE;
    return (base / canvas.offsetWidth) * INPUT.MOVE_AMOUNT * 0.1;
  }

  function loop() {
    if (held.has("ArrowLeft") || held.has("a")) onSpriteMove(-getSpeed());
    if (held.has("ArrowRight") || held.has("d")) onSpriteMove(getSpeed());
    animFrame = requestAnimationFrame(loop);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) {
      held.add(e.key);
      onStart();
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
}

export function setupTouchHandler(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  onSpriteMove: (dx: number) => void,
  onStart: () => void,
) {
  let lastX: number | null = null;
  let currentDx = 0;
  let isMouseDown = false;
  let animFrame: number;

  function loop() {
    if (lastX !== null && currentDx !== 0) {
      onSpriteMove(currentDx);
      currentDx = 0;
    }
    animFrame = requestAnimationFrame(loop);
  }

  function getSpeed(isPortrait: boolean, isMouse: boolean) {
    return isPortrait
      ? isMouse
        ? INPUT.MOUSE_SPEED_PORTRAIT
        : INPUT.TOUCH_SPEED_PORTRAIT
      : isMouse
        ? INPUT.MOUSE_SPEED_LANDSCAPE
        : INPUT.TOUCH_SPEED_LANDSCAPE;
  }

  function handleStart(clientX: number) {
    lastX = clientX;
    currentDx = 0;
    onStart();
  }

  function handleMove(clientX: number, isMouse: boolean) {
    if (lastX === null) return;
    const dx = clientX - lastX;
    lastX = clientX;
    const canvas = canvasRef.current;
    const w = canvas?.offsetWidth ?? 390;
    const isPortrait = (canvas?.offsetHeight ?? 720) > w;
    currentDx = (dx / w) * 100 * getSpeed(isPortrait, isMouse);
  }

  function handleEnd() {
    lastX = null;
    currentDx = 0;
    isMouseDown = false;
  }

  // touch
  function handleTouchStart(e: TouchEvent) {
    handleStart(e.touches[0].clientX);
  }
  function handleTouchMove(e: TouchEvent) {
    handleMove(e.touches[0].clientX, false);
  }
  function handleTouchEnd() {
    handleEnd();
  }

  // mouse
  function handleMouseDown(e: MouseEvent) {
    isMouseDown = true;
    handleStart(e.clientX);
  }
  function handleMouseMove(e: MouseEvent) {
    if (isMouseDown) handleMove(e.clientX, true);
  }

  function handleMouseUp() {
    handleEnd();
  }

  animFrame = requestAnimationFrame(loop);

  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("touchend", handleTouchEnd);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    cancelAnimationFrame(animFrame);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}
