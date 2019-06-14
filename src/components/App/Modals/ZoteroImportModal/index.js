import React, { useState, useContext } from 'react';
import Select from 'react-select';
import styles from './styles.module.css';
import logo from './new-logo.svg';
import SecondaryButton from 'components/Generic/SecondaryButton';
import SecondarySquareButton from 'components/Generic/SecondarySquareButton';
import Table from 'components/Generic/Table';
import { Store } from 'state/data';
import { getCollections, getItems, authenticate } from 'import-modules/zotero';

const ZoteroConnect = () => {
  return (
    <div>
      <img className={styles.centered} src={logo} alt="zotero-logo" />
      <div className={styles.centered}>
        <SecondaryButton
          text="Connect to Zotero"
          onClick={() => {
            window.location.href = window.location.href + 'services/zotero/login';
          }}
        />
      </div>
    </div>
  );
};

const ZoteroSearch = () => {
  const [papers, setPapers] = useState([]);
  const [selected, setSelected] = useState({});
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(false);
  const { updatePapers } = useContext(Store);

  getCollections().then(setCollections);

  const addSeeds = () => {
    const selectedPapers = papers.filter((p, i) => selected[i]);
    updatePapers(selectedPapers, true);
  };

  const onCollectionSelect = ({ value }) => {
    setActiveCollection(value);
    console.log(value);
    getItems(value.key).then(setPapers);
  };

  return (
    <React.Fragment>
      <h1>Add papers from Zotero</h1>
      <div className={styles.filter}>
        <span>Filter by Collection:</span>
        <Select
          className={styles.select}
          value={activeCollection}
          options={collections.map(c => ({ value: c, label: c.name }))}
          onChange={onCollectionSelect}
        />
      </div>
      <div>
        <Table papers={papers} selected={selected} setSelected={setSelected} />
        <SecondarySquareButton text={'Add selected as seed papers'} onClick={addSeeds} />
      </div>
    </React.Fragment>
  );
};

const ZoteroImportModal = () => {
  const [user, setUser] = useState(false);
  if (!user) {
    authenticate().then(user => setUser(user));
    return null;
  }
  return <ZoteroSearch />;
};

export default ZoteroImportModal;
