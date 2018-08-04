import React from "react";
import ReactDOM from "react-dom";

class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFunction(this.props.incrementValue);
  };

  render() {
    return (
      <button className="btn btn-outline-secondary" onClick={this.handleClick}>
        +{this.props.incrementValue}
      </button>
    );
  }
}

// add a result component using a simple function component since it has no private mutable state
function Result(props) {
  return <div>{props.counter}</div>;
}

class App extends React.Component {
  state = { counter: 0 };

  incrementCounter = incrementValue => {
    this.setState(prevState => ({
      counter: prevState.counter + incrementValue
    }));
  };

  render() {
    return (
      // component must have single containing
      <div>
        <Button incrementValue={1} onClickFunction={this.incrementCounter} />
        <Button incrementValue={5} onClickFunction={this.incrementCounter} />
        <Button incrementValue={10} onClickFunction={this.incrementCounter} />
        <Button incrementValue={100} onClickFunction={this.incrementCounter} />
        <Result counter={this.state.counter} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
