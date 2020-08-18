import React, { useState } from "react";

const Square = (props) => {
    return (
        <button
            className="square"
            onClick={() => {
                props.onClick();
            }}
        >
            {props.value}
        </button>
    );
};

const Board = (props) => {
    /* Metodo para renderizar Square */
    const renderSquare = (i) => {
        return (
            <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
        );
    };
    /* Mensaje de ganador o de siguiente turno */

    return (
        <div>
            <div className="status">{props.status}</div>
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
        </div>
    );
};

const Game = (props) => {
    const [historyState, setHistoryState] = useState({
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
    });
    const [stepNumberState, setStepNumberState] = useState({ stepNumber: 0 });
    const [nextTurnState, setNextTurnState] = useState({ xIsNext: true });

    /* Manejador del evento click */
    const handleClick = (i) => {
        const history = historyState.history.slice(0, stepNumberState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = nextTurnState.xIsNext ? "X" : "O";
        setHistoryState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
        });
        setNextTurnState({ xIsNext: !nextTurnState.xIsNext });
        setStepNumberState({ stepNumber: history.length })
    };

    /* jump to */
    const jumpTo = (step) => {
        setStepNumberState({ stepNumber: step });
        setNextTurnState({ xIsNext: (step % 2 === 0) });
    };


    /* history mode */


    const history = historyState.history;
    const current = history[stepNumberState.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = `Siguiente jugador: ${nextTurnState.xIsNext ? "X" : "O"}`;
    }

    

    

    return (
        <div className="game-container">
            <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
        </div>
    );
};

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
            return squares[a];
        }
    }
    return null;
}

export default Game;
