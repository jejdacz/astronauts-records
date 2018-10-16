import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addAstronaut } from "../../astronautActions.js";
import { Nav, Link, Logo } from "../Nav/Nav.js";
import Container from "../Container/Container.js";
import AstronautForm from "../AstronautForm/AstronautForm.js";
import styles from "./PageNewAstronaut.module.css";

class PageNewAstronaut extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //reset form
  }

  handleSubmit(values) {
    this.props.dispatch(addAstronaut(values));
  }

  renderContent() {
    const { saving, error, response } = this.props;

    if (saving) {
      return <h4>saving...</h4>;
    } else if (response) {
      return (
        <h4>
          {`Astronaut ${response.firstName} ${response.lastName} was added.`}
        </h4>
      );
    } else {
      return (
        <Fragment>
          <AstronautForm onSubmit={this.handleSubmit} submitting={saving} />
          {error && <h4>{error.message}</h4>}
        </Fragment>
      );
    }
  }

  render() {
    const header = (
      <Fragment>
        <Link to="/">back</Link>
      </Fragment>
    );

    return (
      <Fragment>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link to="/">save</Link>
          <Link to="/">cancel</Link>
        </Nav>
        <main className={styles.main}>
          <Container className={styles.container}>
            {this.renderContent()}
          </Container>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.newAstronaut });

export default connect(mapStateToProps)(PageNewAstronaut);
