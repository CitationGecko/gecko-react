import React, { Component } from 'react';
import styles from './styles.module.css';
import NetworkKey from 'components/Generic/NetworkKey';
import ThresholdSlider from 'components/Generic/ThresholdSlider';
import ForceNetwork from 'components/Generic/ForceNetwork/';

export class NetworkView extends Component {
  render() {
    const { mode, onSwitch, onThreshold, data, sizeMetric, onSelect, selected } = this.props;
    return (
      <div className={styles['network-panel']}>
        <NetworkKey mode={mode} onSwitch={onSwitch} />
        {/*<ThresholdSlider threshold={onThreshold} />*/}
        <ForceNetwork data={data} sizeMetric={sizeMetric} onSelect={onSelect} selected={selected} />
      </div>
    );
  }
}
