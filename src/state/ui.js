import { createContext, useState } from 'react';

const initialState = {
  mode: 'references',
  selectedPapers: [],
  listView: 'Seeds',
  modal: 'onboarding'
};
// TODO: Split state

export const UI = createContext(initialState);

export function useUserInterface() {
  let [state, setState] = useState(initialState);

  return {
    ...state,
    closeModal: () => setState(prevState => ({ ...prevState, modal: null })),
    openModal: modal => setState(prevState => ({ ...prevState, modal })),
    switchToList: view => setState(prevState => ({ ...prevState, listView: view })),
    switchMode: () =>
      setState(prevState => ({
        ...prevState,
        selectedPapers: [],
        mode: prevState.mode === 'references' ? 'citations' : 'references'
      })),
    selectPaper: paper =>
      setState(prevState => ({
        ...prevState,
        listView: paper ? (paper.seed ? 'Seeds' : 'Recommended') : prevState.listView,
        selectedPapers: paper ? [paper.ID] : []
      }))
  };
}
