import React from "react";

const PageHeader = props => (
  <header className="container-fluid">
    <div className="container">{props.children}</div>
  </header>
);

export default PageHeader;
