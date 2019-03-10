import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetworkView } from 'components/Generic/NetworkView';
import { selectPaper } from 'state/actions';

class NetworkPanel extends Component {
  render() {
    const { onSwitch, onThreshold, data, selected, onSelect } = this.props;
    const Papers = { ...data.Papers };
    const Edges = data.Edges.filter(e => {
      return Papers[e.source].seed || Papers[e.target].seed;
    });

    const unconnectedPapers = Object.keys(Papers).filter(id => {
      return !(
        Edges.map(e => e.source)
          .concat(Edges.map(e => e.target))
          .includes(parseInt(id, 10)) || Papers[id].seed
      );
    });

    unconnectedPapers.forEach(id => {
      delete Papers[id];
    });

    return (
      <NetworkView
        selected={selected}
        onSelect={onSelect}
        onSwitch={onSwitch}
        onThreshold={onThreshold}
        data={{ Papers, Edges }}
        sizeMetric={'seedsCitedBy'}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    selected: state.ui.selectedPapers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: paper => {
      dispatch(selectPaper(paper));
    },
    switchView: () => {},
    onThreshold: () => {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkPanel);
