import React, { Component } from 'react';
import styles from './styles.module.css';

class SecondaryButton extends Component {
    render() {
      return (
        <button className={styles['secondary-rounded-button']}>{this.props.children}</button>
      )
    }
  }
  
export default SecondaryButton;