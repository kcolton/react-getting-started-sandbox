import React from "react";
import ReactDOM from "react-dom";
import range from "lodash-es/range";

import "./game.css";

const Stars = props => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  return (
    <div className="col-5">
      {range(0, numberOfStars).map((number, i) => <i key={i} className="fa fa-star" />)}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      <span>5</span>
      <span>6</span>
    </div>
  );
};

const Numbers = props => {
  return (
    <div className="card text-center">
      <div>{Numbers.list.map((number, i) => <span key={i}>{number}</span>)}</div>
    </div>
  );
};
Numbers.list = range(1, 10);

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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
