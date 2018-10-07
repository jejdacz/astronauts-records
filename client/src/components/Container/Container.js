import React from "react";
import styles from "./Container.css";
import { glueSpace as gs } from "../../utils/glue.js";

export const Container = ({ className, style, children }) => (
  <div className={gs(className, styles.container)} style={style}>
    {children}
  </div>
);

export const ContainerFluid = ({ className, style, children }) => (
  <div className={gs(className, styles.containerFluid)} style={style}>
    {children}
  </div>
);

export default Container;
