import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import {
  loadAstronauts,
  clearErrorAction,
  me
} from "../../astronautActions.js";
import PageAstronauts from "../PageAstronauts/PageAstronauts.js";
import PageAstronaut from "../PageAstronaut/PageAstronaut.js";
import PageLogin from "../PageLogin/PageLogin.js";
import { Modal, Button, Controls, Heading, Message } from "../Modal/Modal.js";
import delayedRender from "../delayedRender/delayedRender.js";
import Spinner from "../Spinner/Spinner.js";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const DelayedModal = delayedRender(800)(Modal);

const AppError = (
  <h1
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5rem"
    }}
  >
    Application encountered an error.
  </h1>
);

export const AstronautsLoader = lifecycle({
  componentDidMount() {
    this.props.loadAstronauts();
  }
})(({ loadAstronauts }) => null);

export const App = ({
  isAuthorized,
  pending,
  clearError,
  error,
  loadAstronauts
}) => {
  return (
    <ErrorBoundary render={AppError}>
      <Switch>
        <Route
          exact={true}
          path="/login"
          render={props =>
            isAuthorized ? <Redirect to="/" /> : <PageLogin {...props} />
          }
        />

        <Route
          exact={true}
          path="/astronauts/new"
          render={props =>
            isAuthorized ? (
              <PageAstronaut {...props} isNew={true} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          exact={true}
          path="/astronauts/edit/:id"
          render={props =>
            isAuthorized ? (
              <PageAstronaut {...props} editing={true} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          exact={true}
          path="/astronauts/:id"
          render={props =>
            isAuthorized ? (
              <PageAstronaut {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          path="/"
          render={props =>
            isAuthorized ? (
              <PageAstronauts {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>

      {isAuthorized && <AstronautsLoader loadAstronauts={loadAstronauts} />}

      <Modal isOpen={!!error} onRequestClose={clearError}>
        <Heading>Error</Heading>
        <Message>{error}</Message>
        <Controls>
          <Button onClick={clearError}>ok</Button>
        </Controls>
      </Modal>

      <DelayedModal
        shouldRender={!!pending}
        isOpen={!!pending}
        shouldCloseOnOverlayClick={false}
        boxed={false}
      >
        <Spinner center={true} light={true} />
      </DelayedModal>
    </ErrorBoundary>
  );
};

App.propTypes = {
  pending: PropTypes.bool.isRequired,
  error: PropTypes.any,
  clearError: PropTypes.func.isRequired,
  loadAstronauts: PropTypes.func.isRequired,
  me: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  pending: state.pending,
  error: state.error,
  isAuthorized: state.isAuthorized
});

const mapDispatchToProps = dispatch => ({
  loadAstronauts: () => dispatch(loadAstronauts()),
  clearError: () => dispatch(clearErrorAction()),
  me: () => dispatch(me())
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.me();
    }
  })
)(App);
