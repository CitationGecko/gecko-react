import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeedList from 'components/App/ListPanel/SeedList';
import RecommendedList from 'components/App/ListPanel/RecommendedList';

class ListPanel extends Component {
  render() {
    const { listView } = this.props;

    switch (listView) {
      case 'Seeds':
        return <SeedList />;
      case 'Recommended':
        return <RecommendedList />;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    listView: state.ui.listView
  };
};

export default connect(mapStateToProps)(ListPanel);
