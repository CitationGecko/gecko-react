import React, { Component } from 'react';
import styles from './styles.module.css';

class PrimaryButton extends Component {
    render() {
      return (
        <button className={styles['primary-rounded-button']}>{this.props.children}</button>
      )
    }
  }
  
export default PrimaryButton;