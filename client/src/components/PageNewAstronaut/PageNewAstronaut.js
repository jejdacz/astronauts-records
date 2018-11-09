import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addAstronaut,
  resetAstronautAction,
  updateAstronautAction
} from "../../astronautActions.js";
import Spinner from "../Spinner/Spinner";
import { Nav, Logo, Link } from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import AstronautForm from "../AstronautForm/AstronautForm";
import styles from "./PageNewAstronaut.module.css";

class PageNewAstronaut extends Component {
  constructor(props) {
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restore = this.restore.bind(this);
  }

  restore() {
    this.props.dispatch(updateAstronautAction.clear());
  }

  handleSaveClick() {}

  handleBackClick() {
    this.props.history.goBack();
  }

  handleSubmit(values) {
    this.props.dispatch(addAstronaut(values));
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.props.dispatch(resetAstronautAction());
  }

  componentDidUpdate() {
    if (this.props.addAstronaut && this.props.addAstronaut.success) {
      this.props.dispatch(resetAstronautAction());
      this.props.history.push("/");
    }
  }

  renderContent = content => (
    <Fragment>
      <header>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link onClick={this.handleBackClick}>BACK</Link>
          <Link onClick={this.handleSaveClick}>ADD</Link>
        </Nav>
      </header>
      <main className={styles.main}>
        <Container className={styles.container}>{content}</Container>
      </main>
      <Footer />
    </Fragment>
  );

  render() {
    const { addAstronaut, astronaut } = this.props;
    const saving = addAstronaut && addAstronaut.request ? true : false;

    if (addAstronaut) {
      if (addAstronaut.request) {
        return this.renderContent(<Spinner center={true} />);
      }
      if (addAstronaut.error) {
        return this.renderContent(
          <Fragment>
            <h4>"Error: Adding of astronaut failed!"</h4>
            <Button onClick={this.restore} noBorder={true}>
              OK
            </Button>
          </Fragment>
        );
      }
    }

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
            ADD
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  addAstronaut: state.addAstronaut,
  astronaut: state.activeAstronaut
});

export default connect(mapStateToProps)(PageNewAstronaut);
