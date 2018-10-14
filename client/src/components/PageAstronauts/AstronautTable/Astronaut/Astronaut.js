import React from "react";
import PropTypes from "prop-types";

function Astronaut(props) {
  const birth = props.birth.split("-");
  return (
    <div className="astronaut" onClick={props.onClick}>
      <span className="cell name">{`Name: ${props.firstName} ${
        props.lastName
      }`}</span>
      <span className="cell birth">
        {`Birth: ${birth[2]}.${birth[1]}.${birth[0]}`}
      </span>
      <span className="cell super-power">{`superpower: ${
        props.superpower
      }`}</span>
    </div>
  );
}

Astronaut.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birth: PropTypes.string.isRequired,
  superpower: PropTypes.string.isRequired
};

export default Astronaut;
