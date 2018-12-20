import React from "react";
import join from "../../utils/join.js";

const renderValidation = BaseComponent => ({
  valid = "is-valid",
  invalid = "is-invalid",
  className,
  ...props
}) => (
  <BaseComponent
    {...props}
    className={join(
      className,
      props.touched && (props.error ? invalid : valid)
    )}
  />
);

export default renderValidation;
