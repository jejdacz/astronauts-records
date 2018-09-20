import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addAstronaut } from "../../../astronautActions.js";
import AstronautForm from "../../AstronautForm/AstronautForm.js";
import Header from "../Header/Header.js";
import Dialog from "../Dialog/Dialog.js";

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

  render() {
    const { saving, error, response } = this.props;
    const header = <Header heading="New astronaut" link="/" />;

    if (saving) {
      return (
        <Fragment>
          {header}
          <Dialog>saving...</Dialog>
        </Fragment>
      );
    } else if (response) {
      return (
        <Fragment>
          {header}
          <Dialog>
            {`Astronaut ${response.firstName} ${response.lastName} was added.`}
          </Dialog>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {header}
          <AstronautForm onSubmit={this.handleSubmit} submitting={saving} />
          {error && <Dialog>{error.message}</Dialog>}
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({ ...state.newAstronaut });

export default connect(mapStateToProps)(NewAstronautPage);
