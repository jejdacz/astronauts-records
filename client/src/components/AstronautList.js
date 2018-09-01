import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Astronaut from "./Astronaut.js";

function AstronautList({ astronauts, renderLink }) {
  return (
    <div className="astronaut-list">
      {astronauts.map(a => (
        <div key={a.id}>
          <Astronaut {...a} />
          <Link to={`/astronauts/${a.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}

AstronautList.propTypes = {
  astronauts: PropTypes.array.isRequired
};

export default AstronautList;
