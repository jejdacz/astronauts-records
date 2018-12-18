import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { astronautType } from "../../types.js";
import { connect } from "react-redux";
import {
  addAstronaut,
  deleteAstronaut,
  updateAstronaut,
  clearChangedAction
} from "../../astronautActions.js";
import { Link } from "../Nav/Nav";
import Navigation from "../renderNav.js";
import AstronautForm from "../AstronautForm/AstronautForm";
import Footer from "../Footer/Footer";
import Panel from "../Panel/Panel";
import Button from "../Button/Button";
import styles from "./PageAstronaut.module.css";

class PageAstronaut extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    pending: PropTypes.bool,
    changed: PropTypes.bool,
    astronaut: astronautType,
    editing: PropTypes.bool,
    isNew: PropTypes.bool,
    clearChanged: PropTypes.func.isRequired,
    deleteAstronaut: PropTypes.func.isRequired,
    addAstronaut: PropTypes.func.isRequired,
    updateAstronaut: PropTypes.func.isRequired
  };

  handleAdd(values) {
    if (!this.props.pending) {
      this.props.addAstronaut(values);
    }
  }

  handleUpdate(values) {
    if (!this.props.pending) {
      this.props.updateAstronaut(values);
    }
  }

  handleDelete() {
    if (!this.props.pending) {
      this.props.deleteAstronaut();
    }
  }

  componentDidUpdate() {
    if (this.props.changed) {
      this.props.clearChanged();
      this.props.history.push("/");
    }
  }

  renderPage = (links, content) => (
    <Fragment>
      <header>
        <Navigation links={links} />
      </header>
      <main className={styles.main}>{content}</main>
      <Footer />
    </Fragment>
  );

  render() {
    const { pending, editing, isNew, astronaut } = this.props;

    if (isNew) {
      return this.renderPage(
        <Link to={"/"}>back</Link>,
        <Panel>
          <AstronautForm onSubmit={this.handleAdd} submitting={pending} />
        </Panel>
      );
    }

    if (editing) {
      if (!astronaut) {
        return this.renderPage(null, null);
      }
      return this.renderPage(
        <Link to={"/"}>back</Link>,
        <Panel>
          <AstronautForm
            values={astronaut}
            onSubmit={this.handleUpdate}
            submitting={pending}
          />
        </Panel>
      );
    }

    if (!astronaut) {
      if (pending) {
        return this.renderPage(null, null);
      }
      return this.renderPage(
        <Link to={"/"}>back</Link>,
        <Panel>
          <h1 className={styles.heading}>No record</h1>
        </Panel>
      );
    }

    return this.renderPage(
      <Fragment>
        <Link to={`/astronauts/edit/${this.props.match.params.id}`}>EDIT</Link>
        <Link confirm onClick={this.handleDelete}>
          DELETE
        </Link>
      </Fragment>,
      <Panel>
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
          <Button confirm onClick={this.handleDelete} noBorder>
            DELETE
          </Button>
        </div>
      </Panel>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  clearChanged: () => dispatch(clearChangedAction()),
  deleteAstronaut: () =>
    dispatch(deleteAstronaut({ id: props.match.params.id })),
  addAstronaut: values => dispatch(addAstronaut(values)),
  updateAstronaut: values => dispatch(updateAstronaut(values))
});

const mapStateToProps = (state, props) => ({
  pending: state.pending,
  changed: state.changed,
  astronaut: props.match.params.id
    ? state.astronauts.byId[props.match.params.id]
    : null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageAstronaut);
