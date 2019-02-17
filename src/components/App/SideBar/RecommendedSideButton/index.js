import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBarButton from 'components/Generic/SideBarButton';
import icon from './recommended-icon.png';
import { switchToList } from 'state/actions';

class RecommendedButton extends Component {
  render() {
    return <SideBarButton active={this.props.active} img={icon} onClick={this.props.onClick} />;
  }
}

const mapStateToProps = state => {
  return {
    active: state.ui.listView === 'Recommended'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(switchToList('Recommended'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedButton);
