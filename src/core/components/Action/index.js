import React from 'react';
import styles from './styles.module.css';
import Icon from 'core/components/Icon';

export const Action = ({ icon, text, onClick }) => (
  <div className={styles.action} onClick={onClick}>
    <Icon icon={icon} />
    <span className={styles.actionText}>{text}</span>
  </div>
);
