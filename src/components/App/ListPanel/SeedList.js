import React, { useContext } from 'react';
import ListView from 'components/Generic/ListView';
import PaperCard from 'components/Generic/PaperCard';
import DeleteButton from 'components/Generic/DeleteButton';
import { Store } from 'state/data';
import { UI } from 'state/ui';
import { exportBibtex } from 'import-modules/bibtex';

function SeedList() {
  const { Papers, deletePapers } = useContext(Store);
  const { selectedPapers, selectPaper, openModal } = useContext(UI);
  let seedPapers = Object.values(Papers).filter(p => p.seed);
  let paperCards = seedPapers.map(p => (
    <PaperCard
      key={p.ID}
      selected={selectedPapers.includes(p.ID)}
      rightFloat={
        <DeleteButton
          onClick={() => {
            deletePapers([p.ID]);
          }}
        />
      }
      paper={p}
      onClick={() => selectPaper(p)}
    />
  ));
  return (
    <ListView
      header={'My Seed Papers'}
      paperCards={paperCards}
      selected={selectedPapers}
      primaryButton={{ text: 'Add more seeds', onClick: () => openModal('addSeeds') }}
      secondaryButton={{
        text: 'Save Session',
        onClick: () => {
          exportBibtex('GeckoSession.bib', seedPapers);
        }
      }}
    />
  );
}

export default SeedList;
