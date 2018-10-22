import React from "react";
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

export default Button;
