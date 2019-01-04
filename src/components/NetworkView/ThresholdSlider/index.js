import React, { Component } from 'react';
import styles from './styles.module.css';

class ThresholdSlider extends Component {
    render() {
      return (
        <div className={styles['threshold-slider']}>
            <input className={styles['threshold-input']} type='range' min='1' max='10' value='1'/>
            <output className={styles["threshold-output"]} for="threshold-input">Minimum Connections: 1</output>
        </div>
      );
    }
  }
  
export default ThresholdSlider;