import React, { Component } from "react";
import { render } from "react-dom";

import "./style.scss";

const graphqlRequest = (query, variables) =>
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then(r => r.json());

function AstronautListItem(props) {
  const birth = new Date(props.birth);
  return (
    <li className="list-item" key={props.id}>
      <div className="cell name">{`Name: ${props.firstName} ${
        props.lastName
      }`}</div>
      <div className="cell birth">
        {`Birth: ${birth.getDate()}.${birth.getMonth()}.${birth.getFullYear()}`}
      </div>
      <div className="cell super-power">{`Superpower: ${
        props.superPower
      }`}</div>
    </li>
  );
}

function AstronautList(props) {
  return (
    <ul className="list">
      {props.astronauts.map(astronaut => <AstronautListItem {...astronaut} />)}
    </ul>
  );
}

class AstronautListControls extends Component {
  render() {
    return (
      <div className="controls">
        <button>sort</button>
      </div>
    );
  }
}

class Evidence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      astronauts: null,
      editMode: false
    };
    this.loadRecords();
  }

  loadRecords() {
    graphqlRequest("{astronauts {id firstName lastName birth superPower}}")
      .then(({ data }) => this.setState({ astronauts: data.astronauts }))
      .catch(err => console.warn("can't load records"));
  }

  render() {
    let list = this.state.astronauts ? (
        <AstronautList astronauts={this.state.astronauts} />
    ) : (
      "no records"
    );

    const content = this.state.editMode ? <div>editing</div> : list;

    return (
      <section className="astronaut-records">
        <header>
          <h1 className="title">Evidence kosmonautu</h1>
          <p>
            Culpa labore Lorem mollit aliqua in labore dolore smod veniam
            nostrud aliqua labore incididunt consectetur nostrud minim.
            Adipisicing et esse reprehenderit fugiat commodo cillum duis
            reprehenderit aliqua qui commodo.
          </p>
        </header>
        {content}
      </section>
    );
  }
}

render(<Evidence />, document.getElementById("root"));
