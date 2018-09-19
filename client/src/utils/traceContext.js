import React, { Component } from "react";

const traceContext = (contextTypes, id = "") => BaseComponent => {
  const TraceContext = (ownerProps, context) => {
    console.group(`Context: (${id})`);
    console.log(context);
    console.groupEnd();
    return <BaseComponent {...ownerProps} />;
  };
  TraceContext.contextTypes = contextTypes;
  return TraceContext;
};

export default traceContext;
