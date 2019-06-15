import React, { useContext } from 'react';
import ListView from 'components/Generic/ListView';
import PaperCard from 'components/Generic/PaperCard';
import MetricLabel from 'components/Generic/MetricLabel';
import { Store } from 'state/data';
import { UI } from 'state/ui';
import { exportBibtex } from 'import-modules/bibtex';

const RecommendedList = () => {
  const { Papers, makeSeed } = useContext(Store);
  const { selectedPapers, selectPaper, mode } = useContext(UI);

  const sortMetric = mode === 'references' ? 'seedsCitedBy' : 'seedsCited';

  let nonSeeds = Object.values(Papers)
    .filter(p => !p.seed && p[sortMetric] > 0)
    .sort((a, b) => b[sortMetric] - a[sortMetric]);

  let paperCards = nonSeeds.map(p => (
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
