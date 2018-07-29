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

function Astronaut(props) {
  const birth = new Date(props.birth);
  return (
    <div>
      <div>
        Name: {props.firstName} {props.lastName}
      </div>
      <div>
        Birth: {birth.getDate()}.{birth.getMonth()}.{birth.getFullYear()}
      </div>
      <div>Superpower: {props.superPower}</div>
    </div>
  );
}

function AstronautList(props) {
  return (
    <ul>
      {props.astronauts.map(astronaut => (
        <li key={astronaut.id}>
          <Astronaut {...astronaut} />
        </li>
      ))}
    </ul>
  );
}

class RecordTable extends Component {
  render() {
    return (
      <div>
        {this.props.records && (
          <AstronautList astronauts={this.props.records} />
        )}
        <button>sort</button>
      </div>
    );
  }
}

class EvidenceKosmonautu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null
    };
    this.loadRecords();
  }

  loadRecords() {
    graphqlRequest("{astronauts {id firstName lastName birth superPower}}")
      .then(({ data }) => this.setState({ records: data.astronauts }))
      .catch(err => console.warn("can't load records"));
  }

  render() {
    return (
      <section>
        <header>
          <h1 className="title">Evidence kosmonautu</h1>
          <p>
            Culpa labore Lorem mollit aliqua in labore dolore smod veniam
            nostrud aliqua labore incididunt consectetur nostrud minim.
            Adipisicing et esse reprehenderit fugiat commodo cillum duis
            reprehenderit aliqua qui commodo.
          </p>
        </header>
        <RecordTable records={this.state.records} />
        <button>add</button>
      </section>
    );
  }
}

const RECORDS = [
  {
    id: "5b5a236352009d43ce72608b",
    firstName: "Jurij",
    lastName: "Gagarin",
    birth: "Mon Sep 03 1934 00:00:00 GMT+0100 (Central European Summer Time)",
    superPower: "invisibility"
  },
  {
    id: "5b5c223773032b2333ff4651",
    firstName: "Neil",
    lastName: "Armstrong",
    birth: "Thu May 08 1930 00:00:00 GMT+0100 (Central European Summer Time)",
    superPower: "healing"
  },
  {
    id: "5b5c23d8894bcb247fc147b9",
    firstName: "Abraham",
    lastName: "Armstrong",
    birth: "Thu May 08 1930 00:00:00 GMT+0100 (Central European Summer Time)",
    superPower: "healing"
  },
  {
    id: "5b5c24ae87153c251b791e53",
    firstName: "Abraham",
    lastName: "Armstrong",
    birth: "Thu May 08 1930 00:00:00 GMT+0100 (Central European Summer Time)",
    superPower: "healing"
  }
];

render(<EvidenceKosmonautu />, document.getElementById("root"));
