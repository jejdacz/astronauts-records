import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./Nav.module.css";

export const Bar = ({ children, className, fixed, ...props }) => (
  <Fragment>
    <nav
      className={jstr(styles.nav, fixed ? styles.navFixed : "", className)}
      {...props}
    >
      <div className={styles.container}>{children}</div>
    </nav>
    <div className={styles.placeholder} />
  </Fragment>
);

export const Link = ({ children, className, ...props }) => (
  <RouterLink className={jstr(styles.link, className)} {...props}>
    {children}
  </RouterLink>
);

export const Logo = ({ children, className, ...props }) => (
  <RouterLink className={jstr(styles.logo, className)} {...props}>
    {children}
  </RouterLink>
);
/*
export const LinkButton = ({ onClick, children, className, ...props }) => (
  <a
    href="#"
    role="button"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
    className={jstr(styles.link, className)}
    {...props}
  >
    {children}
  </a>
);*/

export const Button = ({ onClick, children, className, ...props }) => (
  <button
    type="button"
    onClick={e => {
      onClick();
    }}
    className={jstr(styles.button, className)}
    {...props}
  >
    {children}
  </button>
);

export default {
  Bar,
  Link,
  Logo,
  Button
};
