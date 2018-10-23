import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate.js";
import PropTypes from "prop-types";
import { astronautType } from "../../../types.js";
import styles from "./AstronautList.module.css";

const AstronautList = ({ astronauts, updated }) => (
  <Fragment>
    <h3 className={styles.subHeading}>Astronauts</h3>
    <small className={styles.small}>{`updated: ${formatDate(updated)}`}</small>
    <ul className={styles.list}>
      {astronauts.map(a => (
        <li className={styles.item} key={a.id}>
          <Link className={styles.link} to={`/astronauts/${a.id}`}>{`${
            a.firstName
          } ${a.lastName}`}</Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

AstronautList.propTypes = {
  astronauts: PropTypes.arrayOf(astronautType.isRequired).isRequired,
  updated: PropTypes.number.isRequired
};

export default AstronautList;
