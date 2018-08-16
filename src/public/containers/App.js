import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAstronauts, editAstronaut } from "../actions.js";
import AstronautList from "../components/AstronautList.js";
import AstronautEditorContainer from "./AstronautEditorContainer.js";
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
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchAstronauts);
  }

  handleEdit(astronaut) {
    this.props.dispatch(editAstronaut(astronaut));
  }

  render() {
    return (
      <section className="app">
        <AppHeader />
        {!this.props.astronauts.isFetching ? (
          <AstronautList
            onClick={this.handleEdit}
            astronauts={this.props.astronauts.items}
          />
        ) : (
          "loading..."
        )}
        {this.props.isEditorActive && <AstronautEditorContainer />}
      </section>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
