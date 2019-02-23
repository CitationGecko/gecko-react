import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideBarButton from 'components/Generic/SideBarButton';
import icon from './seed-icon.png';
import { switchToList } from 'state/actions';

class SeedsButton extends Component {
  render() {
    return <SideBarButton active={this.props.active} img={icon} onClick={this.props.onClick} />;
  }
}

const mapStateToProps = state => {
  return {
    active: state.ui.listView === 'Seeds'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(switchToList('Seeds'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedsButton);
