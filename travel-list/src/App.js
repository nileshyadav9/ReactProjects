import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

export default function App() {
  return (
    <div>
      <App2 />
      TODO
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  const [selectedQs, setSelectedQs] = useState(null);
  function handleClick(id) {
    setSelectedQs(id !== selectedQs ? id : null);
  }
  return (
    <div className="flashcards">
      {questions.map((qs) => (
        <div
          key={qs.id}
          className={qs.id === selectedQs ? "selected" : ""}
          onClick={() => handleClick(qs.id)}
        >
          <p>{qs.id === selectedQs ? qs.answer : qs.question}</p>
        </div>
      ))}
    </div>
  );
}

function App2() {
  const [items, setItem] = useState([]);
  // this should have been in packaging but data cannot flow from sibling only down the tree, so we pull it in APP which is parent for all and call from here
  //const [packedPercentage, setPackedPercentage] = useState(0);
  function handleAddItems(item) {
    //we do not use push because that would change the original array. which is not allowed in react
    setItem((items) => [...items, item]);
  }
  function handleRemoveItems(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckedItems(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onCheckedItem={handleCheckedItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>😎🌴 Far Away</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quant, setQuant] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newSubmittedItem = {
      description,
      quant,
      packed: false,
      id: new Date(),
    };
    onAddItems(newSubmittedItem);

    setDescription("");
    setQuant(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip?</h3>
      <select value={quant} onChange={(e) => setQuant(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onRemoveItems, onCheckedItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Listitem
            key={item.id}
            item={item}
            onRemoveItems={onRemoveItems}
            onCheckedItem={onCheckedItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Listitem({ item, onRemoveItems, onCheckedItem }) {
  //const isPackedClass = listitem.packed ? "packed" : "";
  /* <div className={isPackedClass}> */

  return (
    <li>
      <input
        type="checkbox"
        className="check-box"
        value={item.packed}
        onChange={() => onCheckedItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItems(item.id)}>❎</button>
    </li>
  );
}
function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const percent = (packedItems / items.length) * 100;
  return (
    <footer className="stats">
      <em>
        You have {packedItems} items on your list and you already packed:
        {Math.round(percent)} %
      </em>
    </footer>
  );
}
