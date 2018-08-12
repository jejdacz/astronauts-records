import React, { Component } from "react";
import PropTypes from "prop-types";
import Astronaut from "./Astronaut.js";

function AstronautList(props) {

  return (
    <div className="astronaut-list">
      {props.astronauts.map(a => <Astronaut key={a.id} {...a} />)}
    </div>
  );
}

AstronautList.propTypes = {
  astronauts: PropTypes.array.isRequired
};

export default AstronautList;