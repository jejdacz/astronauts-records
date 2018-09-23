import React from "react";
import styles from "./Header.css";

const Header = props => (
  <header className={styles.outerContainer}>
    <div className={styles.innerContainer}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.children}
    </div>
  </header>
);

export default Header;
