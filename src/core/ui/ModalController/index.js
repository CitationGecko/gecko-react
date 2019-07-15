import React, { useContext } from 'react';
import styles from './styles.module.css';
import OnboardingModal from './OnboardingModal';
import AddSeedsModal from './AddSeedsModal';
import UploadBibTexModal from './UploadBibTexModal';
import SeedSearchModal from './SeedSearchModal';
import ZoteroImportModal from './ZoteroImportModal';
import { UI } from 'core/state/ui';

const ModalController = () => {
  const { modal, closeModal } = useContext(UI);
  if (!modal) return null;

  const modals = {
    onboarding: <OnboardingModal />,
    addSeeds: <AddSeedsModal />,
    bibtex: <UploadBibTexModal />,
    seedSearch: <SeedSearchModal />,
    zotero: <ZoteroImportModal />
  };

  const ModalContent = modals[modal] ? modals[modal] : <h1>Feature Coming Soon...</h1>;

  return (
    <div className={styles['modal']} onClick={closeModal}>
      <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
        {ModalContent}
      </div>
    </div>
  );
};

export default ModalController;
