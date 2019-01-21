import React, { Component } from 'react';
import styles from './styles.module.css';

class SideBarButton extends Component {
  render() {
    return (
      <button
        className={this.props.active ? styles.active : styles.inactive}
        onClick={this.props.onClick}
      >
        <img src={this.props.img} alt="icon" className={styles.icon} />
      </button>
    );
  }
}

export default SideBarButton;
