import React, { Component } from "react";
import { connect } from "react-redux";
import { loadAstronaut, updateAstronaut } from "../../astronautActions.js";
import Spinner from "../Spinner/Spinner";
import AstronautForm from "../AstronautForm/AstronautForm.js";

class PageAstronaut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadAstronaut(this.props.match.params.id));
  }

  handleSubmit(fields) {
    this.props.dispatch(updateAstronaut(fields));
  }

  render() {
    if (this.props.pending) {
      return <Spinner center={true} />;
    }

    if (this.state.editing) {
      return (
        <AstronautForm
          onChange={this.handleChange}
          fields={this.props.fields}
          onSubmit={this.props.handleSubmit}
          submitting={false} //make true on loading/saving actions
        />
      );
    }

    return (
      <div>
        <h4>{this.props.astronaut.firstName}</h4>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.astronaut });

export default connect(mapStateToProps)(PageAstronaut);
