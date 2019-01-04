import React, { Component } from 'react';
import styles from './styles.module.css';
import PrimaryButton from '../Core/PrimaryButton';
import SecondaryButton from '../Core/SecondaryButton';

class ListView extends Component {
    render() {
      return (
        <div className={styles['list-view']}>
          <div className={styles['list-header']}>
            <h1>My Seed Papers</h1>
          </div>
          <div className={styles['list-body']}>
          </div>
          <div className={styles['list-footer']}>
            <div className={styles['list-footer-btn-group']}>
              <PrimaryButton>Add more seeds</PrimaryButton>
              <SecondaryButton>Delete</SecondaryButton>
            </div>
          </div>
        </div>
      );
    }
  }
  
export default ListView;