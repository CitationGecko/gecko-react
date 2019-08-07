import React from 'react';
import styles from './styles.module.css';
import logo from './geckologo.svg';

const Logo = () => <img className={styles['logo']} alt="gecko logo" src={logo} />;

export default Logo;
