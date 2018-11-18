import React, { Component } from 'react';
import './styles.module.css';
import SideBarButton from 'components/SideBarButton'

class SideBar extends Component {
    render() {
      return (
        <div className="SideBar">
          <SideBarButton className='seed-button'></SideBarButton>
          <SideBarButton className='recommended-button'></SideBarButton>
          <SideBarButton className='settings-button'></SideBarButton>
        </div>
      );
    }
  }
  
export default SideBar;