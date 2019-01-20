import React, { Component } from 'react';
import styles from './styles.module.css';
import NetworkKey from './NetworkKey';
import ThresholdSlider from './ThresholdSlider';

class NetworkView extends Component {
  render() {
    return (
      <div className={styles['network-view']}>
        <NetworkKey />
        <ThresholdSlider />
      </div>
    );
  }
}

export default NetworkView;
