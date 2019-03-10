import React, { Component } from 'react';
import styles from './styles.module.css';

class SecondaryButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={styles['secondary-rounded-button']}>
        {this.props.text}
      </button>
    );
  }
}

export default SecondaryButton;
