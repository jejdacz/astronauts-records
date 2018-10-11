import React from "react";
import { glueSpace as gs } from "./glueString.js";

const attachClassName = styleClass => BaseComponent => ({
  className,
  ...props
}) => <BaseComponent className={gs(styleClass, className)} {...props} />;

export default attachClassName;
