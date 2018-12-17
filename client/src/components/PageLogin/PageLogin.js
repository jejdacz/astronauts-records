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
import LogInForm from "../LogInForm/LogInForm";
import Footer from "../Footer/Footer";
import Panel from "../Panel/Panel";
import Button from "../Button/Button";
import styles from "./PageLogin.module.css";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    const a = { name: "john", pet: "" };
    const b = Object.keys(a).reduce((ac, v) => ({ ...ac, [v]: !!a[v] }), {});
    console.log(b);
  }

  static propTypes = {
    pending: PropTypes.bool,
    login: PropTypes.func.isRequired
  };

  handleSubmit(values) {
    this.props.login(values);
  }

  render() {
    return (
      <Fragment>
        <main className={styles.main}>
          <Panel>
            <h1 className={styles.heading}>Sign In</h1>
            <LogInForm
              onSubmit={this.handleSubmit}
              submitting={this.props.pending}
            />
          </Panel>
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
  pending: state.pending
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageLogin);
