import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addAstronaut } from "../astronautActions.js";
import AstronautForm from "../components/AstronautForm.js";
import validate from "../astronautValidation.js";

class NewAstronautPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        firstName: "John",
        lastName: "Doe",
        birth: "1900-01-01",
        superpower: "superpower"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    this.setState(prev => ({ fields: { ...prev.fields, ...field } }));
    //this.setState({ fields: { ...field } });
  }

  handleSubmit() {
    this.props.dispatch(addAstronaut(this.state.fields));
  }

  renderContent(content) {
    return (
      <div>
        <Link to="/">...return</Link>
        <h1>Astronaut Page</h1>
        {content}
      </div>
    );
  }

  renderDialog(message) {
    return (
      <div>
        <h4>{message}</h4>
      </div>
    );
  }

  render() {
    const { saving, error, response } = this.props;

    if (error) {
      return this.renderContent(this.renderDialog(error.message));
    } else if (saving) {
      return this.renderContent(this.renderDialog("saving..."));
    } else if (response) {
      return this.renderContent(
        this.renderDialog(
          `Astronaut ${response.firstName} ${response.lastName} was added.`
        )
      );
    } else {
      return this.renderContent(
        <AstronautForm
          onChange={this.handleChange}
          fields={this.state.fields}
          onSubmit={this.handleSubmit}
          errors={validate(this.state.fields)}
          submitting={saving}
        />
      );
    }
  }
}

const mapStateToProps = state => ({ ...state.newAstronaut });

export default connect(mapStateToProps)(NewAstronautPage);
