import { useState, useEffect } from "react";

interface SpriteConfig {
  frameSize: number;
  totalFrames: number;
  fps: number;
  src: string;
}

interface SpriteImageProps {
  size?: number;
  config?: SpriteConfig;
  className?: string;
}

//TODO make a fucking logic for the frame by frame spritesheet thing

export default function SpriteImage({
  size = 80,
  config,
  className = "",
}: SpriteImageProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [config?.src]);

  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center ${className}`}
    >
      {config && !error ? (
        <img
          src={config.src}
          alt="sprite"
          style={{ width: size, height: size }}
          className="object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-xs text-accent">
          {config?.src ?? "Placeholder Sprite"}
        </span>
      )}
    </div>
  );
}
