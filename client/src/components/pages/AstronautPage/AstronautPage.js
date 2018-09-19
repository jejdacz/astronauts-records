import React, { Component } from "react";
import { connect } from "react-redux";
import { loadAstronaut, updateAstronaut } from "../../../astronautActions.js";
import AstronautForm from "../../AstronautForm/AstronautForm.js";
import validate from "../astronautValidation.js";

class AstronautPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadAstronaut(this.props.match.params.id));
  }

  handleSubmit(fields) {
    this.props.dispatch(updateAstronaut(fields));
  }

  render() {
    return (
      <div>
        <h1>Astronaut Page</h1>
        !this.props.isFetching ? (
        <AstronautForm
          onChange={this.handleChange}
          fields={this.props.fields}
          onSubmit={this.props.handleSubmit}
          errors={validate(this.props.fields)}
          submitting={false} //make true on loading/saving actions
        />
        ) : ( "saving..." );
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.editor.isFetching,
  fields: state.editor.fields
});

export default connect(mapStateToProps)(AstronautPage);
