import React, { Component } from 'react';
import styles from './styles.module.css';

class NetworkKey extends Component {
  render() {
    return (
      <div className={styles['network-key']}>
        <div className={styles['key-icon']}>
          <div className={styles['seed-key']} />
          <input type="checkbox" className={styles['mode-toggle']} />
          <label className={styles['toggle']} htmlFor="mode-toggle">
            Toggle
          </label>
        </div>
        <div className={styles['key-label']}>
          <div>Seed Papers</div>
          <div>Papers Cited-By Seed Papers</div>
          <div>Papers Citing Seed Papers</div>
        </div>
      </div>
    );
  }
}

export default NetworkKey;
