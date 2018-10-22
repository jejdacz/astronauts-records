import React from "react";
import { joinToStringBySpace as jst } from "../../utils/joinToString.js";
import withClassName from "../../utils/withClassName.js";
import Btn from "../Button/Button.js";
import ReactModal from "react-modal";
import { compose, withProps } from "recompose";
import styles from "./Modal.module.css";

export const Modal = props => (
  <ReactModal
    className={styles.modal}
    overlayClassName={styles.overlay}
    {...props}
  />
);

export const Button = compose(
  withClassName(styles.button),
  withProps({
    noBorder: true
  })
)(Btn);

export const Controls = withClassName(styles.controls)("div");

export default Modal;
