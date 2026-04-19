import { useEffect, useRef, useState } from "react";
import { SpriteImage } from "../components";
import type { AvatarId, Pattern, Variant } from "../types";

interface SpriteRendererProps {
  avatar: AvatarId;
  pattern: Pattern;
  variant: Variant;
  x: number;
  started?: boolean;
}

export function SpriteRenderer({
  avatar,
  pattern,
  variant,
  x,
  started = false,
}: SpriteRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spriteSize, setSpriteSize] = useState(
    Math.round(window.innerWidth * 0.15),
  );
  const [bottomPos, setBottomPos] = useState(window.innerWidth * 0.05);

  useEffect(() => {
    function handleResize(entries: ResizeObserverEntry[]) {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const smaller = Math.min(width, height);
      setSpriteSize(Math.round(smaller * 0.25));
      setBottomPos(smaller * 0.05);
    }
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute transition-all duration-100"
      style={{
        left: `${x}%`,
        transform: "translateX(-50%)",
        bottom: `${bottomPos}px`,
      }}
    >
      <SpriteImage
        config={
          started
            ? {
                src: `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_walk.png`,
                frameWidth: 228,
                frameHeight: 236,
                totalFrames: 3,
                fps: 3,
                isSprite: true,
                cols: 4,
                rows: 1,
              }
            : {
                src: `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_idle.png`,
                frameWidth: spriteSize,
                frameHeight: spriteSize,
                totalFrames: 1,
                fps: 1,
              }
        }
        className={`max-w-none`}
        style={{ width: spriteSize, height: "auto" }}
      />{" "}
    </div>
  );
}
