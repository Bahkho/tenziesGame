import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";
import "./style.css";

export default function App() {
  // STATE THAT HOLD OUR ARRAYS OF NUMBERS
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    // Check if all dice have the same value
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    // If both conditions are true, set tenzies to true and log "You won!"
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  const rollDice = () => {
    if (!tenzies) {
      setDice((heldDice) =>
        heldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };

  // const arrObj = numbers.map(value => ({ value, isHeld: false }))
  // console.log(arrObj)

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  // MAPPING THROUGH EACH 10 NUM GENERATED TO EACH VALUE FRPM DIE COMPONENT
  const diceElements = dice.map((number) => {
    return (
      <Die
        key={number.id}
        // {...number}
        value={number.value}
        isHeld={number.isHeld}
        handleClick={() => holdDice(number.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
// FUNCTION THAT GENERATES 10 NUMBERS BETWEEN 1-6

const generateNewDie = () => {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
};

const allNewDice = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(generateNewDie());
  }
  return result;
};
