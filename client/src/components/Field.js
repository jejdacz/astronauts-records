import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "./hocForm.js";

const Field = props => {
  const { component, ...field } = props;
  return (
    <GlobalContext.Consumer>
      {context =>
        React.createElement(component, { ...field, context: { ...context } })
      }
    </GlobalContext.Consumer>
  );
};

export default Field;
