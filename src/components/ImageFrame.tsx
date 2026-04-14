import { useState } from "react";

interface ImageFrameProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function ImageFrame({
  src,
  alt,
  size,
  className = "",
}: ImageFrameProps) {
  const [error, setError] = useState(false);

  const fallbackText = src ? src.split("/").pop() : "Placeholder";

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt ?? src}
        style={size ? { width: size, height: size } : undefined}
        className={`object-contain ${className}`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      style={size ? { width: size, height: size } : undefined}
      className="flex items-center justify-center"
    >
      <span className="text-xs text-accent">{fallbackText}</span>
    </div>
  );
}
