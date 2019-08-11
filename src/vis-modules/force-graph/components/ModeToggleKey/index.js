import React from 'react';
import styles from './styles.module.css';

const ModeToggleKey = ({ mode, onSwitch }) => {
  const className =
    mode === 'seedsCitedBy' ? styles['toggle'] : `${styles['toggle']} ${styles['toggle-on']}`;
  return (
    <div className={styles['network-key']}>
      <div className={styles['key-icon']}>
        <div className={styles['seed-key']} />
        <input type="checkbox" className={styles['mode-toggle']} />
        <label onClick={onSwitch} className={className} htmlFor={styles['mode-toggle']} />
      </div>
      <div className={styles['key-label']}>
        <div>Seed Papers</div>
        <div>Papers Cited-By Seed Papers</div>
        <div>Papers Citing Seed Papers</div>
      </div>
    </div>
  );
};

export default ModeToggleKey;
