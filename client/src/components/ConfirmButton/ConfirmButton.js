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

const ConfirmButton = ({
  isOpen,
  open,
  close,
  children,
  onClick,
  to,
  text = "Sure?",
  ...props
}) =>
  isOpen ? (
    <LinkButton {...props} onClick={onClick} to={to} onBlur={close}>
      {text}
    </LinkButton>
  ) : (
    <LinkButton {...props} onClick={open}>
      {children}
    </LinkButton>
  );

ConfirmButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default openHandler(ConfirmButton);
