import React from "react";
import ReactDOM from "react-dom";
import range from "lodash-es/range";

import "./game.css";

const Stars = props => {
  return (
    <div className="col-sm-5 stars">
      {range(0, props.numberOfStars).map((number, i) => (
        <i key={i} className="fa fa-star stars__star" />
      ))}
    </div>
  );
};

const Button = props => {
  let button;

  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check" />
          <br />
          <small>next</small>
        </button>
      );
      break;
    case false:
      button = (
        <button className="btn btn-danger">
          <i className="fa fa-times" />
          <br />
          <small>wrong</small>
        </button>
      );
      break;
    default:
      button = (
        <button
          className="btn btn-secondary"
          disabled={props.selectedNumbers.length === 0}
          onClick={props.checkAnswer}
        >
          =<br />
          <small>check</small>
        </button>
      );
      break;
  }

  return (
    <div className="col-sm-2 text-center">
      {button}
      <br />
      <br />
      <button
        className="btn btn-warning btn-sm"
        onClick={props.redraw}
        disabled={props.redraws === 0}
      >
        <i className="fa fa-sync" /> {props.redraws}
        <br />
        <small>reshuffle</small>
      </button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-sm-5">
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
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used";
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
  }

  return (
    <div className="text-center">
      <hr />
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
      <small className="text-muted">
        Select numbers that add up to the count of stars above. Example:{" "}
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" /> → 5 or 3,2 or 4,1<br />
        Win by using all your numbers. Careful though! Run out of your 5 Reshuffles{" "}
        <i className="fa fa-sync" /> and you're a loser.
      </small>
    </div>
  );
};
Numbers.list = range(1, 10);

const DoneFrame = props => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-outline-secondary" onClick={props.resetGame}>
        Play Again
      </button>
    </div>
  );
};

class Game extends React.Component {
  static getRandomNumberOfStars() {
    return 1 + Math.floor(Math.random() * 9);
  }

  static getInitialState() {
    return {
      selectedNumbers: [],
      usedNumbers: [],
      randomNumberOfStars: Game.getRandomNumberOfStars(),
      answerIsCorrect: null,
      redraws: 5,
      doneStatus: null
    };
  }

  state = Game.getInitialState();

  resetGame = () => this.setState(Game.getInitialState());

  selectNumber = numToSelect => {
    if (
      this.state.selectedNumbers.indexOf(numToSelect) >= 0 ||
      this.state.usedNumbers.indexOf(numToSelect) >= 0
    ) {
      return;
    }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(numToSelect)
    }));
  };

  unselectNumber = numToUnselect => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(num => num !== numToUnselect)
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.getRandomNumberOfStars()
      }),
      this.updateDoneStatus
    );
  };

  redraw = () => {
    if (this.state.redraws <= 0) {
      return;
    }
    this.setState(
      prevState => ({
        answerIsCorrect: null,
        randomNumberOfStars: Game.getRandomNumberOfStars(),
        selectedNumbers: [],
        redraws: prevState.redraws - 1
      }),
      this.updateDoneStatus
    );
  };

  possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
    const possibleNumbers = range(1, 10).filter(number => usedNumbers.indexOf(number) === -1);
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      console.log("updated done status:", prevState);

      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Well Played." };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: "GG. Loser." };
      }
    });
  };

  render() {
    const {
      answerIsCorrect,
      doneStatus,
      randomNumberOfStars,
      redraws,
      selectedNumbers,
      usedNumbers
    } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        <br />
        {doneStatus ? (
          <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />
        ) : (
          <Numbers
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}
          />
        )}
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

function possibleCombinationSum(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
    combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
}
