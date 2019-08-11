import React from 'react';

import styles from './styles.module.css';
import PrimaryButton from 'core/components/PrimaryButton';
import SecondaryButton from 'core/components/SecondaryButton';

export const GenericLeftPanel = ({ header, body, primaryButton, secondaryButton }) => (
  <div className={styles['left-panel']}>
    <div className={styles['left-panel-header']}>
      <h1>{header}</h1>
    </div>
    <div className={styles['left-panel-body']}>{body}</div>
    <div className={styles['left-panel-footer']}>
      <div className={styles['left-panel-footer-btn-group']}>
        <PrimaryButton onClick={primaryButton.onClick} text={primaryButton.text} />
        <SecondaryButton onClick={secondaryButton.onClick} text={secondaryButton.text} />
      </div>
    </div>
  </div>
);

export default GenericLeftPanel;
