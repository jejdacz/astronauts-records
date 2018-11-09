import React from "react";
import PropTypes from "prop-types";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./Spinner.module.css";

const Spinner = ({ light, center }) => (
  <div className={center ? styles.center : styles.inline}>
    <div className={jstr(styles["lds-roller"], light ? styles.light : "")}>
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
