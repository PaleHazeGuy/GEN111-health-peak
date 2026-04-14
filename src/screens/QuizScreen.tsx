import { useState } from "react";
import { useGame } from "../hooks/useGame";
import { useLocale } from "../hooks/useLocale";
import { Button, About, OptionButton, ProgressBar, Logo } from "../components";

export default function QuizScreen() {
  const { setScreen, finalizeQuiz } = useGame();
  const { t } = useLocale();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = t.quiz.questions;
  const question = questions[current];
  const isLast = current === questions.length - 1;

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, question.opts[selected].val];
    setAnswers(newAnswers);
    if (!isLast) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      finalizeQuiz(newAnswers);
      setScreen("customize");
    }
  }

  return (
    <div className="flex flex-col w-full flex-1 p-6 gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t.quiz.eyebrow}
        </p>
        <Logo size="sm" />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <h1 className="font-fredoka text-2xl font-bold text-dark">
          {question.q}
        </h1>
        <ProgressBar current={current + 1} total={questions.length} />
        <div className="flex flex-col gap-2">
          {question.opts.map((opt, i) => (
            <OptionButton
              key={i}
              option={opt}
              selected={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={handleNext} disabled={selected === null}>
          {isLast ? t.quiz.finish : t.quiz.next}
        </Button>
        <About />
      </div>
    </div>
  );
}
