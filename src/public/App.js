import React, { Component } from "react";
import R from "ramda";

import AstronautList from "./AstronautList.js";
import graphqlRequest from "./graphql-request.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      astronauts: null,
      editMode: false
    };
  }

  componentDidMount() {
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

export default App;
