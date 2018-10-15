import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./Button.module.css";

const LinkButton = ({
  disabled,
  onClick,
  children,
  className,
  noBorder,
  ...props
}) => {
  let Comp = Link;

  if (onClick || disabled) {
    Comp = "button";
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

LinkButton.propTypes = {
  to: PropTypes.string.isRequired
};

export default LinkButton;
