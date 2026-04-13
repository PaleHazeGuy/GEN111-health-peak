import type { QuizOption } from "../types";

interface OptionButtonProps {
  option: QuizOption;
  selected: boolean;
  onClick: () => void;
}

export default function OptionButton({ option, selected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 text-base font-normal cursor-pointer transition-all duration-200 font-sans
        ${selected
          ? "border-transparent bg-gradient-to-br from-primary to-secondary text-white shadow-lg"
          : "border-gray-200 bg-white text-dark hover:border-primary"
        }`}
    >
      <span className="text-xl">{option.icon}</span>
      <span>{option.text}</span>
    </button>
  );
}
