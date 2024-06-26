import { Component } from "react";
import Item from "./Item";
import iconAdd from "./images/add(1).png";

export default class Form extends Component<
  {},
  { value: string; items: string[] }
> {
  constructor(props: any) {
    super(props);
    this.state = { value: "", items: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();

    // Dont add item if empty input
    const value = this.state.value;
    if (value === "") return;

    let items = this.state.items;
    items.push(value);

    // Reset input value, add new item with current input value
    this.setState({ value: "", items: items });
  }

  deleteItem(itemIndex: number) {
    let items = this.state.items;
    items.splice(itemIndex, 1);
    this.setState({ items: items });
  }

  render() {
    // Map items to li element
    const items = this.state.items.map((value, index) => {
      return (
        <Item
          key={index}
          value={value}
          onDelete={() => this.deleteItem(index)}
        />
      );
    });

    // Logo size
    const size = 30;
    return (
      <div className="Form">
        <ul className="Form-items">{items}</ul>
        <form className="Form-form" onSubmit={this.handleSubmit}>
          <div className="Form-content">
            <input
              className="Form-input"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
            {/* <input
              type="submit"
              className="Form-button"
              value="Add item"
            ></input> */}
            <input
              type="image"
              src={iconAdd}
              className="Form-submit"
              alt="icon-add"
              width={size}
              height={size}
            />
          </div>
        </form>
      </div>
    );
  }
}
