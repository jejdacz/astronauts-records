import React, { Component } from "react";
import PropTypes from "prop-types";

export default function InputDate(props) {
  const handleChange = e => {
    let { name, value } = e.target;
    props.onChange({ ...props.date, [name]: value });
  };

  return (
    <fieldset>
      <legend>{props.legend}</legend>
      <label>Day:</label>
      <input
        name="day"
        type="number"
        value={props.date.day.replace(/^0+/, "")}
        onChange={handleChange}
      />
      <label>Month:</label>
      <input
        name="month"
        type="number"
        value={props.date.month.replace(/^0+/, "")}
        onChange={handleChange}
      />
      <label>Year:</label>
      <input
        name="year"
        type="number"
        value={props.date.year.replace(/^0+/, "")}
        onChange={handleChange}
      />
    </fieldset>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
