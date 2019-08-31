import React from 'react';
import ModeToggleKey from './components/ModeToggleKey';
import ForceGraph from './components/ForceGraph';
import { objectifyPapers } from 'core/state/data';

export const NetworkView = ({
  mode,
  onSwitch,
  onThreshold,
  data,
  sizeMetric,
  onSelect,
  selected
}) => {
  const selector = mode === 'seedsCitedBy' ? 'source' : 'target';
  const filteredPapers = objectifyPapers(
    Object.values(data.Papers).filter(p => p.seed || p[mode] > 0)
  );
  const filteredEdges = data.Edges.filter(
    e => filteredPapers[e.source] && filteredPapers[e.target] && filteredPapers[e[selector]].seed
  );
  return (
    <React.Fragment>
      <ModeToggleKey mode={mode} onSwitch={onSwitch} />
      <ForceGraph
        data={{ Papers: filteredPapers, Edges: filteredEdges }}
        sizeMetric={sizeMetric}
        onSelect={onSelect}
        selected={selected}
      />
    </React.Fragment>
  );
};
