import { useEffect, useRef, useState } from "react";
import SpriteImage from "../components/SpriteImage";
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
    Math.round(window.innerWidth * 0.25),
  );
  const [bottomPos, setBottomPos] = useState(window.innerWidth * 0.05);
  const [flipped, setFlipped] = useState(false);
  const prevX = useRef(x);

  useEffect(() => {
    if (x > prevX.current) setFlipped(true);
    if (x < prevX.current) setFlipped(false);
    prevX.current = x;
  }, [x]);

  useEffect(() => {
    function handleResize(entries: ResizeObserverEntry[]) {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const isPortrait = height > width;
      const size = isPortrait ? width * 0.4 : height * 0.25;
      const capped = Math.min(size, 200);
      setSpriteSize(Math.round(capped));
      setBottomPos(capped * 0.2);
    }
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }
    return () => observer.disconnect();
  }, []);

  const src = started
    ? `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_walk.png`
    : `/sprites/avatars/${avatar}/${avatar}_${variant}_${pattern}_idle.png`;

  return (
    <div
      ref={containerRef}
      className="absolute transition-[left,bottom] duration-100"
      style={{
        left: `${x}%`,
        transform: `translateX(-50%) scaleX(${flipped ? -1 : 1})`,
        bottom: `${bottomPos}px`,
      }}
    >
      <SpriteImage src={src} displayW={spriteSize} displayH={spriteSize} />
    </div>
  );
}
