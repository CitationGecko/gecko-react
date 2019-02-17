import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import SecondarySquareButton from 'components/Core/SecondarySquareButton';

class SeedSearchModal extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Search for seed papers</h1>
        <div className={styles['search-input']}>
          <span>Enter query:</span>
          <input type="text" />
          <div id="title-input-loader" className={styles['loader']} />
        </div>
        <div className={styles['title-search-table']}>
          <div>
            <table>
              <thead>
                <td className={styles['table-cell']}>
                  <input className={styles['select-all']} type="checkbox" />
                </td>
                <td className={styles['table-cell']}>TITLE</td>
                <td className={styles['table-cell']}>AUTHOR</td>
                <td className={styles['table-cell']}>YEAR</td>
                <td className={styles['table-cell']}>PUBLICATION</td>
              </thead>
            </table>
          </div>
          <div className={styles['table-body']}>
            <table>
              <tbody />
            </table>
          </div>
          <SecondarySquareButton text={'Add selected as seed papers'} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedSearchModal);
