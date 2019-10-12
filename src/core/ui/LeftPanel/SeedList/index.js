import React, { useContext } from 'react';
import { PaperList } from 'core/ui/LeftPanel/PaperList';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import AddSeedsModal from 'core/ui/Modal/AddSeedsModal';
import GenericLeftPanel from 'core/components/GenericLeftPanel';
import { DeletePaperAction } from 'core/actions/DeletePaper';
import PrimaryButton from 'core/components/PrimaryButton';
import SecondaryButton from 'core/components/SecondaryButton';

function SeedList() {
  const { Papers } = useContext(Store);
  const { setModal, selectedPapers, selectPaper } = useContext(UI);
  let seedPapers = Object.values(Papers).filter(p => p.seed);
  return (
    <GenericLeftPanel
      header={'My Seed Papers'}
      body={
        <PaperList
          papers={seedPapers}
          actions={[DeletePaperAction]}
          selectedPapers={selectedPapers}
          selectPaper={selectPaper}
        />
      }
      footer={
        <React.Fragment>
          <PrimaryButton text="Add more seeds" onClick={() => setModal(<AddSeedsModal />)} />
          <SecondaryButton
            text="Save Session"
            onClick={() => {
              exportBibtex('GeckoSession.bib', seedPapers);
            }}
          />
        </React.Fragment>
      }
    />
  );
}

export default SeedList;
