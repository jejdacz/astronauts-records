import React, { Component } from "react";
import AstronautList from "./AstronautList.js";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      astronauts: [],
      recordsLoaded: false
    };
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
