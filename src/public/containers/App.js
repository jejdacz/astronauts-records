import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAstronauts } from "../actions.js";
import AstronautList from "../components/AstronautList.js";
//import Editor from "./Editor.js";

function AppHeader() {
  return (
    <header>
      <h1 className="title">Evidence kosmonautu</h1>
      <p>
        Culpa labore Lorem mollit aliqua in labore dolore smod veniam nostrud
        aliqua labore incididunt consectetur nostrud minim. Adipisicing et esse
        reprehenderit fugiat commodo cillum duis reprehenderit aliqua qui
        commodos.
      </p>
    </header>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchAstronauts);
  }

  render() {
    return (
      <section className="app">
        <AppHeader />
        {!this.props.astronauts.isFetching ? (
          <AstronautList
            edit={console.log}
            astronauts={this.props.astronauts.items}
          />
        ) : (
          "loading..."
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
