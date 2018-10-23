import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Controls } from "../Modal/Modal.js";

class PromptDialog extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  };

  handleAction() {
    this.props.action();
    this.props.closeModal();
  }

  render() {
    const { text, isOpen, closeModal } = this.props;

    return (
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <p>{text}</p>
        <Controls>
          <Button onClick={closeModal}>cancel</Button>
          <Button onClick={this.handleAction}>ok</Button>
        </Controls>
      </Modal>
    );
  }
}

export default PromptDialog;
