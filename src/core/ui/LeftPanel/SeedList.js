import React, { useContext } from 'react';
import { PaperList } from './components/PaperList';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import AddSeedsModal from 'core/ui/Modal/AddSeedsModal';
import GenericLeftPanel from 'core/components/GenericLeftPanel';
import { DeletePaperAction } from 'core/actions/DeletePaper';

function SeedList() {
  const { Papers } = useContext(Store);
  const { setModal } = useContext(UI);
  let seedPapers = Object.values(Papers).filter(p => p.seed);
  return (
    <GenericLeftPanel
      header={'My Seed Papers'}
      body={<PaperList papers={seedPapers} actions={[DeletePaperAction]} />}
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
