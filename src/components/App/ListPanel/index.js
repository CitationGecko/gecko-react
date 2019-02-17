import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from 'components/Generic/ListView';
import { openModal, selectPaper } from 'state/actions';

class ListPanel extends Component {
  render() {
    const { listView, papers, selected, onSelect, addSeeds } = this.props;

    let seedPapers = Object.values(papers).filter(p => p.seed);
    let nonSeeds = Object.values(papers).filter(p => !p.seed);

    switch (listView) {
      case 'Seed':
        return (
          <ListView
            header={'My Seed Papers'}
            papers={seedPapers}
            selected={selected}
            onSelect={onSelect}
            primaryButton={{ text: 'Add more seeds', onClick: addSeeds }}
            secondaryButton={{ text: 'Delete' }}
          />
        );
      case 'Recommended':
        return (
          <ListView
            header={'Recommended Papers'}
            papers={nonSeeds}
            isSelected={selected}
            onSelect={onSelect}
            primaryButton={{ text: 'Add as seed', onClick: addSeeds }}
            secondaryButton={{ text: 'Export' }}
          />
        );
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    papers: state.data.Papers,
    selected: state.ui.selected,
    listView: state.ui.listView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSeeds: () => {
      dispatch(openModal('addSeeds'));
    },
    onSelect: id => {
      dispatch(selectPaper(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPanel);
