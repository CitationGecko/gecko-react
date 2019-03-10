import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from 'components/Generic/ListView';
import { openModal, selectPaper, deletePapers } from 'state/actions';
import PaperCard from 'components/Generic/PaperCard';
import DeleteButton from 'components/Generic/DeleteButton';

class SeedList extends Component {
  render() {
    const { papers, selected, onSelect, addSeeds, deleteSeed } = this.props;
    let seedPapers = Object.values(papers).filter(p => p.seed);
    let paperCards = seedPapers.map(p => (
      <PaperCard
        key={p.ID}
        selected={selected.includes(p.ID)}
        rightFloat={
          <DeleteButton
            onClick={() => {
              deleteSeed([p.ID]);
            }}
          />
        }
        paper={p}
        onClick={() => onSelect(p)}
      />
    ));
    return (
      <ListView
        header={'My Seed Papers'}
        paperCards={paperCards}
        selected={selected}
        primaryButton={{ text: 'Add more seeds', onClick: addSeeds }}
        secondaryButton={{
          text: 'Delete',
          onClick: () => {
            deleteSeed(selected);
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    papers: state.data.Papers,
    selected: state.ui.selectedPapers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSeeds: () => {
      dispatch(openModal('addSeeds'));
    },
    onSelect: paper => {
      dispatch(selectPaper(paper));
    },
    deleteSeed: paper => {
      dispatch(deletePapers(paper));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedList);
