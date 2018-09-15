import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hocForm, { GlobalContext } from "./hocForm.js";
import InputDate from "./InputDate.js";
import validate from "../astronautValidation.js";
import Field from "./Field.js"; //***
import {
  compose,
  withState,
  withContext,
  getContext,
  mapProps,
  withProps,
  withHandlers,
  withStateHandlers
} from "recompose";
import { traceProps, traceContext } from "../recomposeUtils.js";

export const touchedHandler = withStateHandlers(
  () => ({
    touched: {}
  }),
  {
    handleBlur: ({ touched }) => ({ target: { name } }) => ({
      touched: { ...touched, [name]: true }
    })
  }
);

export const changeHandler = withStateHandlers(
  ({ values = {} }) => ({
    values
  }),
  {
    handleChange: ({ values }) => ({ target: { name, value } }) => ({
      values: { ...values, [name]: value }
    })
  }
);

export const submitHandler = beforeSubmit =>
  withHandlers({
    handleSubmit: ({ onSubmit, values }) => () => onSubmit(beforeSubmit(values))
  });

export const validationHandler = validate =>
  withProps(({ values }) => ({
    errors: validate(values)
  }));
//****not tested->error
export const contextProvider = withContext(
  { formContext: PropTypes.object },
  ({ values, errors, touched, handleChange, handleBlur }) => ({
    formContext: {
      values,
      errors,
      touched,
      handleChange,
      handleBlur
    }
  })
);

export const contextConsumer = getContext({ formContext: PropTypes.object });
//****not tested->error
export const filterPropsForName = mapProps(
  ({
    formContext: { values, errors, touched, handleChange, handleBlur },
    name,
    ...props
  }) => ({
    name,
    handleChange,
    handleBlur,
    value: values[name],
    error: errors[name],
    touched: touched[name],
    ...props
  })
);

export const addLabel = BaseComponent => ({ label, ...props }) => (
  <Fragment>
    <label>{label}</label>
    <BaseComponent {...props} />
  </Fragment>
);

export const renderInput = ({
  className,
  type,
  name,
  placeholder,
  handleChange,
  handleBlur,
  value,
  touched,
  error,
  ...props
}) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
    placeholder={placeholder}
    className={[
      "form-control",
      className,
      touched && (error ? "is-invalid" : "is-valid")
    ]
      .filter(e => e)
      .join(" ")}
  />
);
/*
className={`form-control ${className ? className : ""}${
  touched ? (error ? "is-invalid" : "is-valid") : ""
}`}*/

//****not tested->error
export const InputField = compose(
  contextConsumer,
  filterPropsForName,
  addLabel
)(renderInput);

export const AstronautForm = ({
  onChange,
  onBlur,
  onSubmit,
  values,
  touched,
  errors,
  submitting
}) => {
  const handleChange = e => {
    let { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSubmit = e => {
    console.log(e.target);
    e.preventDefault();
    onSubmit(values);
  };

  const handleBlur = e => {
    let { name, value } = e.target;
    onBlur({ [name]: true });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Field
            name="firstName"
            type="text"
            label="First-Name:"
            placeholder="John"
            component={InputField}
          />
          {/*
          <label>First Name:</label>
          <input
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John"
            className={`form-control ${touched.firstName &&
              (errors.firstName ? "is-invalid" : "is-valid")}`}
          />*/}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Doe"
            className={`form-control ${touched.lastName &&
              (errors.lastName ? "is-invalid" : "is-valid")}`}
          />
        </div>
        <InputDate
          label="Birth:"
          date={values.birth}
          /*TODO unify onChange, onBlur methods or hide element into unified component aka FIELD*/
          onChange={obj => onChange({ birth: obj })}
          onBlur={() => onBlur({ birth: true })}
          className={
            touched.birth && (errors.birth ? "is-invalid" : "is-valid")
          }
        />
        <div className="form-group">
          <label>Superpower:</label>
          <input
            name="superpower"
            type="text"
            value={values.superpower}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="super-strength"
            className={`form-control ${touched.superpower &&
              (errors.superpower ? "is-invalid" : "is-valid")}`}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || errors.form}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default hocForm({ validate })(AstronautForm);
/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
