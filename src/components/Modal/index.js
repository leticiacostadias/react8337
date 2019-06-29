import React, { Component } from 'react';
import propTypes from 'prop-types';
import './index.css';

import Widget from './../Widget';

class Modal extends Component {
  static propTypes = {
    estaAberto: propTypes.bool.isRequired,
    fechaModal: propTypes.func.isRequired
  }

  handleClick = (event) => {
    if (event.target.closest('.modal__wrapper')) {
      return;
    }

    this.props.fechaModal();
  }

  render () {
    const { estaAberto } = this.props;

    return (
      <div
        className={`modal ${estaAberto && 'modal--active'}`}
        onClick={this.handleClick}
      >
        <div className="modal__wrapper">
          <Widget>
            {this.props.children}
            </Widget>
        </div>
      </div>
    );
  }
}

export default Modal;