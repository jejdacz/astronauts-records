import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadAstronaut, updateAstronaut } from "../../astronautActions.js";
import Spinner from "../Spinner/Spinner";
import { Nav, Logo, Link } from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Button from "../Button/Button";
import DeleteAstronautDialog from "../DeleteAstronautDialog/DeleteAstronautDialog";
import styles from "./PageAstronaut.module.css";

class PageAstronaut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialogIsOpen: false,
      deleteSuccess: false
    };
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadAstronaut({ id: this.props.match.params.id }));
  }

  openDeleteDialog() {
    this.setState({ deleteDialogIsOpen: true, deleteSuccess: false });
  }

  closeDeleteDialog() {
    this.setState({ deleteDialogIsOpen: false });
  }

  handleDeleteSuccess() {
    this.setState({ deleteSuccess: true });
  }

  renderContent = content => (
    <Fragment>
      <header>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link to={`/astronaut/edit/${this.props.match.params.id}`}>EDIT</Link>
          <Link onClick={this.openDeleteDialog}>DELETE</Link>
        </Nav>
      </header>
      <main className={styles.main}>{content}</main>
      <Footer />
    </Fragment>
  );

  render() {
    const { pending, error, astronaut } = this.props;

    if (error) {
      return this.renderContent("Error: Loading of records failed!");
    }
    if (pending) {
      return this.renderContent(<Spinner center={true} />);
    }
    if (this.state.deleteSuccess) {
      return <Redirect to="/" />;
    }

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
            to={`/astronaut/edit/${this.props.match.params.id}`}
            noBorder={true}
          >
            EDIT
          </Button>
          <Button onClick={this.openDeleteDialog} noBorder={true}>
            DELETE
          </Button>
        </div>
        {this.state.deleteDialogIsOpen && (
          <DeleteAstronautDialog
            isOpen={this.state.deleteDialogIsOpen}
            closeModal={this.closeDeleteDialog}
            astronaut={this.props.astronaut}
            onSuccess={this.handleDeleteSuccess}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state.astronaut });

export default connect(mapStateToProps)(PageAstronaut);
