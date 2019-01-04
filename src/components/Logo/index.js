import React, { Component } from 'react';
import styles from './styles.module.css';
import logo from './geckologo.svg'

class Logo extends Component {
    render() {
      return (
        <img className={styles['logo']} alt='gecko logo' src={logo}/>
      );
    }
  }
  
export default Logo;