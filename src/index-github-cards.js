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
  return (
    <div>
      <Card
        name="Paul O’Shannessy"
        avatar_url="https://avatars1.githubusercontent.com/u/8445?v=4"
        company="Facebook"
      />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <CardList />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
