import { useEffect, useRef, useState } from "react";
import { SpriteImage } from "../components";
import type { AvatarId, Pattern, Variant } from "../types";

interface SpriteRendererProps {
  avatar: AvatarId;
  pattern: Pattern;
  variant: Variant;
  x: number;
}

export function SpriteRenderer({
  avatar,
  pattern,
  variant,
  x,
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
        size={spriteSize}
        config={{
          src: `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_idle.png`,
          frameSize: spriteSize,
          totalFrames: 1,
          fps: 1,
        }}
      />
    </div>
  );
}
