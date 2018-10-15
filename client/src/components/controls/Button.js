import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./Button.module.css";

const Button = ({ children, className, type, noBorder, ...props }) => (
  <button
    type={type || "button"}
    className={jstr(styles.button, noBorder && styles["no-border"], className)}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
