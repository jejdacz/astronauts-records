import React from "react";
import PropTypes from "prop-types";
import styles from "./Spinner.module.css";

const Spinner = ({ center }) => (
  <div className={center ? styles.center : styles.inline}>
    <div className={styles["lds-roller"]}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

Spinner.propTypes = {
  center: PropTypes.bool
};

export default Spinner;
