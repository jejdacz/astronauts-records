import React, { Component } from "react";
import PropTypes from "prop-types";

export default function InputDate({ date, onChange, onBlur, label, ...props }) {
  const handleChange = e => {
    let { name, value } = e.target;
    onChange({ ...date, [name]: value });
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className={`form-row`}>
        <div className="col">
          <input
            name="day"
            type="number"
            min="1"
            max="31"
            value={date.day}
            onChange={handleChange}
            onBlur={onBlur}
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
            value={date.month}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder="M"
            className={`form-control ${props.className}`}
          />
        </div>
        <div className="col-5">
          <input
            name="year"
            type="number"
            min="0"
            value={date.year}
            onChange={handleChange}
            onBlur={onBlur}
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
