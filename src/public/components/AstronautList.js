import React, { Component } from "react";
import PropTypes from "prop-types";
import Astronaut from "./Astronaut.js";

function AstronautList(props) {
  return (
    <div className="astronaut-list">
      {props.records.map(a => (
        <Astronaut onClick={() => props.editRecord(a.id)} key={a.id} {...a} />
      ))}
    </div>
  );
}

AstronautList.propTypes = {
  records: PropTypes.array.isRequired,
  editRecord: PropTypes.func.isRequired
};

export default AstronautList;
