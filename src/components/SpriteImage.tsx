import { useState } from "react";

interface SpriteConfig {
  frameSize: number;
  totalFrames: number;
  fps: number;
  src: string;
}

interface SpriteImageProps {
  size?: number;
  config?: SpriteConfig;
}

//TODO make a fucking logic for the frame by frame spritesheet thing

export default function SpriteImage({ size = 80, config }: SpriteImageProps) {
  const [error, setError] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
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
