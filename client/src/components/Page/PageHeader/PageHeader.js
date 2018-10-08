import React from "react";
//import styles from "./PageHeader.css";

const styles = {};

const PageHeader = props => (
  <header className={styles.outerContainer}>
    <div className={styles.innerContainer}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  </header>
);

export default PageHeader;
