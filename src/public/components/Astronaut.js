import React, { Component } from "react";
import PropTypes from "prop-types";

function Astronaut(props) {
  const birth = new Date(props.birth);
  return (
    <div className="astronaut" onClick={props.onClick} >
      <span className="cell name">{`Name: ${props.firstName} ${
        props.lastName
      }`}</span>
      <span className="cell birth">
        {`Birth: ${birth.getDate()}.${birth.getMonth()}.${birth.getFullYear()}`}
      </span>
      <span className="cell super-power">{`Superpower: ${
        props.superPower
      }`}</span>
    </div>
  );
}

Astronaut.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birth: PropTypes.string.isRequired,
  superPower: PropTypes.string.isRequired
};

export default Astronaut;
