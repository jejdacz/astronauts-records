import React from "react";
import join from "../../utils/join.js";

const renderValidation = ({ valid, invalid }) => BaseComponent => ({
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
