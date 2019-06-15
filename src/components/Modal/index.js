import React, { Component } from 'react';
import './index.css';

import Widget from './../Widget';

class Modal extends Component {
  render () {
    const { estaAberto } = this.props;

    return (
      <div className={`modal ${estaAberto && 'modal--active'}`}>
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