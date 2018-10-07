import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { glueSpace as gs } from "../../utils/glue.js";
import styles from "./Nav.module.css";

export const Nav = ({ children, className, style }) => (
  <Fragment>
    <nav className={gs(styles.nav, className)} style={style}>
      <div className={styles.container}>{children}</div>
    </nav>
    <div className={styles.placeholder} />
  </Fragment>
);

export const NavLink = ({ to, children, className, style }) => (
  <Link to={to} className={gs(styles.link, className)} style={style}>
    {children}
  </Link>
);

export const NavLogo = ({ to, children, className, style }) => (
  <Link
    to={to}
    className={gs(styles.link, styles.logo, className)}
    style={style}
  >
    {children}
  </Link>
);

export const NavButton = ({ onClick, children, className, style }) => (
  <a
    href="#"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
    className={gs(styles.link, className)}
    style={style}
  >
    {children}
  </a>
);

export default Nav;
