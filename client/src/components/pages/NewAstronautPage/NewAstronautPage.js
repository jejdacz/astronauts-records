import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addAstronaut } from "../../../astronautActions.js";
import AstronautForm from "../../AstronautForm/AstronautForm.js";
import Page from "../../Page/Page.js";
import Dialog from "../../Dialog/Dialog.js";

class NewAstronautPage extends Component {
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
      return <Dialog>saving...</Dialog>;
    } else if (response) {
      return (
        <Dialog>
          {`Astronaut ${response.firstName} ${response.lastName} was added.`}
        </Dialog>
      );
    } else {
      return (
        <Fragment>
          <AstronautForm onSubmit={this.handleSubmit} submitting={saving} />
          {error && <Dialog>{error.message}</Dialog>}
        </Fragment>
      );
    }
  }

  render() {
    const header = (
      <Fragment>
        <h1>New astronaut</h1>
        <Link to="/">back</Link>
      </Fragment>
    );

    return <Page header={header} content={this.renderContent()} />;
  }
}

const mapStateToProps = state => ({ ...state.newAstronaut });

export default connect(mapStateToProps)(NewAstronautPage);
