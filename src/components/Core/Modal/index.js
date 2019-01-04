import React, { Component } from 'react';
import styles from './styles.module.css';

class Modal extends Component {
  render() {
    return (
      <div className={styles['modal']}>
        <div className={styles['modal-content']}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
