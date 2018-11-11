import React from "react";
import PropTypes from "prop-types";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import styles from "./Container.module.css";

export const Container = ({ as: Component, className, fluid, ...props }) => {
  Component = Component || "div";
  return (
    <Component
      className={jstr(
        fluid ? styles["container-fluid"] : styles.container,
        className
      )}
      {...props}
    />
  );
};

Container.propTypes = {
  as: PropTypes.node,
  className: PropTypes.string,
  fluid: PropTypes.bool
};

export default Container;
