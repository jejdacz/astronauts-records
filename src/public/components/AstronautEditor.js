import React, { Component } from "react";
import PropTypes from "prop-types";

function AstronautEditor(props) {
  const { astronaut } = props;
  /*
      firstName: this.props.astronaut.firstName,
      lastName: this.props.astronaut.lastName,
      birth: new Date(this.props.astronaut.birth),
      superPower: this.props.astronaut.superPower
*/
  // TODO component for input date (3x input number)

  const validationErrors = [];

  const isValidWord = w => /^[A-Za-z]+$/.test(w);
  const isValidDate = d => !isNaN(Date.parse(d));

  const formatDate = d => {
    const date = new Date(d);
    return `${date.getDate()}.${Number(date.getMonth()) +
      1}.${date.getFullYear()}`;
  };

  const handleChange = e => {
    let { name, value } = e.target;
    if (name === "birth") value = value;
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
          required="required"
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          type="text"
          value={astronaut.lastName}
          onChange={handleChange}
          required="required"
        />
      </label>
      <label>
        Birth:
        <input
          name="birth"
          type="string"
          value={formatDate(astronaut.birth)}
          onChange={handleChange}
          required="required"
        />
      </label>
      <label>
        Superpower:
        <input
          name="superPower"
          type="text"
          value={astronaut.superPower}
          onChange={handleChange}
          required="required"
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/

export default AstronautEditor;
