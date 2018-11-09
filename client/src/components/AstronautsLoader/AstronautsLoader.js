import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import { compose, lifecycle } from "recompose";
import { AsyncData } from "../AsyncData/AsyncData";

const mapStateToProps = state => ({
  astronauts: state.astronauts.items,
  ...state.loadAstronauts
});

const mapDispatchToProps = dispatch => ({
  loadAstronauts: () => dispatch(loadAstronautsIfNeeded)
});

export default compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(loadAstronautsIfNeeded);
      console.log("mount");
    },
    componentDidUpdate() {
      //this.props.dispatch(loadAstronautsIfNeeded);
      console.log("update");
    }
  })
)(AsyncData);
