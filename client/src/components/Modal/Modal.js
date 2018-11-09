import React from "react";
import withClassName from "../withClassName/withClassName.js";
import Btn from "../Button/Button.js";
import ReactModal from "react-modal";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import { compose, withProps } from "recompose";
import styles from "./Modal.module.css";

export const Modal = ({ boxed = true, transparent, isOpen, ...props }) => (
  <ReactModal
    className={boxed ? styles.modal : styles.modalClear}
    overlayClassName={jstr(
      styles.overlay,
      transparent ? styles.transparent : "",
      isOpen ? styles.open : ""
    )}
    isOpen={isOpen}
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
