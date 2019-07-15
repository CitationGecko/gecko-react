import React from 'react';
import styles from './styles.module.css';
import SideBar from './ui/SideBar';
import Logo from './ui/Logo';
import Modal from './ui/Modal';
import ListPanel from 'core/ui/ListView';
import NetworkPanel from 'vis-modules/ForceNetwork';
import { Store, useDataStore } from 'core/state/data';
import { UI, useUserInterface } from 'core/state/ui';
import { Crossref } from 'data-modules/crossref';
import { OpenCitations } from 'data-modules/open-citations';

function App() {
  let store = useDataStore();
  let ui = useUserInterface();
  return (
    <Store.Provider value={store}>
      <UI.Provider value={ui}>
        <div className={styles.App}>
          <SideBar />
          <ListPanel />
          <NetworkPanel />
          <Modal />
          <Logo />
        </div>
      </UI.Provider>
      <Crossref />
      <OpenCitations />
    </Store.Provider>
  );
}

export default App;
