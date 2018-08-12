import React, { Component } from "react";
import Viewer from "./Viewer.js";
import Editor from "./Editor.js";

function AppHeader() {
  return (
    <header>
      <h1 className="title">Evidence kosmonautu</h1>
      <p>
        Culpa labore Lorem mollit aliqua in labore dolore smod veniam nostrud
        aliqua labore incididunt consectetur nostrud minim. Adipisicing et esse
        reprehenderit fugiat commodo cillum duis reprehenderit aliqua qui
        commodo.
      </p>
    </header>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  render() {
    return (
      <section className="app">
        {this.state.editMode ? (
          <Editor />
        ) : (
          <React.fragment>
            <AppHeader />
            <Viewer />
          </React.fragment>
        )}
      </section>
    );
  }
}

export default App;
