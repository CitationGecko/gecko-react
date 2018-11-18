import React, { Component } from 'react';
import styles from './styles.module.css';

class ListView extends Component {
    render() {
      return (
        <div className={styles['list-view']}>
            <h1>List View</h1>
        </div>
      );
    }
  }
  
export default ListView;