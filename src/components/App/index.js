import React, { Component } from 'react';
import styles from './styles.module.css';
import SideBar from 'components/SideBar';
import ListView from 'components/ListView';
import NetworkView from 'components/NetworkView';
import Logo from '../Logo';
import ModalContainer from '../Modals';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <SideBar />
        <ListView />
        <NetworkView />
        <ModalContainer />
        <Logo />
      </div>
    );
  }
}

export default App;
