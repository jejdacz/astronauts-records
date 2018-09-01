import React, { Component } from "react";
import { connect } from "react-redux";
import AstronautEditor from "../components/AstronautForm.js";
import {
  updateEditor,
  closeEditor,
  addAstronaut,
  updateAstronaut
} from "../actions.js";
import validate from "../astronautValidation.js";

class AstronautEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    //fetchAstronaut
  }

  handleChange(field) {
    this.props.dispatch(updateEditor(field));
  }

  handleCancel() {
    this.props.dispatch(closeEditor());
  }

  render() {
    return !this.props.isFetching ? (
      <AstronautEditor
        onChange={this.handleChange}
        fields={this.props.fields}
        onSubmit={this.props.handleSubmit}
        onCancel={this.handleCancel}
        errors={validate(this.props.fields)}
        submitting={false} //make true on loading/saving actions
      />
    ) : (
      "saving..."
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.editor.isFetching,
  fields: state.editor.fields,
  onSubmitAction: state.editor.onSubmitAction
});

export default connect(mapStateToProps)(AstronautEditorContainer);
