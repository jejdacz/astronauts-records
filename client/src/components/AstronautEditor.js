import React, { Component } from "react";
import PropTypes from "prop-types";
import InputDate from "./InputDate.js";

export default function AstronautEditor({
  onChange,
  onSubmit,
  onCancel,
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
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          name="firstName"
          type="text"
          value={fields.firstName}
          onChange={handleChange}
          placeholder="John"
          className={errors.firstName ? "invalid" : null}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          type="text"
          value={fields.lastName}
          onChange={handleChange}
          placeholder="Doe"
          className={errors.lastName ? "invalid" : null}
        />
      </label>
      <InputDate
        legend="Birth:"
        date={fields.birth}
        onChange={obj => onChange({ birth: obj })}
        className={errors.birth ? "invalid" : null}
      />
      <label>
        superpower:
        <input
          name="superpower"
          type="text"
          value={fields.superpower}
          onChange={handleChange}
          placeholder="superpower"
          className={errors.superpower ? "invalid" : null}
        />
      </label>
      <button type="submit" disabled={submitting || !errors.form}>
        Save
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
