import React from 'react';
import ModeToggleKey from './components/ModeToggleKey';
import ForceGraph from './components/ForceGraph';

export const NetworkView = ({
  mode,
  onSwitch,
  onThreshold,
  data,
  sizeMetric,
  onSelect,
  selected
}) => (
  <React.Fragment>
    <ModeToggleKey mode={mode} onSwitch={onSwitch} />
    <ForceGraph data={data} sizeMetric={sizeMetric} onSelect={onSelect} selected={selected} />
  </React.Fragment>
);
