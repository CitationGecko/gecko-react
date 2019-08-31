import React, { useContext } from 'react';
import { Store } from 'core/state/data';
import PaperCard from 'core/components/PaperCard';
import { Action } from 'core/components/Action';

export const PaperInfoBox = ({ paper }) => {
  const { deletePapers, updatePaper } = useContext(Store);
  const actions = paper.seed ? (
    <Action icon="delete" text="Delete seed" onClick={() => deletePapers([paper.ID])} />
  ) : paper.irrelevant ? (
    <Action
      icon="visibility_on"
      text="Mark as relevant"
      onClick={() => updatePaper({ ...paper, irrelevant: false })}
    />
  ) : (
    <Action
      icon="visibility_off"
      text="Mark as irrelevant"
      onClick={() => updatePaper({ ...paper, irrelevant: true })}
    />
  );
  return <PaperCard paper={paper} selected={true} actions={actions} />;
};
