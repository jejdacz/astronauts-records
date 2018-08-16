import React, { Component } from "react";
import PropTypes from "prop-types";
import Astronaut from "./Astronaut.js";

function AstronautList(props) {
  return (
    <div className="astronaut-list">
      {props.astronauts.map(a => (
        <Astronaut onClick={() => props.onClick(a)} key={a.id} {...a} />
      ))}
    </div>
  );
}

AstronautList.propTypes = {
  astronauts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AstronautList;
