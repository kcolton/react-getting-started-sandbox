import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Card(props) {
  return (
    <div style={{ margin: "1em" }}>
      <img width="75" src={props.avatar_url} alt="avatar" />
      <div className="info" style={{ display: "inline-block", marginLeft: 10 }}>
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
}

function CardList(props) {
  return <div>{props.cards.map(card => <Card {...card} />)}</div>;
}

class Form extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    console.log("Event: Form submitted", this.userNameInput.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Github Username"
          ref={input => (this.userNameInput = input)}
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [
      {
        name: "Paul O’Shannessy",
        avatar_url: "https://avatars1.githubusercontent.com/u/8445?v=4",
        company: "Facebook"
      },
      {
        name: "Ken Colton",
        avatar_url: "https://avatars1.githubusercontent.com/u/390961?v=4",
        company: "Grubhub"
      }
    ]
  };

  render() {
    return (
      <div>
        <Form />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
