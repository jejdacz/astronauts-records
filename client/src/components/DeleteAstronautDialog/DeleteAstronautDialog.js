import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { astronautType } from "../../types.js";
import { connect } from "react-redux";
import { deleteAstronaut } from "../../astronautActions.js";
import { closeDeleteDialogAction } from "../../deleteDialogActions.js";
import {
  Modal,
  Button,
  Controls,
  Heading,
  Message,
  Block
} from "../Modal/Modal.js";
import Spinner from "../Spinner/Spinner.js";

class DeleteAstronautDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  /*
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    astronaut: astronautType.isRequired,
    action: PropTypes.object
  };*/

  closeDialog() {
    this.props.dispatch(closeDeleteDialogAction());
  }

  handleDeleteClick() {
    this.props.dispatch(deleteAstronaut({ id: this.props.astronaut.id }));
  }

  render() {
    const { request, error, success, isOpen, dispatch, astronaut } = this.props;

    if (!isOpen) return null;

    const ConfiguredModal = props => (
      <Modal isOpen={isOpen} onRequestClose={this.closeDialog} {...props} />
    );

    if (request) {
      return (
        <ConfiguredModal shouldCloseOnOverlayClick={false}>
          <Heading>Deleteing...</Heading>
          <Block>
            <Spinner center={true} />
          </Block>
        </ConfiguredModal>
      );
    }

    if (error) {
      return (
        <ConfiguredModal>
          <Heading>Error</Heading>
          <Message>
            An error occured during the operation, please try again later.
          </Message>
          <Controls>
            <Button onClick={this.closeDialog}>ok</Button>
          </Controls>
        </ConfiguredModal>
      );
    }

    if (success) {
      return (
        <ConfiguredModal>
          <Heading>Success</Heading>
          <Message>The astronaut has been removed.</Message>
          <Controls>
            <Button onClick={this.closeDialog}>ok</Button>
          </Controls>
        </ConfiguredModal>
      );
    }

    return (
      <ConfiguredModal>
        <Heading>Delete this astronaut?</Heading>
        <Message>
          {`Astronaut ${astronaut.firstName} ${
            astronaut.lastName
          } will be removed from database.`}
        </Message>
        <Controls>
          <Button onClick={this.closeDialog}>cancel</Button>
          <Button onClick={this.handleDeleteClick}>ok</Button>
        </Controls>
      </ConfiguredModal>
    );
  }
}

const mapStateToProps = state => ({
  ...state.deleteAstronaut,
  ...state.deleteDialog
});

export default connect(mapStateToProps)(DeleteAstronautDialog);
