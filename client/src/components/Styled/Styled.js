import React from "react";
import styles from "./Styled.css";
import { glueSpace as gs } from "../../utils/glue.js";

const Styled = {};

Styled.container = ({ className, style, children }) => (
  <div className={gs(className, styles.container)} style={style}>
    {children}
  </div>
);

Styled.containerFluid = ({ className, style, children }) => (
  <div className={gs(className, styles.containerFluid)} style={style}>
    {children}
  </div>
);

export default Styled;
