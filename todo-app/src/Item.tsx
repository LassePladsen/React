import { Component } from "react";
import deleteLogo from "./delete(1).png";

type ItemProps = {
  key: number;
  value: string;
  onDelete: () => void;
};

type ItemState = {
  key: number;
  value: string;
  onDelete: () => void;
  isCompleted: boolean;
};

export default class Item extends Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      key: props.key,
      value: props.value,
      onDelete: props.onDelete,
      isCompleted: false,
    };
  }

  render() {
    return (
      <li className="Item" key={this.state.key}>
        <p
          className={`Item-text ${this.state.isCompleted ? "completed" : ""}`}
          onClick={() =>
            this.setState({ isCompleted: !this.state.isCompleted })
          }
        >
          {this.state.value}
        </p>
        <div className="Item-usage">
          {/* <input className="Item-checkbox" type="checkbox" /> */}
          <button className="Item-button" onClick={this.state.onDelete}>
            <img className="Item-logo" src={deleteLogo} alt="delete-icon" />
          </button>
        </div>
      </li>
    );
  }
}
