"use client";
import { useEffect, useState } from "react";
import Cell from "./components/cell";

const winning = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

export default function Home() {
  const [cells, setCells] = useState(Array(9).fill(null)); 
  const [go, setGo] = useState("circle");
const [winningMessage, setWinningMessage] = useState('');

  const [started, setStarted] = useState(false); 

  // Vérifie le gagnant ou le match nul
  useEffect(() => {
    if (!started) return;

    let winner = null;

    for (const combo of winning) {
      if (combo.every(i => cells[i] === "circle")) {
        winner = "The circle wins!";
        break;
      }
      if (combo.every(i => cells[i] === "cross")) {
        winner = "The cross wins!";
        break;
      }
    }

    if (winner) {
      setWinningMessage(winner);
      setStarted(false);
      return;
    }

    if (cells.every(cell => cell !== null)) {
      setWinningMessage("It's a draw!");
      setStarted(false); // 🔥 stoppe le jeu
      return;
    }

    setWinningMessage("");
  }, [cells, started]);

  // Démarrer le jeu
  const handleStart = () => {
    setCells(Array(9).fill(null));
    setGo("circle");
    setWinningMessage("");
    setStarted(true);
  };

  // Réinitialiser complètement
  const handleReset = () => {
    setCells(Array(9).fill(null));
    setGo("circle");
    setWinningMessage("");
    setStarted(false);
  };

  return (
    <main className="parent">
      <h1>Tic Tac Toe</h1>

      {/* Boutons */}
      <div className="controls" style={{ marginBottom: "15px" }}>
        <button onClick={handleStart} disabled={started}>
          Start
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Grille */}
      <div className="gamebord">
        {cells.map((cell, index) => (
          <Cell
            go={go}
            setgo={setGo}
            key={index}
            id={index}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winningmessage={winningMessage}
            started={started} // 🔥 passe l’état pour bloquer les clics
          />
        ))}
      </div>

      {/* Messages */}
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        {winningMessage && <p>{winningMessage}</p>}
        {!winningMessage && started && <p>Its {go} s turn</p>}
        {!started && !winningMessage && <p>Click Start  to begin</p>}
      </div>
    </main>
  );
}
