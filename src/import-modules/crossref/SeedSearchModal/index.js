import React, { useContext, useState } from 'react';
import styles from './styles.module.css';
import SecondarySquareButton from 'core/components/SecondarySquareButton';
import Loader from 'core/components/Loader';
import Table from 'core/components/Table';
import { Store } from 'core/state/data';
import { crossrefSearch } from 'import-modules/crossref';

const SeedSearchModal = () => {
  const [selected, setSelected] = useState({});
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const { updatePapers } = useContext(Store);

  const addSeeds = () => {
    const toAdd = results.filter((x, i) => selected[i]);
    updatePapers(toAdd, true);
  };
  const handleSubmit = event => {
    event.preventDefault();
    setStatus('pending');
    crossrefSearch(event.target[0].value).then(results => {
      setResults(results);
      setStatus('complete');
    });
  };
  return (
    <React.Fragment>
      <h1>Search for seed papers</h1>
      <form className={styles['search-input']} onSubmit={handleSubmit}>
        <span>Enter query:</span>
        <input type="text" className={styles['text-input']} />
        <Loader display={status === 'pending'} />
        {status !== 'pending' && (
          <input type="submit" className={styles['submit']} value="Search" />
        )}
      </form>
      <div>
        <Table papers={results} selected={selected} setSelected={setSelected} />
        <SecondarySquareButton text={'Add selected as seed papers'} onClick={addSeeds} />
      </div>
    </React.Fragment>
  );
};

export default SeedSearchModal;
