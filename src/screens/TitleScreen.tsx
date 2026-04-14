import { useGame } from "../hooks/useGame";
import { useLocale } from "../hooks/useLocale";
import { useState } from "react";
import { Button, About, Logo } from "../components";

export default function TitleScreen() {
  const { setScreen, setLanguage } = useGame();
  const { t } = useLocale();
  const [ready, setReady] = useState(false);

  return (
    <div className="flex flex-col w-full flex-1 relative overflow-hidden min-h-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-50 rounded-[32px]" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-10 text-center">
        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {t.title.eyebrow}
          </p>
          <Logo />
          <p className="text-muted text-sm">Prototype Version 1.0.0</p>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          {!ready ? (
            <div className="flex gap-3 w-full">
              <Button
                className="flex-1"
                onClick={() => {
                  setLanguage("th");
                  setReady(true);
                }}
              >
                ภาษาไทย
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setLanguage("en");
                  setReady(true);
                }}
              >
                English
              </Button>
            </div>
          ) : (
            <>
              <Button variant="gradient" onClick={() => setScreen("quiz")}>
                {t.title.start}
              </Button>
              <About />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
