export default function Item({
  index,
  value,
  onDelete,
}: {
  index: number;
  value: string;
  onDelete: () => void;
}) {
  return (
    <li className="Item" key={index}>
      {value}
      <button onClick={onDelete}>X</button>
    </li>
  );
}
