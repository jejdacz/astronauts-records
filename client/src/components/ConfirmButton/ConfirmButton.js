import React from "react";
import PropTypes from "prop-types";
import LinkButton from "../LinkButton/LinkButton";
import { withStateHandlers } from "recompose";

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

const ConfirmButtonBase = ({
  isOpen,
  open,
  close,
  children,
  onClick,
  to,
  ...props
}) =>
  isOpen ? (
    <LinkButton {...props} onClick={onClick} to={to} onBlur={close}>
      Yes?
    </LinkButton>
  ) : (
    <LinkButton {...props} onClick={open}>
      {children}
    </LinkButton>
  );

ConfirmButtonBase.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

const ConfirmButton = openHandler(ConfirmButtonBase);
export default ConfirmButton;
