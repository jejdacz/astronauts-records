import React from "react";
import PropTypes from "prop-types";
import LinkButtonBase from "./LinkButtonBase";
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
    <LinkButtonBase {...props} onClick={onClick} to={to} onBlur={close}>
      {text}
    </LinkButtonBase>
  ) : (
    <LinkButtonBase {...props} onClick={open}>
      {children}
    </LinkButtonBase>
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
