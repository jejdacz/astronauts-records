import React from "react";
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

export default Container;
