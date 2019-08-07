import React, { useContext } from 'react';
import styles from './styles.module.css';
import { UI } from 'core/state/ui';

const Modal = () => {
  const { modalContent, closeModal } = useContext(UI);
  if (!modalContent) return null;
  return (
    <div className={styles['modal']} onClick={closeModal}>
      <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
