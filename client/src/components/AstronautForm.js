import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hocForm, { GlobalContext } from "./hocForm.js";
import InputDate from "./InputDate.js";
import validate from "../astronautValidation.js";
import Field from "./Field.js";

const inputField = ({
  type,
  name,
  label,
  placeholder,
  context: { onChange, onBlur, values, touched, errors }
}) => (
  <Fragment>
    <label>{label}</label>
    <input
      name={name}
      type={type}
      value={values[name]}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`form-control ${touched[name] &&
        (errors[name] ? "is-invalid" : "is-valid")}`}
    />
  </Fragment>
);

const AstronautForm = ({
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
            component={inputField}
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
