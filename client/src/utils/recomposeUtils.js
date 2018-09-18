import React, { Component } from "react";

export const traceProps = (id = "") => BaseComponent => props => {
  console.group(`Props: (${id})`);
  console.log(props);
  console.groupEnd();
  return <BaseComponent {...props} />;
};

export const traceContext = (contextTypes, id = "") => BaseComponent => {
  const TraceContext = (ownerProps, context) => {
    console.group(`Context: (${id})`);
    console.log(context);
    console.groupEnd();
    return <BaseComponent {...ownerProps} />;
  };
  TraceContext.contextTypes = contextTypes;
  return TraceContext;
};
/*
const mapProps = mapFunc => BaseComponent => props => (
  <BaseComponent {...mapFunc(props)} />
);

const withHandlers = handlers => BaseComponent => props =>
  React.createElement(
    BaseComponent,
    Object.keys(handlers).reduce(
      (ac, i) => ({ ...ac, [i]: handlers[i](props) }),
      props
    )
  );

const withState = (stateUpdater, initialState) => BaseComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
      this.updateState = this.updateState.bind(this);
    }

    updateState(func) {
      this.setState(func);
    }

    render() {
      const newProps = {
        ...this.props,
        [stateUpdater]: this.updateState,
        ...this.state
      };
      return <BaseComponent {...newProps} />;
    }
  };
};*/
