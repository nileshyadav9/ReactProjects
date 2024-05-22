export default function Listitem({ item, onRemoveItems, onCheckedItem }) {
  //const isPackedClass = listitem.packed ? "packed" : "";
  /* <div className={isPackedClass}> */
  //console.log(item);
  return (
    <li>
      <input
        type="checkbox"
        className="check-box"
        value={item.packed}
        onChange={() => onCheckedItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quant} {item.description}
      </span>
      <button onClick={() => onRemoveItems(item.id)}>❎</button>
    </li>
  );
}
