import React, { Component } from "react";
import PropTypes from "prop-types";
import Astronaut from "./Astronaut.js";

function AstronautList(props) {
  return (
    <div className="astronaut-list">
      {props.astronauts.map(a => (
        <div>
          <Astronaut key={a.id} {...a} />
          <button onClick={() => props.onEditClick(a)}>edit</button>
          <button onClick={() => props.onDeleteClick(a.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

AstronautList.propTypes = {
  astronauts: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AstronautList;
