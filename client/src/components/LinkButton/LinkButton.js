import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import join from "../../utils/join.js";
import styles from "./LinkButton.module.css";

const LinkButton = ({ type, className, ...props }) => {
  let Comp;

  if (props.to && !props.disabled) {
    Comp = Link;
  } else if (props.href && !props.disabled) {
    Comp = "a";
  } else {
    Comp = "button";
    type = type || "button";
    props = { ...props, type };
  }

  return <Comp {...props} className={join(styles.button, className)} />;
};

LinkButton.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default LinkButton;
