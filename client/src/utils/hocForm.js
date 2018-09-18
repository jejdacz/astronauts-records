import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
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
import { group } from "./index.js";

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

export const addLabel = staticProps => BaseComponent => ({
  label,
  ...props
}) => (
  <Fragment>
    <label {...staticProps}>{label}</label>
    <BaseComponent {...props} />
  </Fragment>
);

export const showValidation = ({ valid, invalid }) => BaseComponent => ({
  className,
  ...props
}) => (
  <BaseComponent
    {...props}
    className={group(" ", [
      className,
      props.touched && (props.error ? invalid : valid)
    ])}
  />
);

export const renderInput = ({
  className,
  type,
  name,
  placeholder,
  handleChange,
  handleBlur,
  touched,
  error,
  value,
  ...input
}) => (
  <input
    {...input}
    className={className || null}
    name={name}
    type={type}
    value={value || null}
    onChange={handleChange}
    onBlur={handleBlur}
    placeholder={placeholder || null}
  />
);

export const renderField = ({ component, ...props }) =>
  React.createElement(component, props);

export const InputField = compose(
  contextConsumer,
  filterPropsForName,
  addLabel({ className: "InputField-label" }),
  showValidation({ valid: "is-valid", invalid: "is-invalid" })
)(renderInput);

export const Field = compose(
  contextConsumer,
  filterPropsForName
)(renderField);
