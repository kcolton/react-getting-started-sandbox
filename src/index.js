import React from "react";
import ReactDOM from "react-dom";

// import Button from "./Button";

import "./styles.css";

class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClickFunction}>+1</button>;
  }
}

// add a result component using a simple function component since it has no private mutable state

function Result(props) {
  return <div>{props.counter}</div>;
}

class App extends React.Component {
  state = { counter: 0 };

  incrementCounter = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  };

  render() {
    return (
      // component must have single containing
      <div>
        <Button onClickFunction={this.incrementCounter} />
        <Result counter={this.state.counter} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
