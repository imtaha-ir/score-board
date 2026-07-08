import { useEffect, useState } from "react";
import ScoreCard from "./components/ScoreCard";
import "./App.css";

type ScoreEntry = {
  id: number;
  name: string;
  score: number;
  color: string;
};

const COLORS = ["#22d8ff", "#ff3f79", "#ffd166", "#4ade80", "#f59e0b"];

function App() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [scoresAreZero, setScoresAreZero] = useState(true);

  useEffect(() => {
    const allScoresAreZero = scores.every((scoreInfo) => scoreInfo.score === 0);
    setScoresAreZero(allScoresAreZero);
  }, [scores]);

  function resetScores() {
    if (scoresAreZero) {
      if (confirm("Delete all players?") === true) {
        setScores([]);
      }
    } else {
      if (confirm("Reset scores?") === true) {
        setScores((current) =>
          current.map((entry) => ({ ...entry, score: 0 })),
        );
      }
    }
  }

  function addScoreCard() {
    const name = window.prompt("Enter player name");

    if (!name) {
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const isDuplicate = scores.some(
      (entry) => entry.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) {
      window.alert("Duplicated name");
      return;
    }

    const nextColor = COLORS[scores.length % COLORS.length];

    setScores((current) => [
      ...current,
      {
        id: Date.now(),
        name: trimmedName,
        score: 0,
        color: nextColor,
      },
    ]);
  }

  function updateScore(id: number, change: number) {
    setScores((current) =>
      current.map((entry) =>
        entry.id === id
          ? { ...entry, score: Math.max(0, entry.score + change) }
          : entry,
      ),
    );
  }

  function updateName(id: number, newName: string) {
    setScores((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, name: newName } : entry,
      ),
    );
  }

  function toggleFullscreen() {
    void document.documentElement.requestFullscreen();
  }

  return (
    <main className="page">
      <section className="board">
        <div className="header">
          <h1 className="title" onClick={toggleFullscreen}>
            SCOREBOARD
          </h1>
          <div className="header__actions">
            <button
              type="button"
              className="reset-button"
              onClick={addScoreCard}
            >
              Add Player
            </button>
            {scores.length > 0 && (
              <button
                type="button"
                className="reset-button"
                onClick={resetScores}
              >
                {scoresAreZero ? "Reset Board" : "Reset Scores"}
              </button>
            )}
          </div>
        </div>

        <div className="score-list">
          {scores.map((entry) => (
            <ScoreCard
              key={entry.id}
              name={entry.name}
              color={entry.color}
              score={entry.score}
              onDec={(points) => updateScore(entry.id, -points)}
              onInc={(points) => updateScore(entry.id, points)}
              onEditName={(newName) => updateName(entry.id, newName)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
