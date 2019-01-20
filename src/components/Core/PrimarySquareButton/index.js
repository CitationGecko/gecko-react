import React, { Component } from 'react';
import styles from './styles.module.css';

class PrimarySquareButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={styles['primary-square-button']}>
        {this.props.text}
      </button>
    );
  }
}

export default PrimarySquareButton;
