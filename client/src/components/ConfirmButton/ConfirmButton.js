import React from "react";
import PropTypes from "prop-types";
import LinkButton from "../LinkButton/LinkButton";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import { withStateHandlers } from "recompose";
import styles from "./ConfirmButton.module.css";

const openHandler = withStateHandlers(
  () => ({
    isOpen: false
  }),
  {
    open: ({ isOpened }) => () => ({
      isOpen: true
    }),
    close: ({ isOpened }) => () => ({
      isOpen: false
    })
  }
);
/*
const ConfirmButtonBase = ({
  isOpen,
  open,
  close,
  onClick,
  children,
  ...props
}) =>
  isOpen ? (
    <Fragment>
      <LinkButton {...props} onClick={onClick}>
        Yes
      </LinkButton>
      <LinkButton {...props} onClick={close}>
        No
      </LinkButton>
    </Fragment>
  ) : (
    <LinkButton {...props} onClick={open}>
      {children}
    </LinkButton>
  );*/

const ConfirmButtonBase = ({
  isOpen,
  open,
  close,
  onClick,
  children,
  ...props
}) =>
  isOpen ? (
    <div className={jstr(props.className, styles.confirm)}>
      <LinkButton {...props} onClick={onClick}>
        Yes
      </LinkButton>
      <LinkButton {...props} onClick={close}>
        No
      </LinkButton>
    </div>
  ) : (
    <LinkButton {...props} onClick={open}>
      {children}
    </LinkButton>
  );

ConfirmButtonBase.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

const ConfirmButton = openHandler(ConfirmButtonBase);
export default ConfirmButton;
