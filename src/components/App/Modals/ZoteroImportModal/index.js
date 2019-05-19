import React from 'react';
import styles from './styles.module.css';
//import { importZotero } from 'import-modules/zotero';
import logo from './new-logo.svg';
import SecondaryButton from 'components/Generic/SecondaryButton';

const ZoteroImportModal = () => {
  return (
    <div>
      <img className={styles.centered} src={logo} alt="zotero-logo" />
      <div className={styles.centered}>
        <SecondaryButton
          text="Connect to Zotero"
          onClick={() => {
            window.location.href = window.location.href + 'services/zotero/auth/login';
          }}
        />
      </div>
    </div>
  );
};

export default ZoteroImportModal;
