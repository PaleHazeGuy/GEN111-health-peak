import { GameProvider, useGame } from "./state/gameStore";
import { TitleScreen, QuizScreen, CustomizeScreen } from "./screens/index";

/*
import { BackButton, OptionButton, StatBar, SpriteImage, StrokeFrame } from "./components";
function TestUI() {
  const { } = useGame();

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <BackButton to="title" />
      <OptionButton
        option={{ icon: "🌙", text: "Cool option", val: 1 }}
        selected={false}
        onClick={() => console.log("clicked")}
      />
      <OptionButton
        option={{ icon: "😴", text: "Val 3", val: 3 }}
        selected={true}
        onClick={() => console.log("clicked")}
      />
      <StatBar label="A" value={20} color="linear-gradient(135deg,#7c6cf2,#f178b6)" />
      <StatBar label="B" value={40} color="#60a5fa" />
      <StatBar label="C" value={60} color="#fbbf24" />

      <SpriteImage size={80} />
      <StrokeFrame size={140}>
        <SpriteImage size={140} />
      </StrokeFrame>
    </div>
  );
}
*/

function Router() {
  //const { setScreen } = useGame();
  //setScreen("customize");

  const { screen } = useGame();

  return (
    <div className="app-shell">
      <div className="mobile-frame">
        {screen === "title" && <TitleScreen />}
        {screen === "quiz" && <QuizScreen />}
        {screen === "customize" && <CustomizeScreen />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Router />
    </GameProvider>
  );
}
