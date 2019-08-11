import React, { useContext } from 'react';
import ListView from './components/ListView';
import PaperCard from 'core/components/PaperCard';
import MetricLabel from 'core/components/MetricLabel';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import { Filters } from 'core/state/filters';
import { Action } from 'core/components/Action';

const RecommendedList = () => {
  const { Papers, makeSeed, updatePaper } = useContext(Store);
  const { activeSortField, applyActiveFilters, applySort } = useContext(Filters);
  const { selectedPapers, selectPaper } = useContext(UI);

  let nonSeeds = applySort(applyActiveFilters(Object.values(Papers).filter(p => !p.seed)));

  let paperCards = nonSeeds.map(p => (
    <PaperCard
      key={p.ID}
      selected={selectedPapers.includes(p.ID)}
      rightFloat={<MetricLabel paper={p} metric={activeSortField} />}
      paper={p}
      onClick={() => selectPaper(p)}
      actions={
        p.irrelevant ? (
          <Action
            icon="visibility_on"
            text="Mark as relevant"
            onClick={() => updatePaper({ ...p, irrelevant: false })}
          />
        ) : (
          <Action
            icon="visibility_off"
            text="Mark as irrelevant"
            onClick={() => updatePaper({ ...p, irrelevant: true })}
          />
        )
      }
    />
  ));
  return (
    <ListView
      settings={true}
      header={'Recommended Papers'}
      paperCards={paperCards}
      selected={selectedPapers}
      onSelect={selectPaper}
      primaryButton={{ text: 'Add as seed', onClick: () => makeSeed(selectedPapers[0]) }}
      secondaryButton={{
        text: 'Export',
        onClick: () => exportBibtex('GeckoRecommendations.bib', nonSeeds)
      }}
    />
  );
};

export default RecommendedList;
