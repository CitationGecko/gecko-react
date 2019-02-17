import React, { Component } from 'react';
import styles from './styles.module.css';
import SideBarButton from 'components/Generic/SideBarButton';
import icon from './settings-icon.png';

class SettingsButton extends Component {
  render() {
    return <SideBarButton img={icon} />;
  }
}

export default SettingsButton;
