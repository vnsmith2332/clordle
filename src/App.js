import React, { useState, useEffect } from 'react';
import Wordle from './wordle'
import './App.css';





function GameSquare({position, value, squareState}) {
  const animationDelay = position * 400; // linear delay. delay duration is arbitrary (whatever looks good)
  return (
    <>
      <span 
        className={value === "" ? "game-square" : "game-square filled-game-square" + " " + squareState} 
        style={
          {"--flip-animation-delay": animationDelay + "ms"}}>
          {value}
      </span>
    </>
  );
}

function GameRow({guess, squareStates}) {
  const letters = guess.split("");
  const squaresInRow = [];
  for (let i = 0; i < 5; i++) {
    if (i <= letters.length - 1) {
      squaresInRow.push(<GameSquare key={i} value={letters[i]} squareState={squareStates[i]} position={i}></GameSquare>);
    } else {
      squaresInRow.push(<GameSquare key={i} value="" position={i}></GameSquare>);
    }
  }
  return (
    <>
      <div className="game-row">
        {squaresInRow}
      </div>
    </>
  );
}

function KeyboardKey({value}) {
  if (value === "ENTER" || value === "DELETE") {
    return (
      <button className="keyboard-key keyboard-key-special">{value === "DELETE" ? 
        <span className="material-symbols-outlined">
          backspace
        </span> : value}
      </button>
    )
  }
  return (
    <div className="keyboard-key">{value}</div>
  )
}

function KeyboardRow({row}) {
  return (
    <div className="keyboard-row">{row}</div>
  );
}

function Keyboard() {
  const rowOneKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const rowTwoKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const rowThreeKeys = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  const rowOne = rowOneKeys.map((key) => {
    return <KeyboardKey value={key} key={key} />
  })
  const rowTwo = rowTwoKeys.map((key) => {
    return <KeyboardKey value={key} key={key}/>
  })
  const rowThree = rowThreeKeys.map((key) => {
    return <KeyboardKey value={key} key={key}/>
  })

  return (
    <>
      <div className='keyboard'>
        <KeyboardRow row={rowOne}/>
        <KeyboardRow row={rowTwo}/>
        <KeyboardRow row={rowThree}/>
      </div>
    </>
  )
}

function App() {
  const [playerGuesses, setPlayerGuesses] = useState(Array(6).fill(""));
  const [squareStates, setSquareStates] = useState(Array(6).fill(
    Array(5).fill("")
  ));
  const [currentGuessIdx, setCurrentGuessIdx] = useState(0);
  const [guess, setGuess] = useState("");

  const letterKeys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z'
  ];

  useEffect(() => {
    function handleKeyPress(e) {
      let newGuess = "";
      let newGuessIdx = 0;
      let newSquareStates = Array(6).fill(Array(5).fill(""));
      if (e.key === "Enter" && guess.length === 5) {
        newGuessIdx = currentGuessIdx + 1;
        setCurrentGuessIdx(newGuessIdx);
        newGuess = guess;
        const guessRowSquareStates = Object.values(Wordle(newGuess, "shave"));
        console.log(guessRowSquareStates);
        if (currentGuessIdx === 0) {
          newSquareStates = [
            guessRowSquareStates,
            ...squareStates.slice(1, squareStates.length)
          ];
        }
        else if (currentGuessIdx === squareStates.length - 1) {
          newSquareStates = [
            ...squareStates.slice(0, squareStates.length - 1),
            guessRowSquareStates
          ];
        }
        else {
          newSquareStates = [
            ...squareStates.slice(0, currentGuessIdx),
            guessRowSquareStates,
            ...squareStates.slice(currentGuessIdx + 1, squareStates.length)
          ];
        }
        console.log(newSquareStates);
        setSquareStates(newSquareStates);

      }
      else if (letterKeys.includes(e.key.toLowerCase()) && guess.length < 5) {
        newGuess = guess.concat(e.key.toLowerCase());
      }
      else if (e.key === "Backspace" && guess.length > 0) {
        newGuess = guess.slice(0, -1)
      }
      else {
        newGuess = guess;
      }

      if (newGuessIdx > currentGuessIdx) {
        setGuess("");
      }
      else {
        setGuess(newGuess);
      }

      let newPlayerGuesses = [];
      if (currentGuessIdx === 0) {
        newPlayerGuesses = [
          newGuess,
          ...playerGuesses.slice(1, playerGuesses.length)
        ]
      } 
      else if (currentGuessIdx === playerGuesses.length - 1) {
        newPlayerGuesses = [
          ...playerGuesses.slice(0, playerGuesses.length - 1),
          newGuess
        ]
      } 
      else {
        newPlayerGuesses = [
          ...playerGuesses.slice(0, currentGuessIdx),
          newGuess,
          ...playerGuesses.slice(currentGuessIdx + 1, playerGuesses.length)
        ];
      }
      setPlayerGuesses(newPlayerGuesses);
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  const gameRows = [];
  for (let i = 0; i < playerGuesses.length; i++) {
    gameRows.push(<GameRow guess={playerGuesses[i]} squareStates={squareStates[i]}/>)
  }
  
  return (
    <>
      <main>
        <header>
          <h1>Wordle</h1>
        </header>
        {gameRows}
        <Keyboard />
      </main>
    </>
  );
}

export default App;


