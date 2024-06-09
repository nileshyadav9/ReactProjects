import "./App.css";
import React from "react";
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 9 };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  handleDecrement() {
    this.setState((currentState) => {
      return { count: currentState.count - 1 };
    });
  }

  handleIncrement() {
    this.setState((currentState) => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const date = new Date("june 9 2024");
    date.setDate(date.getDate() + this.state.count);
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>{this.state.count}</span>
        <span>{date.toDateString()}</span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}
export default Counter;
