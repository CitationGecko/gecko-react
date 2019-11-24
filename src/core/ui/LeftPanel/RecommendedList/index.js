import React, { useContext } from 'react';
import { PaperList } from 'core/ui/LeftPanel/PaperList';
import { Store } from 'core/state/data';
import { UI } from 'core/state/ui';
import { exportBibtex } from 'export-modules/bibtex';
import { Filters } from 'core/state/filters';
import GenericLeftPanel from 'core/components/GenericLeftPanel';
import { ToggleIrrelevant } from 'core/actions/ToggleIrrelevant';
import PrimaryButton from 'core/components/PrimaryButton';
import SecondaryButton from 'core/components/SecondaryButton';

const RecommendedList = () => {
  const { Papers, makeSeed } = useContext(Store);
  const { activeSortField, applyActiveFilters, applySort } = useContext(Filters);
  const { selectedPapers, selectPaper } = useContext(UI);

  let filteredNonSeeds = applySort(applyActiveFilters(Object.values(Papers).filter(p => !p.seed)));
  return (
    <GenericLeftPanel
      header={'Recommended Papers'}
      body={
        <PaperList
          papers={filteredNonSeeds}
          actions={[ToggleIrrelevant]}
          selectedPapers={selectedPapers}
          selectPaper={selectPaper}
        />
      }
      footer={
        <React.Fragment>
          <PrimaryButton text="Add as seed" onClick={() => makeSeed(selectedPapers[0])} />
          <SecondaryButton
            text="Export"
            onClick={() => exportBibtex('GeckoRecommendations.bib', filteredNonSeeds)}
          />
        </React.Fragment>
      }
    />
  );
};

export default RecommendedList;
