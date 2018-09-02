import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addAstronaut } from "../astronautActions.js";
import AstronautForm from "../components/AstronautForm.js";
import validate from "../astronautValidation.js";

const PageBody = props => (
  <div>
    <Link to="/">...return</Link>
    <h1>Astronaut Page</h1>
    {props.children}
  </div>
);

const PageDialog = props => (
  <div>
    <h4>{props.children}</h4>
  </div>
);

class NewAstronautPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.astronaut
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    this.setState(prev => ({ fields: { ...prev.fields, ...field } }));
  }

  handleSubmit() {
    this.props.dispatch(addAstronaut(this.state.fields));
  }

  render() {
    const { saving, error, response } = this.props;

    if (error) {
      return (
        <PageBody>
          <AstronautForm
            onChange={this.handleChange}
            fields={this.state.fields}
            onSubmit={this.handleSubmit}
            errors={validate(this.state.fields)}
            submitting={saving}
          />
          <PageDialog>{error.message}</PageDialog>
        </PageBody>
      );
    } else if (saving) {
      return (
        <PageBody>
          <PageDialog>saving...</PageDialog>
        </PageBody>
      );
    } else if (response) {
      return (
        <PageBody>
          <PageDialog>
            {`Astronaut ${response.firstName} ${response.lastName} was added.`}
          </PageDialog>
        </PageBody>
      );
    } else {
      return (
        <PageBody>
          <AstronautForm
            onChange={this.handleChange}
            fields={this.state.fields}
            onSubmit={this.handleSubmit}
            errors={validate(this.state.fields)}
            submitting={saving}
          />
        </PageBody>
      );
    }
  }
}

const mapStateToProps = state => ({ ...state.newAstronaut });

export default connect(mapStateToProps)(NewAstronautPage);
