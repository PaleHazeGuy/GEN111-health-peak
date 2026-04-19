import { useEffect, useRef } from "react";
import type { AvatarId, Variant } from "../types";
import type { SpriteConfig } from "../data/sprites";
import { getSpriteConfig } from "../data/sprites";

interface SpriteImageProps {
  src: string;
  config?: Partial<SpriteConfig>;
  displayW?: number;
  displayH?: number;
  className?: string;
}

function parseSrc(
  src: string,
): { avatar: AvatarId; variant: Variant; state: "idle" | "walk" } | null {
  const filename = src.split("/").pop()?.replace(".png", "") ?? "";
  const parts = filename.split("_");
  if (parts.length < 4) return null;
  const avatar = parts[0] as AvatarId;
  const variant = parts[1] as Variant;
  const state = parts[3] as "idle" | "walk";
  return { avatar, variant, state };
}

export default function SpriteImage({
  src,
  config: configOverride,
  displayW = 100,
  displayH = 100,
  className = "",
}: SpriteImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  const parsed = parseSrc(src);
  const baseConfig = parsed
    ? getSpriteConfig(parsed.avatar, parsed.variant, parsed.state)
    : null;

  const config: SpriteConfig | null = baseConfig
    ? { ...baseConfig, ...configOverride }
    : ((configOverride as SpriteConfig) ?? null);

  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (!configRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    canvas.width = displayW;
    canvas.height = displayH;

    const img = new Image();
    img.src = src;

    let frame = 0;
    let tick = 0;

    function loop() {
      const cfg = configRef.current;
      if (!cfg) return;

      tick++;
      const ticksPerFrame = Math.round(60 / cfg.fps);
      if (tick > ticksPerFrame) {
        tick = 0;
        frame = (frame + 1) % cfg.totalFrames;
      }

      const col = frame % cfg.cols;
      const row = Math.floor(frame / cfg.cols);

      const scaleRatio = Math.min(displayW, displayH) / 100;
      const scaledW = cfg.drawW * cfg.scale * scaleRatio;
      const scaledH = cfg.drawH * cfg.scale * scaleRatio;
      const x = cfg.offsetX * scaleRatio + (displayW - scaledW) / 2;
      const y = cfg.offsetY * scaleRatio + (displayH - scaledH) / 2;

      ctx!.clearRect(0, 0, displayW, displayH);
      ctx!.drawImage(
        img,
        col * cfg.frameW,
        row * cfg.frameH,
        cfg.frameW,
        cfg.frameH,
        x,
        y,
        scaledW,
        scaledH,
      );

      animRef.current = requestAnimationFrame(loop);
    }

    function start() {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      frame = 0;
      tick = 0;
      animRef.current = requestAnimationFrame(loop);
    }

    img.onload = start;

    img.onerror = () => {
      ctx.fillStyle = "#888";
      ctx.font = `${Math.min(displayW, displayH) * 0.08}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(src.split("/").pop() ?? src, displayW / 2, displayH / 2);
    };

    if (img.complete) {
      img.naturalWidth === 0 ? img.onerror?.(new Event("error")) : start();
    }

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [src, displayW, displayH]);

  return (
    <canvas
      ref={canvasRef}
      style={{ imageRendering: "pixelated" }}
      className={className}
    />
  );
}
