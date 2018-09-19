import React from "react";
import { glueSpace as gSp } from "../../../utils/glue.js";

const renderValidation = ({ valid, invalid }) => BaseComponent => ({
  className,
  ...props
}) => (
  <BaseComponent
    {...props}
    className={gSp([
      className,
      props.touched && (props.error ? invalid : valid)
    ])}
  />
);

export default renderValidation;
