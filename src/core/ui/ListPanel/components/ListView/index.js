import React, { useState, useContext } from 'react';

import styles from './styles.module.css';
import ListSettings from '../ListSettings';
import PrimaryButton from 'core/components/PrimaryButton';
import SecondaryButton from 'core/components/SecondaryButton';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import IconButton from '@material-ui/core/Icon';
import Icon from 'core/components/Icon';
import { UI } from 'core/state/ui';

function ListView({ header, paperCards, selected, primaryButton, secondaryButton, settings }) {
  const { showSettings, toggleSettings } = useContext(UI);
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
        {settings && (
          <div className={styles.settings}>
            <IconButton onClick={() => toggleSettings(!showSettings)}>
              <Icon icon="tune" />
            </IconButton>
          </div>
        )}
      </div>
      {showSettings && <ListSettings onClose={() => toggleSettings(!showSettings)} />}
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
