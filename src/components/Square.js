import React from "react";
export default function Square(props) {
  const winningSquareStyle = {
    backgroundColor: "#ccc",
  };
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={props.winningSquare ? winningSquareStyle : null}
    >
      {props.value}
    </button>
  );
}
