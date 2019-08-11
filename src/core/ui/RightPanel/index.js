import React, { useContext } from 'react';
import { NetworkView } from 'vis-modules/force-graph';
import { UI } from 'core/state/ui';
import { Store, objectifyPapers } from 'core/state/data';
import { Filters } from 'core/state/filters';
import styles from './styles.module.css';
import PaperCard from 'core/components/PaperCard';
import { Action } from 'core/components/Action';

const PaperInfoBox = ({ paper }) => {
  const { deletePapers, updatePaper } = useContext(Store);
  const actions = paper.seed ? (
    <Action icon="delete" text="Delete seed" onClick={() => deletePapers([paper.ID])} />
  ) : paper.irrelevant ? (
    <Action
      icon="visibility_on"
      text="Mark as relevant"
      onClick={() => updatePaper({ ...paper, irrelevant: false })}
    />
  ) : (
    <Action
      icon="visibility_off"
      text="Mark as irrelevant"
      onClick={() => updatePaper({ ...paper, irrelevant: true })}
    />
  );
  return <PaperCard paper={paper} selected={true} actions={actions} />;
};

const RightPanel = () => {
  const { listView, selectPaper, selectedPapers } = useContext(UI);
  const { Papers, Edges, updatePaper } = useContext(Store);
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

  const selectedPaper = Papers[selectedPapers[0]];

  return (
    <div className={styles['vis-panel']}>
      <NetworkView
        mode={activeSortField}
        selected={selectedPapers}
        onSelect={selectPaper}
        onSwitch={onSwitch}
        onThreshold={() => {}}
        data={{ Papers: papersToDisplay, Edges: edgesToDisplay }}
        sizeMetric={activeSortField}
      />
      {!listView && selectedPaper && (
        <div className={styles['selected-paper-box']}>
          <PaperInfoBox paper={selectedPaper} />
        </div>
      )}
    </div>
  );
};

export default RightPanel;
