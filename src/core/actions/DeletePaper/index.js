import React, { useContext } from 'react';
import { Action } from 'core/components/Action';
import { Store } from 'core/state/data';

export const DeletePaperAction = ({ paper }) => {
  const { deletePapers } = useContext(Store);
  return <Action icon="delete" text="Delete seed" onClick={() => deletePapers([paper.ID])} />;
};
