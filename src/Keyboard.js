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

export default Keyboard;