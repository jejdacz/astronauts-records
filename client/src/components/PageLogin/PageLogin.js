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
import LoginForm from "../Forms/LoginForm";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./PageLogin.module.css";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.login(values);
  }

  render() {
    return (
      <Fragment>
        <main className={styles.main}>
          <Container className={styles.container}>
            <h1 className={styles.heading}>Sign In</h1>
            <LoginForm
              onSubmit={this.handleSubmit}
              submitting={this.props.pending}
            />
          </Container>
        </main>
        <Footer />
      </Fragment>
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
