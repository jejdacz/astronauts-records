import React from "react";
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
export const Message = withClassName(styles.message)("p");
export const Heading = withClassName(styles.heading)("h5");
export const Block = withClassName(styles.block)("div");

export default Modal;
