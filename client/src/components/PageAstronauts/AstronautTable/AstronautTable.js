import React from "react";
import PropTypes from "prop-types";
import { astronautType } from "../../../types.js";
import formatDate from "../../../utils/formatDate.js";
import LinkButton from "../../LinkButton/LinkButton.js";
import styles from "./AstronautTable.module.css";

const renderRow = ({ astronaut, onDeleteClick }) => {
  const handleClick = () => onDeleteClick(astronaut.id);

  return (
    <tr key={astronaut.id} className={styles.row}>
      <td>{`${astronaut.firstName} ${astronaut.lastName}`}</td>
      <td>{astronaut.birth}</td>
      <td>{astronaut.superpower}</td>
      <td>
        <LinkButton
          className={styles.control}
          to={`/astronauts/${astronaut.id}/edit`}
        >
          Edit
        </LinkButton>
        <LinkButton className={styles.control} onClick={handleClick}>
          Delete
        </LinkButton>
      </td>
    </tr>
  );
};

const AstronautTable = ({ astronauts, updated, onDeleteClick }) => (
  <table className={styles.table}>
    <tbody>
      <tr className={styles.header}>
        <th>Name</th>
        <th>Birth</th>
        <th>Superpower</th>
        <th>Controls</th>
      </tr>
      <tr className={styles.small}>
        <td colSpan="4">
          <small>{`updated: ${formatDate(updated)}`}</small>
        </td>
      </tr>
      {astronauts.map(astronaut => renderRow({ astronaut, onDeleteClick }))}
    </tbody>
  </table>
);

AstronautTable.propTypes = {
  astronauts: PropTypes.arrayOf(astronautType.isRequired).isRequired,
  updated: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AstronautTable;
