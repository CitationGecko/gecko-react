import React, { Component } from 'react';
import './App.css';
import SideBar from 'components/SideBar';
import ListView from 'components/ListView';
import NetworkView from 'components/NetworkView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar/>
        <ListView/>
        <NetworkView/>
      </div>
    );
  }
}

export default App;
