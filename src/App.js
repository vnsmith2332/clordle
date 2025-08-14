import React, { useState, useEffect } from 'react';
import GameRow from './GameRow';
import Keyboard from './Keyboard';
import Wordle from './wordle'
import './App.css';

const solution = "shave";

const letterKeys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z'
  ];

function App() {
  const [playerGuesses, setPlayerGuesses] = useState(Array(6).fill(""));
  const [squareStates, setSquareStates] = useState(Array(6).fill(
    Array(5).fill("")
  ));
  const [currentGuessIdx, setCurrentGuessIdx] = useState(0);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    function handleKeyPress(e) {
      let newGuess = "";
      let newGuessIdx = 0;
      let newSquareStates = Array(6).fill(Array(5).fill(""));
      if (e.key === "Enter" && guess.length === 5) {
        newGuessIdx = currentGuessIdx + 1;
        setCurrentGuessIdx(newGuessIdx);
        newGuess = guess;
        const guessRowSquareStates = Object.values(Wordle(newGuess, solution));
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
    if (playerGuesses[currentGuessIdx - 1] !== solution) {
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentGuessIdx, guess, playerGuesses, squareStates]);

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


