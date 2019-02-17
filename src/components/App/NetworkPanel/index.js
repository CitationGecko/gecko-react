import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetworkView } from 'components/Generic/NetworkView';
import { selectPaper } from 'state/actions';

class NetworkPanel extends Component {
  render() {
    const { onSwitch, onThreshold, data, onSelect } = this.props;
    return (
      <NetworkView
        onSelect={onSelect}
        onSwitch={onSwitch}
        onThreshold={onThreshold}
        data={data}
        sizeMetric={'seedsCitedBy'}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: id => {
      dispatch(selectPaper(id));
    },
    switchView: () => {},
    onThreshold: () => {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkPanel);
