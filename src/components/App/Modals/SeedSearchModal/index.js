import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import SecondarySquareButton from 'components/Generic/SecondarySquareButton';
import Loader from 'components/Generic/Loader';
import { seedSearchSubmit } from 'state/actions';

class SeedSearchModal extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.seedSearchSubmit(event.target[0].value);
  };
  render() {
    return (
      <React.Fragment>
        <h1>Search for seed papers</h1>
        <form className={styles['search-input']} onSubmit={this.handleSubmit}>
          <span>Enter query:</span>
          <input type="text" className={styles['text-input']} />
          <Loader display={this.props.status === 'pending'} />
          {this.props.status !== 'pending' && (
            <input type="submit" className={styles['submit']} value="Search" />
          )}
        </form>
        <div>
          <table className={styles['table']}>
            <thead>
              <tr>
                <td>
                  <input className={styles['select-all']} type="checkbox" />
                </td>
                <td>TITLE</td>
                <td>AUTHOR</td>
                <td>YEAR</td>
                <td>PUBLICATION</td>
              </tr>
            </thead>
            <tbody className={styles['table-body']}>
              {this.props.results &&
                this.props.results.map(paper => (
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{paper.title}</td>
                    <td>{paper.author}</td>
                    <td>{paper.year}</td>
                    <td>{paper.journal}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <SecondarySquareButton text={'Add selected as seed papers'} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    seedSearchSubmit: query => dispatch(seedSearchSubmit(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedSearchModal);
