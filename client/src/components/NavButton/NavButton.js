import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavButton.css";

const NavButton = ({ to, children }) => (
  <Link className={styles.NavButton} to={to}>
    {children}
  </Link>
);

export default NavButton;
