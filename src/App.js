import React, { useState, useRef } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerName, setPlayerName] = useState("");

  const inputRef = useRef(null);

  function handleChangePlayerName() {
    const val = inputRef.current.value;

    setPlayerName(val);
  }

  function handleClick(index) {
    const squares = [...board];

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(index) {
    return (
      <button className="square" onClick={() => handleClick(index)} style={{ padding: 20 }}>
        {board[index]}
      </button>
    );
  }

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return ( <>
    { playerName ? 
    <div style={{ textAlign: "center"}}>
      <h2>Xam Tic-Tac-Toe</h2>
      <p>Welcome, {playerName}</p>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div> : <div style={{ padding: 20 }}>
    <span>Enter Player's Name: </span>
    <input ref={inputRef}/>
    <button onClick={handleChangePlayerName}>Enter</button>
    </div>
  }
  </>
  );
}

function calculateWinner(squares) {
  const lines = [    [0, 1, 2],
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default App;