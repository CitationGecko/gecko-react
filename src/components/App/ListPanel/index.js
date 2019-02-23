import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from 'components/Generic/ListView';
import { openModal, selectPaper } from 'state/actions';

class ListPanel extends Component {
  render() {
    const { listView, papers, selected, onSelect, addSeeds } = this.props;

    let seedPapers = Object.values(papers).filter(p => p.seed);
    let nonSeeds = Object.values(papers).filter(p => !p.seed);

    let listProps;

    switch (listView) {
      case 'Seeds':
        listProps = {
          header: 'My Seed Papers',
          papers: seedPapers,
          selected: selected,
          onSelect: onSelect,
          primaryButton: { text: 'Add more seeds', onClick: addSeeds },
          secondaryButton: { text: 'Delete' }
        };
        break;
      case 'Recommended':
        listProps = {
          header: 'Recommended Papers',
          papers: nonSeeds,
          selected: selected,
          onSelect: onSelect,
          primaryButton: { text: 'Add as seed', onClick: addSeeds },
          secondaryButton: { text: 'Export' }
        };
        break;
      default:
        return null;
    }
    return <ListView {...listProps} />;
  }
}

const mapStateToProps = state => {
  return {
    papers: state.data.Papers,
    selected: state.ui.selectedPapers,
    listView: state.ui.listView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSeeds: () => {
      dispatch(openModal('addSeeds'));
    },
    onSelect: paper => {
      dispatch(selectPaper(paper));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPanel);
