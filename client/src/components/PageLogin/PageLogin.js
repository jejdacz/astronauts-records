import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../astronautActions.js";
import LogInForm from "../LogInForm/LogInForm";
import Panel from "../Panel/Panel";
import styles from "./PageLogin.module.css";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
