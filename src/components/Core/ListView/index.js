import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';
import PrimaryButton from 'components/Core/PrimaryButton';
import SecondaryButton from 'components/Core/SecondaryButton';
import { openModal, selectPaper } from 'state/actions';
import PaperCard from 'components/Core/PaperCard';

class ListView extends Component {
  render() {
    const paperBoxes = this.props.papers.map(p => (
      <div ref={p.ID}>
        <PaperCard
          ref={p.ID}
          selected={this.props.isSelected(p.ID)}
          mode={'Seeds'}
          paper={p}
          onClick={() => this.props.selectPaper(p.ID)}
        />
      </div>
    ));
    if (this.props.selected.length === 1) {
      this.refs[this.props.selected[0]].scrollIntoView();
    }
    return (
      <div className={styles['list-view']}>
        <div className={styles['list-header']}>
          <h1>{this.props.header}</h1>
        </div>
        <div className={styles['list-body']}>{paperBoxes}</div>
        <div className={styles['list-footer']}>
          <div className={styles['list-footer-btn-group']}>
            <PrimaryButton onClick={this.props.clickAddSeeds} text={'Add more seeds'} />
            <SecondaryButton text={'Delete'} />
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
