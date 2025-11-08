// components/cell.tsx
import { Dispatch, SetStateAction } from "react";

type CellProps = {
  id: number;
  go: string;
  setgo: Dispatch<SetStateAction<string>>;
  cells: (string | null)[];
  setCells: Dispatch<SetStateAction<(string | null)[]>>;
  cell: string | null;
  winningmessage: string;
  started: boolean;
};

const Cell = ({ go, setgo, id, cells, setCells, cell, winningmessage, started }: CellProps) => {

  const handleClick = () => {
    // 🚫 Bloque si le jeu n’a pas commencé, si la case est remplie ou si la partie est terminée
    if (!started || cell || winningmessage) return;

    const current = go === "circle" ? "circle" : "cross";
    const copyCells = [...cells];
    copyCells[id] = current;
    setCells(copyCells);

    setgo(go === "circle" ? "cross" : "circle");
  };

  return (
    <div
      className="square"
      onClick={handleClick}
      style={{
        cursor: !started || cell || winningmessage ? "not-allowed" : "pointer",
        opacity: !started ? 0.5 : 1
      }}
    >
      <div className={cell ? cell : ""}>
        {cell === "circle" ? "o" : cell === "cross" ? "x" : ""}
      </div>
    </div>
  );
};

export default Cell;
