function Wordle(guess, solution) {

  const splitSolution = solution.split('')
  const splitGuess = guess.split('')
  const solutionCharsTaken = splitSolution.map(() => false)
  const statuses = Array(guess.length);

  /*
   Correct Cases
  */

  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  /*
   Absent Cases
  */

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      statuses[i] = 'absent'
      return
    }

    /*
    Present Cases
    */

    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  let result = {};
  splitGuess.forEach((letter, i) => {
    result[letter] = statuses[i];
  });
  return result;
}

export default Wordle;
