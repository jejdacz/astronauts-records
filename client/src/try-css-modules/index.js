import React from "react";
import { render } from "react-dom";
import styles from "./try.css";

const Sample = props => <div {...props} />;

render(
  <Sample className={styles.redBorder} />,
  document.getElementById("root")
);
