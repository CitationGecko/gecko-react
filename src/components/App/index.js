import React from 'react';
import styles from './styles.module.css';
import SideBar from './SideBar';
import Logo from './Logo';
import ModalContainer from './Modals';
import ListPanel from './ListPanel';
import NetworkPanel from './NetworkPanel';
import { Store, useDataStore } from 'state/data';
import { UI, useUserInterface } from 'state/ui';
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
          <ModalContainer />
          <Logo />
        </div>
      </UI.Provider>
      <Crossref />
      <OpenCitations />
    </Store.Provider>
  );
}

export default App;
