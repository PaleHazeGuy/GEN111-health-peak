import { Logo } from "../components";

interface HUDProps {
  health: number;
  maxHealth: number;
  distance: number;
}

export function HUD({ health, maxHealth }: HUDProps) {
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 select-none bg-white/20 backdrop-blur-sm rounded-2xl p-4 w-[55vw] max-w-[240px]">
      <Logo size="md" />
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-sm shrink-0 drop-shadow">
          HP
        </span>
        <div className="flex-1 h-5 bg-white/30 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(health / maxHealth) * 100}%`,
              background: "linear-gradient(135deg, #cce36f, #a8cc3f)",
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
            {health}/{maxHealth}
          </span>
        </div>
      </div>
    </div>
  );
}
