import React from "react";
import PropTypes from "prop-types";
import join from "../../utils/join.js";
import styles from "./Spinner.module.css";

const Spinner = ({ light, center }) => (
  <div className={center ? styles.center : styles.inline}>
    <div className={join(styles["lds-roller"], light ? styles.light : "")}>
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
  center: PropTypes.bool,
  light: PropTypes.bool
};

export default Spinner;
