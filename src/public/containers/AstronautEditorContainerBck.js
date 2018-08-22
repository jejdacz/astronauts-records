import React, { Component } from "react";
import { connect } from "react-redux";
import AstronautEditor from "../components/AstronautEditor";
import { updateEditor } from "../actions.js";
/*
const handleSubmit = (action, dispatch) => {
  switch (action) {
    case "update" :
    dispatch()
  }
}*/

//class

const mapStateToProps = state => ({
  fields: state.editor.fields,
  onSubmitAction: state.editor.onSubmitAction
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: field => dispatch(updateEditor(field)),
  onSubmit: onSubmitAction => dispatch(editorSubmit(onSubmitAction)),
  onCancel: () => dispatch(editorCancel())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AstronautEditor);
