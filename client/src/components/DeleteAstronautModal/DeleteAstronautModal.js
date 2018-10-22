import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteAstronaut,
  resetDeletedAstronaut
} from "../../astronautActions.js";
import { Modal, Button, Controls, Heading, Message } from "../Modal/Modal.js";

class DeleteAstronautModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    astronaut: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    idToDelete: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.dispatch(resetDeletedAstronaut);
  }

  closeModal() {
    this.props.dispatch(resetDeletedAstronaut);
    this.props.closeModal();
  }

  render() {
    const {
      error,
      pending,
      response,
      idToDelete,
      dispatch,
      astronaut
    } = this.props;

    const ConfiguredModal = props => (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        {...props}
      />
    );

    if (pending) {
      return (
        <ConfiguredModal shouldCloseOnOverlayClick={false}>
          <Heading>Pending</Heading>
          <Message>...spinner...</Message>
        </ConfiguredModal>
      );
    }

    if (error) {
      return (
        <ConfiguredModal>
          <Heading>Error</Heading>
          <Message>{error}</Message>
          <Controls>
            <Button onClick={this.closeModal}>ok</Button>
          </Controls>
        </ConfiguredModal>
      );
    }

    if (response) {
      return (
        <ConfiguredModal>
          <Heading>Success</Heading>
          <Message>{response}</Message>
          <Controls>
            <Button onClick={this.closeModal}>ok</Button>
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
          <Button onClick={this.closeModal}>cancel</Button>
          <Button onClick={() => dispatch(deleteAstronaut(idToDelete))}>
            ok
          </Button>
        </Controls>
      </ConfiguredModal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.deletedAstronaut,
  astronaut: state.astronauts.items.find(a => a.id === ownProps.idToDelete)
});

export default connect(mapStateToProps)(DeleteAstronautModal);
