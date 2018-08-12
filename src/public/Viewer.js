import React, { Component } from "react";
import AstronautList from "./AstronautList.js";
import graphqlRequest from "./graphql-request.js";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      astronauts: [],
      recordsLoaded: false
    };
  }

  componentDidMount() {
    this.loadRecords();
  }

  loadRecords() {
    graphqlRequest("{astronauts {id firstName lastName birth superPower}}")
      .then(({ data }) =>
        this.setState({ astronauts: data.astronauts, recordsLoaded: true })
      )
      .catch(err => console.warn("can't load records"));
  }

  render() {
    return (
      <section className="viewer">
        {this.state.recordsLoaded ? (
          <AstronautList astronauts={this.state.astronauts} />
        ) : (
          "loading..."
        )}
      </section>
    );
  }
}

export default Viewer;
