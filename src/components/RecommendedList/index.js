import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';
import PrimaryButton from '../Core/PrimaryButton';
import SecondaryButton from '../Core/SecondaryButton';
import { selectPaper, updatePapers } from '../../state';
import PaperCard from '../Core/PaperCard';
import { checkServerIdentity } from 'tls';

class RecommendedList extends Component {
  render() {
    const paperBoxes = this.props.papers.map(p => (
      <div ref={p.ID}>
        <PaperCard
          selected={this.props.isSelected(p.ID)}
          mode={this.props.mode}
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
          <h1>Recommended Papers</h1>
        </div>
        <div className={styles['list-body']}>{paperBoxes}</div>
        <div className={styles['list-footer']}>
          <div className={styles['list-footer-btn-group']}>
            <PrimaryButton onClick={this.props.clickAddSeed} text={'Add as seed'} />
            <SecondaryButton text={'Export'} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    papers: Object.values(state.data.Papers).filter(p => !p.seed),
    selected: state.selectedPapers,
    isSelected: id => {
      return state.selectedPapers.includes(id);
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clickAddSeed: () => {
      dispatch(updatePapers());
    },
    selectPaper: id => {
      dispatch(selectPaper(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedList);
