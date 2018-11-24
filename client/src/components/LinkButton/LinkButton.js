import React from "react";
import PropTypes from "prop-types";
import LinkButtonBase from "./LinkButtonBase";
import ConfirmButton from "./ConfirmButton";

const LinkButton = ({ confirm, ...props }) =>
  confirm ? <ConfirmButton {...props} /> : <LinkButtonBase {...props} />;

LinkButton.propTypes = {
  confirm: PropTypes.bool
};

export default LinkButton;
