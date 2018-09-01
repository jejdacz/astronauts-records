import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAstronauts, openEditor } from "../actions.js";
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
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchAstronauts);
  }

  handleEditClick(astronaut) {
    this.props.dispatch(openEditor(astronaut));
  }

  handleDeleteClick(id) {
    //this.props.dispatch(deleteAstronaut(id));
  }

  handleClickAdd() {
    //this.props.dispatch(createAstronaut());
  }

  render() {
    return (
      <section className="app">
        <AppHeader />
        {!this.props.astronauts.isFetching ? (
          <AstronautList
            onEditClick={this.handleEditClick}
            onDeleteClick={this.handleDeleteClick}
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
