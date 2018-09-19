import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Field from "./hocForm/Field.js";
import renderValidation from "./hocForm/renderValidation.js";
import touchedHandler from "./hocForm/touchedHandler.js";
import changeHandler from "./hocForm/changeHandler.js";
import submitHandler from "./hocForm/submitHandler.js";
import validationHandler from "./hocForm/validationHandler.js";
import contextProvider from "./hocForm/contextProvider.js";
import validate from "../../utils/validateAstronaut.js";
import { compose, mapProps } from "recompose";
import hasValues from "../../utils/hasValues.js";
import dateStringToObject from "../../utils/hasValues.js";
import { glueSpace as gSp } from "../../utils/glue.js";

const Input = ({
  handleChange,
  handleBlur,
  touched,
  error,
  className,
  ...input
}) => (
  <input
    className={gSp(["form-control", className])}
    {...input}
    onChange={handleChange}
    onBlur={handleBlur}
  />
);

const InputWithValidation = renderValidation({
  valid: "is-valid",
  invalid: "is-invalid"
})(Input);

const InputField = ({ label, ...input }) => (
  <div className="form-group">
    <label>{label}</label>
    <InputWithValidation {...input} />
  </div>
);

export const AstronautForm = ({ handleSubmit, errors, submitting }) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          type="text"
          label="First Name:"
          placeholder="John"
          component={InputField}
        />
        <Field
          name="lastName"
          type="text"
          label="Last Name:"
          placeholder="Doe"
          component={InputField}
        />
        <div className="form-group">
          <label>Birth:</label>
          <div className={`form-row`}>
            <div className="col">
              <Field
                name="birthDay"
                type="number"
                placeholder="D"
                min="1"
                max="31"
                component={InputWithValidation}
              />
            </div>
            <div className="col">
              <Field
                name="birthMonth"
                type="number"
                placeholder="M"
                min="1"
                max="12"
                component={InputWithValidation}
              />
            </div>
            <div className="col-5">
              <Field
                name="birthYear"
                type="number"
                placeholder="Y"
                min="0"
                component={InputWithValidation}
              />
            </div>
          </div>
          <small className="form-text text-muted">format: Day-Month-Year</small>
        </div>
        <Field
          name="superpower"
          type="text"
          label="Superpower:"
          placeholder="superpower"
          component={InputField}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || hasValues(errors)}
        >
          Save
        </button>
      </form>
    </div>
  );
};

const initValues = ({ values }) => {
  if (values) {
    let date = dateStringToObject(values.birth);
    let birthDate = {
      birthDay: date.day,
      birthMonth: date.month,
      birthYear: date.year
    };
    return { ...values, birth: undefined, ...birthDate };
  } else {
    return {
      firstName: "",
      lastName: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      superPower: ""
    };
  }
};

export default compose(
  mapProps(({ values, ...props }) => ({
    ...props,
    values: initValues(values)
  })),
  touchedHandler,
  changeHandler,
  submitHandler(x => x),
  validationHandler(validate),
  contextProvider
)(AstronautForm);
/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
