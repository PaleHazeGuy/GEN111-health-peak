import { useEffect, useState } from "react";

export function useCountdown() {
  const [countdown, setCountdown] = useState<number | null>(3);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCountdown(2), 1000),
      setTimeout(() => setCountdown(1), 2000),
      setTimeout(() => setCountdown(null), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return countdown;
}

export function CountdownOverlay({ countdown }: { countdown: number | null }) {
  if (countdown === null) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-500">
      <span className="font-fredoka text-white text-[8rem] font-bold drop-shadow-lg">
        {countdown}
      </span>
    </div>
  );
}
