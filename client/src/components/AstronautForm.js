import React, { Component } from "react";
import PropTypes from "prop-types";
import InputDate from "./InputDate.js";

export default function AstronautForm({
  onChange,
  onSubmit,
  fields,
  errors,
  submitting
}) {
  const handleChange = e => {
    let { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            name="firstName"
            type="text"
            value={fields.firstName}
            onChange={handleChange}
            placeholder="John"
            className={`form-control ${
              errors.firstName ? "is-invalid" : "is-valid"
            }`}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            name="lastName"
            type="text"
            value={fields.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={`form-control ${
              errors.lastName ? "is-invalid" : "is-valid"
            }`}
          />
        </div>
        <InputDate
          label="Birth:"
          date={fields.birth}
          onChange={obj => onChange({ birth: obj })}
          className={errors.birth ? "is-invalid" : "is-valid"}
        />
        <div className="form-group">
          <label>Superpower:</label>
          <input
            name="superpower"
            type="text"
            value={fields.superpower}
            onChange={handleChange}
            placeholder="super-strength"
            className={`form-control ${
              errors.superpower ? "is-invalid" : "is-valid"
            }`}
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
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
