import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { MetaContext } from "./hocForm.js";

const handleChange = func => e => {
  let { name, value } = e.target;
  func({ [name]: value });
};

const handleBlur = func => e => {
  let { name, value } = e.target;
  func(name);
};
/*
const Input = props => (
  <Fragment>
    <label>{props.label}</label>
    <input
      name={props.name}
      type={props.type}
      value={props.values[props.name]}
      onChange={handleChange(props.onChange)}
      onBlur={handleBlur(props.onBlur)}
      placeholder={props.placeholder}
      className={`${props.className} form-control ${props.touched[props.name] &&
        (props.errors[props.name] ? "is-invalid" : "is-valid")}`}
    />
  </Fragment>
);*/

const Field = props => {
  return (
    <MetaContext.Consumer>
      {meta => (
        <Input {...props} {...meta} />
        /*
        <Fragment>
          <label>{label}</label>
          <input
            name={name}
            type={type}
            value={values[name]}
            onChange={handleChange(onChange)}
            onBlur={handleBlur(onBlur)}
            placeholder={placeholder}
            className={`form-control ${touched[name] &&
              (errors[name] ? "is-invalid" : "is-valid")}`}
          />
        </Fragment>*/
      )}
    </MetaContext.Consumer>
  );
};

export default Field;
