import React, { Component } from 'react';
import SideBarButton from 'components/Core/SideBarButton'
import icon from './seed-icon.png'

class SeedsButton extends Component {
    render() {
      return (
        <SideBarButton img={icon}/>
      );
    }
  }
  
export default SeedsButton;