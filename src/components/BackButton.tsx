import { useGame } from "../hooks/useGame";
import { useLocale } from "../hooks/useLocale";
import type { Screen } from "../types";

interface BackButtonProps {
  to: Screen;
}

export default function BackButton({ to }: BackButtonProps) {
  const { setScreen } = useGame();
  const { t } = useLocale();

  return (
    <button
      onClick={() => setScreen(to)}
      className="text-accent font-semibold text-sm bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
    >
      {t.components.back}
    </button>
  );
}
