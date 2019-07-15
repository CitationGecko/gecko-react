import React, { useState } from 'react';
import styles from './styles.module.css';

const Table = ({ papers, selected, setSelected }) => {
  const [allSelected, setAllSelected] = useState(false);

  const toggle = j => {
    setSelected(selected => ({ ...selected, [j]: !selected[j] }));
  };
  const toggleAll = () => {
    setSelected(selected =>
      papers.reduce((total, curr, ind) => ({ ...total, [ind]: !allSelected }), {})
    );
    setAllSelected(allSelected => !allSelected);
  };
  return (
    <table className={styles['table']}>
      <thead>
        <tr>
          <td>
            <input
              className={styles['select-all']}
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
            />
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
                <input type="checkbox" checked={selected[i]} onChange={() => toggle(i)} />
              </td>
              <td>{paper.title}</td>
              <td>{paper.author}</td>
              <td>{paper.year}</td>
              <td>{paper.journal}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
