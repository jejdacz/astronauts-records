import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./LinkButton.module.css";

const LinkButton = ({ type, className, children, ...props }) => {
  let Comp;

  if (props.to && !props.disabled) {
    Comp = Link;
  } else {
    Comp = "button";
    type = type || "button";
    props = { ...props, type };
  }

  return (
    <Comp {...props} className={jstr(styles.button, className)}>
      {children}
    </Comp>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default LinkButton;
