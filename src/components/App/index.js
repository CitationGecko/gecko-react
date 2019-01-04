import React, { Component } from 'react';
import styles from './styles.module.css';
import SideBar from 'components/SideBar';
import ListView from 'components/ListView';
import NetworkView from 'components/NetworkView';
import Logo from '../Logo';
import OnboardingModal from '../OnboardingModal';
import 'styles/global-styles.module.css'


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <SideBar/>
        <ListView/>
        <NetworkView/>
        <OnboardingModal/>
        <Logo/>
      </div>
    );
  }
}

export default App;
