import React, { Component } from 'react';
import styles from './styles.module.css';

class PrimaryButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={styles['primary-rounded-button']}>
        {this.props.text}
      </button>
    );
  }
}

export default PrimaryButton;
