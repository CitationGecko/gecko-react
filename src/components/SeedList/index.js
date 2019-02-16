import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';
import PrimaryButton from '../Core/PrimaryButton';
import SecondaryButton from '../Core/SecondaryButton';
import { openModal, selectPaper } from '../../state';
import PaperCard from '../Core/PaperCard';

class SeedList extends Component {
  render() {
    const paperBoxes = this.props.papers.map(p => (
      <PaperCard mode={'Seeds'} paper={p} onClick={() => this.props.selectPaper(p)} />
    ));
    return (
      <div className={styles['list-view']}>
        <div className={styles['list-header']}>
          <h1>My Seed Papers</h1>
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
    papers: Object.values(state.data.Papers).filter(p => p.seed)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clickAddSeeds: () => {
      dispatch(openModal('addSeeds'));
    },
    selectPaper: p => {
      dispatch(selectPaper(p));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedList);
