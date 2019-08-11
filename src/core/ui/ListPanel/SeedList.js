import React, { useContext } from 'react';
import ListView from './components/ListView';
import PaperCard from 'core/components/PaperCard';
import DeleteButton from 'core/components/DeleteButton';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import AddSeedsModal from 'core/ui/Modal/AddSeedsModal';

function SeedList() {
  const { Papers, deletePapers } = useContext(Store);
  const { selectedPapers, selectPaper, setModal } = useContext(UI);
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
      primaryButton={{ text: 'Add more seeds', onClick: () => setModal(<AddSeedsModal />) }}
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
