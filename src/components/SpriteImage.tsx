import { useState, useEffect, useRef } from "react";

interface SpriteConfig {
  src: string;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  fps: number;
  isSprite?: boolean;
  rows?: number;
  cols?: number;
}

interface SpriteImageProps {
  size?: number;
  config?: SpriteConfig;
  className?: string;
  style?: React.CSSProperties;
}

export default function SpriteImage({
  size = 80,
  config,
  className = "",
  style,
}: SpriteImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [config?.src]);

  useEffect(() => {
    if (!config || !config.isSprite || error) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = config.frameWidth;
    canvas.height = config.frameHeight;

    const img = new Image();
    img.src = config.src;

    const cols = config.cols ?? config.totalFrames;
    let currentFrame = 0;
    let tickCount = 0;
    const ticksPerFrame = Math.round(60 / config.fps);

    img.onerror = () => setError(true);

    img.onload = () => {
      function loop() {
        tickCount++;
        if (tickCount > ticksPerFrame) {
          tickCount = 0;
          currentFrame = (currentFrame + 1) % config!.totalFrames;
        }

        const col = currentFrame % cols;
        const row = Math.floor(currentFrame / cols);

        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        ctx.drawImage(
          img,
          col * config!.frameWidth,
          row * config!.frameHeight,
          config!.frameWidth,
          config!.frameHeight,
          0,
          0,
          config!.frameWidth,
          config!.frameHeight,
        );

        animRef.current = requestAnimationFrame(loop);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [config?.src, config?.fps, config?.totalFrames, config?.isSprite, error]);

  if (!config || error) {
    return (
      <div
        style={{ ...(size ? { width: size, height: size } : {}), ...style }}
        className={`flex items-center justify-center ${className}`}
      >
        <span className="text-xs text-accent">
          {config?.src ?? "Placeholder Sprite"}
        </span>
      </div>
    );
  }

  if (!config.isSprite) {
    return (
      <img
        src={config.src}
        alt="sprite"
        draggable={false}
        onError={() => setError(true)}
        style={{ ...(size ? { width: size, height: size } : {}), ...style }}
        className={`object-contain max-w-none ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: config.frameWidth,
        height: config.frameHeight,
        imageRendering: "pixelated",
        position: "absolute",
        ...style,
      }}
      className={className}
    />
  );
}
