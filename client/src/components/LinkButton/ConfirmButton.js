import React from "react";
import PropTypes from "prop-types";
import LinkButtonBase from "./LinkButtonBase";
import { withStateHandlers } from "recompose";
import join from "../../utils/join.js";
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

const ConfirmButton = ({
  isOpen,
  open,
  close,
  children,
  onClick,
  to,
  text = "Sure?",
  className,
  ...props
}) =>
  isOpen ? (
    <LinkButtonBase
      {...props}
      className={join(styles.button, className)}
      onClick={onClick}
      to={to}
      onBlur={close}
    >
      {text}
    </LinkButtonBase>
  ) : (
    <LinkButtonBase {...props} className={className} onClick={open}>
      {children}
    </LinkButtonBase>
  );

ConfirmButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default openHandler(ConfirmButton);
