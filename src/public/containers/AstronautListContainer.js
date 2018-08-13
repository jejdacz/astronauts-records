import React, { Component } from "react";
import { connect } from "react-redux";
import AstronautList from "../components/AstronautList";

let AstronautListContainer extends Component {
  componentDidMount() {

  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps)(AstronautList);
