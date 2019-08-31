import React, { useContext } from 'react';
import { Action } from 'core/components/Action';
import { Store } from 'core/state/data';

export const ToggleIrrelevant = ({ paper }) => {
  const { updatePaper } = useContext(Store);
  return paper.irrelevant ? (
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
};
