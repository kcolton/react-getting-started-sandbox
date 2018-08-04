import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function Card(props) {
  return (
    <div style={{ margin: "1em" }}>
      <img width="75" src={props.avatar_url} alt="avatar" />
      <div className="info" style={{ display: "inline-block", marginLeft: 10 }}>
        <div style={{ fontSize: "1.25em", fontWeight: "bold" }}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
}

function CardList(props) {
  return <div>{props.cards.map(card => <Card key={card.id} {...card} />)}</div>;
}

class Form extends React.Component {
  state = { userName: "" };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Event: Form submitted", this.state.userName);

    axios.get(`https://api.github.com/users/${this.state.userName}`).then(resp => {
      console.log(resp);
      this.props.onSubmit(resp.data);
      this.setState({ userName: "" });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Github Username"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };

  addNewCard = cardInfo => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
