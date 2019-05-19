import React, { useContext } from 'react';
import { NetworkView } from 'components/Generic/NetworkView';
import { UI } from 'state/ui';
import { Store } from 'state/data';

const NetworkPanel = () => {
  const { switchMode, selectPaper, selectedPapers, mode } = useContext(UI);
  const { Papers, Edges } = useContext(Store);

  let selector;
  let metric;
  switch (mode) {
    case 'citations':
      selector = 'target';
      metric = 'seedsCited';
      break;
    case 'references':
      selector = 'source';
      metric = 'seedsCitedBy';
      break;
    default:
      selector = 'source';
      metric = 'seedsCitedBy';
  }
  const displayEdges = Edges.filter(e => {
    return Papers[e[selector]].seed;
  });

  const unconnectedPapers = Object.keys(Papers).filter(id => {
    return !(
      displayEdges
        .map(e => e.source)
        .concat(Edges.map(e => e.target))
        .includes(parseInt(id, 10)) || Papers[id].seed
    );
  });

  unconnectedPapers.forEach(id => {
    delete Papers[id];
  });

  return (
    <NetworkView
      mode={mode}
      selected={selectedPapers}
      onSelect={selectPaper}
      onSwitch={switchMode}
      onThreshold={() => {}}
      data={{ Papers, Edges: displayEdges }}
      sizeMetric={metric}
    />
  );
};

export default NetworkPanel;
