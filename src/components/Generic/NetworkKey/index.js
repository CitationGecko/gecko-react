import React from 'react';
import styles from './styles.module.css';

const NetworkKey = ({ mode, onClick }) => {
  const checked = mode === 'references';
  return (
    <div className={styles['network-key']}>
      <div className={styles['key-icon']}>
        <div className={styles['seed-key']} />
        <input
          type="checkbox"
          className={styles['mode-toggle']}
          checked={checked}
          onChange={onClick}
        />
        <label className={styles['toggle']} htmlFor={styles['mode-toggle']} />
      </div>
      <div className={styles['key-label']}>
        <div>Seed Papers</div>
        <div>Papers Cited-By Seed Papers</div>
        <div>Papers Citing Seed Papers</div>
      </div>
    </div>
  );
};

export default NetworkKey;
