import { Game, get_card } from "./Logic/Card.js";
import { useEffect, useState } from "react";
import "./App.css";
// import one from "./imgs/one.png";

function App() {
  const [hand, setHand] = useState([]);
  const [deck, setDeck] = useState([]);
  const [field, setField] = useState([]);
  const [spare, setSpare] = useState([]);
  const game = new Game();

  const setup = () => {
    const cards = game.get_hand();
    const field = game.get_field();
    setDeck(game.get_deck());
    setHand(intoKeyValue(cards));
    setField(intoKeyValue(field));
    setSpare(game.get_spare());
  };

  const intoKeyValue = (array) => {
    const tempArray = [];
    for (let i = 0; i < array.length; i++) {
      const card = {
        key: i,
        value: array[i].get_value(),
      };
      tempArray.push(card);
    }
    return tempArray;
  };

  const onDragStart = (e, card) => {
    e.dataTransfer.setData("key", card.key);
    e.dataTransfer.setData("value", card.value);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const tempField = [...field];
    const tempHand = hand;

    const key = e.dataTransfer.getData("key");
    const value = parseInt(e.dataTransfer.getData("value"));
    const targetKey = e.target.id;
    const targetValue = parseInt(e.target.innerHTML);

    if (
      value === targetValue + 1 ||
      value === targetValue - 1 ||
      (value === 13 && targetValue === 1) ||
      (value === 1 && targetValue === 13)
    ) {
      tempField.forEach((item) => {
        if (item.key.toString() === targetKey) {
          item.value = value;
          tempHand.forEach((item) => {
            if (item.key.toString() === key) {
              item.value = get_card(1, deck)[0].get_value();
            }
          });
        }
      });
    }
    setHand([...tempHand]);
    setField(tempField);
  };

  const handleExtra = () => {
    const tempField = field;
    if (spare.length < 2) {
      alert("GAME OVER, OUT OF CARDS");
      return;
    }
    const newField = get_card(2, spare);
    for (let i = 0; i < tempField.length; i++) {
      tempField[i].value = newField[i].get_value();
    }
    console.log(`spare length: ${spare.length}`);
    console.log(spare);
    setField([...tempField]);
  };

  useEffect(() => {
    setup();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div id="game">
        <h1 id="title">SPEED</h1>
        <div id="field">
          {field.map((item) => (
            <button
              key={item.key}
              className="card"
              id={item.key}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => {
                onDrop(e, "dropped");
              }}
            >
              {item.value}
            </button>
          ))}
        </div>
        <h1 className="center" hidden>
          Game Over
        </h1>
        {/* {
          hand.map(item => (
            <img
              id="one"
              src={one}
              key={item.key}
              alt='yeah'
              onDragStart={(e)=> {onDragStart(e, {key: item.key, value: item.value})}} 
            ></img>
          ))
        } */}
        <div id="hand">
          {hand.map((item) => (
            <button
              key={item.key}
              className="card"
              //onClick={() => cardSelect(item.key)}
              draggable
              onDragStart={(e) => {
                onDragStart(e, { key: item.key, value: item.value });
              }}
            >
              {item.value}
            </button>
          ))}
        </div>
        <button onClick={handleExtra} id="extra">
          No Valid Action
        </button>
      </div>
    </div>
  );
}

export default App;

// const cardSelect = key => {
//   const tempHand2 = hand
//   const tempField = [...field]
//   tempHand2.forEach(item => {
//     if (item.key === key) {
//       item.value = get_card(1, deck)[0].get_value()
//     }
//   })
//   setHand([...tempHand2])

//   tempField.forEach(item=> {

//   })
// }
