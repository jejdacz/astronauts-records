import React from "react";
import { joinToStringBySpace as jstr } from "../../../utils/joinToString.js";

const renderValidation = ({ valid, invalid }) => BaseComponent => ({
  className,
  ...props
}) => (
  <BaseComponent
    {...props}
    className={jstr(className, props.touched && (props.error ? invalid : valid))}
  />
);

export default renderValidation;
