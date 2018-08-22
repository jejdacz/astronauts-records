import React, { Component } from "react";
import PropTypes from "prop-types";

// parses dateString "YYYY-MM-DD" and returns { year: Number, month: Number, day: Number}
const dateStringToObject = d => {
  const dateArray = d.split("-").map(v => v.replace(/^0+/, ""));

  return { year: dateArray[0], month: dateArray[1], day: dateArray[2] };
};

// returns dateString "YYYY-MM-DD"
const dateObjectToString = d =>
  `${d.year.padStart(4, "0")}-${d.month.padStart(2, "0")}-${d.day.padStart(
    2,
    "0"
  )}`;

export default function InputDate(props) {
  const date = dateStringToObject(props.date);

  const handleChange = e => {
    let { name, value } = e.target;
    props.onChange(dateObjectToString({ ...date, [name]: value }));
  };

  return (
    <fieldset>
      <legend>{props.legend}</legend>
      <label>Day:</label>
      <input
        name="day"
        type="number"
        value={date.day}
        onChange={handleChange}
        placeholder="1"
      />
      <label>Month:</label>
      <input
        name="month"
        type="number"
        value={date.month}
        onChange={handleChange}
        placeholder="1"
      />
      <label>Year:</label>
      <input
        name="year"
        type="number"
        value={date.year}
        onChange={handleChange}
        placeholder="1900"
      />
    </fieldset>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
