import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecords } from "../actions.js";
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
        commodo.
      </p>
    </header>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchRecords);
  }

  render() {
    return (
      <section className="app">
        <AppHeader />
        {!this.props.records.isFetching ? (
          <AstronautList
            editRecord={console.log}
            records={this.props.records.items}
          />
        ) : (
          "loading..."
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

export default connect(mapStateToProps)(App);
