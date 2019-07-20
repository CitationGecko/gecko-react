import React, { useState } from 'react';

import styles from './styles.module.css';
import ListFilter from '../ListFilter';
import PrimaryButton from 'core/components/PrimaryButton';
import SecondaryButton from 'core/components/SecondaryButton';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { FilterIcon } from 'core/icons/FilterIcon';

function ListView({ header, paperCards, selected, primaryButton, secondaryButton }) {
  const [showFilter, toggleFilter] = useState(false);
  const paperBoxes = paperCards.map(paperCard => (
    <ScrollIntoViewIfNeeded
      key={paperCard.key}
      active={selected.includes(parseInt(paperCard.key, 10))}
      options={{ behavior: 'instant' }}
    >
      {paperCard}
    </ScrollIntoViewIfNeeded>
  ));

  return (
    <div className={styles['list-view']}>
      <div className={styles['list-header']}>
        <h1>{header}</h1>
        <div onClick={() => toggleFilter(!showFilter)}>
          <FilterIcon />
        </div>
      </div>
      {showFilter && <ListFilter />}
      <div className={styles['list-body']}>{paperBoxes}</div>
      <div className={styles['list-footer']}>
        <div className={styles['list-footer-btn-group']}>
          <PrimaryButton onClick={primaryButton.onClick} text={primaryButton.text} />
          <SecondaryButton onClick={secondaryButton.onClick} text={secondaryButton.text} />
        </div>
      </div>
    </div>
  );
}

export default ListView;
