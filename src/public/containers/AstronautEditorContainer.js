import React, { Component } from "react";
import { connect } from "react-redux";
import AstronautEditor from "../components/AstronautEditor";
import { updateEditor } from "../actions.js";

/*
handleCancel() {
  this.props.dispatch(cancelEditAstronaut());
}

handleSave() {
  this.props.dispatch(saveAstronaut());
}

handleDelete() {
  this.props.dispatch(deleteAstronaut(id));
}
*/

const mapStateToProps = state => ({
  fields: state.editor.fields
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: field => dispatch(updateEditor(field)),
  onSubmit: () => dispatch(editorSubmit())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AstronautEditor);
