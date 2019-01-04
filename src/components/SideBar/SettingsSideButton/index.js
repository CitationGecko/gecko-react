import React, { Component } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'components/Core/SideBarButton'
import icon from 'resources/settings-icon.png'

class SettingsButton extends Component {
    render() {
      return (
        <SideBarButton img={icon}/>
      );
    }
  }
  
export default SettingsButton;