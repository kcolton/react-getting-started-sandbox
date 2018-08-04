import React from "react";

export class Button extends React.Component {
  state = { counter: 0 };

  handleClick = () => {
    // setState is async - reading and writing = possible race condition
    // upodate using current state = use function
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  };

  render() {
    return <button onClick={this.handleClick}>{this.state.counter}</button>;
  }
}
