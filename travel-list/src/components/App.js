import FlashCards from "./FlashCards";
import ToDoPackingList from "./ToDoPackingList";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
]; */

export default function App() {
  return (
    <div>
      <ToDoPackingList />
      TODO
      <FlashCards />
    </div>
  );
}
