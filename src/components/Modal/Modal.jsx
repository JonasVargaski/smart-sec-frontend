import React from "react";
import { Modal } from "react-bootstrap";

const Modall = props => {
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...props.props}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      {props.footer ? <Modal.Footer>{props.footer}</Modal.Footer> : null}
    </Modal>
  );
};

export default Modall;
