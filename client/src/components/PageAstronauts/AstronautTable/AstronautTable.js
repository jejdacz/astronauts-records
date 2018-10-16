import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../Button/Button.js";
import styles from "./AstronautTable.module.css";

const renderRow = ({ astronaut, onDeleteClick }) => (
  <tr key={astronaut.id} className={styles.row}>
    <td>{`${astronaut.firstName} ${astronaut.lastName}`}</td>
    <td>{astronaut.birth}</td>
    <td>{astronaut.superpower}</td>
    <td>
      <Button to={`/astronauts/${astronaut.id}/edit`} noBorder={true}>
        Edit
      </Button>
      <Button onClick={() => onDeleteClick(astronaut.id)} noBorder={true}>
        Delete
      </Button>
    </td>
  </tr>
);

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
          <small>{`updated: ${updated}`}</small>
        </td>
      </tr>
      {astronauts.map(astronaut => renderRow({ astronaut, onDeleteClick }))}
    </tbody>
  </table>
);

export default AstronautTable;
