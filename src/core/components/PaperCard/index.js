import React from 'react';
import styles from './styles.module.css';
import { LinkoutIcon } from 'core/icons/LinkoutIcon';

const PaperCard = ({ paper, onClick, selected, actions, rightFloat }) => {
  let author = paper.author ? paper.author : '';
  let journal = paper.journal ? paper.journal : '';

  return (
    <div
      className={`${styles['paper-box']} ${selected ? styles['selected-paper'] : null}`}
      onClick={onClick}
    >
      <div className={styles['paper-title']}>
        {paper.title}
        <a
          className={styles['linkout-icon']}
          target="_blank"
          rel="noreferrer noopener"
          href={`https://doi.org/${paper.doi}`}
        >
          {<LinkoutIcon color={selected ? 'white' : 'rgb(255, 199, 0)'} />}
        </a>
      </div>
      <div className={styles['author-year']}>{`${author} ${paper.year}`}</div>
      <div className={styles['float-right']}>{rightFloat}</div>
      <div className={styles['journal']}>{journal}</div>
      {selected && actions}
    </div>
  );
};

export default PaperCard;
