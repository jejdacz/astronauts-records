import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAstronauts, editAstronaut, updateEditor } from "../actions.js";
import AstronautList from "../components/AstronautList.js";
import AstronautEditor from "../components/AstronautEditor.js";
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
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchAstronauts);
  }

  handleClick(id) {
    const astronaut = this.props.astronauts.items.filter(a => a.id === id)[0];
    this.props.dispatch(editAstronaut(astronaut));
  }

  handleChange(field) {
    this.props.dispatch(updateEditor(field));
  }

  render() {
    this.props.isEditorActive && console.log(this.props.editor.astronaut);
    return (
      <section className="app">
        <AppHeader />
        {!this.props.astronauts.isFetching ? (
          <AstronautList
            onClick={this.handleClick}
            astronauts={this.props.astronauts.items}
          />
        ) : (
          "loading..."
        )}
        {this.props.isEditorActive && (
          <AstronautEditor
            onChange={this.handleChange}
            astronaut={this.props.editor.astronaut}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
