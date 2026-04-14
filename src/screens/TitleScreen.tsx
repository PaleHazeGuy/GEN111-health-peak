import { useGame } from "../hooks/useGame";
import { useLocale } from "../hooks/useLocale";
import { useState } from "react";
import { Button } from "../components";

export default function TitleScreen() {
  const { setScreen, setLanguage } = useGame();
  const { t } = useLocale();
  const [ready, setReady] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="flex flex-col w-full flex-1 relative overflow-hidden min-h-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-50 rounded-[32px]" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-10 text-center">

        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {t.title.eyebrow}
          </p>
          <h1 className="font-fredoka text-[clamp(3rem,12vw,5rem)] font-bold leading-none text-dark tracking-tight">
            {t.title.name1}<span className="text-primary">{t.title.name2}</span>
          </h1>
          <p className="text-muted text-sm">Prototype Version 1.0.0</p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          {!ready ? (
            <div className="flex gap-3 w-full">
              <Button className="flex-1" onClick={() => { setLanguage("th"); setReady(true); }}>
                ภาษาไทย
              </Button>
              <Button className="flex-1" onClick={() => { setLanguage("en"); setReady(true); }}>
                English
              </Button>
            </div>
          ) : (
            <>
              <Button variant="gradient" onClick={() => setScreen("quiz")}>
                {t.title.start}
              </Button>
              <button
                className="text-muted text-sm underline cursor-pointer bg-transparent border-none"
                onClick={() => setShowAbout(true)}
              >
                {t.about.buttontext}
              </button>
            </>
          )}
        </div>
      </div>

      {showAbout && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-black/40 rounded-[32px]"
          onClick={() => setShowAbout(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 flex flex-col gap-3 w-full shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-fredoka text-xl font-bold text-dark">{t.about.title}</h2>
            <p className="text-muted text-sm leading-relaxed">{t.about.body}</p>
            <Button onClick={() => setShowAbout(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
