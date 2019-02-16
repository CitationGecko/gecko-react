import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';
import PrimaryButton from '../Core/PrimaryButton';
import SecondaryButton from '../Core/SecondaryButton';
import { openModal, selectPaper, updatePapers } from '../../state';
import PaperCard from '../Core/PaperCard';

class RecommendedList extends Component {
  render() {
    const paperBoxes = this.props.papers.map(p => (
      <PaperCard mode={this.props.mode} paper={p} onClick={() => this.props.selectPaper(p)} />
    ));
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
    mode: state.listView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clickAddSeed: () => {
      dispatch(updatePapers());
    },
    selectPaper: p => {
      dispatch(selectPaper(p));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedList);
