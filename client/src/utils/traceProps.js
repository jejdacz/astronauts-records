import React from "react";

const traceProps = (id = "") => BaseComponent => props => {
  console.group(`Props: (${id})`);
  console.log(props);
  console.groupEnd();
  return <BaseComponent {...props} />;
};

export default traceProps;
