import React from "react";
import ReactDOM from "react-dom";

import "./style.scss";

function Astronaut(props) {
  const astronaut = props.record;
  const birth = new Date(astronaut.birth);
  return (
    <div>
      <div>
        Name: {astronaut.firstName} {astronaut.lastName}
      </div>
      <div>
        Birth: {birth.getDate()}.{birth.getMonth()}.{birth.getFullYear()}
      </div>
      <div>Superpower: {astronaut.superPower}</div>
    </div>
  );
}

function RecordList(props) {
  const records = props.records.map(record => (
    <li key={record.id}>
      <Astronaut record={record} />
    </li>
  ));
  return <ul>{records}</ul>;
}

class RecordTable extends React.Component {
  render() {
    return (
      <div>
        <RecordList records={this.props.records} />
        <button>add</button>
      </div>
    );
  }
}

class EvidenceKosmonautu extends React.Component {
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
        <RecordTable records={this.props.records} />
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

ReactDOM.render(
  <EvidenceKosmonautu records={RECORDS} />,
  document.getElementById("root")
);
