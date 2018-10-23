import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { astronautType } from "../../types.js";
import { connect } from "react-redux";
import {
  deleteAstronaut,
  resetDeletedAstronaut
} from "../../astronautActions.js";
import {
  Modal,
  Button,
  Controls,
  Heading,
  Message,
  Block
} from "../Modal/Modal.js";
import Spinner from "../Spinner/Spinner.js";

class DeleteAstronautModal extends PureComponent {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    astronaut: astronautType.isRequired,
    pending: PropTypes.bool.isRequired,
    idToDelete: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.dispatch(resetDeletedAstronaut);
  }

  componentWillUnmount() {
    this.props.dispatch(resetDeletedAstronaut);
  }

  closeModal() {
    this.props.dispatch(resetDeletedAstronaut);
    this.props.closeModal();
  }

  handleDeleteClick() {
    this.props.dispatch(deleteAstronaut(this.props.idToDelete));
  }

  render() {
    const {
      error,
      pending,
      response,
      idToDelete,
      isOpen,
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
            <Button onClick={this.closeModal}>ok</Button>
          </Controls>
        </ConfiguredModal>
      );
    }

    if (response) {
      return (
        <ConfiguredModal>
          <Heading>Success</Heading>
          <Message>The astronaut has been removed.</Message>
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
          <Button onClick={this.handleDeleteClick}>ok</Button>
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
