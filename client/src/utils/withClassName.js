import React from "react";
import { joinToStringBySpace as jstr } from "./joinToString.js";

const withClassName = styleClass => BaseComponent => ({
  className,
  ...props
}) => <BaseComponent className={jstr(styleClass, className)} {...props} />;

export default withClassName;
