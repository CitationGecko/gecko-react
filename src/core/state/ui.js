import React, { createContext, useState } from 'react';
import OnboardingModal from 'core/ui/OnboardingModal';

const initialState = {
  mode: 'references',
  selectedPapers: [],
  listView: 'Seeds',
  modalContent: <OnboardingModal />
};
// TODO: Split state

export const UI = createContext(initialState);

export function useUserInterface() {
  let [state, setState] = useState(initialState);

  return {
    ...state,
    closeModal: () => setState(prevState => ({ ...prevState, modalContent: null })),
    openModal: modalContent => setState(prevState => ({ ...prevState, modalContent })),
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
