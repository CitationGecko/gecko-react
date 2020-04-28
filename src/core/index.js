import React from 'react';
import styles from './styles.module.css';
import SideBar from './ui/SideBar';
import Logo from './ui/Logo';
import Modal from './ui/Modal';
import LeftPanel from 'core/ui/LeftPanel';
import RightPanel from 'core/ui/RightPanel';
import { Store, useDataStore } from 'core/state/data';
import { Filters, useFilters } from 'core/state/filters';
import { UI, useUserInterface } from 'core/state/ui';
import { getDataModules, getImportModules } from 'core/module-loader';

function App() {
  let store = useDataStore();
  let ui = useUserInterface();
  let filters = useFilters();
  return (
    <Store.Provider value={store}>
      <UI.Provider value={ui}>
        <Filters.Provider value={filters}>
          <div className={styles.App}>
            <SideBar />
            <LeftPanel />
            <RightPanel />
            <Modal />
            <Logo />
          </div>
        </Filters.Provider>
        {getImportModules().map(({ component }) => component && React.createElement(component))}
      </UI.Provider>
      {getDataModules().map(dataModule => React.createElement(dataModule))}
    </Store.Provider>
  );
}
export default App;
