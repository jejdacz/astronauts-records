// TODO move to AstronautForm.js

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  compose,
  withState,
  withContext,
  getContext,
  mapProps,
  withProps,
  withHandlers
} from "recompose";
import validate from "../astronautValidation.js";
import { traceProps, traceContext } from "../recomposeUtils.js";

const withValidation = validate =>
  withProps(props => ({
    errors: validate(props.values)
  }));

const FinalForm = compose(
  withState("meta", "updateState", { name: "alice" }),
  withHandlers({
    rename: ({ updateState }) => () => updateState({ name: "Jenny" })
  }),
  traceProps("before getContext"),
  withContext({ rename: PropTypes.func }, props => ({
    rename: props.rename
  })),
  getContext({ rename: PropTypes.func }),
  withValidation(validate),
  traceProps("after getContext"),
  traceContext({ rename: PropTypes.func }, "after getContext")
)(props => <em onClick={props.rename}>{props.meta.name}</em>);

const Export = props => <FinalForm values={{ firstName: "Joe2" }} />;
/*
const formControl = FormComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        values: props.initValues,
        touched: {}
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState(prev => ({ values: { ...prev.values, [name]: value } }));
    }

    handleBlur(e) {
      const { name } = e.target;
      this.setState(prev => ({ touched: { ...prev.touched, [name]: true } }));
    }

    render() {
      return (
        <GlobalContext.Provider
          value={{
            values: this.state.values,
            touched: this.state.touched,
            errors: this.props.errors,
            onChange: this.handleChange,
            onBlur: this.handleBlur
          }}
        >
          <FormComponent {...this.props} />
        </GlobalContext.Provider>
      );
    }
  };
};*/

export default Export;
