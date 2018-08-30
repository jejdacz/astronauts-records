import React, { Component } from "react";
import { connect } from "react-redux";
import AstronautEditor from "../components/AstronautEditor";
import {
  updateEditor,
  closeEditor,
  addAstronaut,
  updateAstronaut
} from "../actions.js";
import validate from "../astronaut-validation.js";

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

  handleSubmit() {
    switch (this.props.onSubmitAction) {
      case "add":
        const { id, ...rest } = this.props.fields;
        this.props.dispatch(addAstronaut(rest));
        break;
      case "update":
        this.props.dispatch(updateAstronaut(this.props.fields));
        break;
      default:
        throw new Error("Invalid Editor submit action");
    }
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
        onSubmit={this.handleSubmit}
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
