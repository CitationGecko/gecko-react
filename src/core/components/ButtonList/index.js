import React from 'react';
import styles from './styles.module.css';

const ButtonList = ({ children }) => {
  return (
    <React.Fragment>
      <div className={styles['large-button-list']}>{children}</div>
    </React.Fragment>
  );
};

export default ButtonList;
