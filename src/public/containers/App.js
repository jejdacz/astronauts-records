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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchAstronauts);
  }

  handleEdit(id) {
    const astronaut = JSON.parse(
      JSON.stringify(this.props.astronauts.items.filter(a => a.id === id)[0])
    );
    // TODO move to reducer
    const birth = new Date(astronaut.birth);
    astronaut.birthDay = birth.getDate();
    astronaut.birthMonth = birth.getMonth() + 1;
    astronaut.birthYear = birth.getFullYear();

    this.props.dispatch(editAstronaut(astronaut));
  }
  /*
  handleCancel() {
    this.props.dispatch(cancelEditAstronaut());
  }

  handleSave() {
    this.props.dispatch(saveAstronaut());
  }

  handleDelete() {
    this.props.dispatch(deleteAstronaut(id));
  }
*/
  handleChange(field) {
    this.props.dispatch(updateEditor(field));
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
        {this.props.isEditorActive && (
          <AstronautEditor
            onChange={this.handleChange}
            state={this.props.editor}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(App);
