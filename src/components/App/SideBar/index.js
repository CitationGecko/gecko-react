import React, { Component } from 'react';
import styles from './styles.module.css';
import SettingsButton from './SettingsSideButton';
import SeedsButton from './SeedsSideButton';
import RecommendedButton from './RecommendedSideButton';

class SideBar extends Component {
  render() {
    return (
      <div className={styles['side-bar']}>
        <SeedsButton />
        <RecommendedButton />
        <SettingsButton />
      </div>
    );
  }
}

export default SideBar;
