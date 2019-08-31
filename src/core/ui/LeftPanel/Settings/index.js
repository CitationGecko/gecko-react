import React, { useContext } from 'react';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import AddSeedsModal from 'core/ui/Modal/AddSeedsModal';
import GenericLeftPanel from 'core/components/GenericLeftPanel';
import FilterSettings from 'core/ui/LeftPanel/Settings/FilterSettings';

function Settings() {
  const { Papers } = useContext(Store);
  const { setModal } = useContext(UI);
  let seedPapers = Object.values(Papers).filter(p => p.seed);
  return (
    <GenericLeftPanel
      header={'Settings'}
      body={<FilterSettings />}
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

export default Settings;
