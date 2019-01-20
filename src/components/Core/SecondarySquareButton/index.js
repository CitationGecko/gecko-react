import React, { Component } from 'react';
import styles from './styles.module.css';

class SecondarySquareButton extends Component {
  render() {
    return (
      <button className={styles['large-secondary-button']} onClick={this.props.action}>
        {this.props.text}
      </button>
    );
  }
}

export default SecondarySquareButton;
