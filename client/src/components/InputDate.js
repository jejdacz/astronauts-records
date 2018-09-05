import React, { Component } from "react";
import PropTypes from "prop-types";

export default function InputDate(props) {
  const handleChange = e => {
    let { name, value } = e.target;
    props.onChange({ ...props.date, [name]: value });
  };

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <div className={`form-row`}>
        <div className="col">
          <input
            name="day"
            type="number"
            min="1"
            max="31"
            value={props.date.day}
            onChange={handleChange}
            placeholder="D"
            className={`form-control ${props.className}`}
          />
        </div>
        <div className="col">
          <input
            name="month"
            type="number"
            min="1"
            max="12"
            value={props.date.month}
            onChange={handleChange}
            placeholder="M"
            className={`form-control ${props.className}`}
          />
        </div>
        <div className="col-5">
          <input
            name="year"
            type="number"
            min="0"
            value={props.date.year}
            onChange={handleChange}
            placeholder="Y"
            className={`form-control ${props.className}`}
          />
        </div>
      </div>
      <small className="form-text text-muted">format: Day-Month-Year</small>
    </div>
  );
}

/*
AstronautEditor.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};*/
