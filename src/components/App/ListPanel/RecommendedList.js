import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from 'components/Generic/ListView';
import { openModal, selectPaper, makeSeed } from 'state/actions';
import PaperCard from 'components/Generic/PaperCard';
import MetricLabel from 'components/Generic/MetricLabel';

class RecommendedList extends Component {
  render() {
    const { papers, selected, onSelect, makeSeed, sortMetric } = this.props;

    let nonSeeds = Object.values(papers)
      .filter(p => !p.seed)
      .sort((a, b) => b[sortMetric] - a[sortMetric]);

    let paperCards = nonSeeds.map(p => (
      <PaperCard
        key={p.ID}
        selected={selected.includes(p.ID)}
        rightFloat={<MetricLabel paper={p} metric={sortMetric} />}
        paper={p}
        onClick={() => onSelect(p)}
      />
    ));
    return (
      <ListView
        header={'Recommended Papers'}
        paperCards={paperCards}
        selected={selected}
        onSelect={onSelect}
        primaryButton={{ text: 'Add as seed', onClick: () => makeSeed(selected[0]) }}
        secondaryButton={{ text: 'Export' }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    papers: state.data.Papers,
    selected: state.ui.selectedPapers,
    sortMetric: 'seedsCitedBy'
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
    makeSeed: id => {
      dispatch(makeSeed(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedList);
