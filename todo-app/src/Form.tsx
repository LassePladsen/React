import { Component } from "react";
import Item from "./Item";
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

    const items = this.state.items;
    items.push(value);

    // Reset input value, add new item with current input value
    this.setState({ value: "", items: items });
  }

  render() {
    // Map items to li element
    const items = this.state.items.map((value, i) => (
      <Item key={String(i)} value={value} />
    ));

    return (
      <div className="Form">
        <ul className="Form-items">{items}</ul>
        <form className="Form-form" onSubmit={this.handleSubmit}>
          <input
            className="Form-input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
          <input type="submit" className="Form-button" value="Add item"></input>
        </form>
      </div>
    );
  }
}
