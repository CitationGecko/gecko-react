import React, { createContext, useState } from 'react';
import OnboardingModal from 'core/ui/Modal/OnboardingModal';

export const UI = createContext();

export function useUserInterface() {
  const [mode, setMode] = useState('references');
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [leftPanel, setLeftPanel] = useState('Seeds');
  const [modalContent, setModal] = useState(<OnboardingModal />);
  const [showSettings, toggleSettings] = useState(false);

  return {
    mode,
    selectedPapers,
    leftPanel,
    modalContent,
    showSettings,
    setModal,
    closeModal: () => setModal(null),
    setLeftPanel,
    selectPaper: paper => {
      if (leftPanel) {
        toggleSettings(false);
        setLeftPanel(leftPanel => (paper ? (paper.seed ? 'Seeds' : 'Recommended') : leftPanel));
      }
      setSelectedPapers(paper ? [paper.ID] : []);
    },
    toggleSettings,
    setMode
  };
}
