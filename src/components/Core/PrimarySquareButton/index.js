import React, { Component } from 'react';
import styles from './styles.module.css';

class PrimarySquareButton extends Component {
    render() {
      return (
        <button className={styles['primary-square-button']}>{this.props.children}</button>
      )
    }
  }
  
export default PrimarySquareButton;