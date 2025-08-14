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

export default GameRow;