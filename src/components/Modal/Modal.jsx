import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalView } from './Modal.styled';
// import PropTypes from 'prop-types';
// import { ModalStyled, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMoun() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    const { target, currentTarget } = event;

    if (target.value === currentTarget.value) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalView>{this.props.children}</ModalView>
      </Backdrop>,
      modalRoot
    );
  }
}
