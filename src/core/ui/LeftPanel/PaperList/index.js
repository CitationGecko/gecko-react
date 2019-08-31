import React, { useContext } from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import PaperCard from 'core/components/PaperCard';
import { UI } from 'core/state/ui';

export const PaperList = ({ papers, actions }) => {
  const { selectedPapers, selectPaper } = useContext(UI);
  return papers.map((paper, i) => (
    <ScrollIntoViewIfNeeded
      key={i}
      active={selectedPapers.includes(parseInt(paper.ID, 10))}
      options={{ behavior: 'instant' }}
    >
      {
        <PaperCard
          key={paper.ID}
          selected={selectedPapers.includes(paper.ID)}
          paper={paper}
          onClick={() => selectPaper(paper)}
          actions={actions.map(action => action({ paper }))}
        />
      }
    </ScrollIntoViewIfNeeded>
  ));
};

export default PaperList;
