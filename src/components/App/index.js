import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import SideBar from 'components/SideBar';
import NetworkView from 'components/NetworkView';
import Logo from 'components/Logo';
import ModalContainer from 'components/Modals';
import RecommendedList from 'components/RecommendedList';
import SeedList from 'components/SeedList';

class App extends Component {
  render() {
    let List;
    switch (this.props.listView) {
      case 'Seed':
        List = <SeedList />;
        break;
      case 'Recommended':
        List = <RecommendedList mode="CitedBySeeds" />;
        break;
      default:
        List = <SeedList />;
    }

    return (
      <div className={styles.App}>
        <SideBar />
        {List}
        <NetworkView />
        <ModalContainer />
        <Logo />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listView: state.ui.listView
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
