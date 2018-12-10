import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { astronautType } from "../../types.js";
import { connect } from "react-redux";
import {
  login,
  deleteAstronaut,
  updateAstronaut,
  clearChangedAction
} from "../../astronautActions.js";
import { Nav, Logo, Link } from "../Nav/Nav";
import AstronautForm from "../AstronautForm/AstronautForm";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./PageLogin.module.css";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login({ name: "astronaut", password: "universe" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" />
        <input type="password" />
        <button type="submit">login</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  login: values => dispatch(login(values))
});

const mapStateToProps = (state, props) => ({
  pending: state.pending,
  changed: state.changed
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageLogin);
