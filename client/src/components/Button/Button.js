import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./Button.module.css";

const Button = ({ type, children, className, noBorder, ...props }) => {
  let Comp;

  if (props.to && !props.disabled) {
    Comp = Link;
  } else {
    Comp = "button";
    type = type || "button";
    props = { ...props, type };
  }

  return (
    <Comp
      className={jstr(
        styles.button,
        noBorder && styles["no-border"],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

Button.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
