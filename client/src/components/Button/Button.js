import React from "react";
import PropTypes from "prop-types";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import LinkButton from "../LinkButton/LinkButton.js";
import styles from "./Button.module.css";

const Button = ({ children, className, noBorder, ...props }) => (
  <LinkButton
    className={jstr(styles.button, noBorder && styles["no-border"], className)}
    {...props}
  >
    {children}
  </LinkButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noBorder: PropTypes.bool
};

export default Button;
