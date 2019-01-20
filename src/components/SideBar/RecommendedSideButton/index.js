import React, { Component } from 'react';
import SideBarButton from 'components/Core/SideBarButton';
import icon from './recommended-icon.png';

class RecommendedButton extends Component {
  render() {
    return <SideBarButton img={icon} />;
  }
}

export default RecommendedButton;
