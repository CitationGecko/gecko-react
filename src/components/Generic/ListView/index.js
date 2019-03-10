import React, { Component } from 'react';

import styles from './styles.module.css';
import PrimaryButton from 'components/Generic/PrimaryButton';
import SecondaryButton from 'components/Generic/SecondaryButton';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

class ListView extends Component {
  render() {
    const { header, paperCards, selected, primaryButton, secondaryButton } = this.props;

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
        </div>
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
}

export default ListView;
