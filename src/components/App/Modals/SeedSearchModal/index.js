import React, { useContext, useState } from 'react';
import styles from './styles.module.css';
import SecondarySquareButton from 'components/Generic/SecondarySquareButton';
import Loader from 'components/Generic/Loader';
import { Store } from 'state/data';
import { crossrefSearch } from 'import-modules/crossref';

const SeedSearchModal = () => {
  const [state, setState] = useState({
    status: null,
    selectAll: false,
    selected: {},
    results: []
  });

  const { updatePapers } = useContext(Store);

  const toggleAll = () => {
    setState(prevState => {
      return {
        ...prevState,
        selectAll: !prevState.selectAll,
        selected: Object.assign({}, state.results.map(() => !prevState.selectAll))
      };
    });
  };
  const toggle = index => {
    setState(prevState => {
      let selected = { ...prevState.selected };
      selected[index] = !prevState.selected[index];
      return {
        ...prevState,
        selected
      };
    });
  };
  const addSeeds = () => {
    const toAdd = state.results.filter((x, i) => state.selected[i]);
    updatePapers(toAdd, true);
  };
  const handleSubmit = event => {
    event.preventDefault();
    crossrefSearch(event.target[0].value).then(results => {
      setState(prevState => ({ ...prevState, results }));
    });
  };
  return (
    <React.Fragment>
      <h1>Search for seed papers</h1>
      <form className={styles['search-input']} onSubmit={handleSubmit}>
        <span>Enter query:</span>
        <input type="text" className={styles['text-input']} />
        <Loader display={state.status === 'pending'} />
        {state.status !== 'pending' && (
          <input type="submit" className={styles['submit']} value="Search" />
        )}
      </form>
      <div>
        <table className={styles['table']}>
          <thead>
            <tr>
              <td>
                <input className={styles['select-all']} type="checkbox" onChange={toggleAll} />
              </td>
              <td>TITLE</td>
              <td>AUTHOR</td>
              <td>YEAR</td>
              <td>PUBLICATION</td>
            </tr>
          </thead>
          <tbody className={styles['table-body']}>
            {state.results &&
              state.results.map((paper, i) => (
                <tr key={i}>
                  <td>
                    <input type="checkbox" checked={state.selected[i]} onChange={() => toggle(i)} />
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

export default SeedSearchModal;
