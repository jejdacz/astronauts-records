import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadAstronautsIfNeeded,
  loadAstronautsAction,
  updateAstronaut,
  resetAstronautAction,
  lastUpdatedAction
} from "../../astronautActions.js";
import {
  openDeleteDialogAction,
  closeDeleteDialogAction
} from "../../deleteDialogActions.js";
import Spinner from "../Spinner/Spinner";
import { Nav, Logo, Link } from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import DeleteAstronautDialog from "../DeleteAstronautDialog/DeleteAstronautDialog";
import styles from "./PageAstronaut.module.css";

import {
  AsyncData,
  OnSuccess,
  OnRequest,
  OnError,
  OnFallback
} from "../AsyncData/AsyncData";

import { lifecycle } from "recompose";
import AstroLoader from "../AstronautsLoader/AstronautsLoader";

const withLifeCycle = ({ onMount, onUpdate, onUnmount }) => BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      onMount && onMount(this.props);
      this.props.onMount && this.props.onMount(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
      onUpdate && onUpdate(this.props);
      this.props.onUpdate && this.props.onUpdate(prevProps, prevState);
    }
    componentWillUnmountMount() {
      onUnmount && onUnmount(this.props);
      this.props.onUnmount && this.props.onUnmount(this.props);
    }
    render() {
      const { onMount, onUpdate, onUnmount, ...props } = this.props;
      return <BaseComponent {...props} />;
    }
  };

const astronautsLoaderProps = state => ({ ...state.loadAstronauts });

const AstronautsLoader = connect(astronautsLoaderProps)(
  lifecycle({
    componentDidMount() {
      console.log("mount");
    },
    componentDidUpdate() {
      console.log("update");
    }
  })(AsyncData)
);

class PageAstronaut extends Component {
  constructor(props) {
    super(props);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
  }

  componentDidMount() {
    //this.props.dispatch(loadAstronaut({ id: this.props.match.params.id }));
    this.props.dispatch(loadAstronautsIfNeeded);
    /*this.props.dispatch(
      loadAstronautFromStore({ id: this.props.match.params.id })
    );*/
    // store is cleared when refreshing the page ...
  }

  componentWillUnmount() {
    this.props.dispatch(resetAstronautAction());
  }

  componentDidUpdate() {
    if (this.props.deleteAstronaut && this.props.deleteAstronaut.success) {
      this.props.dispatch(closeDeleteDialogAction());
      this.props.dispatch(resetAstronautAction());
      this.props.history.push("/");
    }
    /**
    if (this.props.update && this.props.update.success) {
      this.props.dispatch(lastUpdatedAction.clear());
    }*/
    /*
    if (this.props.loadAstronauts && this.props.loadAstronauts.success) {
      this.props.dispatch(clearLoadAstronautsAction());
    }*/
  }

  openDeleteDialog() {
    this.props.dispatch(openDeleteDialogAction(this.props.astronaut));
  }

  renderContent = content => (
    <Fragment>
      <header>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link to={`/astronauts/edit/${this.props.match.params.id}`}>
            EDIT
          </Link>
          <Link onClick={this.openDeleteDialog}>DELETE</Link>
        </Nav>
      </header>
      <main className={styles.main}>{content}</main>
      <Footer />
    </Fragment>
  );

  render() {
    const { update, loadAstronauts, deleteAstronaut, astronaut } = this.props;
    return (
      <Fragment>
        <header>
          <Nav fixed={true}>
            <Logo to="/">ar</Logo>
            <Link to={`/astronauts/edit/${this.props.match.params.id}`}>
              EDIT
            </Link>
            <Link onClick={this.openDeleteDialog}>DELETE</Link>
          </Nav>
        </header>
        <main className={styles.main}>
          <AsyncData {...loadAstronauts}>
            <OnFallback>
              <AsyncData {...update}>
                <OnError>"update error"</OnError>
                <OnRequest>
                  <Spinner center={true} />
                </OnRequest>
                <OnSuccess>
                  <Spinner center={true} />
                </OnSuccess>
              </AsyncData>
            </OnFallback>
            <OnRequest>
              <Spinner center={true} />
            </OnRequest>
            <OnError>
              <Container className={styles.container}>"error"</Container>
            </OnError>
            <OnSuccess>
              <Container className={styles.container}>
                <h1 className={styles.heading}>{`${astronaut.firstName} ${
                  astronaut.lastName
                }`}</h1>
                <small className={styles.label}>BIRTH:</small>
                <h4 className={styles.data}>{astronaut.birth}</h4>
                <small className={styles.label}>SUPERPOWER:</small>
                <h4 className={styles.data}>{astronaut.superpower}</h4>
                <div className={styles.controls}>
                  <Button
                    to={`/astronauts/edit/${this.props.match.params.id}`}
                    noBorder={true}
                  >
                    EDIT
                  </Button>
                  <Button onClick={this.openDeleteDialog} noBorder={true}>
                    DELETE
                  </Button>
                </div>
              </Container>
            </OnSuccess>
          </AsyncData>
        </main>
        <Footer />
      </Fragment>
    );

    if (
      (update && update.request) ||
      (loadAstronauts && loadAstronauts.request)
    ) {
      return this.renderContent(<Spinner center={true} />);
    }

    if (loadAstronauts && loadAstronauts.error) {
      return this.renderContent("Error: Loading of astronauts failed!");
    }

    if (loadAstronauts && loadAstronauts.success && !astronaut) {
      return this.renderContent("Error: Loading of astronaut failed!");
    }

    if (!astronaut) {
      return null;
    }

    if (astronaut) {
      return this.renderContent(
        <Container className={styles.container}>
          <h1 className={styles.heading}>{`${astronaut.firstName} ${
            astronaut.lastName
          }`}</h1>
          <small className={styles.label}>BIRTH:</small>
          <h4 className={styles.data}>{astronaut.birth}</h4>
          <small className={styles.label}>SUPERPOWER:</small>
          <h4 className={styles.data}>{astronaut.superpower}</h4>
          <div className={styles.controls}>
            <Button
              to={`/astronauts/edit/${this.props.match.params.id}`}
              noBorder={true}
            >
              EDIT
            </Button>
            <Button onClick={this.openDeleteDialog} noBorder={true}>
              DELETE
            </Button>
          </div>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  update: state.lastUpdated,
  loadAstronauts: state.loadAstronauts,
  deleteAstronaut: state.deleteAstronaut,
  astronaut: state.astronauts.items.find(a => a.id === props.match.params.id)
  //astronaut: state.activeAstronaut
});

export default connect(mapStateToProps)(PageAstronaut);
