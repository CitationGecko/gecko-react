import React, { createContext, useState } from 'react';
import ThankYouModal from 'core/ui/Modal/ThankYouModal';

export const UI = createContext();

export function useUserInterface() {
  const [mode, setMode] = useState('references');
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [leftPanel, setLeftPanel] = useState('Seeds');
  const [modalContent, setModal] = useState(<ThankYouModal />);
  const [showSettings, toggleSettings] = useState(false);
  const [rightPanel, setRightPanel] = useState('timeline');

  return {
    mode,
    selectedPapers,
    leftPanel,
    rightPanel,
    modalContent,
    showSettings,
    setModal,
    closeModal: () => setModal(null),
    setLeftPanel,
    setRightPanel,
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
