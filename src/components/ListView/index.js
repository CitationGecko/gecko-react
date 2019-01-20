import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';
import PrimaryButton from '../Core/PrimaryButton';
import SecondaryButton from '../Core/SecondaryButton';
import { openModal } from '../../state';

class ListView extends Component {
  render() {
    return (
      <div className={styles['list-view']}>
        <div className={styles['list-header']}>
          <h1>My Seed Papers</h1>
        </div>
        <div className={styles['list-body']} />
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    clickAddSeeds: () => {
      dispatch(openModal('addSeeds'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
