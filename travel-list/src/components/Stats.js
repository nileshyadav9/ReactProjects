export function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your list</em>
      </p>
    );

  const packedItems = items.filter((item) => item.packed).length;
  const totalItems = items.length;
  const percent = (packedItems / items.length) * 100;
  const footerMessage =
    percent !== 100
      ? `You have ${totalItems} items on your list and you already packed:
  ${packedItems}(${Math.round(percent)} %)`
      : "You got everything! Ready to go!!";
  return (
    <footer className="stats">
      <em>{footerMessage}</em>
    </footer>
  );
}
