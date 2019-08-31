import React, { useContext } from 'react';
import { NetworkView } from 'vis-modules/force-graph';
import { UI } from 'core/state/ui';
import { Store, objectifyPapers } from 'core/state/data';
import { Filters } from 'core/state/filters';
import styles from './styles.module.css';
import { Timeline } from 'vis-modules/timeline';
import { PaperInfoBox } from 'core/ui/RightPanel/PaperInfoBox';
import { VisToggle } from 'core/ui/RightPanel/VisToggle';

const RightPanel = () => {
  const { leftPanel, rightPanel, selectPaper, selectedPapers } = useContext(UI);
  const { Papers, Edges } = useContext(Store);
  const { applyActiveFilters, activeSortField, setActiveSortField } = useContext(Filters);

  const activePapers = objectifyPapers(
    applyActiveFilters(Object.values(Papers)).concat(Object.values(Papers).filter(p => p.seed))
  );

  const activeEdges = Edges.filter(e => activePapers[e.source] && activePapers[e.target]);

  const onSwitch = () => {
    setActiveSortField(field => (field === 'seedsCitedBy' ? 'seedsCited' : 'seedsCitedBy'));
    selectPaper(null);
  };

  const selectedPaper = Papers[selectedPapers[0]];

  return (
    <div className={styles['vis-panel']}>
      {rightPanel === 'timeline' ? (
        <Timeline
          data={{ Papers: activePapers, Edges: activeEdges }}
          selected={selectedPapers}
          onSelect={selectPaper}
        />
      ) : (
        <NetworkView
          mode={activeSortField}
          selected={selectedPapers}
          onSelect={selectPaper}
          onSwitch={onSwitch}
          onThreshold={() => {}}
          data={{ Papers: activePapers, Edges: activeEdges }}
          sizeMetric={activeSortField}
        />
      )}
      {!leftPanel && selectedPaper && (
        <div className={styles['selected-paper-box']}>
          <PaperInfoBox paper={selectedPaper} />
        </div>
      )}
      <VisToggle />
    </div>
  );
};

export default RightPanel;
