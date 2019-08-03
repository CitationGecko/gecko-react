import React, { useContext } from 'react';
import ListView from './components/ListView';
import PaperCard from 'core/components/PaperCard';
import MetricLabel from 'core/components/MetricLabel';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import { Filters } from 'core/state/filters';

const RecommendedList = () => {
  const { Papers, makeSeed } = useContext(Store);
  const { applyActiveFilters } = useContext(Filters);
  const { selectedPapers, selectPaper, mode } = useContext(UI);

  const sortMetric = mode === 'references' ? 'seedsCitedBy' : 'seedsCited';

  let nonSeeds = Object.values(Papers)
    .filter(p => !p.seed && p[sortMetric] > 0)
    .sort((a, b) => b[sortMetric] - a[sortMetric]);

  let paperCards = applyActiveFilters(nonSeeds).map(p => (
    <PaperCard
      key={p.ID}
      selected={selectedPapers.includes(p.ID)}
      rightFloat={<MetricLabel paper={p} metric={sortMetric} />}
      paper={p}
      onClick={() => selectPaper(p)}
    />
  ));
  return (
    <ListView
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
