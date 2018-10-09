import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { glueSpace as gs } from "../../utils/glue.js";
import styles from "./Nav.module.css";

export const NavBar = ({ children, className, style, fixed, ...props }) => (
  <Fragment>
    <nav
      className={gs(styles.nav, fixed ? styles.navFixed : "", className)}
      style={style}
      {...props}
    >
      <div className={styles.container}>{children}</div>
    </nav>
    <div className={styles.placeholder} />
  </Fragment>
);

export const NavLink = ({ to, children, className, style, ...props }) => (
  <Link to={to} className={gs(styles.link, className)} style={style} {...props}>
    {children}
  </Link>
);

export const NavLogo = ({ to, children, className, style, ...props }) => (
  <Link to={to} className={gs(styles.logo, className)} style={style} {...props}>
    {children}
  </Link>
);

export const NavButton = ({
  onClick,
  children,
  className,
  style,
  ...props
}) => (
  <a
    href="#"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
    className={gs(styles.link, className)}
    style={style}
    {...props}
  >
    {children}
  </a>
);

export default {
  nav: NavBar,
  link: NavLink,
  logo: NavLogo,
  button: NavButton
};
