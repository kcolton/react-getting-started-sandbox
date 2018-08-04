import React from "react";
import ReactDOM from "react-dom";
import range from "lodash-es/range";

import "./game.css";

const Stars = props => {
  return (
    <div className="col-5">
      {range(0, props.numberOfStars).map((number, i) => <i key={i} className="fa fa-star" />)}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button disabled={props.selectedNumbers.length === 0}>=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => (
        <span key={i} onClick={() => props.unselectNumber(number)}>
          {number}
        </span>
      ))}
    </div>
  );
};

const Numbers = props => {
  function numberClassName(number) {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => (
          <span
            key={i}
            className={numberClassName(number)}
            onClick={() => props.selectNumber(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};
Numbers.list = range(1, 10);

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
  };

  selectNumber = numToSelect => {
    if (this.state.selectedNumbers.indexOf(numToSelect) >= 0) {
      return;
    }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(numToSelect)
    }));
  };

  unselectNumber = numToUnselect => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(num => num !== numToUnselect)
    }));
  };

  render() {
    const { selectedNumbers, randomNumberOfStars } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
