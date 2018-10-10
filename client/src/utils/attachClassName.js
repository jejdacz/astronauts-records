import React from "react";
import { glueSpace as gs } from "./glue.js";

const attachClassName = styleClass => BaseComponent => ({
  className,
  ...props
}) =>
  React.createElement(BaseComponent, {
    ...props,
    className: gs(styleClass, className)
  });

export default attachClassName;
