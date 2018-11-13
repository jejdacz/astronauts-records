import React from "react";
import join from "../../utils/join.js";

const withClassName = styleClass => BaseComponent => ({
  className,
  ...props
}) => <BaseComponent className={join(styleClass, className)} {...props} />;

export default withClassName;
