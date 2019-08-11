import React from 'react';
import styles from './styles.module.css';

const SideBarButton = ({ active, img, onClick }) => (
  <button className={active ? styles.active : styles.inactive} onClick={onClick}>
    <img src={img} alt="icon" className={styles.icon} />
  </button>
);

export default SideBarButton;
