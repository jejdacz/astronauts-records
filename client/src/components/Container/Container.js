import React from "react";
import attachClassName from "../../utils/attachClassName.js";
import { glueSpace as gs } from "../../utils/glueString.js";
import styles from "../../styles/containers.module.css";

export const Container = attachClassName(styles.container)("div");

export const ContainerFluid = attachClassName(styles["container-fluid"])("div");

export const toContainer = BaseComponent =>
  attachClassName(styles.container)(BaseComponent);

export const toContainerFluid = BaseComponent =>
  attachClassName(styles["container-fluid"])(BaseComponent);

export default Container;
