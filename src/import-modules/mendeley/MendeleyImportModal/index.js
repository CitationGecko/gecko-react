import React, { useState, useContext } from 'react';
import Select from 'react-select';
import styles from './styles.module.css';
import SecondaryButton from 'core/components/SecondaryButton';
import SecondarySquareButton from 'core/components/SecondarySquareButton';
import Table from 'core/components/Table';
import cookies from 'browser-cookies';
import { Store } from 'core/state/data';
import { getFolders, authenticate, getDocumentsInFolder } from 'import-modules/mendeley';

const MendeleyConnect = () => {
  return (
    <div>
      <img
        className={styles.centered}
        src="https://blog.engineeringvillage.com/sites/default/files/201504/7603613940_2423ae047f_o.png"
        alt="mendeley-logo"
      />
      <div className={styles.centered}>
        <SecondaryButton
          text="Connect to Mendeley"
          onClick={() => {
            window.location.href = window.location.href + 'services/mendeley/authenticate';
          }}
        />
      </div>
    </div>
  );
};

const MendeleySearch = ({ folders }) => {
  const [papers, setPapers] = useState(null);
  const [selected, setSelected] = useState({});
  const [activeFolder, setActiveFolder] = useState(false);
  const { updatePapers } = useContext(Store);

  const addSeeds = () => {
    const selectedPapers = papers.filter((p, i) => selected[i]);
    updatePapers(selectedPapers, true);
  };

  const onFolderSelect = selection => {
    setActiveFolder(selection);
    getDocumentsInFolder(selection.value.id).then(setPapers);
  };

  return (
    <React.Fragment>
      <h1>Add papers from Mendeley</h1>
      <div className={styles.filter}>
        <span>Pick a Mendeley Folder:</span>
        <Select
          placeholder="Search..."
          className={styles.select}
          value={activeFolder}
          options={folders.map(c => ({ value: c, label: c.name }))}
          onChange={onFolderSelect}
        />
      </div>
      {papers &&
        (papers.length ? (
          <div>
            <Table papers={papers} selected={selected} setSelected={setSelected} />
            <SecondarySquareButton text={'Add selected as seed papers'} onClick={addSeeds} />
          </div>
        ) : (
          'No Papers Found'
        ))}
    </React.Fragment>
  );
};

const MendeleyImportModal = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [folders, setFolders] = useState(null);

  if (!folders) {
    getFolders()
      .then(folders => {
        setFolders(folders);
        setAuthenticated(true);
      })
      .catch(err => {
        if (authenticated) {
          setAuthenticated(false);
        }
      });
  }

  return authenticated ? <MendeleySearch folders={folders} /> : <MendeleyConnect />;
};

export default MendeleyImportModal;
