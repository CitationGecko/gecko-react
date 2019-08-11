import React, { createContext, useState } from 'react';
import OnboardingModal from 'core/ui/Modal/OnboardingModal';

export const UI = createContext();

export function useUserInterface() {
  const [mode, setMode] = useState('references');
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [listView, setListView] = useState('Seeds');
  const [modalContent, setModal] = useState(<OnboardingModal />);
  const [showSettings, toggleSettings] = useState(false);

  return {
    mode,
    selectedPapers,
    listView,
    modalContent,
    showSettings,
    setModal,
    closeModal: () => setModal(null),
    setListView,
    selectPaper: paper => {
      if (listView) {
        toggleSettings(false);
        setListView(listView => (paper ? (paper.seed ? 'Seeds' : 'Recommended') : listView));
      }
      setSelectedPapers(paper ? [paper.ID] : []);
    },
    toggleSettings,
    setMode
  };
}
