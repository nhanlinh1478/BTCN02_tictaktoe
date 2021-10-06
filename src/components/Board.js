import React from "react";
import Square from "./Square";
const BOARD_SIZE = 3;
function renderSquare(i, props) {
  let winningSquare = props.winner && props.winner.includes(i) ? true : false;
  return (
    <Square
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
      winningSquare={winningSquare}
    />
  );
}
function Board(props) {
  const boardSquares = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    let boardRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      boardRow.push(
        <span key={row * BOARD_SIZE + col}>
          {renderSquare(row * BOARD_SIZE + col, props)}
        </span>
      );
    }
    boardSquares.push(
      <div className="board-row" key={row}>
        {boardRow}
      </div>
    );
  }
  return <div>{boardSquares}</div>;
}
export default Board;
