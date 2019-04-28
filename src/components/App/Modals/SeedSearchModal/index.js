import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import { seedSearchSubmit, updatePapers } from 'state/actions';
import SecondarySquareButton from 'components/Generic/SecondarySquareButton';
import Loader from 'components/Generic/Loader';

class SeedSearchModal extends Component {
  state = {
    selectAll: false,
    selected: {}
  };
  toggleAll = () => {
    this.setState(prevState => {
      return {
        selectAll: !prevState.selectAll,
        selected: Object.assign({}, this.props.results.map(() => !prevState.selectAll))
      };
    });
  };
  toggle = index => {
    this.setState(prevState => {
      let selected = { ...prevState.selected };
      selected[index] = !prevState.selected[index];
      return {
        ...prevState,
        selected
      };
    });
  };
  addSeeds = () => {
    const toAdd = this.props.results.filter((x, i) => this.state.selected[i]);
    this.props.addPapers(toAdd);
  };
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
                  <input
                    className={styles['select-all']}
                    type="checkbox"
                    onChange={this.toggleAll}
                  />
                </td>
                <td>TITLE</td>
                <td>AUTHOR</td>
                <td>YEAR</td>
                <td>PUBLICATION</td>
              </tr>
            </thead>
            <tbody className={styles['table-body']}>
              {this.props.results &&
                this.props.results.map((paper, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="checkbox"
                        checked={this.state.selected[i]}
                        onChange={() => this.toggle(i)}
                      />
                    </td>
                    <td>{paper.title}</td>
                    <td>{paper.author}</td>
                    <td>{paper.year}</td>
                    <td>{paper.journal}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <SecondarySquareButton text={'Add selected as seed papers'} onClick={this.addSeeds} />
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
    seedSearchSubmit: query => dispatch(seedSearchSubmit(query)),
    addPapers: papers => dispatch(updatePapers(papers, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedSearchModal);
