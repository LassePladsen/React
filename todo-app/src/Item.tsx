export default function Item(props: any) {

  return (
    <li className="Item" key={props.key}>
      {props.value}
      <button onClick={}>X</button>
    </li>
  );
}
