import React from 'react';
import styles from './styles.module.css';

const Loader = ({ display }) => display && <div className={styles['loader']} />;

export default Loader;
