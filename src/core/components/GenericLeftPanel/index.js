import React from 'react';

import styles from './styles.module.css';

export const GenericLeftPanel = ({ header, body, footer }) => (
  <div className={styles['left-panel']}>
    <div className={styles['left-panel-header']}>
      <h1>{header}</h1>
    </div>
    <div className={styles['left-panel-body']}>{body}</div>
    <div className={styles['left-panel-footer']}>
      <div className={styles['left-panel-footer-btn-group']}>{footer}</div>
    </div>
  </div>
);

export default GenericLeftPanel;
