import type { QuizOption } from "../types";

interface OptionButtonProps {
  option: QuizOption;
  selected: boolean;
  onClick: () => void;
}

export default function OptionButton({ option, selected, onClick }: OptionButtonProps) {
  return (
    <button
      className={`option-btn ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span style={{ fontSize: "1.2rem" }}>{option.icon}</span>
      <span>{option.text}</span>
    </button>
  );
}
