import React, { Component } from 'react';

import styles from './styles.module.css';
import PrimaryButton from 'components/Generic/PrimaryButton';
import SecondaryButton from 'components/Generic/SecondaryButton';
import PaperCard from 'components/Generic/PaperCard';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

class ListView extends Component {
  render() {
    const { header, papers, selected, onSelect, primaryButton, secondaryButton } = this.props;

    const paperBoxes = papers.map(p => (
      <ScrollIntoViewIfNeeded active={selected.includes(p.ID)} options={{ behavior: 'instant' }}>
        <PaperCard
          key={p.ID}
          selected={selected.includes(p.ID)}
          mode={this.props.mode}
          paper={p}
          onClick={() => onSelect(p)}
        />
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
            <SecondaryButton text={secondaryButton.text} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListView;
