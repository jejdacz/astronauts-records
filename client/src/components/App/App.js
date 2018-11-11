import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { loadAstronauts, clearErrorAction } from "../../astronautActions.js";
import PageAstronauts from "../PageAstronauts/PageAstronauts.js";
import PageAstronaut from "../PageAstronaut/PageAstronaut.js";
import { Modal, Button, Controls, Heading, Message } from "../Modal/Modal.js";
import withDelayedRender from "../withDelayedRender/withDelayedRender.js";
import Spinner from "../Spinner/Spinner.js";

const DelayedModal = withDelayedRender(1500)(Modal);

export const App = props => {
  return (
    <Fragment>
      <Switch>
        <Route exact={true} path="/" component={PageAstronauts} />
        <Route
          exact={true}
          path="/astronauts/new"
          render={props => <PageAstronaut {...props} isNew={true} />}
        />
        <Route
          exact={true}
          path="/astronauts/edit/:id"
          render={props => <PageAstronaut {...props} editing={true} />}
        />
        <Route exact={true} path="/astronauts/:id" component={PageAstronaut} />
        <Route render={props => <Redirect to="/" />} />
      </Switch>

      <Modal isOpen={!!props.error} onRequestClose={props.clearError}>
        <Heading>Error</Heading>
        <Message>{props.error}</Message>
        <Controls>
          <Button onClick={props.clearError}>ok</Button>
        </Controls>
      </Modal>

      <DelayedModal
        isOpen={!!props.pending}
        shouldCloseOnOverlayClick={false}
        boxed={false}
      >
        <Spinner center={true} light={true} />
      </DelayedModal>
    </Fragment>
  );
};

App.propTypes = {
  pending: PropTypes.bool.isRequired,
  error: PropTypes.any,
  clearError: PropTypes.func.isRequired,
  loadAstronauts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  pending: state.pending,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  loadAstronauts: () => dispatch(loadAstronauts()),
  clearError: () => dispatch(clearErrorAction())
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadAstronauts();
    }
  })
)(App);
