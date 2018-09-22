import React from "react";
import styles from "./PageHeader.css";

const PageHeader = props => (
  <header className={styles.outerContainer}>
    <div className={styles.innerContainer}>{props.children}</div>
  </header>
);

export default PageHeader;
