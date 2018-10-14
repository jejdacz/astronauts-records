import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Link as NavLink, Button } from "../../Nav/Nav.js";
import styles from "./AstronautTable.module.css";

const renderRow = ({ astronaut, onDeleteClick }) => (
  <tr key={astronaut.id} className={styles.row}>
    <td>{`${astronaut.firstName} ${astronaut.lastName}`}</td>
    <td>{astronaut.birth}</td>
    <td>{astronaut.superpower}</td>
    <td>
      <NavLink className={styles.link} to={`/astronauts/${astronaut.id}/edit`}>
        Edit
      </NavLink>
      <button type="button" className={styles.button} onClick={onDeleteClick}>
        Delete
      </button>
    </td>
  </tr>
);

const AstronautTable = ({ astronauts, updated, onDeleteClick }) => (
  <table className={styles.table}>
    <tr className={styles.header}>
      <th>Name</th>
      <th>Birth</th>
      <th>Superpower</th>
      <th>Controls</th>
    </tr>
    <tr className={styles.small}>
      <td colspan="4">
        <small>{`updated: ${updated}`}</small>
      </td>
    </tr>
    {astronauts.map(astronaut => renderRow({ astronaut, onDeleteClick }))}
  </table>
);

export default AstronautTable;
