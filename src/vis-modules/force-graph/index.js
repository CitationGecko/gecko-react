import React, { Component } from 'react';
import ModeToggleKey from './components/ModeToggleKey';
import ThresholdSlider from './components/ThresholdSlider';
import ForceGraph from './components/ForceGraph';

export class NetworkView extends Component {
  render() {
    const { mode, onSwitch, onThreshold, data, sizeMetric, onSelect, selected } = this.props;
    return (
      <React.Fragment>
        <ModeToggleKey mode={mode} onSwitch={onSwitch} />
        {/*<ThresholdSlider threshold={onThreshold} />*/}
        <ForceGraph data={data} sizeMetric={sizeMetric} onSelect={onSelect} selected={selected} />
      </React.Fragment>
    );
  }
}
