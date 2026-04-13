interface SpriteConfig {
  frameSize: number;
  totalFrames: number;
  fps: number;
  image: string;
}

interface SpriteImageProps {
  config?: SpriteConfig;
  size?: number;
}

//TODO make a fucking logic for the frame by frame spritesheet thing

export default function SpriteImage({ size = 80 }: SpriteImageProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
    >
      <span className="text-xs text-accent">Placeholder Sprite</span>
    </div>
  );
}
