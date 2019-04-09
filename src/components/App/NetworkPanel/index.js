import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetworkView } from 'components/Generic/NetworkView';
import { selectPaper, switchMode } from 'state/actions';

class NetworkPanel extends Component {
  render() {
    const { onSwitch, onThreshold, data, selected, onSelect, mode } = this.props;
    const Papers = { ...data.Papers };
    let selector;
    let metric;
    switch (mode) {
      case 'citations':
        selector = 'target';
        metric = 'seedsCited';
        break;
      case 'references':
        selector = 'source';
        metric = 'seedsCitedBy';
        break;
      default:
        selector = 'source';
        metric = 'seedsCitedBy';
    }
    const Edges = data.Edges.filter(e => {
      return Papers[e[selector]].seed;
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
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        onSwitch={onSwitch}
        onThreshold={onThreshold}
        data={{ Papers, Edges }}
        sizeMetric={metric}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    selected: state.ui.selectedPapers,
    mode: state.ui.mode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: paper => {
      dispatch(selectPaper(paper));
    },
    onSwitch: mode => {
      dispatch(switchMode('citations'));
    },
    onThreshold: () => {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkPanel);
