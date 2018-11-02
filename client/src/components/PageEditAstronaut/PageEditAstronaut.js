import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  loadAstronaut,
  updateAstronaut,
  resetAstronautAction,
  clearUpdateAstronautAction
} from "../../astronautActions.js";
import Spinner from "../Spinner/Spinner";
import { Nav, Logo, Link } from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import AstronautForm from "../AstronautForm/AstronautForm";
import styles from "./PageEditAstronaut.module.css";

class PageEditAstronaut extends Component {
  constructor(props) {
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restore = this.restore.bind(this);
  }

  restore() {
    this.props.dispatch(clearUpdateAstronautAction());
  }

  handleSaveClick() {}

  handleBackClick() {
    this.props.history.goBack();
  }

  handleSubmit(values) {
    this.props.dispatch(updateAstronaut(values));
  }

  componentDidMount() {
    this.props.dispatch(loadAstronaut({ id: this.props.match.params.id }));
    /*this.props.dispatch(
      loadAstronautFromStore({ id: this.props.match.params.id })
    );*/
    // store is cleared when refreshing the page ...
  }

  componentWillUnmount() {
    this.props.dispatch(resetAstronautAction());
  }

  componentDidUpdate() {
    if (this.props.updateAstronaut && this.props.updateAstronaut.success) {
      this.props.dispatch(resetAstronautAction());
      this.props.history.goBack();
    }
  }

  renderContent = content => (
    <Fragment>
      <header>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link onClick={this.handleBackClick}>BACK</Link>
          <Link onClick={this.handleSaveClick}>SAVE</Link>
        </Nav>
      </header>
      <main className={styles.main}>
        <Container className={styles.container}>{content}</Container>
      </main>
      <Footer />
    </Fragment>
  );

  render() {
    const { loadAstronaut, updateAstronaut, astronaut } = this.props;
    const saving = updateAstronaut && updateAstronaut.request ? true : false;

    if (updateAstronaut) {
      if (updateAstronaut.request) {
        return this.renderContent(<Spinner center={true} />);
      }
      if (updateAstronaut.error) {
        return this.renderContent(
          <Fragment>
            <h4>"Error: Updating of astronaut failed!"</h4>
            <Button onClick={this.restore} noBorder={true}>
              OK
            </Button>
          </Fragment>
        );
      }
    }

    if (!loadAstronaut) return null;

    if (loadAstronaut.request) {
      return this.renderContent(<Spinner center={true} />);
    }

    if (loadAstronaut.error) {
      return this.renderContent("Error: Loading of astronaut failed!");
    }

    if (loadAstronaut.success) {
      return this.renderContent(
        <Fragment>
          <AstronautForm
            values={astronaut}
            onSubmit={this.handleSubmit}
            submitting={saving}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleBackClick} noBorder={true}>
              BACK
            </Button>
            <Button onClick={this.handleSaveClick} noBorder={true}>
              SAVE
            </Button>
          </div>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadAstronaut: state.loadAstronaut,
  updateAstronaut: state.updateAstronaut,
  astronaut: state.activeAstronaut
});

export default connect(mapStateToProps)(PageEditAstronaut);
