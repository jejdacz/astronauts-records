import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAstronaut, updateAstronaut } from "../../astronautActions.js";
import { Nav, Logo, Link } from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./PageAstronaut.module.css";

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
