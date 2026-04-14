import { useState } from "react";
import { useLocale } from "../hooks/useLocale";
import Button from "./Button";

export default function About() {
  const { t } = useLocale();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <button
        className="text-muted text-sm underline cursor-pointer bg-transparent border-none"
        onClick={() => setShowAbout(true)}
      >
        {t.about.buttontext}
      </button>

      {showAbout && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-6 bg-black/40"
          onClick={() => setShowAbout(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 flex flex-col gap-3 w-full max-w-[380px] max-h-[80vh] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-fredoka text-xl font-bold text-dark shrink-0">
              {t.about.title}
            </h2>
            <p className="text-muted text-sm leading-relaxed overflow-y-auto flex-1">
              {t.about.body}
            </p>
            <Button onClick={() => setShowAbout(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
