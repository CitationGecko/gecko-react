import React from 'react';
import styles from './styles.module.css';
import { LinkoutIcon } from 'core/icons/LinkoutIcon';

const PaperCard = ({ paper, onClick, selected, actions, rightFloat }) => (
  <div
    className={`${styles['paper-box']} ${selected ? styles['selected-paper'] : null}`}
    onClick={onClick}
  >
    <div className={styles['paper-title']}>
      {paper.title || paper.doi || paper.unstructured}
      {paper.doi && (
        <a
          className={styles['linkout-icon']}
          target="_blank"
          rel="noreferrer noopener"
          href={`https://doi.org/${paper.doi}`}
        >
          {<LinkoutIcon color={selected ? 'white' : 'rgb(255, 199, 0)'} />}
        </a>
      )}
    </div>
    {paper.author ||
      (paper.year && (
        <div className={styles['author-year']}>{`${paper.author} ${paper.year}`}</div>
      ))}
    <div className={styles['float-right']}>{rightFloat}</div>
    {paper.journal && <div className={styles['journal']}>{paper.journal}</div>}
    {selected && actions}
  </div>
);

export default PaperCard;
