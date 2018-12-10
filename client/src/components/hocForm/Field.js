import React from "react";
import { compose } from "recompose";
import contextConsumer from "./contextConsumer.js";
import filterPropsForName from "./filterPropsForName.js";

export const renderField = ({ component, ...props }) =>
  React.createElement(component, props);

export const Field = compose(
  contextConsumer,
  filterPropsForName
)(renderField);

export default Field;
