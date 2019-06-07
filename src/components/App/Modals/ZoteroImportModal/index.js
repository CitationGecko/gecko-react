import React, { useState } from 'react';
import styles from './styles.module.css';
//import { importZotero } from 'import-modules/zotero';
import logo from './new-logo.svg';
import libraryIcon from './zotero-library.png';
import collectionIcon from './zotero-collection.png';
import SecondaryButton from 'components/Generic/SecondaryButton';
import cookies from 'browser-cookies';
import SecondarySquareButton from 'components/Generic/SecondarySquareButton';

const ZoteroConnect = () => {
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

const ZoteroSearch = () => {
  const [papers, setPapers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [dropdown, toggleDropdown] = useState(false);

  let url = '/services/zotero/getCollections';
  fetch(url).then(resp => {
    console.log('response from Zotero!');
    resp.json().then(json => {
      zotero.totalCollections = json.data.length;
      zotero.status = true;
      zotero.collections = json.data;
    });
  });

  const toggle = j => {
    setPapers(papers =>
      papers.map((paper, i) => (j && j !== i ? paper : { ...paper, selected: !paper.selected }))
    );
  };

  const addSeeds = () => {};

  return (
    <React.Fragment>
      <h1>Add papers from Zotero</h1>
      <div>
        <span>Filter by Collection:</span>
        <div class="dropdown">
          <button class="dropbtn" onClick={() => toggleDropdown(!dropdown)}>
            <img src={libraryIcon} alt="library-icon" />
            My Library
          </button>
          {dropdown && (
            <div id="zoteroDropdown" class="dropdown-content">
              <input type="text" placeholder="Search..." id="zoteroInput" />
              {collections.map(c => (
                <div className="dropdown-item">
                  <img src={collectionIcon} alt="zotero-collection" />
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <table className={styles['table']}>
          <thead>
            <tr>
              <td>
                <input className={styles['select-all']} type="checkbox" onChange={() => toggle()} />
              </td>
              <td>TITLE</td>
              <td>AUTHOR</td>
              <td>YEAR</td>
              <td>PUBLICATION</td>
            </tr>
          </thead>
          <tbody className={styles['table-body']}>
            {papers &&
              papers.map((paper, i) => (
                <tr key={i}>
                  <td>
                    <input type="checkbox" checked={!!paper.selected} onChange={() => toggle(i)} />
                  </td>
                  <td>{paper.title}</td>
                  <td>{paper.author}</td>
                  <td>{paper.year}</td>
                  <td>{paper.journal}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <SecondarySquareButton text={'Add selected as seed papers'} onClick={addSeeds} />
      </div>
    </React.Fragment>
  );
};

const ZoteroImportModal = () => {
  const apiKey = cookies.get('gecko_zotero_key');
  const userID = cookies.get('gecko_zotero_userID');
  if (apiKey && userID) {
    return <ZoteroSearch />;
  } else {
    return <ZoteroConnect />;
  }
};

export default ZoteroImportModal;
