import React, { Component } from "react";
import PropTypes from "prop-types";
import InputDate from "./InputDate.js";
import { isValidDate, isValidWord } from "../form-validation.js";

export default function AstronautEditor({
  onChange,
  onSubmit,
  onCancel,
  fields
}) {
  const isFormValid =
    isValidWord(fields.firstName) &&
    isValidWord(fields.lastName) &&
    isValidDate(...fields.birth.split("-")) &&
    isValidWord(fields.superPower);

  const handleChange = e => {
    let { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  //className={false ? null : "invalid"}

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
        />
      </label>
      <InputDate
        legend="Birth:"
        date={fields.birth}
        onChange={obj => onChange({ birth: obj })}
      />
      <label>
        Superpower:
        <input
          name="superPower"
          type="text"
          value={fields.superPower}
          onChange={handleChange}
          placeholder="superpower"
        />
      </label>
      <input type="submit" value="Save" disabled={!isFormValid} />
      <input type="button" value="Cancel" onClick={onCancel} />
    </form>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
