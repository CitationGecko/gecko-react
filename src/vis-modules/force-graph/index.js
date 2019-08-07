import React, { useContext } from 'react';
import { NetworkView } from './components/NetworkView';
import { UI } from 'core/state/ui';
import { Store, objectifyPapers } from 'core/state/data';
import { Filters } from 'core/state/filters';

const NetworkPanel = () => {
  const { selectPaper, selectedPapers } = useContext(UI);
  const { Papers, Edges } = useContext(Store);
  const { applyActiveFilters, activeSortField, setActiveSortField } = useContext(Filters);

  const selector = activeSortField === 'seedsCitedBy' ? 'source' : 'target';

  const papersToDisplay = objectifyPapers(
    applyActiveFilters(Object.values(Papers))
      .filter(p => p[activeSortField] > 0)
      .concat(Object.values(Papers).filter(p => p.seed))
  );

  const edgesToDisplay = Edges.filter(e => {
    return (
      papersToDisplay[e.source] && papersToDisplay[e.target] && papersToDisplay[e[selector]].seed
    );
  });

  const onSwitch = () => {
    setActiveSortField(field => (field === 'seedsCitedBy' ? 'seedsCited' : 'seedsCitedBy'));
    selectPaper(null);
  };

  return (
    <NetworkView
      mode={activeSortField}
      selected={selectedPapers}
      onSelect={selectPaper}
      onSwitch={onSwitch}
      onThreshold={() => {}}
      data={{ Papers: papersToDisplay, Edges: edgesToDisplay }}
      sizeMetric={activeSortField}
    />
  );
};

export default NetworkPanel;
