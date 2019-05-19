import { createContext, useState } from 'react';

const initialState = {
  mode: 'references',
  selectedPapers: [],
  listView: 'Seeds',
  modal: 'onboarding'
};

export const UI = createContext(initialState);

export function useUserInterface() {
  let [state, setState] = useState(initialState);

  return {
    ...state,
    closeModal: () => setState({ modal: null }),
    openModal: modal => setState({ modal }),
    switchToList: view => setState({ listView: view }),
    selectPaper: paper =>
      setState({ listView: paper.seed ? 'Seeds' : 'Recommended', selectedPapers: [paper.id] })
  };
}
