import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteAstronaut } from "../../astronautActions.js";
import styles from "./DeleteAstronaut.module.css";
import { Modal, Button as ModalButton, Controls } from "../Modal/Modal.js";

class DeleteAstronaut extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <h4>"Delete astronaut Y/N"</h4>
        <Controls>
          <ModalButton onClick={this.props.closeModal}>cancel</ModalButton>
          <ModalButton
            onClick={() => this.props.dispatch(deleteAstronaut(this.props.id))}
          >
            ok
          </ModalButton>
        </Controls>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.deletedAstronaut });

export default connect(mapStateToProps)(DeleteAstronaut);
