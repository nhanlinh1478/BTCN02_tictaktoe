import React, { useState } from "react";
import Board from "./Board";
function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascend, setAscend] = useState(true);
  const [value, setValue] = useState(3);
  const [newBoard, setNewBoard] = useState(4);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoardSize = value;
    setNewBoard(newBoardSize);
    setXIsNext(true);
    setStepNumber(0);
    setHistory({
      squares: Array(newBoardSize ** 2).fill(null),
    });
  };
  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    const lastMove = [i % 3, Math.floor(i / 3)];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
          lastMove: lastMove,
        },
      ])
    );
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  const toggle = () => {
    setAscend(!ascend);
  };

  const active = {
    fontWeight: "bold",
  };
  const inactive = {
    fontWeight: "normal",
  };
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    if (ascend) {
      move = history.length - 1 - move;
    }
    const desc = move
      ? "Go to move #" +
        move +
        " at position (" +
        history[move].lastMove.toString() +
        ")"
      : "Go to game start";
    if (stepNumber) {
      return (
        <li key={move}>
          <button
            style={stepNumber === move ? active : inactive}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <button
            style={stepNumber === move ? active : inactive}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    }
  });

  let status;
  const changeAscend = ascend ? "ascending" : "descending";
  if (winner) {
    status = "Winner: " + winner.winner;
  } else if (!current.squares.includes(null)) {
    status = "It's a draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winningSquares: lines[i],
        };
      }
    }
    return null;
  }

  return (
    <div className="game">
      <div className="game-board">
        <form onSubmit={handleSubmit}>
          <input
            id="id_row"
            class="form-field"
            type="number"
            placeholder="input row-col"
            name="row-col"
            value={value}
            onChange={handleInputChange}
          />
          <button type="submit">save</button>
        </form>
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winner={winner && winner.winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggle}>{changeAscend}</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
export default Game;
