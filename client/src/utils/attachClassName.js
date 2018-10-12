import React from "react";
import { joinToStringBySpace as jstr } from "./joinToString.js";

const attachClassName = styleClass => BaseComponent => ({
  className,
  ...props
}) => <BaseComponent className={jstr(styleClass, className)} {...props} />;

export default attachClassName;
