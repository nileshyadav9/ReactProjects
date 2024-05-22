import { useState } from "react";
import Logo from "./Logo";
import Form from "./Forms";
import PackingList from "./PackingList";
import { Stats } from "./Stats";

export default function ToDoPackingList() {
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

  function handleClearList() {
    const confirm = window.confirm("Are you sure you want to clear list?");

    if (confirm) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onCheckedItem={handleCheckedItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
