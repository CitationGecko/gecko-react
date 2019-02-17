import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';
import PrimaryButton from 'components/Generic/PrimaryButton';
import SecondaryButton from 'components/Generic/SecondaryButton';
import { openModal, selectPaper } from 'state/actions';
import PaperCard from 'components/Generic/PaperCard';

class ListView extends Component {
  render() {
    const { header, papers, selected, onSelect, primaryButton, secondaryButton } = this.props;

    const paperBoxes = papers.map(p => (
      <div ref={p.ID}>
        <PaperCard
          ref={p.ID}
          selected={selected.includes(p.ID)}
          mode={this.props.mode}
          paper={p}
          onClick={() => onSelect(p.ID)}
        />
      </div>
    ));
    if (selected.length === 1) {
      this.refs[selected[0]].scrollIntoView();
    }
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

const mapStateToProps = state => {
  return {
    papers: Object.values(state.data.Papers).filter(p => p.seed),
    selected: state.ui.selectedPapers,
    isSelected: id => {
      return state.ui.selectedPapers.includes(id);
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clickAddSeeds: () => {
      dispatch(openModal('addSeeds'));
    },
    selectPaper: id => {
      dispatch(selectPaper(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
