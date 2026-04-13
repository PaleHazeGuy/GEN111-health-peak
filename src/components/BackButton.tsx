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
      style={{
        background: "none",
        border: "none",
        color: "#8f7af3",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "0.85rem",
      }}
    >
      {t.components.back}
    </button>
  );
}
