import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderLink.css";

const HeaderLink = ({ to, children }) => (
  <Link className={styles.link} to={to}>
    {children}
  </Link>
);

export default HeaderLink;
