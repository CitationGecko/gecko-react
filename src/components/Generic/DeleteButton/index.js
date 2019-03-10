import React from 'react';
import styles from './styles.module.css';
import { DeleteIcon } from 'components/Icons/DeleteIcon';

const DeleteButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles['delete']}>
      <DeleteIcon />
    </div>
  );
};

export default DeleteButton;
