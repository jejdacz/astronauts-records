import React, { Component } from "react";
import PropTypes from "prop-types";

class AstronautEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.astronaut.firstName,
      lastName: this.props.astronaut.lastName,
      birth: new Date(this.props.astronaut.birth),
      superPower: this.props.astronaut.superPower
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //props.save(this.state);
    event.preventDefault();
  }

  componentDidMount() {}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First name:
          <input
            className={false ? null : "invalid"}
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            required="required"
          />
        </label>
        <input type="submit" value="Save" />
      </form>
    );
  }
}

Editor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default Editor;
