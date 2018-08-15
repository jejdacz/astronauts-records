import React, { Component } from "react";
import PropTypes from "prop-types";
import { isValidDate, isValidWord } from "../form-validation.js";

function AstronautEditor(props) {
  const { astronaut } = props.state;

  // TODO component for input date (3x input number)

  const isFormValid =
    isValidWord(astronaut.firstName) &&
    isValidWord(astronaut.lastName) &&
    isValidDate(
      astronaut.birthDay,
      astronaut.birthMonth,
      astronaut.birthYear
    ) &&
    isValidWord(astronaut.superPower);

  const handleChange = e => {
    let { name, value } = e.target;
    props.onChange({ [name]: value });
  };

  //className={false ? null : "invalid"}

  return (
    <form onSubmit={props.onSubmit}>
      <label>
        First Name:
        <input
          name="firstName"
          type="text"
          value={astronaut.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          type="text"
          value={astronaut.lastName}
          onChange={handleChange}
        />
      </label>
      <fieldset>
        <legend>Birth:</legend>
        <label>Day:</label>
        <input
          name="birthDay"
          type="number"
          value={astronaut.birthDay}
          onChange={handleChange}
        />
        <label>Month:</label>
        <input
          name="birthMonth"
          type="number"
          value={astronaut.birthMonth}
          onChange={handleChange}
        />
        <label>Year:</label>
        <input
          name="birthYear"
          type="number"
          value={astronaut.birthYear}
          onChange={handleChange}
        />
      </fieldset>
      <label>
        Superpower:
        <input
          name="superPower"
          type="text"
          value={astronaut.superPower}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Save" disabled={!isFormValid} />
      <input type="button" value="Cancel" disabled={!isFormValid} />
      <input type="button" value="Delete" disabled={!isFormValid} />
    </form>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/

export default AstronautEditor;
