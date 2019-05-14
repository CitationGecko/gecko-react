import React, { Component } from 'react';
import styles from './styles.module.css';
import SideBar from './SideBar';
import Logo from './Logo';
import ModalContainer from './Modals';
import ListPanel from './ListPanel';
import NetworkPanel from './NetworkPanel';

class App extends Component {
  render() {
    fetch('/ping').then(resp => console.log(resp));
    return (
      <div className={styles.App}>
        <SideBar />
        <ListPanel />
        <NetworkPanel />
        <ModalContainer />
        <Logo />
      </div>
    );
  }
}

export default App;
